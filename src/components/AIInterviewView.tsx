import React, { useEffect, useState } from 'react';
import {
  Send,
  Sparkles,
  FileCheck2,
  Terminal,
  FolderGit2,
  Building2,
  Flame,
} from 'lucide-react';
import {
  HiringCommitteePacket,
  InterviewMessage,
  InterviewMode,
  InterviewPersona,
  InterviewRole,
  InterviewRubric,
  PartnerCompany,
  ProjectReviewReport,
} from '../types';
import { CAREER_TRACK_OPTIONS } from '../seedData';
import { useCareer } from '../context/CareerContext';
import {
  requestAIInterviewDebrief,
  requestAIInterviewTurn,
  requestAIProjectReview,
} from '../services/geminiService';

const MODES: InterviewMode[] = [
  'Technical & Practical Probe',
  'Architecture & Pipeline Design',
  'Portfolio & Production Scenario',
];

const PERSONAS: InterviewPersona[] = [
  'Strict Bar-Raiser',
  'Collaborative Lead / Art Director',
  'Executive Studio Hiring Manager',
];

const INITIAL_SCRATCHPAD_BY_COMPANY: Record<PartnerCompany, string> = {
  'JANKEN CORPS': `// JANKEN CORPS Live Technical Scratchpad — AWS Cloud / SQL Workbench / Web / Analytics
-- SQL Workbench / PostgreSQL + MongoDB Indexing & Cloud Topology
SELECT customer_id,
       DATE_TRUNC('month', order_ts) AS cohort_month,
       SUM(net_revenue_usd) OVER (PARTITION BY customer_id ORDER BY order_ts) AS running_ltv
FROM analytics_orders
WHERE order_status = 'SETTLED';

// AWS Multi-AZ Architecture Notes:
// 1. ALB -> ECS Fargate Auto-Scaling Group across 3 Availability Zones
// 2. RDS PostgreSQL Multi-AZ + Read Replica + MongoDB Atlas Event Store`,
  'HOTBURN STUDIOS': `// HOTBURN STUDIOS Live Studio Scratchpad — Blender / Rigging / Gaea Terrain / Godot 4
extends CharacterBody3D

@export var max_speed: float = 7.5
@export var acceleration: float = 18.0
@onready var anim_tree: AnimationTree = $AnimationTree

func _physics_process(delta: float) -> void:
    # Sub-frame root-motion & Gaea heightmap terrain normal alignment
    var input_dir := Input.get_vector("move_left", "move_right", "move_forward", "move_back")
    var target_vel := Vector3(input_dir.x, 0.0, input_dir.y) * max_speed
    velocity = velocity.move_toward(target_vel, acceleration * delta)
    move_and_slide()

// Topology & Shader Budget:
// - Character Hero Mesh: 28,400 tris, all-quad deformation loops, 2 UV channels
// - Gaea 4K Splatmap: Slope/Altitude/Flow masks -> 1.1ms fragment shader`,
};

