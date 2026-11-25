export type NavTab =
  | 'Home'
  | 'Catalogue'
  | 'AI Interview'
  | 'Job Board'
  | 'Network'
  | 'Contact';

export type PartnerCompany = 'JANKEN CORPS' | 'HOTBURN STUDIOS';
export type CompanyFilter = 'ALL' | PartnerCompany;

export interface AuthUserSummary {
  uid: string;
  email: string;
  displayName: string;
  provider: 'google' | 'studio';
  emailVerified: boolean;
}

export type CatalogueCategory =
  | 'ALL'
  | 'AWS CLOUD'
  | 'WEB DESIGNING'
  | 'DATA MANAGING (SQL / MONGODB)'
  | 'DATA ANALYTICS'
  | 'BLENDER & 3D MODELLING'
  | 'ANIMATION & RIGGING'
  | 'WORLD DESIGN, GAEA & ENV ART'
  | 'GODOT, TECH ART & STORY';

export interface CareerTrackOption {
  id: string;
  company: PartnerCompany;
  title: InterviewRole;
  category: Exclude<CatalogueCategory, 'ALL'>;
  tools: string[];
  roadmapSummary: string;
}

export interface TradeOffRow {
  dimension: string;
  chosenApproach: string;
  alternative: string;
  verdict: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  xpReward: number;
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  summary: string;
  architectureDiagram: string;
  codeSnippet: {
    language: string;
    filename: string;
    code: string;
  };
  tradeOffs: TradeOffRow[];
  quiz: QuizQuestion;
}

export interface CatalogueItem {
  id: string;
  company: PartnerCompany;
  title: string;
  category: Exclude<CatalogueCategory, 'ALL'>;
  categorySubLabel: string;
  statusBadge: 'LIVE TRACK' | 'PROCTORED' | 'VERIFIED' | 'FINISHED' | 'STUDIO KIT';
  difficulty: 'Staff / Lead' | 'Senior / L5' | 'Mid-Level / L4' | 'Junior / Grad';
  duration: string;
  xpTotal: number;
  description: string;
  thumbnailUrl: string;
  accentPattern: 'distributed' | 'algorithmic' | 'architecture' | 'horizon';
  skillsCovered: string[];
  modules: CourseModule[];
}

export type ProgrammingLanguage = 'typescript' | 'python' | 'cpp' | 'java';

export interface CodeTestCase {
  id: string;
  input: string;
  expectedOutput: string;
  explanation?: string;
  isHidden?: boolean;
}

export interface CodingProblem {
  id: string;
  company: PartnerCompany;
  slug: string;
  title: string;
  difficulty: 'Medium' | 'Hard' | 'Lead Bar-Raiser';
  category: string;
  companies: string[];
  acceptanceRate: string;
  timeLimitMs: number;
  memoryLimitMb: number;
  description: string;
  inputSpec: string;
  outputSpec: string;
  constraints: string[];
  hints: string[];
  optimalTimeComplexity: string;
  optimalSpaceComplexity: string;
  starterCode: Record<ProgrammingLanguage, string>;
  solutionKeyTokens: string[];
  testCases: CodeTestCase[];
}

export interface CodeAuditReport {
  timeComplexity: string;
  spaceComplexity: string;
  optimalityScore: number;
  edgeCasesCaught: string[];
  refactoringSuggestions: string[];
  summaryVerdict: string;
  verifiedAt: string;
}

export interface ProctoredOAQuestion {
  id: string;
  section:
    | 'AWS Cloud & Web'
    | 'SQL Workbench & MongoDB'
    | 'Data Analytics'
    | 'Godot, Blender & Gaea';
  prompt: string;
  codeContext?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  points: number;
}

export interface ProctoredOASuite {
  id: string;
  company: PartnerCompany;
  title: string;
  subtitle: string;
  durationMinutes: number;
  statusBadge: 'PROCTORED' | 'LIVE SPRINT' | 'VERIFIED';
  difficulty: string;
  targetRoles: string[];
  description: string;
  thumbnailUrl: string;
  questions: ProctoredOAQuestion[];
}

export interface OAScorecard {
  suiteId: string;
  suiteTitle: string;
  completedAt: string;
  scorePercent: number;
  pointsEarned: number;
  totalPoints: number;
  timeSpentSeconds: number;
  tabSwitchesUsed: number;
  topicBreakdown: {
    topic: string;
    accuracy: number;
  }[];
  weakTopics: string[];
  eloDelta: number;
}

export type InterviewRole =
  // JANKEN CORPS Career Tracks
  | 'AWS Cloud Solutions Architect'
  | 'Web Designing & Frontend UI Engineer'
  | 'Data Managing (SQL Workbench & MongoDB)'
  | 'Data Analytics & BI Engineer'
  // HOTBURN STUDIOS Career Tracks
  | '3D Modeller & Blender Artist'
  | 'Character Animator & Rigger'
  | 'Technical Artist & Shader Engineer'
  | 'World Designer & Gaea Terrain Artist'
  | 'Environmental Artist (3D Worlds)'
  | 'Story Writer & Narrative Director'
  | 'Game Designer & Godot Coder';

