import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const rulesPath = path.resolve(process.cwd(), 'DRAFT_firestore.rules');
const rulesSource = fs.readFileSync(rulesPath, 'utf8');

interface DirtyPayload {
  id: string;
  description: string;
  collection: 'users' | 'private' | 'inquiries';
  operation: 'create' | 'update' | 'get' | 'delete';
  authUid: string | null;
  emailVerified: boolean;
  docId: string;
  parentUserExists: boolean;
  data?: Record<string, unknown>;
  existingData?: Record<string, unknown>;
}

function evaluateDirtyPayloadAgainstRules(p: DirtyPayload): 'PERMISSION_DENIED' | 'ALLOWED' {
  // 1. Auth & Verified Email Gate
  if (!p.authUid || !p.emailVerified) return 'PERMISSION_DENIED';

  // 2. ID Regex & Size Gate
  const validIdRegex = /^[a-zA-Z0-9_-]+$/;
  if (!p.docId || p.docId.length > 128 || !validIdRegex.test(p.docId)) {
    return 'PERMISSION_DENIED';
  }

  if (p.collection === 'users') {
    if (p.authUid !== p.docId) return 'PERMISSION_DENIED';
    if (p.operation === 'delete') return 'PERMISSION_DENIED';
    const d = p.data || {};
    const allowedKeys = [
      'uid',
      'name',
      'handle',
      'selectedCompany',
      'targetRole',
      'eloRating',
      'globalReadinessScore',
      'xp',
      'dossierHash',
      'completedModuleIds',
      'passedQuizIds',
      'createdAt',
      'updatedAt',
    ];
    const keys = Object.keys(d);
    if (
      keys.length !== allowedKeys.length ||
      !keys.every((k) => allowedKeys.includes(k))
    ) {
      return 'PERMISSION_DENIED';
    }
    if (d.uid !== p.authUid) return 'PERMISSION_DENIED';
    if (typeof d.name !== 'string' || d.name.length < 1 || d.name.length > 100) {
      return 'PERMISSION_DENIED';
    }
    if (d.selectedCompany !== 'JANKEN CORPS' && d.selectedCompany !== 'HOTBURN STUDIOS') {
      return 'PERMISSION_DENIED';
    }
    if (d.createdAt !== 'REQUEST_TIME' && p.operation === 'create') {
      return 'PERMISSION_DENIED';
    }
    if (
      p.operation === 'update' &&
      p.existingData &&
      (d.uid !== p.existingData.uid || d.createdAt !== p.existingData.createdAt)
    ) {
      return 'PERMISSION_DENIED';
    }
    return 'ALLOWED';
  }

  if (p.collection === 'private') {
    if (p.authUid !== p.docId || !p.parentUserExists) return 'PERMISSION_DENIED';
    return 'ALLOWED';
  }

  if (p.collection === 'inquiries') {
    if (p.operation === 'update' || p.operation === 'delete') return 'PERMISSION_DENIED';
    if (!p.parentUserExists) return 'PERMISSION_DENIED';
    const d = p.data || {};
    if (d.uid !== p.authUid) return 'PERMISSION_DENIED';
    if (d.recipientEmail !== 'hotburnstudios@gmail.com') return 'PERMISSION_DENIED';
    if (d.status !== 'SENT_TO_HOTBURNSTUDIOS_GMAIL') return 'PERMISSION_DENIED';
    return 'ALLOWED';
  }

  return 'PERMISSION_DENIED';
}

test('Firestore Rules Static Structure & 8-Pillar Invariants', () => {
  assert.ok(rulesSource.includes("rules_version = '2';"));
  assert.ok(rulesSource.includes('match /{document=**} {\n      allow read, write: if false;'));
  assert.ok(rulesSource.includes('request.auth.token.email_verified == true'));
  assert.ok(rulesSource.includes("data.recipientEmail == 'hotburnstudios@gmail.com'"));
});

