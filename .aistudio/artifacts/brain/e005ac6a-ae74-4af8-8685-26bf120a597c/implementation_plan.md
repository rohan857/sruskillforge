# SkillForge Lab — Clean UI Refactor, Customizable Profile, Company-Specific Email Desk & Project Report / PPT Suite

This update delivers a comprehensive **Project Report & 12-Slide PPT Blueprint** (both in chat and as an interactive, copy/print-ready view inside the web application) while completing the clean UI/UX overhaul, company-specific Email Desk for **Janken Corps** and **Hotburn Studios**, resilient Gmail/Google sign-in, and a customizable User Profile with profile picture, name, date of birth, interests, and bio.

## User Review & Critical Decisions

> [!IMPORTANT]
> All core preferences have been confirmed through your answers:

- **Confirmed Decision 1 (Project Summary & PPT Delivery)**: Deliver the complete Web Tech Lab project report and 12-slide presentation deck both directly in chat and as a dedicated **Project Report & PPT** view inside the app with one-click copy and print/PDF export.
- **Confirmed Decision 2 (Report & Presentation Scope)**: Include Abstract, Problem Statement, Objectives, Full Technology Stack (Frontend, Backend, Cloud Firestore Database, Gemini AI), System Architecture & Schema Diagrams, Security Rules overview, and a Slide-by-Slide 12-Slide PPT Outline with Conclusion.
- **Confirmed Decision 3 (Full UI, Auth, Email Desk & Profile Execution)**: Complete all requested functional and UI upgrades alongside the report view:
  - **Clean UI & Zero AI Slop**: Strip fake telemetry scoreboards (`Dossier Hash`, `Elo 1840`, `INVARIANT VERIFIED`), remove stacked pill-badge clutter, and replace roleplay jargon ("Candidate Dossier") with clean, real-world terminology (**My Profile**).
  - **Company-Specific Email Desk**: Remove the `"Both Companies"` toggle completely. Selecting **Janken Corps** displays strictly Cloud, Web Design, SQL/MongoDB, and Data Analytics query topics and templates; selecting **Hotburn Studios** displays strictly Game Dev, Blender 3D, Animation/Rigging, Gaea Terrain, Godot 4, and Story Direction query topics and templates (while routing all dispatches to `hotburnstudios@gmail.com`).
  - **Gmail / Google Sign-In Fix**: Configure explicit account selection (`prompt: 'select_account'`), fix stale closure state during Firebase Auth callbacks, and support seamless Gmail/email sign-in so users are never blocked by iframe popup restrictions.
  - **Customizable User Profile**: Add editable Profile Picture (preset studio avatars, local image upload with automatic client-side canvas compression, or custom URL), Full Name, Date of Birth (`dob`), Bio, interactive Interests tags, and active Company/Career Track, persisted to `localStorage` and Cloud Firestore (`users/{uid}` and PII-isolated `users/{uid}/private/info`).

---

## 1. Overview & Core Concept

- **What It Does**: **SkillForge Lab** is a full-stack Web Technology Career & Training Portal uniting two partner divisions:
  1. **Janken Corps** (Enterprise Tech & Data): *AWS Cloud Architecture*, *Web Designing & UI Engineering*, *Data Managing (SQL, MySQL Workbench, PostgreSQL, MongoDB)*, and *Data Analytics & BI*.
  2. **Hotburn Studios** (Game Development & 3D Art): *3D Modeller & Blender Artist*, *Character Animator & Rigger*, *World Designer & Gaea Terrain Artist*, *Environmental Artist*, *Technical Artist & Shader Engineer*, *Story Writer & Narrative Director*, and *Game Designer & Godot 4 Coder*.
