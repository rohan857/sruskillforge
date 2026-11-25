import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {
  AuthUserSummary,
  CandidateProfileState,
  CodeAuditReport,
  FeedCategory,
  HiringCommitteePacket,
  InquirySubmission,
  InterviewRole,
  KanbanStage,
  OAScorecard,
  PartnerCompany,
  ProgrammingLanguage,
  ProjectReviewReport,
  ResumeAuditResult,
} from '../types';
import { INITIAL_CANDIDATE_STATE } from '../seedData';
import { generateDossierHash, getCompanyForRole } from '../utils/careerEngine';
import {
  auth,
  ensureAndSyncUserProfileInFirestore,
  pushProfileUpdateToFirestore,
  saveEmailInquiryToFirestore,
  signInWithGooglePopup,
  signOutFirebaseUser,
} from '../firebase';

const STORAGE_KEY = 'janken_hotburn_career_hub_v3';
const AUTH_SESSION_KEY = 'janken_hotburn_auth_session_v1';

interface CareerContextValue {
  state: CandidateProfileState;
  authUser: AuthUserSummary | null;
  isAuthReady: boolean;
  isAuthModalOpen: boolean;
  authModalReason: string;
  openAuthModal: (reason?: string, onAuthenticatedCallback?: () => void) => void;
  closeAuthModal: () => void;
  requireAuth: (reason: string, action: () => void) => void;
  signInWithGoogle: () => Promise<void>;
  signInWithStudioAccount: (params: {
    name: string;
    email: string;
    company: PartnerCompany;
    role: InterviewRole;
  }) => void;
  logoutUser: () => Promise<void>;
  selectCompanyAndRole: (company: PartnerCompany, role?: InterviewRole) => void;
  updateProfile: (
    patch: Partial<
      Pick<CandidateProfileState, 'name' | 'email' | 'targetRole' | 'selectedCompany'>
    >
  ) => void;
  toggleModuleComplete: (moduleId: string, xpDelta?: number) => void;
  markQuizPassed: (quizId: string, xpReward: number) => void;
  saveProblemCode: (problemId: string, lang: ProgrammingLanguage, code: string) => void;
  recordProblemSolved: (problemId: string, audit: CodeAuditReport) => void;
  recordOAScorecard: (scorecard: OAScorecard) => void;
  recordHiringPacket: (packet: HiringCommitteePacket) => void;
  recordProjectReview: (review: ProjectReviewReport) => void;
  applyToJobFastTrack: (jobId: string, companyCode: string) => void;
  moveJobKanbanStage: (jobId: string, stage: KanbanStage) => void;
  createFeedPost: (post: {
    company: PartnerCompany;
    title: string;
    category: Exclude<FeedCategory, 'All Signals'>;
    body: string;
    codeSnippet?: string;
    verifiedBadge: string;
  }) => void;
  togglePostUpvote: (postId: string) => void;
  togglePostBookmark: (postId: string) => void;
  requestPostReferral: (postId: string) => void;
  addPostComment: (postId: string, text: string) => void;
  submitInquiry: (
    inquiry: Omit<
      InquirySubmission,
      'id' | 'submittedAt' | 'status' | 'dossierHash' | 'recipientEmail'
    >
  ) => Promise<{ mailtoUrl: string; recipientEmail: string }>;
  saveResumeAudit: (audit: ResumeAuditResult) => void;
  resetDemoState: () => void;
}

const CareerContext = createContext<CareerContextValue | undefined>(undefined);

const DEFAULT_ROLE_BY_COMPANY: Record<PartnerCompany, InterviewRole> = {
  'JANKEN CORPS': 'AWS Cloud Solutions Architect',
  'HOTBURN STUDIOS': 'Game Designer & Godot Coder',
};