export const AIInterviewView: React.FC = () => {
  const {
    state,
    selectCompanyAndRole,
    recordHiringPacket,
    recordProjectReview,
  } = useCareer();

  const [studioTab, setStudioTab] = useState<'interview' | 'project-review'>('interview');
  const [role, setRole] = useState<InterviewRole>(state.targetRole);
  const [mode, setMode] = useState<InterviewMode>('Architecture & Pipeline Design');
  const [persona, setPersona] = useState<InterviewPersona>('Collaborative Lead / Art Director');

  const [scratchpad, setScratchpad] = useState<string>(
    INITIAL_SCRATCHPAD_BY_COMPANY[state.selectedCompany]
  );
  const [candidateInput, setCandidateInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isGeneratingPacket, setIsGeneratingPacket] = useState(false);
  const [generatedPacket, setGeneratedPacket] = useState<HiringCommitteePacket | null>(
    state.hiringPackets[0] || null
  );

  // Project Review Studio State
  const [projectTitle, setProjectTitle] = useState(
    state.selectedCompany === 'JANKEN CORPS'
      ? 'Multi-AZ AWS Serverless Order Pipeline + SQL Workbench & MongoDB Analytics'
      : 'Volcanic Citadel Open-World Biome (Gaea Terrain + Blender Hero Rig + Godot 4)'
  );
  const [toolsUsed, setToolsUsed] = useState(
    state.selectedCompany === 'JANKEN CORPS'
      ? 'AWS VPC, ECS Fargate, SQL Workbench, PostgreSQL, MongoDB, React, PowerBI'
      : 'Blender 4.2, Gaea Terrain, Godot 4.3, GDScript, HLSL/GLSL Shaders, IK/FK Rigging'
  );
  const [projectSummary, setProjectSummary] = useState(
    state.selectedCompany === 'JANKEN CORPS'
      ? 'Designed a multi-region cloud ingestion architecture with composite B-Tree covering indexes in SQL Workbench, MongoDB aggregation pipelines, and responsive web dashboards.'
      : 'Created a playable vertical slice in Godot 4 featuring a Gaea-eroded volcanic canyon, a 28k-triangle all-quad rigged protagonist from Blender, and custom triplanar PBR shaders.'
  );
  const [projectArtifact, setProjectArtifact] = useState(
    INITIAL_SCRATCHPAD_BY_COMPANY[state.selectedCompany]
  );
  const [isReviewingProject, setIsReviewingProject] = useState(false);
  const [activeProjectReview, setActiveProjectReview] = useState<ProjectReviewReport | null>(
    state.projectReviews[0] || null
  );

  const [rubric, setRubric] = useState<InterviewRubric>({
    problemSolving: 85,
    technicalDepth: 87,
    codeCleanliness: 84,
    communicationClarity: 86,
  });

  const [transcript, setTranscript] = useState<InterviewMessage[]>([
    {
      id: 'msg-init',
      sender: 'interviewer',
      senderLabel: `${persona} · ${state.selectedCompany}`,
      text: `Welcome to the ${state.selectedCompany} AI Mock Interview & Project Review Studio. Your current career track is ${state.targetRole}. I have live visibility into both your chat responses and your technical scratchpad on the right. Walk me through your core architecture, SQL/cloud design, or 3D/Godot pipeline to begin.`,
      timestamp: '00:00',
      detectedSignal: `${state.selectedCompany} · ${state.targetRole} Calibrated`,
    },
  ]);

  useEffect(() => {
    setRole(state.targetRole);
    setScratchpad(INITIAL_SCRATCHPAD_BY_COMPANY[state.selectedCompany]);
  }, [state.selectedCompany, state.targetRole]);

  const handleSelectCompany = (company: PartnerCompany) => {
    const firstTrack: InterviewRole =
      CAREER_TRACK_OPTIONS.find((t) => t.company === company)?.title ||
      (company === 'JANKEN CORPS'
        ? 'AWS Cloud Solutions Architect'
        : 'Game Designer & Godot Coder');
    selectCompanyAndRole(company, firstTrack);
    setRole(firstTrack);
    setScratchpad(INITIAL_SCRATCHPAD_BY_COMPANY[company]);
    setTranscript([
      {
        id: `msg-${Date.now()}`,
        sender: 'interviewer',
        senderLabel: `${persona} · ${company}`,
        text: `Switched studio division to ${company} (${firstTrack}). Share your system design, SQL/Cloud workflow, or 3D/Godot scene architecture in the scratchpad and explain your approach.`,
        timestamp: '00:00',
        detectedSignal: `Division Switched: ${company}`,
      },
    ]);
  };

  const handleRoleChange = (nextRole: InterviewRole) => {
    setRole(nextRole);
    const trackMeta = CAREER_TRACK_OPTIONS.find((t) => t.title === nextRole);
    const nextCompany = trackMeta?.company || state.selectedCompany;
    selectCompanyAndRole(nextCompany, nextRole);
    setTranscript([
      {
        id: `msg-${Date.now()}`,
        sender: 'interviewer',
        senderLabel: `${persona} · ${nextCompany}`,
        text: `Calibrated interview room for ${nextRole} at ${nextCompany}. Walk me through a recent project or technical trade-off in this track.`,
        timestamp: '00:00',
        detectedSignal: `Track Calibrated: ${nextRole}`,
      },
    ]);
  };

  const handleSendCandidateResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = candidateInput.trim();
    if (!trimmed || isThinking) return;

    const userMsg: InterviewMessage = {
      id: `cand-${Date.now()}`,
      sender: 'candidate',
      senderLabel: `${state.name} (${state.dossierHash})`,
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
    };

    const updatedTranscript = [...transcript, userMsg];
    setTranscript(updatedTranscript);
    setCandidateInput('');
    setIsThinking(true);

    const aiTurn = await requestAIInterviewTurn({
      company: state.selectedCompany,
      role,
      mode,
      persona,
      transcript: updatedTranscript,
      scratchpad,
      candidateMessage: trimmed,
      currentRubric: rubric,
    });

    setRubric(aiTurn.rubric);
    setTranscript((prev) => [
      ...prev,
      {
        id: `ai-${Date.now()}`,
        sender: 'interviewer',
        senderLabel: `${persona} · ${state.selectedCompany}`,
        text: aiTurn.reply,
        timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
        detectedSignal: aiTurn.detectedSignal,
      },
    ]);
    setIsThinking(false);
  };

  const handleGenerateDebriefPacket = async () => {
    setIsGeneratingPacket(true);
    const packet = await requestAIInterviewDebrief({
      company: state.selectedCompany,
      role,
      mode,
      persona,
      transcript,
      scratchpad,
      rubric,
    });
    recordHiringPacket(packet);
    setGeneratedPacket(packet);
    setIsGeneratingPacket(false);
  };

  const handleRunProjectReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle.trim() || !projectSummary.trim() || isReviewingProject) return;
    setIsReviewingProject(true);

    const report = await requestAIProjectReview({
      company: state.selectedCompany,
      careerTrack: role,
      projectTitle: projectTitle.trim(),
      toolsUsed: toolsUsed.trim(),
      projectDescription: `${projectSummary.trim()}\n\n${projectArtifact.trim()}`,
    });

    recordProjectReview(report);
    setActiveProjectReview(report);
    setIsReviewingProject(false);
  };

  const companyRoles = CAREER_TRACK_OPTIONS.filter(
    (t) => t.company === state.selectedCompany
  );

  return (
    <div>
      {/* Top Black Banner */}
      <section className="bg-[#0c0d0f] py-14 px-6 lg:px-20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="text-[#c94c2d] font-mono text-xs uppercase tracking-[0.18em] mb-3">
              SKILLFORGE LAB · {state.selectedCompany} · AI MOCK INTERVIEW &amp; PROJECT REVIEW
            </div>
            <h1 className="text-white text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              SkillForge Lab Mock Interviews &amp; Project Reviews
            </h1>
            <p className="text-neutral-300 text-base lg:text-lg max-w-2xl leading-relaxed">
              Practice live mock interviews tailored to your chosen career track at{' '}
              <strong className="text-white">JANKEN CORPS</strong> or{' '}
              <strong className="text-white">HOTBURN STUDIOS</strong>, or submit your course
              projects, SQL schemas, AWS architectures, Blender topologies, Gaea terrains, and Godot
              scripts for instant AI review.
            </p>
          </div>

          {/* Studio Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setStudioTab('interview')}
              className={
                studioTab === 'interview'
                  ? 'bg-[#c94c2d] text-white font-mono text-xs uppercase tracking-wider px-4 py-3 rounded-xl font-semibold shadow-sm'
                  : 'bg-[#16181d] hover:bg-neutral-800 text-neutral-300 border border-white/10 font-mono text-xs uppercase tracking-wider px-4 py-3 rounded-xl transition'
              }
            >
              1. Live Mock Interview
            </button>
            <button
              type="button"
              onClick={() => setStudioTab('project-review')}
              className={
                studioTab === 'project-review'
                  ? 'bg-[#c94c2d] text-white font-mono text-xs uppercase tracking-wider px-4 py-3 rounded-xl font-semibold shadow-sm'
                  : 'bg-[#16181d] hover:bg-neutral-800 text-neutral-300 border border-white/10 font-mono text-xs uppercase tracking-wider px-4 py-3 rounded-xl transition'
              }
            >
              2. AI Project Review ({state.projectReviews.length})
            </button>
          </div>
        </div>
      </section>

      {/* Stone Company & Track Configurator */}
      <div className="max-w-7xl mx-auto mt-10 px-6 lg:px-8 space-y-4">
        {/* Company Toggle Bar */}
        <div className="bg-[#ebe6de] border border-[#ddd7cd] rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => handleSelectCompany('JANKEN CORPS')}
              className={
                state.selectedCompany === 'JANKEN CORPS'
                  ? 'bg-[#0f1013] text-white font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg font-semibold inline-flex items-center gap-2'
                  : 'bg-[#faf8f5] hover:bg-white text-neutral-800 border border-[#dcd6cc] font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg inline-flex items-center gap-2 transition'
              }
            >
              <Building2 className="w-3.5 h-3.5 text-[#c94c2d]" />
              <span>1. JANKEN CORPS (AWS · Web · SQL/Mongo · Data Analytics)</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectCompany('HOTBURN STUDIOS')}
              className={
                state.selectedCompany === 'HOTBURN STUDIOS'
                  ? 'bg-[#c94c2d] text-white font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg font-semibold inline-flex items-center gap-2'
                  : 'bg-[#faf8f5] hover:bg-white text-neutral-800 border border-[#dcd6cc] font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg inline-flex items-center gap-2 transition'
              }
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>2. HOTBURN STUDIOS (Blender · Rigging · Gaea · Godot · Story)</span>
            </button>
          </div>

          <span className="font-mono text-xs text-neutral-700">
            Active Track: <strong>{role}</strong>
          </span>
        </div>

        {/* Role, Mode & Persona Selectors */}
        <div className="bg-[#ebe6de] border border-[#ddd7cd] rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="interview-role-select"
              className="block font-mono text-xs uppercase text-neutral-700 mb-1.5"
            >
              CHOSEN CAREER TRACK ({state.selectedCompany})
            </label>
            <select
              id="interview-role-select"
              value={role}
              onChange={(e) => handleRoleChange(e.target.value as InterviewRole)}
              className="w-full bg-[#faf8f5] border border-[#dcd6cc] rounded-lg px-3.5 py-2.5 text-sm font-mono text-neutral-900 focus:outline-none focus:border-[#c94c2d]"
            >
              {companyRoles.map((r) => (
                <option key={r.id} value={r.title}>
                  {r.category} — {r.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="interview-mode-select"
              className="block font-mono text-xs uppercase text-neutral-700 mb-1.5"
            >
              EVALUATION MODE
            </label>
            <select
              id="interview-mode-select"
              value={mode}
              onChange={(e) => setMode(e.target.value as InterviewMode)}
              className="w-full bg-[#faf8f5] border border-[#dcd6cc] rounded-lg px-3.5 py-2.5 text-sm font-mono text-neutral-900 focus:outline-none focus:border-[#c94c2d]"
            >
              {MODES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="interview-persona-select"
              className="block font-mono text-xs uppercase text-neutral-700 mb-1.5"
            >
              INTERVIEWER / REVIEWER PERSONA
            </label>
            <select
              id="interview-persona-select"
              value={persona}
              onChange={(e) => setPersona(e.target.value as InterviewPersona)}
              className="w-full bg-[#faf8f5] border border-[#dcd6cc] rounded-lg px-3.5 py-2.5 text-sm font-mono text-neutral-900 focus:outline-none focus:border-[#c94c2d]"
            >
              {PERSONAS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area: Either Live Mock Interview OR AI Project Review Studio */}
      {studioTab === 'interview' ? (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (5 cols): Real-Time Conversational Transcript */}
            <div className="lg:col-span-5 bg-[#ebe6de] border border-[#ddd7cd] rounded-2xl p-5 flex flex-col h-[580px]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#ddd7cd]">
                <div>
                  <div className="font-mono text-xs uppercase text-[#c94c2d]">
                    LIVE INTERVIEW TRANSCRIPT · {state.selectedCompany}
                  </div>
                  <div className="font-extrabold text-neutral-950 text-base">
                    {role}
                  </div>
                </div>
                <span className="font-mono text-[11px] bg-[#0f1013] text-white px-2.5 py-1 rounded">
                  {transcript.length} Turns
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {transcript.map((m) => {
                  const isAI = m.sender === 'interviewer';
                  return (
                    <div
                      key={m.id}
                      className={`rounded-xl p-4 border ${
                        isAI
                          ? 'bg-[#faf8f5] border-[#e2ddd3] text-neutral-900'
                          : 'bg-[#0f1013] border-[#0f1013] text-white ml-4'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[11px] opacity-75 mb-1.5">
                        <span>{m.senderLabel}</span>
                        <span>{m.timestamp}</span>
                      </div>
                      <p className="text-sm leading-relaxed">{m.text}</p>
                      {m.detectedSignal && (
                        <div className="mt-2 pt-2 border-t border-[#e8e3da] font-mono text-[11px] text-[#c94c2d]">
                          Signal Probe: {m.detectedSignal}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <form
                onSubmit={handleSendCandidateResponse}
                className="mt-4 pt-3 border-t border-[#ddd7cd]"
              >
                <label htmlFor="candidate-interview-reply" className="sr-only">
                  Your Career Track Response
                </label>
                <div className="flex gap-2">
                  <input
                    id="candidate-interview-reply"
                    type="text"
                    value={candidateInput}
                    onChange={(e) => setCandidateInput(e.target.value)}
                    placeholder={
                      state.selectedCompany === 'JANKEN CORPS'
                        ? 'Explain your AWS VPC, SQL Workbench index, MongoDB, or Web design...'
                        : 'Explain your Blender topology, rig constraints, Gaea erosion, or Godot script...'
                    }
                    className="flex-1 bg-[#faf8f5] border border-[#dcd6cc] rounded-lg px-3.5 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-[#c94c2d]"
                  />
                  <button
                    type="submit"
                    disabled={isThinking}
                    className="bg-[#c94c2d] hover:bg-[#b33e20] disabled:opacity-50 text-white font-mono text-xs uppercase tracking-wider font-semibold px-4 py-2.5 rounded-lg inline-flex items-center gap-1.5 shrink-0 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isThinking ? '...' : 'Reply'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Center Column (4 cols): Live Collaborative Whiteboard / Code Scratchpad */}
            <div className="lg:col-span-4 bg-[#0c0d0f] border border-neutral-800 rounded-2xl overflow-hidden flex flex-col h-[580px]">
              <div className="px-4 py-3.5 bg-[#141519] border-b border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-mono text-[11px] uppercase text-[#c94c2d]">
                    SHARED TECHNICAL SCRATCHPAD
                  </div>
                  <div className="text-white font-bold text-xs">
                    SQL / Cloud / GDScript / Shader / Story Notes
                  </div>
                </div>
                <Terminal className="w-4 h-4 text-neutral-400" />
              </div>

              <textarea
                value={scratchpad}
                onChange={(e) => setScratchpad(e.target.value)}
                aria-label="Live Interview Code and Architecture Scratchpad"
                spellCheck={false}
                className="flex-1 w-full bg-[#0c0d0f] text-amber-50 p-4 font-mono text-xs leading-relaxed focus:outline-none resize-none"
              />

              <div className="px-4 py-2.5 bg-[#141519] border-t border-white/10 font-mono text-[11px] text-neutral-400 flex items-center justify-between">
                <span>Buffer Length: {scratchpad.length} chars</span>
                <span>Synced with {state.selectedCompany} AI</span>
              </div>
            </div>

            {/* Right Column (3 cols): Live Rubric Telemetry Sidebar */}
            <div className="lg:col-span-3 bg-[#ebe6de] border border-[#ddd7cd] rounded-2xl p-5 space-y-5">
              <div>
                <div className="font-mono text-xs uppercase text-[#c94c2d] mb-1">
                  REAL-TIME TELEMETRY
                </div>
                <h2 className="text-neutral-950 font-extrabold text-lg">
                  Live Career Track Rubric
                </h2>
              </div>

              <div className="space-y-3.5">
                {[
                  { label: 'Problem Solving', val: rubric.problemSolving },
                  { label: 'Technical / Craft Depth', val: rubric.technicalDepth },
                  { label: 'Pipeline & Cleanliness', val: rubric.codeCleanliness },
                  { label: 'Communication Clarity', val: rubric.communicationClarity },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-[#faf8f5] border border-[#e2ddd3] rounded-xl p-3.5"
                  >
                    <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                      <span className="text-neutral-700">{item.label}</span>
                      <span className="font-bold text-neutral-950 tabular-nums">
                        {item.val}/100
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#ebe6de] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#c94c2d] transition-all duration-300"
                        style={{ width: `${item.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleGenerateDebriefPacket}
                disabled={isGeneratingPacket}
                className="w-full bg-[#0f1013] hover:bg-neutral-800 disabled:opacity-50 text-white font-mono text-xs uppercase tracking-wider font-semibold py-3.5 px-4 rounded-xl inline-flex items-center justify-center gap-2 shadow-md transition"
              >
                <FileCheck2 className="w-4 h-4 text-[#c94c2d]" />
                <span>
                  {isGeneratingPacket
                    ? 'Compiling Packet...'
                    : 'End Session & Generate Hiring Packet'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setStudioTab('project-review')}
                className="w-full bg-[#faf8f5] hover:bg-white text-neutral-900 border border-[#dcd6cc] font-mono text-xs uppercase tracking-wider font-semibold py-3 px-4 rounded-xl inline-flex items-center justify-center gap-2 transition"
              >
                <FolderGit2 className="w-4 h-4 text-[#c94c2d]" />
                <span>Switch to AI Project Reviewer →</span>
              </button>
            </div>
          </div>

          {/* Hiring Committee Debrief Packet Viewer */}
          {generatedPacket && (
            <section className="bg-[#ebe6de] border border-[#ddd7cd] rounded-2xl p-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-[#ddd7cd]">
                <div>
                  <div className="text-[#c94c2d] font-mono text-xs uppercase tracking-[0.16em] mb-1">
                    {generatedPacket.company} · FORMAL HIRING COMMITTEE DEBRIEF PACKET
                  </div>
                  <h3 className="text-2xl font-extrabold text-neutral-950">
                    {generatedPacket.role} — {generatedPacket.mode}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                  <span className="bg-emerald-700 text-white px-4 py-2 rounded-lg font-bold">
                    VERDICT: {generatedPacket.decision}
                  </span>
                  <span className="bg-[#0f1013] text-white px-4 py-2 rounded-lg font-bold tabular-nums">
                    COMPOSITE: {generatedPacket.overallScore}/100 (
                    {generatedPacket.recommendedLevel})
                  </span>
                </div>
              </div>

              <p className="text-neutral-800 text-sm leading-relaxed mb-6 bg-[#faf8f5] border border-[#e2ddd3] rounded-xl p-4">
                {generatedPacket.executiveSummary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#faf8f5] border border-[#e2ddd3] rounded-xl p-5">
                  <div className="font-mono text-xs uppercase text-emerald-700 font-bold mb-2.5">
                    VERIFIED TRACK STRENGTHS
                  </div>
                  <ul className="space-y-2 text-xs text-neutral-800 font-mono">
                    {generatedPacket.strengths.map((s, idx) => (
                      <li key={idx}>✓ {s}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#faf8f5] border border-[#e2ddd3] rounded-xl p-5">
                  <div className="font-mono text-xs uppercase text-[#c94c2d] font-bold mb-2.5">
                    CALIBRATION &amp; NEXT MILESTONES
                  </div>
                  <ul className="space-y-2 text-xs text-neutral-800 font-mono">
                    {generatedPacket.gaps.map((g, idx) => (
                      <li key={idx}>• {g}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}
        </div>
      ) : (
        /* Mode 2: AI Project & Portfolio Review Studio */
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (6 cols): Project Submission Form */}
            <form
              onSubmit={handleRunProjectReview}
              className="lg:col-span-6 bg-[#ebe6de] border border-[#ddd7cd] rounded-2xl p-6 space-y-5"
            >
              <div>
                <div className="text-[#c94c2d] font-mono text-xs uppercase tracking-[0.16em] mb-1">
                  SUBMIT COURSEWORK OR PORTFOLIO PROJECT FOR REVIEW
                </div>
                <h2 className="text-2xl font-extrabold text-neutral-950">
                  {state.selectedCompany} — {role} Project Reviewer
                </h2>
                <p className="text-neutral-600 text-xs mt-1">
                  Submit your AWS architecture, SQL Workbench/MongoDB schema, Web UI, or Hotburn
                  Studios Blender model, rig, Gaea terrain, story script, or Godot 4 project for
                  line-by-line review.
                </p>
              </div>

              <div>
                <label
                  htmlFor="proj-title"
                  className="block font-mono text-xs uppercase text-neutral-700 mb-1.5"
                >
                  PROJECT / SCENE / ARCHITECTURE TITLE
                </label>
                <input
                  id="proj-title"
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full bg-[#faf8f5] border border-[#dcd6cc] rounded-lg px-3.5 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-[#c94c2d]"
                />
              </div>

              <div>
                <label
                  htmlFor="proj-tools"
                  className="block font-mono text-xs uppercase text-neutral-700 mb-1.5"
                >
                  TOOLS &amp; STACK USED
                </label>
                <input
                  id="proj-tools"
                  type="text"
                  value={toolsUsed}
                  onChange={(e) => setToolsUsed(e.target.value)}
                  className="w-full bg-[#faf8f5] border border-[#dcd6cc] rounded-lg px-3.5 py-2.5 text-xs font-mono text-neutral-900 focus:outline-none focus:border-[#c94c2d]"
                />
              </div>

              <div>
                <label
                  htmlFor="proj-summary"
                  className="block font-mono text-xs uppercase text-neutral-700 mb-1.5"
                >
                  PROJECT SUMMARY &amp; DESIGN GOALS
                </label>
                <textarea
                  id="proj-summary"
                  rows={3}
                  value={projectSummary}
                  onChange={(e) => setProjectSummary(e.target.value)}
                  className="w-full bg-[#faf8f5] border border-[#dcd6cc] rounded-lg px-3.5 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-[#c94c2d]"
                />
              </div>

              <div>
                <label
                  htmlFor="proj-artifact"
                  className="block font-mono text-xs uppercase text-neutral-700 mb-1.5"
                >
                  CODE / SQL SCHEMA / GDSCRIPT / BLENDER &amp; GAEA SCENE BREAKDOWN
                </label>
                <textarea
                  id="proj-artifact"
                  rows={7}
                  value={projectArtifact}
                  onChange={(e) => setProjectArtifact(e.target.value)}
                  spellCheck={false}
                  className="w-full bg-[#0c0d0f] border border-neutral-800 rounded-xl p-4 font-mono text-xs text-amber-50 focus:outline-none focus:border-[#c94c2d]"
                />
              </div>

              <button
                type="submit"
                disabled={isReviewingProject}
                className="w-full bg-[#c94c2d] hover:bg-[#b33e20] disabled:opacity-50 text-white font-mono text-xs uppercase tracking-wider font-semibold py-3.5 px-5 rounded-xl inline-flex items-center justify-center gap-2 shadow-md transition"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {isReviewingProject
                    ? 'Evaluating Project with Studio Lead AI...'
                    : `Run ${state.selectedCompany} AI Project Review (+350 XP) →`}
                </span>
              </button>
            </form>

            {/* Right Column (6 cols): Project Review Report & Saved Reviews */}
            <div className="lg:col-span-6 space-y-6">
              {activeProjectReview && (
                <div className="bg-[#ebe6de] border border-[#ddd7cd] rounded-2xl p-6 space-y-5">
                  <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-[#ddd7cd]">
                    <div>
                      <div className="text-[#c94c2d] font-mono text-xs uppercase tracking-wider">
                        VERIFIED PROJECT EVALUATION · {activeProjectReview.company}
                      </div>
                      <h3 className="text-xl font-extrabold text-neutral-950 mt-0.5">
                        {activeProjectReview.projectTitle}
                      </h3>
                      <div className="font-mono text-xs text-neutral-600 mt-1">
                        Track: {activeProjectReview.careerTrack} · Submitted{' '}
                        {activeProjectReview.submittedAt}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 font-mono">
                      <span className="bg-[#0f1013] text-white px-3.5 py-1.5 rounded-lg text-sm font-bold tabular-nums">
                        Score: {activeProjectReview.score}/100
                      </span>
                      <span className="bg-emerald-700 text-white px-3 py-1 rounded text-[11px] font-bold">
                        {activeProjectReview.verdict}
                      </span>
                    </div>
                  </div>

                  {/* Tools Pill Box */}
                  <div className="bg-[#faf8f5] border border-[#e2ddd3] rounded-xl p-3.5 font-mono text-xs text-neutral-700">
                    <span className="text-neutral-500 uppercase mr-2">Tools Audited:</span>
                    <strong>{activeProjectReview.toolsUsed}</strong>
                  </div>

                  <p className="text-xs text-neutral-800 leading-relaxed bg-[#faf8f5] border border-[#e2ddd3] rounded-xl p-4">
                    {activeProjectReview.architectureCritique}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-[#faf8f5] border border-[#e2ddd3] rounded-xl p-4">
                      <div className="font-mono text-xs uppercase text-emerald-700 font-bold mb-2">
                        KEY PROJECT STRENGTHS
                      </div>
                      <ul className="space-y-1.5 text-xs font-mono text-neutral-800">
                        {activeProjectReview.strengths.map((s, i) => (
                          <li key={i}>✓ {s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#faf8f5] border border-[#e2ddd3] rounded-xl p-4">
                      <div className="font-mono text-xs uppercase text-[#c94c2d] font-bold mb-2">
                        ACTIONABLE UPGRADES
                      </div>
                      <ul className="space-y-1.5 text-xs font-mono text-neutral-800">
                        {activeProjectReview.improvements.map((imp, i) => (
                          <li key={i}>• {imp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Previous Project Reviews History */}
              <div className="bg-[#ebe6de] border border-[#ddd7cd] rounded-2xl p-5 space-y-3">
                <div className="font-mono text-xs uppercase text-neutral-700">
                  PORTFOLIO REVIEW HISTORY ({state.projectReviews.length})
                </div>
                <div className="space-y-2.5">
                  {state.projectReviews.map((rev) => (
                    <button
                      key={rev.id}
                      type="button"
                      onClick={() => setActiveProjectReview(rev)}
                      className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between gap-3 ${
                        activeProjectReview?.id === rev.id
                          ? 'bg-[#0f1013] text-white border-[#0f1013]'
                          : 'bg-[#faf8f5] text-neutral-900 border-[#e2ddd3] hover:bg-white'
                      }`}
                    >
                      <div>
                        <div className="font-mono text-[11px] text-[#c94c2d]">
                          {rev.company} · {rev.careerTrack}
                        </div>
                        <div className="font-bold text-sm">{rev.projectTitle}</div>
                      </div>
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#c94c2d] text-white shrink-0">
                        {rev.score}/100
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