- **Target Audience / Persona**: University students, software engineering trainees, and game development learners preparing for technical careers, as well as faculty evaluating the Web Technology Lab project report and presentation.
- **Key Value**: Lets learners browse tracks freely without forced login walls, authenticate only when starting a course or saving work, practice AI mock interviews and project reviews, apply to role-matched jobs, send company-tailored queries to `hotburnstudios@gmail.com`, customize their personal profile, and export a complete academic project report and PPT deck.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Frictionless Discovery & Clean Navigation**: Users land on a clean top bar (`SkillForge Lab`, concise single-line navigation links: `Home`, `Courses`, `Interview & Review`, `Jobs`, `Showcase`, `Email Desk`, `Report & PPT`, and a clean `Sign In` / `My Profile` button showing the user's custom avatar and name).
  2. **Company-Specific Email Desk**: Users choose either **Janken Corps** or **Hotburn Studios** (no "Both Companies" button). The topic dropdown, quick-fill channels, and message templates dynamically switch between Cloud/Web/SQL/Analytics queries (Janken Corps) and Blender/Rigging/Gaea/Godot/Game Dev queries (Hotburn Studios), routing dispatches to `hotburnstudios@gmail.com`.
  3. **Customizable User Profile Drawer**: Clicking the profile button opens a clean slide-over drawer where the user can upload or pick a profile picture, edit their Name, Handle, Date of Birth, Bio, select or add custom Interest tags, switch their active Company & Track, and run the AI Resume Bullet Helper.
  4. **Interactive Project Report & PPT Deck View**: Clicking `Report & PPT` opens a structured academic documentation and presentation workspace featuring copyable sections (Abstract, Problem Statement, Objectives, Full Tech Stack table, Architecture & Firestore ER diagrams, Module Breakdown, and a 12-Slide PPT Outline with speaker notes and a Print / Save as PDF action).
- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Warm architectural drafting studio paired with clean editorial hierarchy and high-contrast obsidian banners.
  - *Color Palette & Mood* (60-30-10 Discipline):
    - **60% Dominant Canvas**: Warm drafting parchment (`#f4f1ea`) with a subtle `24px` technical grid and crisp off-white card surfaces (`#faf8f5`).
    - **30% Structural Surfaces**: Warm stone containers (`#ebe6de`), hairline borders (`#e2ddd3`), and deep obsidian headers (`#0c0d0f`).
    - **10% Accent Budget**: Terracotta (`#c94c2d`, hover `#b33e20`) reserved strictly for primary CTAs, active tabs, and key focus states; emerald (`#059669`) paired with explicit text labels for completed modules and saved states.
  - *Typography & Hierarchy*: `Plus Jakarta Sans` for headings and body prose (`text-wrap: balance`, clean title-case headers without mechanical `//` prefixes) paired with `JetBrains Mono` (`tabular-nums`) strictly for code snippets, timestamps, and metrics.
  - *Component Styling & Layout*: Single-elevation cards (`border border-[#e2ddd3] rounded-xl`), unboxed inline metadata separated by `·`, and generous whitespace instead of nested card sandwiches.
- **Interactive Feedback & Motion**: Fast `150ms` hover and tab transitions, instant client-side filtering, clear inline form validation, and visual confirmation banners when saving profile updates or dispatching emails.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Strict PII Isolation for Date of Birth (`dob`) and Email in Cloud Firestore**
  - *Chosen Approach*: Store public profile customizations (`name`, `handle`, `avatarUrl`, `bio`, `interests`, `selectedCompany`, `targetRole`, completed modules) in `/users/{userId}` and isolate private PII (`email`, `dob`) in `/users/{userId}/private/info` with owner-only read/create/update security rules.
  - *Why*: Complies with Zero-Trust Firestore security best practices while allowing users to edit their Date of Birth and profile details seamlessly.
  - *Alternatives Considered*: Putting `dob` and `email` directly on a publicly readable profile document, which risks exposing PII if list/read rules are ever broadened.
- **Decision 2: Client-Side Canvas Image Compression for Custom Profile Pictures**
  - *Chosen Approach*: Support 6 curated studio SVG/portrait avatar presets, custom image URLs, and local image file uploads resized via an HTML5 `<canvas>` to a compact data URL (`<= 12 KB`), validated within Firestore field size limits.
  - *Why*: Lets users upload their own profile picture without exceeding Firestore's 1MB document limit or requiring external cloud storage buckets.
- **Decision 3: Dual-Mode Authentication (Google OAuth Popup + Direct Gmail/Email Account Login)**
  - *Chosen Approach*: Configure Firebase `GoogleAuthProvider` with `prompt: 'select_account'`, fix stale React state closures in `onAuthStateChanged`, and allow direct Gmail/Email sign-in in the same modal with pre-filled defaults if browser iframe security blocks third-party popups.
  - *Why*: Guarantees the user can always log in with their Gmail account (`bandirohan43@gmail.com` or any address) in both standalone windows and embedded preview iframes.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:
```
┌───────────────────────────────────────────────────────────────────────────────┐
│                        SKILLFORGE LAB — CLIENT SPA (React 19 + Vite)          │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐  │
│  │ Navbar (3-Zone Top Bar: Brand · Clean Nav Links · User Avatar/Profile)  │  │
│  └──────┬───────────┬────────────┬───────────┬───────────┬──────────┬──────┘  │
│         │           │            │           │           │          │         │
│         ▼           ▼            ▼           ▼           ▼          ▼         │
│     ┌───────┐  ┌─────────┐  ┌──────────┐ ┌───────┐ ┌──────────┐ ┌──────────┐  │
│     │ Home  │  │ Courses │  │Interview │ │ Jobs  │ │Email Desk│ │Report &  │  │
│     │ Hero  │  │Catalogue│  │& Project │ │& Role │ │(Janken / │ │PPT Deck  │  │
│     │& Track│  │& Player │  │Review AI │ │Kanban │ │ Hotburn) │ │Generator │  │
│     └───┬───┘  └────┬────┘  └────┬─────┘ └───┬───┘ └────┬─────┘ └──────────┘  │
│         └───────────┴────────────┼───────────┴──────────┘                     │
│                                  ▼                                            │
│  ┌─────────────────────────────────────────────────────────────────────────┐  │
│  │ CareerContext Store (React Context + localStorage + Firestore Sync)     │  │
│  │  • AuthModal (Google Popup OAuth + Direct Gmail/Email Account Login)    │  │
│  │  • UserProfileModal (Avatar Upload/Presets, Name, DOB, Interests, Bio)  │  │
│  └───────────────────────────────┬──────────────────────┬──────────────────┘  │
└──────────────────────────────────┼──────────────────────┼─────────────────────┘
                                   │                      │
        ┌──────────────────────────┘                      └───────────────────┐
        ▼                                                                     ▼
┌──────────────────────────────────────────┐        ┌────────────────────────────────────────┐
│ Firebase BaaS (Auth + Cloud Firestore)   │        │ Express API Server (server.ts)         │
│  • /users/{uid} (Profile, Avatar, Bio,   │        │  • POST /api/email/send-query          │
│    Interests, Track, Course Progress)    │        │    (Nodemailer SMTP + mailto fallback  │
│  • /users/{uid}/private/info (PII:       │        │     to hotburnstudios@gmail.com)       │
│    Email, Date of Birth)                 │        │  • POST /api/gemini/*                  │
│  • /inquiries/{inquiryId} (Email Log)    │        │    (@google/genai Server-Side Proxy)   │
└──────────────────────────────────────────┘        └────────────────────────────────────────┘
```

- **Data Model & State**:
  - `UserProfile` (`/users/{userId}`): `uid`, `name`, `handle`, `avatarUrl` (max 15,000 chars), `bio` (max 500 chars), `interests` (comma-separated string, max 600 chars), `selectedCompany` (`JANKEN CORPS` | `HOTBURN STUDIOS`), `targetRole`, `eloRating`, `globalReadinessScore`, `xp`, `dossierHash`, `completedModuleIds`, `passedQuizIds`, `createdAt`, `updatedAt`.
  - `UserPrivateInfo` (`/users/{userId}/private/info`): `uid`, `email` (max 254 chars), `dob` (YYYY-MM-DD or empty string, max 20 chars), `createdAt`, `updatedAt`.
  - `EmailInquiry` (`/inquiries/{inquiryId}`): `uid`, `company` (`JANKEN CORPS` | `HOTBURN STUDIOS`), `recipientEmail` (`hotburnstudios@gmail.com`), `senderName`, `senderEmail`, `topic`, `message`, `dossierHash`, `status`, `createdAt`.
- **Interactive Component & State Mapping**:
  - **Company Switcher in Email Desk**: Toggling between `JANKEN CORPS` and `HOTBURN STUDIOS` updates `companyScope`, resets the selected topic to the first track topic of that company, filters the quick-fill channel cards to show only that company's channels, and updates form placeholders.
  - **Customizable Profile Drawer**: Selecting a preset avatar or uploading a local photo updates `avatarUrl` preview immediately; adding/toggling interest chips updates `interests: string[]`; editing `name`, `handle`, `dob`, `bio`, `email`, `selectedCompany`, and `targetRole` and clicking **Save Profile Changes** updates `CareerContext`, persists to `localStorage`, and syncs to Firestore (`/users/{uid}` and `/users/{uid}/private/info`).
  - **Project Report & PPT View**: Provides interactive tabs to switch between the **Full Lab Report** (Abstract, Problem Statement, Objectives, Full Tech Stack, System Architecture, Database Schema, Conclusion) and the **12-Slide PPT Presentation Outline**, with working **Copy Full Markdown** and **Print / Export PDF** actions.