export const CareerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CandidateProfileState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return { ...INITIAL_CANDIDATE_STATE, ...parsed };
      }
    } catch {
      // Fallback to seed state
    }
    return INITIAL_CANDIDATE_STATE;
  });

  const [authUser, setAuthUser] = useState<AuthUserSummary | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_SESSION_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore
    }
    return null;
  });

  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalReason, setAuthModalReason] = useState(
    'Sign in or create an account to save your courses, mock interviews, and project reviews to the cloud database.'
  );
  const pendingCallbackRef = useRef<(() => void) | null>(null);

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const summary: AuthUserSummary = {
          uid: fbUser.uid,
          email: fbUser.email || state.email,
          displayName: fbUser.displayName || state.name,
          provider: 'google',
          emailVerified: fbUser.emailVerified,
        };
        setAuthUser(summary);
        try {
          localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(summary));
        } catch {
          // Ignore
        }

        // Sync with Cloud Firestore
        try {
          const remoteProfile = await ensureAndSyncUserProfileInFirestore(
            fbUser.uid,
            fbUser.email || '',
            {
              ...state,
              name: fbUser.displayName || state.name,
              email: fbUser.email || state.email,
            }
          );
          if (remoteProfile) {
            setState((prev) => ({
              ...prev,
              ...remoteProfile,
              email: fbUser.email || prev.email,
            }));
          } else {
            setState((prev) => ({
              ...prev,
              name: fbUser.displayName || prev.name,
              email: fbUser.email || prev.email,
            }));
          }
        } catch {
          // Continue with local state if Firestore rule/network is offline
        }
      }
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  // Persist state locally and push updates to Firestore when signed in via Google
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors
    }

    if (authUser && authUser.provider === 'google' && authUser.emailVerified) {
      pushProfileUpdateToFirestore(authUser.uid, state).catch(() => {
        // Non-blocking sync
      });
    }
  }, [state, authUser]);

  const openAuthModal = (reason?: string, onAuthenticatedCallback?: () => void) => {
    if (reason) {
      setAuthModalReason(reason);
    } else {
      setAuthModalReason(
        'Sign in or create a free account to start training courses, run AI project reviews, and sync your career progress.'
      );
    }
    pendingCallbackRef.current = onAuthenticatedCallback || null;
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    pendingCallbackRef.current = null;
  };

  const requireAuth = (reason: string, action: () => void) => {
    if (authUser) {
      action();
    } else {
      openAuthModal(reason, action);
    }
  };

  const runPendingCallbackIfAny = () => {
    const cb = pendingCallbackRef.current;
    pendingCallbackRef.current = null;
    setIsAuthModalOpen(false);
    if (cb) {
      setTimeout(() => cb(), 60);
    }
  };

  const signInWithGoogle = async () => {
    const cred = await signInWithGooglePopup();
    const fbUser = cred.user;
    const summary: AuthUserSummary = {
      uid: fbUser.uid,
      email: fbUser.email || state.email,
      displayName: fbUser.displayName || state.name,
      provider: 'google',
      emailVerified: fbUser.emailVerified,
    };
    setAuthUser(summary);
    try {
      localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(summary));
    } catch {
      // Ignore
    }
    runPendingCallbackIfAny();
  };

  const signInWithStudioAccount = (params: {
    name: string;
    email: string;
    company: PartnerCompany;
    role: InterviewRole;
  }) => {
    const cleanName = params.name.trim() || 'Rohan Bandi';
    const cleanEmail = params.email.trim() || 'bandirohan43@gmail.com';
    const uid = `studio_${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'user'}_${Date.now().toString().slice(-4)}`;
    const handle = `@${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '_') || 'candidate'}`;

    const summary: AuthUserSummary = {
      uid,
      email: cleanEmail,
      displayName: cleanName,
      provider: 'studio',
      emailVerified: true,
    };

    setAuthUser(summary);
    try {
      localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(summary));
    } catch {
      // Ignore
    }

    setState((prev) => ({
      ...prev,
      name: cleanName,
      handle,
      email: cleanEmail,
      selectedCompany: params.company,
      targetRole: params.role,
      dossierHash: generateDossierHash(
        cleanName,
        prev.eloRating,
        prev.solvedProblemIds.length,
        params.company
      ),
    }));

    runPendingCallbackIfAny();
  };

  const logoutUser = async () => {
    try {
      if (auth.currentUser) {
        await signOutFirebaseUser();
      }
    } catch {
      // Ignore
    }
    setAuthUser(null);
    try {
      localStorage.removeItem(AUTH_SESSION_KEY);
    } catch {
      // Ignore
    }
  };

  const selectCompanyAndRole = (company: PartnerCompany, role?: InterviewRole) => {
    setState((prev) => {
      const nextRole =
        role ||
        (getCompanyForRole(prev.targetRole) === company
          ? prev.targetRole
          : DEFAULT_ROLE_BY_COMPANY[company]);
      return {
        ...prev,
        selectedCompany: company,
        targetRole: nextRole,
        dossierHash: generateDossierHash(
          prev.name,
          prev.eloRating,
          prev.solvedProblemIds.length,
          company
        ),
      };
    });
  };

  const updateProfile = (
    patch: Partial<
      Pick<CandidateProfileState, 'name' | 'email' | 'targetRole' | 'selectedCompany'>
    >
  ) => {
    setState((prev) => {
      const nextName = patch.name ?? prev.name;
      const nextRole = patch.targetRole ?? prev.targetRole;
      const nextCompany = patch.selectedCompany ?? getCompanyForRole(nextRole);
      return {
        ...prev,
        ...patch,
        selectedCompany: nextCompany,
        targetRole: nextRole,
        dossierHash: generateDossierHash(
          nextName,
          prev.eloRating,
          prev.solvedProblemIds.length,
          nextCompany
        ),
      };
    });
  };

  const toggleModuleComplete = (moduleId: string, xpDelta = 100) => {
    setState((prev) => {
      const exists = prev.completedModuleIds.includes(moduleId);
      const completedModuleIds = exists
        ? prev.completedModuleIds.filter((id) => id !== moduleId)
        : [...prev.completedModuleIds, moduleId];
      const xp = exists ? Math.max(0, prev.xp - xpDelta) : prev.xp + xpDelta;
      const globalReadinessScore = Math.min(
        99,
        Math.max(60, prev.globalReadinessScore + (exists ? -1 : 1))
      );
      return { ...prev, completedModuleIds, xp, globalReadinessScore };
    });
  };

  const markQuizPassed = (quizId: string, xpReward: number) => {
    setState((prev) => {
      if (prev.passedQuizIds.includes(quizId)) return prev;
      const passedQuizIds = [...prev.passedQuizIds, quizId];
      const xp = prev.xp + xpReward;
      const eloRating = prev.eloRating + 15;
      const globalReadinessScore = Math.min(99, prev.globalReadinessScore + 2);
      return {
        ...prev,
        passedQuizIds,
        xp,
        eloRating,
        globalReadinessScore,
        dossierHash: generateDossierHash(
          prev.name,
          eloRating,
          prev.solvedProblemIds.length,
          prev.selectedCompany
        ),
      };
    });
  };

  const saveProblemCode = (problemId: string, lang: ProgrammingLanguage, code: string) => {
    setState((prev) => ({
      ...prev,
      savedCodeByProblem: {
        ...prev.savedCodeByProblem,
        [problemId]: {
          ...(prev.savedCodeByProblem[problemId] || ({} as Record<ProgrammingLanguage, string>)),
          [lang]: code,
        },
      },
    }));
  };

  const recordProblemSolved = (problemId: string, audit: CodeAuditReport) => {
    setState((prev) => {
      const alreadySolved = prev.solvedProblemIds.includes(problemId);
      const solvedProblemIds = alreadySolved
        ? prev.solvedProblemIds
        : [...prev.solvedProblemIds, problemId];
      const eloRating = alreadySolved ? prev.eloRating : prev.eloRating + 25;
      const xp = alreadySolved ? prev.xp + 50 : prev.xp + 300;
      const globalReadinessScore = alreadySolved
        ? prev.globalReadinessScore
        : Math.min(99, prev.globalReadinessScore + 3);

      return {
        ...prev,
        solvedProblemIds,
        eloRating,
        xp,
        globalReadinessScore,
        dossierHash: generateDossierHash(
          prev.name,
          eloRating,
          solvedProblemIds.length,
          prev.selectedCompany
        ),
        codeAuditsByProblem: {
          ...prev.codeAuditsByProblem,
          [problemId]: audit,
        },
      };
    });
  };

  const recordOAScorecard = (scorecard: OAScorecard) => {
    setState((prev) => {
      const eloRating = Math.max(1200, prev.eloRating + scorecard.eloDelta);
      const globalReadinessScore = Math.min(
        99,
        Math.round((prev.globalReadinessScore * 2 + scorecard.scorePercent) / 3)
      );
      return {
        ...prev,
        eloRating,
        globalReadinessScore,
        xp: prev.xp + scorecard.pointsEarned * 5,
        dossierHash: generateDossierHash(
          prev.name,
          eloRating,
          prev.solvedProblemIds.length,
          prev.selectedCompany
        ),
        oaScorecards: [scorecard, ...prev.oaScorecards],
      };
    });
  };

  const recordHiringPacket = (packet: HiringCommitteePacket) => {
    setState((prev) => {
      const eloBonus =
        packet.decision === 'STRONG HIRE' ? 30 : packet.decision === 'LEAN HIRE' ? 10 : 0;
      const eloRating = prev.eloRating + eloBonus;
      const globalReadinessScore = Math.min(
        99,
        Math.max(prev.globalReadinessScore, packet.overallScore)
      );
      return {
        ...prev,
        eloRating,
        globalReadinessScore,
        xp: prev.xp + 400,
        dossierHash: generateDossierHash(
          prev.name,
          eloRating,
          prev.solvedProblemIds.length,
          prev.selectedCompany
        ),
        hiringPackets: [packet, ...prev.hiringPackets],
      };
    });
  };

  const recordProjectReview = (review: ProjectReviewReport) => {
    setState((prev) => {
      const eloRating = prev.eloRating + 20;
      const globalReadinessScore = Math.min(
        99,
        Math.max(
          prev.globalReadinessScore,
          Math.round((prev.globalReadinessScore + review.score) / 2)
        )
      );
      return {
        ...prev,
        eloRating,
        globalReadinessScore,
        xp: prev.xp + 350,
        dossierHash: generateDossierHash(
          prev.name,
          eloRating,
          prev.solvedProblemIds.length,
          prev.selectedCompany
        ),
        projectReviews: [review, ...prev.projectReviews],
      };
    });
  };

  const applyToJobFastTrack = (jobId: string, companyCode: string) => {
    setState((prev) => {
      const cleanCode = companyCode.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6);
      const appHash = `${prev.dossierHash}#${cleanCode}`;
      const currentStage = prev.jobKanbanByJobId[jobId];
      const nextStage: KanbanStage =
        currentStage && currentStage !== 'Bookmarked' ? currentStage : 'Dossier Sent';

      return {
        ...prev,
        jobKanbanByJobId: {
          ...prev.jobKanbanByJobId,
          [jobId]: nextStage,
        },
        jobApplicationHashes: {
          ...prev.jobApplicationHashes,
          [jobId]: appHash,
        },
      };
    });
  };

  const moveJobKanbanStage = (jobId: string, stage: KanbanStage) => {
    setState((prev) => ({
      ...prev,
      jobKanbanByJobId: {
        ...prev.jobKanbanByJobId,
        [jobId]: stage,
      },
    }));
  };

  const createFeedPost = (postInput: {
    company: PartnerCompany;
    title: string;
    category: Exclude<FeedCategory, 'All Signals'>;
    body: string;
    codeSnippet?: string;
    verifiedBadge: string;
  }) => {
    setState((prev) => {
      const newPost = {
        id: `post-${Date.now()}`,
        company: postInput.company,
        author: prev.name,
        authorRole: `${prev.targetRole} · ${postInput.company} (${prev.dossierHash})`,
        authorElo: prev.eloRating,
        verifiedBadge:
          postInput.verifiedBadge || `${postInput.company} · ELO ${prev.eloRating}`,
        category: postInput.category,
        title: postInput.title,
        body: postInput.body,
        codeSnippet: postInput.codeSnippet,
        timestamp: 'Just now',
        upvotes: 1,
        upvotedByMe: true,
        bookmarkedByMe: false,
        referralRequestedByMe: false,
        comments: [],
      };
      return {
        ...prev,
        xp: prev.xp + 150,
        feedPosts: [newPost, ...prev.feedPosts],
      };
    });
  };

  const togglePostUpvote = (postId: string) => {
    setState((prev) => ({
      ...prev,
      feedPosts: prev.feedPosts.map((p) =>
        p.id === postId
          ? {
              ...p,
              upvotedByMe: !p.upvotedByMe,
              upvotes: p.upvotedByMe ? p.upvotes - 1 : p.upvotes + 1,
            }
          : p
      ),
    }));
  };

  const togglePostBookmark = (postId: string) => {
    setState((prev) => ({
      ...prev,
      feedPosts: prev.feedPosts.map((p) =>
        p.id === postId ? { ...p, bookmarkedByMe: !p.bookmarkedByMe } : p
      ),
    }));
  };

  const requestPostReferral = (postId: string) => {
    setState((prev) => ({
      ...prev,
      feedPosts: prev.feedPosts.map((p) =>
        p.id === postId ? { ...p, referralRequestedByMe: true } : p
      ),
    }));
  };

  const addPostComment = (postId: string, text: string) => {
    if (!text.trim()) return;
    setState((prev) => ({
      ...prev,
      feedPosts: prev.feedPosts.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                {
                  id: `c-${Date.now()}`,
                  author: prev.name,
                  authorRole: `${prev.targetRole} · Elo ${prev.eloRating}`,
                  text: text.trim(),
                  timestamp: 'Just now',
                },
              ],
            }
          : p
      ),
    }));
  };

  const submitInquiry = async (
    inquiry: Omit<
      InquirySubmission,
      'id' | 'submittedAt' | 'status' | 'dossierHash' | 'recipientEmail'
    >
  ): Promise<{ mailtoUrl: string; recipientEmail: string }> => {
    const inquiryId = `inq_${Date.now()}`;
    const recipientEmail = 'hotburnstudios@gmail.com' as const;
    const entry: InquirySubmission = {
      ...inquiry,
      id: inquiryId,
      recipientEmail,
      dossierHash: state.dossierHash,
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
      status: 'SENT TO hotburnstudios@gmail.com',
    };

    setState((prev) => ({
      ...prev,
      inquiries: [entry, ...prev.inquiries],
    }));

    // Persist to Cloud Firestore if authenticated via Firebase Google Auth
    if (authUser && authUser.provider === 'google' && authUser.emailVerified) {
      saveEmailInquiryToFirestore({
        inquiryId,
        uid: authUser.uid,
        company: inquiry.company,
        senderName: inquiry.name,
        senderEmail: inquiry.email,
        topic: inquiry.topic,
        message: inquiry.message,
        dossierHash: state.dossierHash,
      }).catch(() => {
        // Non-blocking Firestore write
      });
    }

    const fallbackSubject = `[${inquiry.company} & Partner Hub] ${inquiry.topic} — ${inquiry.name} (${state.dossierHash})`;
    const fallbackBody = [
      `UNIFIED QUERY DISPATCH (JANKEN CORPS & HOTBURN STUDIOS)`,
      `To: ${recipientEmail}`,
      `Company Division: ${inquiry.company}`,
      `Career Track: ${state.targetRole}`,
      `Candidate Name: ${inquiry.name}`,
      `Candidate Email: ${inquiry.email}`,
      `Dossier Hash: ${state.dossierHash}`,
      `Topic: ${inquiry.topic}`,
      `----------------------------------------`,
      inquiry.message,
    ].join('\n');
    let mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      fallbackSubject
    )}&body=${encodeURIComponent(fallbackBody)}`;

    try {
      const response = await fetch('/api/email/send-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: inquiry.company,
          targetRole: state.targetRole,
          name: inquiry.name,
          email: inquiry.email,
          topic: inquiry.topic,
          message: inquiry.message,
          dossierHash: state.dossierHash,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.mailtoUrl) {
          mailtoUrl = data.mailtoUrl;
        }
      }
    } catch {
      // Static Cloudflare deployment uses client-side Firestore + mailtoUrl seamlessly
    }

    return { mailtoUrl, recipientEmail };
  };

  const saveResumeAudit = (audit: ResumeAuditResult) => {
    setState((prev) => ({
      ...prev,
      lastResumeAudit: audit,
    }));
  };

  const resetDemoState = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(INITIAL_CANDIDATE_STATE);
  };

  return (
    <CareerContext.Provider
      value={{
        state,
        authUser,
        isAuthReady,
        isAuthModalOpen,
        authModalReason,
        openAuthModal,
        closeAuthModal,
        requireAuth,
        signInWithGoogle,
        signInWithStudioAccount,
        logoutUser,
        selectCompanyAndRole,
        updateProfile,
        toggleModuleComplete,
        markQuizPassed,
        saveProblemCode,
        recordProblemSolved,
        recordOAScorecard,
        recordHiringPacket,
        recordProjectReview,
        applyToJobFastTrack,
        moveJobKanbanStage,
        createFeedPost,
        togglePostUpvote,
        togglePostBookmark,
        requestPostReferral,
        addPostComment,
        submitInquiry,
        saveResumeAudit,
        resetDemoState,
      }}
    >
      {children}
    </CareerContext.Provider>
  );
};

export function useCareer(): CareerContextValue {
  const ctx = useContext(CareerContext);
  if (!ctx) {
    throw new Error('useCareer must be used within a CareerProvider');
  }
  return ctx;
}
