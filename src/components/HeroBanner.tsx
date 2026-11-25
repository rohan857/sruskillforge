import React from 'react';
import {
  ArrowRight,
  Briefcase,
  Flame,
  Gamepad2,
  Cloud,
  Sparkles,
  Mail,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import { CatalogueItem, InterviewRole, NavTab, PartnerCompany } from '../types';
import {
  CAREER_TRACK_OPTIONS,
  CATALOGUE_ITEMS,
  HERO_HOTBURN_URL,
  HERO_JANKEN_URL,
  JOB_POSTINGS,
} from '../seedData';
import { useCareer } from '../context/CareerContext';
import { calculateCourseCompletion, calculateJobReadinessMatch } from '../utils/careerEngine';

interface HeroBannerProps {
  onNavigate: (tab: NavTab) => void;
  onOpenCourse: (item: CatalogueItem) => void;
  onOpenDossier: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onNavigate,
  onOpenCourse,
  onOpenDossier,
}) => {
  const { state, authUser, requireAuth, selectCompanyAndRole } = useCareer();

  const isHotburn = state.selectedCompany === 'HOTBURN STUDIOS';
  const heroBgUrl = isHotburn ? HERO_HOTBURN_URL : HERO_JANKEN_URL;

  const companyTracks = CAREER_TRACK_OPTIONS.filter(
    (t) => t.company === state.selectedCompany
  );
  const activeTrackInfo =
    CAREER_TRACK_OPTIONS.find((t) => t.title === state.targetRole) || companyTracks[0];

  const companyCourses = CATALOGUE_ITEMS.filter(
    (c) => c.company === state.selectedCompany
  );
  const companyJobs = JOB_POSTINGS.filter((j) => j.company === state.selectedCompany);

  const handleSelectCompany = (company: PartnerCompany) => {
    selectCompanyAndRole(company);
  };

  const handleSelectCareerTrack = (roleTitle: InterviewRole, company: PartnerCompany) => {
    selectCompanyAndRole(company, roleTitle);
  };

  const handleStartCourseClick = (item: CatalogueItem) => {
    requireAuth(
      `Sign in or create a free account to start "${item.title}" and save your completed modules to the database.`,
      () => onOpenCourse(item)
    );
  };

  return (
    <div>
      {/* Full-Bleed Atmospheric Hero Banner */}
      <section className="min-h-[540px] relative flex flex-col justify-end p-6 sm:p-8 lg:p-16 overflow-hidden bg-[#0c0d0f] border-b border-neutral-800">
        {/* Background Artwork */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#1b1412] via-[#0f1115] to-[#0c0d0f]"
          aria-hidden="true"
        >
          <img
            src={heroBgUrl}
            alt={`${state.selectedCompany} Career & Training Studio`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-80 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0f] via-[#0c0d0f]/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d0f]/90 via-[#0c0d0f]/40 to-transparent" />
        </div>

        {/* Top Partner Company Selector Strip Inside Hero */}
        <div className="relative z-10 mb-auto pt-2 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex flex-wrap items-center gap-2 bg-[#141518]/90 backdrop-blur-md border border-white/15 p-1.5 rounded-xl">
            <button
              type="button"
              onClick={() => handleSelectCompany('JANKEN CORPS')}
              className={`px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition ${
                state.selectedCompany === 'JANKEN CORPS'
                  ? 'bg-[#c94c2d] text-white shadow-sm'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <Cloud className="w-3.5 h-3.5" />
              <span>1. JANKEN CORPS (Cloud · Web · SQL/Mongo · Analytics)</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectCompany('HOTBURN STUDIOS')}
              className={`px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition ${
                state.selectedCompany === 'HOTBURN STUDIOS'
                  ? 'bg-[#c94c2d] text-white shadow-sm'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>2. HOTBURN STUDIOS (3D · Rigging · Gaea · Godot · Story)</span>
            </button>
          </div>

          <span className="font-mono text-xs text-neutral-300 bg-[#141518]/85 border border-white/10 px-3.5 py-2 rounded-lg">
            ACTIVE CAREER: <strong className="text-white">{state.targetRole}</strong>
          </span>
        </div>

        {/* Middle-Left Emblem Lockup */}
        <div className="relative z-10 my-8 flex items-center gap-4 select-none">
          <div className="w-16 h-16 rounded-2xl bg-[#141518]/80 backdrop-blur-md border border-[#c94c2d]/50 flex items-center justify-center shadow-2xl">
            {isHotburn ? (
              <Gamepad2 className="w-8 h-8 text-[#c94c2d]" />
            ) : (
              <Flame className="w-8 h-8 text-[#c94c2d]" />
            )}
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-[0.18em] uppercase bg-gradient-to-r from-white/95 via-neutral-200/85 to-neutral-400/65 bg-clip-text text-transparent leading-none">
              SKILLFORGE LAB · {state.selectedCompany}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-300/90 mt-1.5">
              {isHotburn
                ? 'BLENDER • GODOT 4 • GAEA TERRAIN • RIGGING • TECH ART • STORY'
                : 'AWS CLOUD • WEB DESIGNING • SQL WORKBENCH & MONGODB • DATA ANALYTICS'}
            </div>
          </div>
        </div>

        {/* Bottom Split: Left Content Stack + Right Dual CTA Cluster */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="bg-[#c94c2d] text-white font-mono text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded inline-block mb-3">
              SKILLFORGE LAB · {state.selectedCompany} ACADEMY &amp; HIRING HUB
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12] mb-3">
              {isHotburn
                ? 'Master 3D Modelling, Gaea Worlds, Rigging & Godot Game Dev'
                : 'Master AWS Cloud, Web Designing, SQL/MongoDB & Data Analytics'}
            </h1>
            <p className="text-neutral-200 font-mono text-sm lg:text-base">
              Browse freely without login walls — sign in only when you start a course, submit a project for AI review, or apply.
            </p>
          </div>

          {/* Bottom-Right Dual CTA Cluster */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('Catalogue')}
              className="bg-[#c94c2d] hover:bg-[#b33e20] text-white font-mono text-xs uppercase tracking-wider font-semibold px-5 py-3.5 rounded-lg shadow-lg transition whitespace-nowrap"
            >
              BROWSE {state.selectedCompany} COURSES
            </button>
            <button
              type="button"
              onClick={() => onNavigate('AI Interview')}
              className="bg-[#121316]/85 hover:bg-[#1a1c20] border border-white/20 text-white font-mono text-xs uppercase tracking-wider font-semibold px-5 py-3.5 rounded-lg transition whitespace-nowrap"
            >
              MOCK INTERVIEW &amp; PROJECT REVIEW
            </button>
          </div>
        </div>
      </section>

      {/* Main Drafting Grid Content Area */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 space-y-14">
        {/* Step 1: Interactive Company & Career Track Chooser */}
        <section className="bg-[#ebe6de] border border-[#ddd7cd] rounded-2xl p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-[#c94c2d] font-mono text-xs uppercase tracking-[0.18em] mb-1">
                STEP 1 · CHOOSE YOUR COMPANY &amp; CAREER PATH
              </div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-neutral-950 tracking-tight">
                Select a Career Track to Tailor Your Courses, Mock Interviews &amp; Project Reviews
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleSelectCompany('JANKEN CORPS')}
                className={`px-4 py-2.5 rounded-lg font-mono text-xs font-bold uppercase transition ${
                  state.selectedCompany === 'JANKEN CORPS'
                    ? 'bg-[#0f1013] text-white'
                    : 'bg-[#faf8f5] text-neutral-800 border border-[#dcd6cc] hover:bg-white'
                }`}
              >
                JANKEN CORPS (4 Tracks)
              </button>
              <button
                type="button"
                onClick={() => handleSelectCompany('HOTBURN STUDIOS')}
                className={`px-4 py-2.5 rounded-lg font-mono text-xs font-bold uppercase transition ${
                  state.selectedCompany === 'HOTBURN STUDIOS'
                    ? 'bg-[#0f1013] text-white'
                    : 'bg-[#faf8f5] text-neutral-800 border border-[#dcd6cc] hover:bg-white'
                }`}
              >
                HOTBURN STUDIOS (7 Tracks)
              </button>
            </div>
          </div>

          {/* Career Tracks Grid for Selected Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {companyTracks.map((track) => {
              const isSelected = state.targetRole === track.title;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() =>
                    handleSelectCareerTrack(track.title as InterviewRole, track.company)
                  }
                  className={`text-left rounded-xl p-5 border transition flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#0f1013] text-white border-[#0f1013] shadow-md'
                      : 'bg-[#faf8f5] text-neutral-900 border-[#e2ddd3] hover:border-[#c94c2d]'
                  }`}
                >
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-wider mb-1.5 text-[#c94c2d]">
                      {track.category}
                    </div>
                    <h3 className="font-extrabold text-base leading-snug mb-2">
                      {track.title}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed mb-3 ${
                        isSelected ? 'text-neutral-300' : 'text-neutral-600'
                      }`}
                    >
                      {track.roadmapSummary}
                    </p>
                  </div>

                  <div
                    className={`pt-3 border-t font-mono text-[11px] flex items-center justify-between ${
                      isSelected
                        ? 'border-white/15 text-emerald-400'
                        : 'border-[#e8e3da] text-neutral-600'
                    }`}
                  >
                    <span className="truncate">{track.tools.slice(0, 3).join(' · ')}</span>
                    <span className="font-bold shrink-0 ml-2">
                      {isSelected ? 'ACTIVE ✓' : 'Select →'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Track Tailored Action Strip */}
          {activeTrackInfo && (
            <div className="bg-[#faf8f5] border border-[#e2ddd3] rounded-xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="font-mono text-xs text-[#c94c2d] uppercase">
                  YOUR ACTIVE CAREER BLUEPRINT · {activeTrackInfo.company}
                </div>
                <div className="text-lg font-extrabold text-neutral-950 mt-0.5">
                  {activeTrackInfo.title} — Tools: {activeTrackInfo.tools.join(' · ')}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => onNavigate('Catalogue')}
                  className="bg-[#c94c2d] hover:bg-[#b33e20] text-white font-mono text-xs uppercase tracking-wider font-semibold px-4 py-2.5 rounded-lg transition"
                >
                  Browse Track Courses →
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('AI Interview')}
                  className="bg-[#0f1013] hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider font-semibold px-4 py-2.5 rounded-lg transition"
                >
                  AI Mock Interview &amp; Project Review →
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('Contact')}
                  className="bg-[#ebe6de] hover:bg-[#e2ddd3] text-neutral-900 font-mono text-xs uppercase tracking-wider font-semibold px-4 py-2.5 rounded-lg transition"
                >
                  Email Query Desk →
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Featured Courses for Selected Company */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
            <div>
              <div className="text-[#c94c2d] font-mono text-xs uppercase tracking-[0.18em] mb-1.5">
                {state.selectedCompany} TRAINING ACADEMY
              </div>
              <h2 className="text-3xl font-extrabold text-neutral-950 tracking-tight">
                {isHotburn
                  ? 'HOTBURN STUDIOS: 3D Modelling, Rigging, Gaea, Tech Art & Godot Courses'
                  : 'JANKEN CORPS: AWS Cloud, Web Designing, SQL/MongoDB & Analytics Courses'}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('Catalogue')}
              className="font-mono text-xs uppercase tracking-wider font-semibold text-neutral-900 bg-[#ebe6de] hover:bg-[#e2ddd3] border border-[#ddd7cd] px-4 py-2.5 rounded-lg inline-flex items-center gap-2 transition self-start sm:self-auto"
            >
              <span>Browse Full Dual-Company Catalogue ({CATALOGUE_ITEMS.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {companyCourses.map((item) => {
              const completion = calculateCourseCompletion(
                item,
                state.completedModuleIds,
                state.passedQuizIds
              );
              return (
                <article
                  key={item.id}
                  onClick={() => handleStartCourseClick(item)}
                  className="bg-[#faf8f5] border border-[#e2ddd3] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col cursor-pointer group"
                >
                  <div className="h-52 relative overflow-hidden bg-neutral-900">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-90 group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
                    <span className="absolute top-3 left-3 bg-[#141518]/90 backdrop-blur-md border border-white/15 text-white font-mono text-[11px] uppercase tracking-wider px-3 py-1 rounded-md shadow-sm">
                      {item.category}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-[#0c0d0f]/85 text-neutral-200 font-mono text-[11px] px-2.5 py-1 rounded border border-white/10">
                      {completion}% Complete
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-neutral-600 font-mono text-xs mb-2">
                        {item.company} · {item.difficulty}
                      </div>
                      <h3 className="text-neutral-950 font-extrabold text-xl tracking-tight mb-2 group-hover:text-[#c94c2d] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-neutral-600 text-sm line-clamp-2 mb-4">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#e8e3da] flex items-center justify-between gap-2 font-mono text-xs">
                      <span className="text-neutral-700 truncate">
                        {item.duration} · {item.xpTotal} XP
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartCourseClick(item);
                        }}
                        className="bg-[#c94c2d] hover:bg-[#b33e20] text-white px-3.5 py-1.5 rounded-lg font-semibold inline-flex items-center gap-1.5 transition whitespace-nowrap shrink-0"
                      >
                        {authUser ? (
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 shrink-0" />
                        )}
                        <span>Start Course →</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Twin Preview: AI Project Review Studio & Direct Hiring Roles */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* AI Project Review & Unified Email Desk Preview */}
          <div className="lg:col-span-6 bg-[#ebe6de] border border-[#ddd7cd] rounded-2xl p-7 space-y-5">
            <div>
              <div className="text-[#c94c2d] font-mono text-xs uppercase tracking-[0.15em] mb-1.5">
                AI PROJECT REVIEW &amp; UNIFIED QUERY DESK
              </div>
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-neutral-950 text-2xl font-extrabold tracking-tight">
                  Submit Projects &amp; Email Both Companies
                </h2>
              </div>
            </div>

            <div className="bg-[#faf8f5] border border-[#e2ddd3] rounded-xl p-4 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#f2eee7] border border-[#e0dbd1] flex items-center justify-center text-[#c94c2d] shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-[11px] text-[#c94c2d] font-bold">
                    {state.selectedCompany} · AI PROJECT REVIEWER
                  </div>
                  <div className="font-extrabold text-neutral-950 text-base">
                    Get Instant Feedback on Your Code, SQL, 3D Models &amp; Godot Scenes
                  </div>
                  <p className="text-xs text-neutral-600 mt-1">
                    Submit your coursework or portfolio artifacts for a 0-100 readiness score and
                    actionable studio critique.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('AI Interview')}
                className="bg-[#0f1013] hover:bg-neutral-800 text-white font-mono text-xs font-medium px-3.5 py-2 rounded-lg shrink-0 transition"
              >
                Review →
              </button>
            </div>

            <div className="bg-[#faf8f5] border border-[#e2ddd3] rounded-xl p-4 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#f2eee7] border border-[#e0dbd1] flex items-center justify-center text-[#c94c2d] shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-[11px] text-[#c94c2d] font-bold">
                    DIRECT EMAIL DISPATCH FOR BOTH COMPANIES
                  </div>
                  <div className="font-extrabold text-neutral-950 text-base">
                    hotburnstudios@gmail.com
                  </div>
                  <p className="text-xs text-neutral-600 mt-1">
                    All queries for both JANKEN CORPS and HOTBURN STUDIOS are routed directly to
                    hotburnstudios@gmail.com.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('Contact')}
                className="bg-[#c94c2d] hover:bg-[#b33e20] text-white font-mono text-xs font-medium px-3.5 py-2 rounded-lg shrink-0 transition"
              >
                Send Email →
              </button>
            </div>
          </div>

          {/* Direct Fast-Track Hiring Preview */}
          <div className="lg:col-span-6 bg-[#ebe6de] border border-[#ddd7cd] rounded-2xl p-7">
            <div className="text-[#c94c2d] font-mono text-xs uppercase tracking-[0.15em] mb-1.5">
              DIRECT HIRING ROLES ({state.selectedCompany})
            </div>
            <div className="flex items-center justify-between gap-4 mb-5">
              <h2 className="text-neutral-950 text-2xl font-extrabold tracking-tight">
                Open Career Positions
              </h2>
              <button
                type="button"
                onClick={() => onNavigate('Job Board')}
                className="font-mono text-xs text-[#c94c2d] hover:underline font-semibold whitespace-nowrap"
              >
                All {JOB_POSTINGS.length} Roles →
              </button>
            </div>

            <div className="space-y-3.5">
              {companyJobs.slice(0, 3).map((job) => {
                const match = calculateJobReadinessMatch(job, {
                  completedModuleIds: state.completedModuleIds,
                  passedQuizIds: state.passedQuizIds,
                  solvedProblemIds: state.solvedProblemIds,
                  eloRating: state.eloRating,
                  globalReadinessScore: state.globalReadinessScore,
                  allCatalogueItems: CATALOGUE_ITEMS,
                });

                return (
                  <div
                    key={job.id}
                    className="bg-[#faf8f5] border border-[#e2ddd3] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-[#f2eee7] border border-[#e0dbd1] flex items-center justify-center text-[#c94c2d] shrink-0 mt-0.5">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-mono text-[11px] text-[#c94c2d] font-bold">
                          {job.company} · {job.division}
                        </div>
                        <div className="font-extrabold text-neutral-950 text-base">
                          {job.roleTitle}
                        </div>
                        <div className="font-mono text-xs text-neutral-600 mt-0.5">
                          {job.compensationINR} · Readiness Match:{' '}
                          <span className="text-emerald-700 font-semibold">
                            {match.matchPercent}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onNavigate('Job Board')}
                      className="bg-[#c94c2d] hover:bg-[#b33e20] text-white font-mono text-xs font-medium px-3.5 py-2 rounded-lg shrink-0 transition"
                    >
                      Apply →
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