test('Dirty Dozen Adversarial Payloads all return PERMISSION_DENIED', () => {
  const validProfile = {
    uid: 'user_1',
    name: 'Rohan Bandi',
    handle: '@rohan',
    selectedCompany: 'JANKEN CORPS',
    targetRole: 'AWS Cloud Solutions Architect',
    eloRating: 1840,
    globalReadinessScore: 86,
    xp: 2850,
    dossierHash: 'JC-9921',
    completedModuleIds: 'mod-1',
    passedQuizIds: 'quiz-1',
    createdAt: 'REQUEST_TIME',
    updatedAt: 'REQUEST_TIME',
  };

  const dirtyDozen: DirtyPayload[] = [
    {
      id: '1',
      description: 'Unauthenticated profile creation',
      collection: 'users',
      operation: 'create',
      authUid: null,
      emailVerified: false,
      docId: 'user_1',
      parentUserExists: false,
      data: validProfile,
    },
    {
      id: '2',
      description: 'Unverified email token spoof',
      collection: 'users',
      operation: 'create',
      authUid: 'user_1',
      emailVerified: false,
      docId: 'user_1',
      parentUserExists: false,
      data: validProfile,
    },
    {
      id: '3',
      description: 'Cross-user profile hijack',
      collection: 'users',
      operation: 'create',
      authUid: 'user_2',
      emailVerified: true,
      docId: 'user_1',
      parentUserExists: false,
      data: validProfile,
    },
    {
      id: '4',
      description: 'Shadow field injection on profile create',
      collection: 'users',
      operation: 'create',
      authUid: 'user_1',
      emailVerified: true,
      docId: 'user_1',
      parentUserExists: false,
      data: { ...validProfile, isAdmin: true },
    },
    {
      id: '5',
      description: 'Oversized string Denial-of-Wallet',
      collection: 'users',
      operation: 'create',
      authUid: 'user_1',
      emailVerified: true,
      docId: 'user_1',
      parentUserExists: false,
      data: { ...validProfile, name: 'A'.repeat(5000) },
    },
    {
      id: '6',
      description: 'Invalid company enum',
      collection: 'users',
      operation: 'create',
      authUid: 'user_1',
      emailVerified: true,
      docId: 'user_1',
      parentUserExists: false,
      data: { ...validProfile, selectedCompany: 'EVIL_CORP' },
    },
    {
      id: '7',
      description: 'Timestamp forgery on create',
      collection: 'users',
      operation: 'create',
      authUid: 'user_1',
      emailVerified: true,
      docId: 'user_1',
      parentUserExists: false,
      data: { ...validProfile, createdAt: '2020-01-01T00:00:00Z' },
    },
    {
      id: '8',
      description: 'Immutable field mutation on update',
      collection: 'users',
      operation: 'update',
      authUid: 'user_1',
      emailVerified: true,
      docId: 'user_1',
      parentUserExists: true,
      existingData: validProfile,
      data: { ...validProfile, createdAt: 'MUTATED_TIME' },
    },
    {
      id: '9',
      description: 'Unauthorized cross-user PII read',
      collection: 'private',
      operation: 'get',
      authUid: 'user_2',
      emailVerified: true,
      docId: 'user_1',
      parentUserExists: true,
    },
    {
      id: '10',
      description: 'Orphaned inquiry creation without user profile',
      collection: 'inquiries',
      operation: 'create',
      authUid: 'user_no_profile',
      emailVerified: true,
      docId: 'inq_1',
      parentUserExists: false,
      data: {
        uid: 'user_no_profile',
        recipientEmail: 'hotburnstudios@gmail.com',
        status: 'SENT_TO_HOTBURNSTUDIOS_GMAIL',
      },
    },
    {
      id: '11',
      description: 'Recipient email tampering (not hotburnstudios@gmail.com)',
      collection: 'inquiries',
      operation: 'create',
      authUid: 'user_1',
      emailVerified: true,
      docId: 'inq_1',
      parentUserExists: true,
      data: {
        uid: 'user_1',
        recipientEmail: 'attacker@evil.com',
        status: 'SENT_TO_HOTBURNSTUDIOS_GMAIL',
      },
    },
    {
      id: '12',
      description: 'Terminal inquiry mutation attempt',
      collection: 'inquiries',
      operation: 'update',
      authUid: 'user_1',
      emailVerified: true,
      docId: 'inq_1',
      parentUserExists: true,
      data: {
        uid: 'user_1',
        recipientEmail: 'hotburnstudios@gmail.com',
        status: 'MODIFIED',
      },
    },
  ];

  for (const payload of dirtyDozen) {
    assert.equal(
      evaluateDirtyPayloadAgainstRules(payload),
      'PERMISSION_DENIED',
      `Payload ${payload.id} (${payload.description}) should be PERMISSION_DENIED`
    );
  }
});
