import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  getDocFromServer,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { CandidateProfileState, PartnerCompany } from './types';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validate connection to Firestore on boot
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
testConnection();

export async function signInWithGooglePopup() {
  return signInWithPopup(auth, googleProvider);
}

export async function signOutFirebaseUser() {
  return signOut(auth);
}

// Defensive sanitization matching firebase-blueprint.json limits
function sanitizeString(val: string, min: number, max: number, fallback: string): string {
  const trimmed = (val || '').trim();
  if (trimmed.length < min) return fallback.slice(0, max);
  return trimmed.slice(0, max);
}

export async function ensureAndSyncUserProfileInFirestore(
  uid: string,
  email: string,
  state: CandidateProfileState
): Promise<Partial<CandidateProfileState> | null> {
  if (!auth.currentUser || auth.currentUser.uid !== uid || !auth.currentUser.emailVerified) {
    return null;
  }

  const userDocPath = `users/${uid}`;
  const userRef = doc(db, 'users', uid);

  try {
    const snap = await getDoc(userRef);
    const safeName = sanitizeString(state.name, 1, 100, 'Candidate');
    const safeHandle = sanitizeString(state.handle, 1, 60, '@candidate');
    const safeCompany: PartnerCompany =
      state.selectedCompany === 'HOTBURN STUDIOS' ? 'HOTBURN STUDIOS' : 'JANKEN CORPS';
    const safeRole = sanitizeString(
      state.targetRole,
      2,
      120,
      'AWS Cloud Solutions Architect'
    );
    const safeDossier = sanitizeString(state.dossierHash, 4, 64, 'JC-9921-V4');
    const safeModules = state.completedModuleIds.join(',').slice(0, 2000);
    const safeQuizzes = state.passedQuizIds.join(',').slice(0, 2000);

    if (!snap.exists()) {
      await setDoc(userRef, {
        uid,
        name: safeName,
        handle: safeHandle,
        selectedCompany: safeCompany,
        targetRole: safeRole,
        eloRating: Math.max(0, Math.min(5000, Math.round(state.eloRating))),
        globalReadinessScore: Math.max(
          0,
          Math.min(100, Math.round(state.globalReadinessScore))
        ),
        xp: Math.max(0, Math.min(1000000, Math.round(state.xp))),
        dossierHash: safeDossier,
        completedModuleIds: safeModules,
        passedQuizIds: safeQuizzes,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // Store isolated PII email if valid
      if (email && email.length >= 3) {
        const privateRef = doc(db, 'users', uid, 'private', 'info');
        try {
          const privSnap = await getDoc(privateRef);
          if (!privSnap.exists()) {
            await setDoc(privateRef, {
              uid,
              email: email.slice(0, 254),
              createdAt: serverTimestamp(),
            });
          }
        } catch (privErr) {
          handleFirestoreError(privErr, OperationType.WRITE, `${userDocPath}/private/info`);
        }
      }
      return null;
    } else {
      const data = snap.data();
      return {
        name: typeof data.name === 'string' ? data.name : state.name,
        handle: typeof data.handle === 'string' ? data.handle : state.handle,
        selectedCompany:
          data.selectedCompany === 'HOTBURN STUDIOS' ? 'HOTBURN STUDIOS' : 'JANKEN CORPS',
        targetRole: (data.targetRole as CandidateProfileState['targetRole']) || state.targetRole,
        eloRating: typeof data.eloRating === 'number' ? data.eloRating : state.eloRating,
        globalReadinessScore:
          typeof data.globalReadinessScore === 'number'
            ? data.globalReadinessScore
            : state.globalReadinessScore,
        xp: typeof data.xp === 'number' ? data.xp : state.xp,
        dossierHash: typeof data.dossierHash === 'string' ? data.dossierHash : state.dossierHash,
        completedModuleIds:
          typeof data.completedModuleIds === 'string' && data.completedModuleIds.length > 0
            ? data.completedModuleIds.split(',').filter(Boolean)
            : state.completedModuleIds,
        passedQuizIds:
          typeof data.passedQuizIds === 'string' && data.passedQuizIds.length > 0
            ? data.passedQuizIds.split(',').filter(Boolean)
            : state.passedQuizIds,
      };
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, userDocPath);
  }
}

export async function pushProfileUpdateToFirestore(
  uid: string,
  state: CandidateProfileState
): Promise<void> {
  if (!auth.currentUser || auth.currentUser.uid !== uid || !auth.currentUser.emailVerified) {
    return;
  }
  const userDocPath = `users/${uid}`;
  const userRef = doc(db, 'users', uid);

  try {
    await updateDoc(userRef, {
      name: sanitizeString(state.name, 1, 100, 'Candidate'),
      handle: sanitizeString(state.handle, 1, 60, '@candidate'),
      selectedCompany:
        state.selectedCompany === 'HOTBURN STUDIOS' ? 'HOTBURN STUDIOS' : 'JANKEN CORPS',
      targetRole: sanitizeString(state.targetRole, 2, 120, 'AWS Cloud Solutions Architect'),
      eloRating: Math.max(0, Math.min(5000, Math.round(state.eloRating))),
      globalReadinessScore: Math.max(
        0,
        Math.min(100, Math.round(state.globalReadinessScore))
      ),
      xp: Math.max(0, Math.min(1000000, Math.round(state.xp))),
      dossierHash: sanitizeString(state.dossierHash, 4, 64, 'JC-9921-V4'),
      completedModuleIds: state.completedModuleIds.join(',').slice(0, 2000),
      passedQuizIds: state.passedQuizIds.join(',').slice(0, 2000),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, userDocPath);
  }
}

export async function saveEmailInquiryToFirestore(params: {
  inquiryId: string;
  uid: string;
  company: PartnerCompany;
  senderName: string;
  senderEmail: string;
  topic: string;
  message: string;
  dossierHash: string;
}): Promise<void> {
  if (
    !auth.currentUser ||
    auth.currentUser.uid !== params.uid ||
    !auth.currentUser.emailVerified
  ) {
    return;
  }
  const safeId = params.inquiryId.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 120) || `inq-${Date.now()}`;
  const path = `inquiries/${safeId}`;
  try {
    await setDoc(doc(db, 'inquiries', safeId), {
      uid: params.uid,
      company: params.company === 'HOTBURN STUDIOS' ? 'HOTBURN STUDIOS' : 'JANKEN CORPS',
      recipientEmail: 'hotburnstudios@gmail.com',
      senderName: sanitizeString(params.senderName, 1, 100, 'Candidate'),
      senderEmail: sanitizeString(params.senderEmail, 3, 254, 'candidate@example.com'),
      topic: sanitizeString(params.topic, 2, 200, 'Career & Course Inquiry'),
      message: sanitizeString(params.message, 2, 4000, 'Inquiry submitted.'),
      dossierHash: sanitizeString(params.dossierHash, 2, 64, 'JC-9921'),
      status: 'SENT_TO_HOTBURNSTUDIOS_GMAIL',
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}
