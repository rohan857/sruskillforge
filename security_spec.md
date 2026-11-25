# Phase 0: Payload-First Security TDD Specification (`security_spec.md`)

## 1. Data Invariants
1. **Global Default-Deny**: Every path not explicitly matched in `firestore.rules` is unconditionally denied (`allow read, write: if false;`).
2. **Verified Identity**: All writes require `isSignedIn()` and `request.auth.token.email_verified == true`.
3. **Owner-Only Profile & PII Isolation**:
   - `/users/{userId}` can only be read, created, or updated by `request.auth.uid == userId` with a valid `isValidId(userId)`.
   - PII (`email`) is strictly isolated in `/users/{userId}/private/{docId}` (`docId == 'info'`) and is readable/writable ONLY by the owner (`request.auth.uid == userId`) where `exists(/databases/$(database)/documents/users/$(userId))`.
4. **Email Inquiry Integrity (`/inquiries/{inquiryId}`)**:
   - Every inquiry must be authored by the signed-in user (`incoming().uid == request.auth.uid`), reference an existing `/users/$(request.auth.uid)` profile, and strictly route to `recipientEmail == 'hotburnstudios@gmail.com'`.
   - Inquiries are append-only (`allow update, delete: if false;`), locking terminal status `'SENT_TO_HOTBURNSTUDIOS_GMAIL'`.
5. **Temporal Integrity**: `createdAt` must equal `request.time` on creation and remain immutable on updates; `updatedAt` must equal `request.time` on updates.

## 2. The "Dirty Dozen" Payloads (All Must Return `PERMISSION_DENIED`)
1. **Unauthenticated Profile Creation**: Creating `/users/user_1` with `auth == null`.
2. **Unverified Email Token Spoof**: Creating `/users/user_1` with `email_verified: false`.
3. **Cross-User Profile Hijack (Identity Spoofing)**: `user_2` attempting to create `/users/user_1` or set `uid: 'user_2'` inside `/users/user_1`.
4. **Shadow Field Injection on Profile Create**: Adding `"isAdmin": true` to `/users/user_1`.
5. **Oversized String Denial-of-Wallet**: Setting `name` to a 5,000-character string in `/users/user_1`.
6. **Invalid Company Enum**: Setting `selectedCompany: "UNKNOWN_CORP"` in `/users/user_1`.
7. **Timestamp Forgery on Create**: Setting `createdAt` to a past timestamp instead of `request.time`.
8. **Immutable Field Mutation on Update**: Attempting to mutate `uid` or `createdAt` during an update to `/users/user_1`.
9. **Unauthorized PII Read (Cross-User)**: `user_2` attempting `get` on `/users/user_1/private/info`.
10. **Orphaned Inquiry Creation**: `user_no_profile` attempting to create `/inquiries/inq_1` without an existing `/users/user_no_profile` document.
11. **Recipient Email Tampering**: Attempting to create `/inquiries/inq_1` with `recipientEmail: "attacker@evil.com"` instead of `"hotburnstudios@gmail.com"`.
12. **Terminal Inquiry Mutation**: Attempting to `update` or `delete` an existing `/inquiries/inq_1` document.