export type InterviewMode =
  | 'Technical & Practical Probe'
  | 'Architecture & Pipeline Design'
  | 'Portfolio & Production Scenario';

export type InterviewPersona =
  | 'Strict Bar-Raiser'
  | 'Collaborative Lead / Art Director'
  | 'Executive Studio Hiring Manager';

export interface InterviewMessage {
  id: string;
  sender: 'interviewer' | 'candidate';
  senderLabel: string;
  text: string;
  timestamp: string;
  detectedSignal?: string;
}

export interface InterviewRubric {
  problemSolving: number;
  technicalDepth: number;
  codeCleanliness: number;
  communicationClarity: number;
}

export interface HiringCommitteePacket {
  id: string;
  company: PartnerCompany;
  role: InterviewRole;
  mode: InterviewMode;
  persona: InterviewPersona;
  createdAt: string;
  decision: 'STRONG HIRE' | 'LEAN HIRE' | 'NO HIRE';
  overallScore: number;
  recommendedLevel: string;
  executiveSummary: string;
  strengths: string[];
  gaps: string[];
  rubric: InterviewRubric;
}

export interface ProjectReviewReport {
  id: string;
  company: PartnerCompany;
  careerTrack: InterviewRole;
  projectTitle: string;
  toolsUsed: string;
  submittedAt: string;
  score: number;
  verdict: 'PRODUCTION READY' | 'STRONG PROTOTYPE' | 'NEEDS OPTIMIZATION';
  architectureCritique: string;
  strengths: string[];
  improvements: string[];
}

export type KanbanStage =
  | 'Bookmarked'
  | 'Dossier Sent'
  | 'OA Cleared'
  | 'Technical Loop'
  | 'Offer Extended';

export interface JobPosting {
  id: string;
  company: PartnerCompany;
  division: string;
  roleTitle: string;
  location: string;
  workMode:
    | 'Remote'
    | 'Hybrid · Bengaluru'
    | 'Hybrid · San Francisco'
    | 'Hybrid · Tokyo / Remote'
    | 'Remote · Global';
  compensationINR: string;
  compensationUSD: string;
  statusBadge: 'HIRING NOW' | 'VERIFIED PARTNER' | 'DIRECT FAST-TRACK';
  categorySubLabel: string;
  minBenchmarkScore: number;
  requiredSkills: string[];
  requiredCourseIds: string[];
  requiredProblemIds: string[];
  description: string;
  architectureChallenge: string;
  thumbnailUrl: string;
  hiringManager: string;
}

export type FeedCategory =
  | 'All Signals'
  | 'Cloud, Web & SQL Breakdowns'
  | 'Game Dev, Godot & 3D Showcases'
  | 'Project Reviews & Post-Mortems'
  | 'Open Referral Drops';

export interface FeedComment {
  id: string;
  author: string;
  authorRole: string;
  text: string;
  timestamp: string;
}

export interface FeedPost {
  id: string;
  company: PartnerCompany;
  author: string;
  authorRole: string;
  authorElo: number;
  verifiedBadge: string;
  category: Exclude<FeedCategory, 'All Signals'>;
  title: string;
  body: string;
  codeSnippet?: string;
  timestamp: string;
  upvotes: number;
  upvotedByMe: boolean;
  bookmarkedByMe: boolean;
  referralRequestedByMe: boolean;
  comments: FeedComment[];
}

export interface InquirySubmission {
  id: string;
  company: PartnerCompany;
  recipientEmail: 'hotburnstudios@gmail.com';
  name: string;
  email: string;
  topic: string;
  message: string;
  dossierHash: string;
  submittedAt: string;
  status: 'SENT TO hotburnstudios@gmail.com' | 'ROUTED TO HIRING DESK';
}

export interface ResumeAuditResult {
  impactScoreBefore: number;
  impactScoreAfter: number;
  optimizedBullets: string[];
  critiqueSummary: string;
  injectedKeywords: string[];
  auditedAt: string;
}

export interface CandidateProfileState {
  name: string;
  handle: string;
  email: string;
  selectedCompany: PartnerCompany;
  targetRole: InterviewRole;
  eloRating: number;
  globalReadinessScore: number;
  xp: number;
  dossierHash: string;
  completedModuleIds: string[];
  passedQuizIds: string[];
  solvedProblemIds: string[];
  savedCodeByProblem: Record<string, Record<ProgrammingLanguage, string>>;
  codeAuditsByProblem: Record<string, CodeAuditReport>;
  oaScorecards: OAScorecard[];
  hiringPackets: HiringCommitteePacket[];
  projectReviews: ProjectReviewReport[];
  jobKanbanByJobId: Record<string, KanbanStage>;
  jobApplicationHashes: Record<string, string>;
  feedPosts: FeedPost[];
  inquiries: InquirySubmission[];
  lastResumeAudit: ResumeAuditResult | null;
}
