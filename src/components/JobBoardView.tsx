import React, { useMemo, useState } from 'react';
import {
  Search,
  ShieldCheck,
  Building2,
  Flame,
} from 'lucide-react';
import { CompanyFilter, KanbanStage } from '../types';
import { CATALOGUE_ITEMS, JOB_POSTINGS } from '../seedData';
import { useCareer } from '../context/CareerContext';
import { calculateJobReadinessMatch } from '../utils/careerEngine';

const KANBAN_STAGES: KanbanStage[] = [
  'Bookmarked',
  'Dossier Sent',
  'OA Cleared',
  'Technical Loop',
  'Offer Extended',
];

export const JobBoardView: React.FC = () => {
  const { state, requireAuth, applyToJobFastTrack, moveJobKanbanStage } = useCareer();
  const [viewMode, setViewMode] = useState<'grid' | 'kanban'>('grid');
  const [companyFilter, setCompanyFilter] = useState<CompanyFilter>('ALL');
  const [filterMode, setFilterMode] = useState<'ALL' | 'UNLOCKED' | 'REMOTE'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const jobsWithMatch = useMemo(() => {
    return JOB_POSTINGS.map((job) => {
      const match = calculateJobReadinessMatch(job, {
        completedModuleIds: state.completedModuleIds,
        passedQuizIds: state.passedQuizIds,
        solvedProblemIds: state.solvedProblemIds,
        eloRating: state.eloRating,
        globalReadinessScore: state.globalReadinessScore,
        allCatalogueItems: CATALOGUE_ITEMS,
      });
      return { job, match };
    });
  }, [
    state.completedModuleIds,
    state.passedQuizIds,
    state.solvedProblemIds,
    state.eloRating,
    state.globalReadinessScore,
  ]);

  const filteredJobs = useMemo(() => {
    return jobsWithMatch.filter(({ job, match }) => {
      if (companyFilter !== 'ALL' && job.company !== companyFilter) return false;
      if (filterMode === 'UNLOCKED' && !match.exceedsBenchmark) return false;
      if (filterMode === 'REMOTE' && !job.workMode.toLowerCase().includes('remote')) return false;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return true;
      return (
        job.company.toLowerCase().includes(q) ||
        job.roleTitle.toLowerCase().includes(q) ||
        job.categorySubLabel.toLowerCase().includes(q) ||
        job.requiredSkills.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [jobsWithMatch, companyFilter, filterMode, searchQuery]);

  const unlockedCount = jobsWithMatch.filter((j) => j.match.exceedsBenchmark).length;
  const jankenCount = JOB_POSTINGS.filter((j) => j.company === 'JANKEN CORPS').length;
  const hotburnCount = JOB_POSTINGS.filter((j) => j.company === 'HOTBURN STUDIOS').length;

  return (
    <div>
      {/* Top Black Banner */}
      <section className="bg-[#0c0d0f] py-14 px-6 lg:px-20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-[#c94c2d] font-mono text-xs uppercase tracking-[0.18em] mb-3">
            SKILLFORGE LAB · DIRECT HIRING &amp; CAREER PLACEMENT
          </div>
          <h1 className="text-white text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            SkillForge Lab Direct-Hiring Job Board
          </h1>
          <p className="text-neutral-300 text-base lg:text-lg max-w-2xl leading-relaxed">
            Train in your chosen track and apply directly to open Cloud, Web, SQL &amp; Data
            Analytics roles at <strong className="text-white">JANKEN CORPS</strong> or 3D
            Modeller, Animator, Rigger, Gaea World Designer, Story Director &amp; Godot Game
            Developer roles at <strong className="text-white">HOTBURN STUDIOS</strong>.
          </p>
        </div>
      </section>

      {/* Stone Filter Bar */}
      <div className="max-w-7xl mx-auto mt-10 px-6 lg:px-8 space-y-4">
        {/* Company Filter Bar */}
        <div className="bg-[#ebe6de] border border-[#ddd7cd] rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                setViewMode('grid');
                setCompanyFilter('ALL');
              }}
              className={
                viewMode === 'grid' && companyFilter === 'ALL'
                  ? 'bg-[#0f1013] text-white font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg font-semibold'
                  : 'bg-[#faf8f5] hover:bg-white text-neutral-800 border border-[#dcd6cc] font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition'
              }
            >
              ALL PARTNER ROLES ({JOB_POSTINGS.length})
            </button>

            <button
              type="button"
              onClick={() => {
                setViewMode('grid');
                setCompanyFilter('JANKEN CORPS');
              }}
              className={
                viewMode === 'grid' && companyFilter === 'JANKEN CORPS'
                  ? 'bg-[#0f1013] text-white font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg font-semibold inline-flex items-center gap-2'
                  : 'bg-[#faf8f5] hover:bg-white text-neutral-800 border border-[#dcd6cc] font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg inline-flex items-center gap-2 transition'
              }
            >
              <Building2 className="w-3.5 h-3.5 text-[#c94c2d]" />
              <span>JANKEN CORPS ({jankenCount})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setViewMode('grid');
                setCompanyFilter('HOTBURN STUDIOS');
              }}
              className={
                viewMode === 'grid' && companyFilter === 'HOTBURN STUDIOS'
                  ? 'bg-[#c94c2d] text-white font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg font-semibold inline-flex items-center gap-2'
                  : 'bg-[#faf8f5] hover:bg-white text-neutral-800 border border-[#dcd6cc] font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg inline-flex items-center gap-2 transition'
              }
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>HOTBURN STUDIOS ({hotburnCount})</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                setViewMode('grid');
                setFilterMode(filterMode === 'UNLOCKED' ? 'ALL' : 'UNLOCKED');
              }}
              className={
                viewMode === 'grid' && filterMode === 'UNLOCKED'
                  ? 'bg-[#0f1013] text-white font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg font-semibold'
                  : 'bg-[#faf8f5] hover:bg-white text-neutral-800 border border-[#dcd6cc] font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition'
              }
            >
              FAST-TRACK UNLOCKED ({unlockedCount})
            </button>

            <button
              type="button"
              onClick={() => setViewMode('kanban')}
              className={
                viewMode === 'kanban'
                  ? 'bg-[#c94c2d] text-white font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg font-semibold'
                  : 'bg-[#faf8f5] hover:bg-white text-neutral-800 border border-[#dcd6cc] font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition'
              }
            >
              APPLICATION KANBAN ({Object.keys(state.jobKanbanByJobId).length})
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-[#ebe6de] border border-[#ddd7cd] rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="font-mono text-xs text-neutral-700 px-2">
            Showing <strong>{filteredJobs.length}</strong> open career tracks across{' '}
            <strong>{companyFilter === 'ALL' ? 'Both Companies' : companyFilter}</strong>
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search AWS, SQL, Blender, Godot, Gaea..."
              aria-label="Search Verified Engineering Roles"
              className="bg-[#faf8f5] border border-[#dcd6cc] rounded-lg pl-9 pr-4 py-2 text-sm font-mono text-neutral-800 placeholder:text-neutral-400 w-full focus:outline-none focus:border-[#c94c2d]"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredJobs.map(({ job, match }) => {
              const kanbanStage = state.jobKanbanByJobId[job.id];
              const appHash = state.jobApplicationHashes[job.id];

              return (
                <article
                  key={job.id}
                  className="bg-[#faf8f5] border border-[#e2ddd3] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
                >
                  {/* Top Media Container */}
                  <div className="h-52 relative overflow-hidden bg-neutral-900">
                    <img
                      src={job.thumbnailUrl}
                      alt={`${job.company} — ${job.roleTitle}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <span className="absolute top-3 left-3 bg-[#141518]/90 backdrop-blur-md border border-white/15 text-white font-mono text-[11px] uppercase tracking-wider px-3 py-1 rounded-md shadow-sm">
                      {job.statusBadge}
                    </span>
                    <span
                      className={`absolute top-3 right-3 font-mono text-[11px] font-bold px-2.5 py-1 rounded-md border ${
                        match.exceedsBenchmark
                          ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-300'
                          : 'bg-amber-950/90 border-amber-500/40 text-amber-300'
                      }`}
                    >
                      Match: {match.matchPercent}% (Min {job.minBenchmarkScore}%)
                    </span>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white font-mono text-xs">
                      <span className="font-bold">{job.company}</span>
                      <span className="text-neutral-300">{job.workMode}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[#c94c2d] font-mono text-xs font-semibold mb-1">
                        {job.company} · {job.categorySubLabel}
                      </div>
                      <div className="text-neutral-600 font-mono text-xs mb-1.5">
                        {job.compensationINR} ({job.compensationUSD})
                      </div>
                      <h2 className="text-neutral-950 font-extrabold text-xl tracking-tight mb-2">
                        {job.roleTitle}
                      </h2>
                      <p className="text-neutral-600 text-sm line-clamp-2 mb-3">
                        {job.description}
                      </p>

                      <div className="text-xs font-mono text-neutral-700 bg-[#f2eee7] border border-[#e0dbd1] rounded-lg p-2.5 mb-4">
                        <div>Skills: {job.requiredSkills.join(' · ')}</div>
                        <div className="text-neutral-500 mt-1">
                          Lead: {job.hiringManager}
                        </div>
                      </div>
                    </div>

                    {/* Metadata Footer & 1-Click Fast-Track Apply */}
                    <div className="pt-4 border-t border-[#e8e3da] flex flex-col gap-2.5">
                      <div className="flex items-center justify-between font-mono text-xs">
                        {kanbanStage ? (
                          <span className="text-emerald-700 font-semibold">
                            Stage: {kanbanStage} ✓
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => moveJobKanbanStage(job.id, 'Bookmarked')}
                            className="text-neutral-600 hover:text-neutral-950 underline"
                          >
                            + Bookmark to Kanban
                          </button>
                        )}
                        {appHash && (
                          <span className="text-[11px] text-neutral-500 truncate max-w-[140px]">
                            {appHash}
                          </span>
                        )}
                      </div>

                      {match.exceedsBenchmark ? (
                        <button
                          type="button"
                          onClick={() =>
                            requireAuth(
                              `Sign in or create an account to submit your verified dossier for "${job.roleTitle}" at ${job.company}.`,
                              () => applyToJobFastTrack(job.id, job.company)
                            )
                          }
                          className="w-full bg-[#c94c2d] hover:bg-[#b33e20] text-white font-mono text-xs uppercase tracking-wider font-semibold py-2.5 px-4 rounded-lg inline-flex items-center justify-center gap-1.5 shadow-sm transition"
                        >
                          <ShieldCheck className="w-4 h-4" />
                          <span>
                            {appHash
                              ? 'Dossier Sent · View in Kanban'
                              : '1-Click Verified Fast-Track Apply →'}
                          </span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            requireAuth(
                              `Sign in or create an account to apply for "${job.roleTitle}" at ${job.company}.`,
                              () => applyToJobFastTrack(job.id, job.company)
                            )
                          }
                          className="w-full bg-[#0f1013] hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider font-semibold py-2.5 px-4 rounded-lg inline-flex items-center justify-center gap-1.5 transition"
                        >
                          <span>
                            Submit Standard Dossier (
                            {job.minBenchmarkScore - match.matchPercent}% to Fast-Track)
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Interactive Application Kanban Tracker */
          <div className="bg-[#ebe6de] border border-[#ddd7cd] rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="text-[#c94c2d] font-mono text-xs uppercase tracking-[0.15em] mb-1">
                  LIVE HIRING PIPELINE · JANKEN CORPS &amp; HOTBURN STUDIOS
                </div>
                <h2 className="text-2xl font-extrabold text-neutral-950">
                  Interactive Application Kanban Tracker
                </h2>
              </div>
              <div className="font-mono text-xs text-neutral-700">
                Cryptographic Dossier Attached: <strong>{state.dossierHash}</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {KANBAN_STAGES.map((stage) => {
                const stageJobs = jobsWithMatch.filter(
                  ({ job }) => state.jobKanbanByJobId[job.id] === stage
                );

                return (
                  <div
                    key={stage}
                    className="bg-[#f4f1ea] border border-[#ddd7cd] rounded-xl p-3.5 flex flex-col min-h-[420px]"
                  >
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#ddd7cd] font-mono text-xs">
                      <span className="font-bold text-neutral-950 uppercase">{stage}</span>
                      <span className="bg-[#0f1013] text-white px-2 py-0.5 rounded text-[11px]">
                        {stageJobs.length}
                      </span>
                    </div>

                    <div className="space-y-3 flex-1">
                      {stageJobs.map(({ job, match }) => (
                        <div
                          key={job.id}
                          className="bg-[#faf8f5] border border-[#e2ddd3] rounded-xl p-3.5 shadow-xs space-y-2.5"
                        >
                          <div className="font-mono text-[11px] text-[#c94c2d] font-semibold">
                            {job.company} · Match {match.matchPercent}%
                          </div>
                          <div className="font-extrabold text-neutral-950 text-sm leading-snug">
                            {job.roleTitle}
                          </div>
                          <div className="font-mono text-[11px] text-neutral-600">
                            {job.compensationINR}
                          </div>

                          <div className="pt-2 border-t border-[#e8e3da]">
                            <label
                              htmlFor={`stage-select-${job.id}`}
                              className="block font-mono text-[10px] uppercase text-neutral-500 mb-1"
                            >
                              Move Pipeline Stage:
                            </label>
                            <select
                              id={`stage-select-${job.id}`}
                              value={stage}
                              onChange={(e) =>
                                moveJobKanbanStage(job.id, e.target.value as KanbanStage)
                              }
                              className="w-full bg-[#f2eee7] border border-[#dcd6cc] rounded px-2 py-1 font-mono text-xs text-neutral-900"
                            >
                              {KANBAN_STAGES.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
