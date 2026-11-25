import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  FileText,
} from 'lucide-react';
import { InterviewRole, PartnerCompany } from '../types';
import { CAREER_TRACK_OPTIONS } from '../seedData';
import { useCareer } from '../context/CareerContext';
import { requestAIResumeAudit } from '../services/geminiService';

interface CandidateDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CandidateDossierModal: React.FC<CandidateDossierModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { state, selectCompanyAndRole, updateProfile, saveResumeAudit, resetDemoState } =
    useCareer();

  const [rawBullets, setRawBullets] = useState(
    'Built AWS Cloud multi-AZ web services and optimized SQL Workbench & MongoDB queries.\nCreated 3D environment props in Blender, terrain heightmaps in Gaea, and playable character controllers in Godot 4.'
  );
  const [isAuditing, setIsAuditing] = useState(false);

  if (!isOpen) return null;

  const handleAuditResume = async () => {
    if (!rawBullets.trim() || isAuditing) return;
    setIsAuditing(true);
    const result = await requestAIResumeAudit(rawBullets, state.targetRole);
    saveResumeAudit(result);
    setIsAuditing(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Candidate Dossier & AI Resume Auditor"
    >
      <div className="bg-[#f4f1ea] border-l border-[#ddd7cd] w-full max-w-2xl h-full flex flex-col overflow-hidden shadow-2xl">
        {/* Top Dark Header */}
        <div className="bg-[#0c0d0f] px-6 py-5 border-b border-neutral-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#16181d] border border-[#c94c2d]/50 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#c94c2d]" />
            </div>
            <div>
              <div className="text-[#c94c2d] font-mono text-xs uppercase tracking-[0.18em]">
                SKILLFORGE LAB · {state.selectedCompany} DOSSIER
              </div>
              <h2 className="text-white text-xl font-extrabold tracking-tight">
                {state.name} · {state.dossierHash}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Dossier Drawer"
            className="p-2 rounded-lg bg-[#16181d] border border-white/15 text-neutral-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-drafting-grid">
          {/* Verified Rating & Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#faf8f5] border border-[#e2ddd3] rounded-xl p-4">
              <div className="font-mono text-[11px] text-neutral-500 uppercase">VERIFIED ELO</div>
              <div className="text-2xl font-extrabold text-neutral-950 font-mono tabular-nums mt-0.5">
                {state.eloRating}
              </div>
              <div className="font-mono text-[11px] text-[#c94c2d]">Top 4% Global</div>
            </div>

            <div className="bg-[#faf8f5] border border-[#e2ddd3] rounded-xl p-4">
              <div className="font-mono text-[11px] text-neutral-500 uppercase">READINESS</div>
              <div className="text-2xl font-extrabold text-neutral-950 font-mono tabular-nums mt-0.5">
                {state.globalReadinessScore}%
              </div>
              <div className="font-mono text-[11px] text-emerald-700">Fast-Track Active</div>
            </div>

            <div className="bg-[#faf8f5] border border-[#e2ddd3] rounded-xl p-4">
              <div className="font-mono text-[11px] text-neutral-500 uppercase">PROJECTS</div>
              <div className="text-2xl font-extrabold text-neutral-950 font-mono tabular-nums mt-0.5">
                {state.projectReviews.length}
              </div>
              <div className="font-mono text-[11px] text-neutral-600">
                {state.solvedProblemIds.length}/4 Labs Solved
              </div>
            </div>

            <div className="bg-[#faf8f5] border border-[#e2ddd3] rounded-xl p-4">
              <div className="font-mono text-[11px] text-neutral-500 uppercase">TOTAL XP</div>
              <div className="text-2xl font-extrabold text-neutral-950 font-mono tabular-nums mt-0.5">
                {state.xp}
              </div>
              <div className="font-mono text-[11px] text-neutral-600">
                {state.completedModuleIds.length} Units Done
              </div>
            </div>
          </div>

          {/* Profile Identity Calibration */}
          <div className="bg-[#ebe6de] border border-[#ddd7cd] rounded-2xl p-5 space-y-4">
            <div className="font-mono text-xs uppercase text-[#c94c2d]">
              CANDIDATE IDENTITY, COMPANY &amp; CAREER TRACK
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label
                  htmlFor="dossier-name"
                  className="block font-mono text-xs uppercase text-neutral-700 mb-1"
                >
                  CANDIDATE NAME
                </label>
                <input
                  id="dossier-name"
                  type="text"
                  value={state.name}
                  onChange={(e) => updateProfile({ name: e.target.value })}
                  className="w-full bg-[#faf8f5] border border-[#dcd6cc] rounded-lg px-3.5 py-2 text-sm text-neutral-900"
                />
              </div>

              <div>
                <label
                  htmlFor="dossier-company"
                  className="block font-mono text-xs uppercase text-neutral-700 mb-1"
                >
                  ACTIVE COMPANY
                </label>
                <select
                  id="dossier-company"
                  value={state.selectedCompany}
                  onChange={(e) => {
                    const nextComp = e.target.value as PartnerCompany;
                    const defaultRole: InterviewRole =
                      CAREER_TRACK_OPTIONS.find((t) => t.company === nextComp)?.title ||
                      state.targetRole;
                    selectCompanyAndRole(nextComp, defaultRole);
                  }}
                  className="w-full bg-[#faf8f5] border border-[#dcd6cc] rounded-lg px-3.5 py-2 text-xs font-mono text-neutral-900"
                >
                  <option value="JANKEN CORPS">1. JANKEN CORPS</option>
                  <option value="HOTBURN STUDIOS">2. HOTBURN STUDIOS</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="dossier-role"
                  className="block font-mono text-xs uppercase text-neutral-700 mb-1"
                >
                  CHOSEN CAREER TRACK
                </label>
                <select
                  id="dossier-role"
                  value={state.targetRole}
                  onChange={(e) => {
                    const roleVal = e.target.value as InterviewRole;
                    const opt = CAREER_TRACK_OPTIONS.find((t) => t.title === roleVal);
                    selectCompanyAndRole(opt?.company || state.selectedCompany, roleVal);
                  }}
                  className="w-full bg-[#faf8f5] border border-[#dcd6cc] rounded-lg px-3.5 py-2 text-xs font-mono text-neutral-900"
                >
                  {CAREER_TRACK_OPTIONS.map((r) => (
                    <option key={r.id} value={r.title}>
                      [{r.company === 'JANKEN CORPS' ? 'JC' : 'HB'}] {r.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* AI Resume & Portfolio Bullet Optimizer */}
          <div className="bg-[#ebe6de] border border-[#ddd7cd] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-xs uppercase text-[#c94c2d]">
                  GEMINI PORTFOLIO &amp; RESUME AUDITOR
                </div>
                <h3 className="text-lg font-extrabold text-neutral-950">
                  AI Resume &amp; Showreel Bullet Optimizer
                </h3>
              </div>
              <FileText className="w-5 h-5 text-[#c94c2d]" />
            </div>

            <div>
              <label
                htmlFor="raw-resume-bullets"
                className="block font-mono text-xs uppercase text-neutral-700 mb-1.5"
              >
                PASTE RAW RESUME BULLETS OR PROJECT DESCRIPTIONS:
              </label>
              <textarea
                id="raw-resume-bullets"
                rows={4}
                value={rawBullets}
                onChange={(e) => setRawBullets(e.target.value)}
                className="w-full bg-[#faf8f5] border border-[#dcd6cc] rounded-xl p-3.5 text-xs font-mono text-neutral-900 focus:outline-none focus:border-[#c94c2d]"
              />
            </div>

            <button
              type="button"
              onClick={handleAuditResume}
              disabled={isAuditing}
              className="w-full bg-[#c94c2d] hover:bg-[#b33e20] disabled:opacity-50 text-white font-mono text-xs uppercase tracking-wider font-semibold py-3 px-4 rounded-xl inline-flex items-center justify-center gap-2 shadow-sm transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {isAuditing
                  ? 'Auditing with Gemini...'
                  : 'Audit with Gemini & Generate Impact Bullets →'}
              </span>
            </button>

            {state.lastResumeAudit && (
              <div className="bg-[#faf8f5] border border-[#e2ddd3] rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between font-mono text-xs border-b border-[#e8e3da] pb-2">
                  <span className="text-neutral-600">
                    Impact Score: <strong>{state.lastResumeAudit.impactScoreBefore}</strong> →{' '}
                    <strong className="text-emerald-700">
                      {state.lastResumeAudit.impactScoreAfter}/100
                    </strong>
                  </span>
                  <span className="text-neutral-500">
                    Audited {state.lastResumeAudit.auditedAt}
                  </span>
                </div>

                <p className="text-xs text-neutral-700 leading-relaxed">
                  {state.lastResumeAudit.critiqueSummary}
                </p>

                <div className="space-y-2">
                  <div className="font-mono text-[11px] uppercase text-[#c94c2d] font-bold">
                    OPTIMIZED TRACK-CALIBRATED BULLETS:
                  </div>
                  {state.lastResumeAudit.optimizedBullets.map((b, idx) => (
                    <div
                      key={idx}
                      className="bg-[#f2eee7] border border-[#e0dbd1] rounded-lg p-3 text-xs text-neutral-900 font-medium leading-relaxed"
                    >
                      • {b}
                    </div>
                  ))}
                </div>

                <div className="font-mono text-[11px] text-neutral-600">
                  Injected Signals: {state.lastResumeAudit.injectedKeywords.join(' · ')}
                </div>
              </div>
            )}
          </div>

          {/* Verified Project Reviews Archive */}
          <div className="bg-[#ebe6de] border border-[#ddd7cd] rounded-2xl p-5 space-y-3">
            <div className="font-mono text-xs uppercase text-[#c94c2d]">
              VERIFIED AI PROJECT &amp; PORTFOLIO REVIEWS ({state.projectReviews.length})
            </div>
            {state.projectReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#faf8f5] border border-[#e2ddd3] rounded-xl p-4 space-y-1.5"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-neutral-950">{rev.projectTitle}</span>
                  <span className="bg-emerald-700 text-white px-2.5 py-0.5 rounded font-semibold">
                    {rev.score}/100
                  </span>
                </div>
                <div className="font-mono text-[11px] text-neutral-500">
                  {rev.company} · {rev.careerTrack} · {rev.verdict}
                </div>
                <p className="text-xs text-neutral-700">{rev.architectureCritique}</p>
              </div>
            ))}
          </div>

          {/* Hiring Committee Packets Archive */}
          <div className="bg-[#ebe6de] border border-[#ddd7cd] rounded-2xl p-5 space-y-3">
            <div className="font-mono text-xs uppercase text-[#c94c2d]">
              VERIFIED HIRING COMMITTEE PACKETS ({state.hiringPackets.length})
            </div>
            {state.hiringPackets.map((pkt) => (
              <div
                key={pkt.id}
                className="bg-[#faf8f5] border border-[#e2ddd3] rounded-xl p-4 space-y-1.5"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-neutral-950">
                    [{pkt.company}] {pkt.role}
                  </span>
                  <span className="bg-emerald-700 text-white px-2.5 py-0.5 rounded font-semibold">
                    {pkt.decision} ({pkt.overallScore}/100)
                  </span>
                </div>
                <div className="font-mono text-[11px] text-neutral-500">
                  {pkt.mode} · {pkt.persona} · {pkt.recommendedLevel}
                </div>
                <p className="text-xs text-neutral-700">{pkt.executiveSummary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Reset Option */}
        <div className="bg-[#ebe6de] px-6 py-3.5 border-t border-[#ddd7cd] flex items-center justify-between text-xs font-mono shrink-0">
          <span className="text-neutral-600">Local Persistence Active (localStorage)</span>
          <button
            type="button"
            onClick={resetDemoState}
            className="text-neutral-700 hover:text-[#c94c2d] inline-flex items-center gap-1 underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Seed Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
