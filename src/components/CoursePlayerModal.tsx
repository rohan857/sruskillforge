import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Copy,
  Check,
  X,
  BookOpen,
  Cpu,
  Award,
  Sparkles,
} from 'lucide-react';
import { CatalogueItem } from '../types';
import { useCareer } from '../context/CareerContext';
import { calculateCourseCompletion } from '../utils/careerEngine';

interface CoursePlayerModalProps {
  item: CatalogueItem | null;
  onClose: () => void;
}

export const CoursePlayerModal: React.FC<CoursePlayerModalProps> = ({ item, onClose }) => {
  const { state, toggleModuleComplete, markQuizPassed } = useCareer();
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!item) return null;

  const safeIndex = Math.min(activeModuleIndex, item.modules.length - 1);
  const currentModule = item.modules[safeIndex];
  const completionPct = calculateCourseCompletion(
    item,
    state.completedModuleIds,
    state.passedQuizIds
  );
  const isModuleCompleted = state.completedModuleIds.includes(currentModule.id);
  const isQuizAlreadyPassed = state.passedQuizIds.includes(currentModule.quiz.id);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(currentModule.codeSnippet.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1800);
  };

  const handleQuizSubmit = () => {
    if (selectedQuizOption === null) return;
    setQuizSubmitted(true);
    if (selectedQuizOption === currentModule.quiz.correctIndex) {
      markQuizPassed(currentModule.quiz.id, currentModule.quiz.xpReward);
      if (!isModuleCompleted) {
        toggleModuleComplete(currentModule.id, 100);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div className="bg-[#f4f1ea] border border-[#ddd7cd] rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Top Dark Header Bar */}
        <div className="bg-[#0c0d0f] px-6 py-5 border-b border-neutral-800 flex items-center justify-between gap-4 shrink-0">
          <div>
            <div className="text-[#c94c2d] font-mono text-xs uppercase tracking-[0.18em] mb-1">
              {item.category} · {item.difficulty}
            </div>
            <h2 className="text-white text-xl sm:text-2xl font-extrabold tracking-tight">
              {item.title}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right font-mono">
              <div className="text-xs text-neutral-400 uppercase">TRACK COMPLETION</div>
              <div className="text-sm font-bold text-white tabular-nums">{completionPct}%</div>
            </div>
            <div className="w-28 h-2.5 bg-neutral-800 rounded-full overflow-hidden hidden sm:block">
              <div
                className="h-full bg-[#c94c2d] transition-all duration-300"
                style={{ width: `${completionPct}%` }}
              />
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Course Workspace"
              className="p-2 rounded-lg bg-[#16181d] border border-white/15 text-neutral-300 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Workspace Split */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12">
          {/* Left Syllabus Sidebar */}
          <aside className="lg:col-span-4 bg-[#ebe6de] border-b lg:border-b-0 lg:border-r border-[#ddd7cd] p-5 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-neutral-600 mb-3">
                SYLLABUS MODULES ({item.modules.length})
              </div>
              <div className="space-y-2.5">
                {item.modules.map((mod, idx) => {
                  const modDone = state.completedModuleIds.includes(mod.id);
                  const quizDone = state.passedQuizIds.includes(mod.quiz.id);
                  const isActive = idx === safeIndex;

                  return (
                    <div
                      key={mod.id}
                      className={`rounded-xl border p-3.5 transition ${
                        isActive
                          ? 'bg-[#0f1013] text-white border-[#0f1013]'
                          : 'bg-[#faf8f5] text-neutral-900 border-[#e2ddd3] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2.5">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveModuleIndex(idx);
                            setSelectedQuizOption(null);
                            setQuizSubmitted(false);
                          }}
                          className="text-left flex-1 font-bold text-sm leading-snug"
                        >
                          {mod.title}
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleModuleComplete(mod.id, 100)}
                          aria-label={`Mark ${mod.title} complete`}
                          className="shrink-0 mt-0.5"
                        >
                          {modDone ? (
                            <CheckCircle2 className="w-5 h-5 text-[#c94c2d]" />
                          ) : (
                            <Circle
                              className={`w-5 h-5 ${
                                isActive ? 'text-neutral-400' : 'text-neutral-400'
                              }`}
                            />
                          )}
                        </button>
                      </div>
                      <div
                        className={`mt-2 flex items-center justify-between font-mono text-[11px] ${
                          isActive ? 'text-neutral-300' : 'text-neutral-500'
                        }`}
                      >
                        <span>{mod.duration}</span>
                        <span>{quizDone ? 'QUIZ VERIFIED ✓' : `+${mod.quiz.xpReward} XP QUIZ`}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Skills Covered Box */}
            <div className="mt-6 bg-[#faf8f5] border border-[#e2ddd3] rounded-xl p-4">
              <div className="font-mono text-xs uppercase text-neutral-600 mb-2">
                VERIFIED COMPETENCIES
              </div>
              <div className="text-xs font-mono text-neutral-800 leading-relaxed">
                {item.skillsCovered.join(' · ')}
              </div>
            </div>
          </aside>

          {/* Right Technical Lesson Viewer */}
          <div className="lg:col-span-8 p-6 lg:p-8 space-y-7 bg-drafting-grid">
            {/* Module Header & Complete Toggle */}
            <div className="bg-[#faf8f5] border border-[#e2ddd3] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-mono text-xs text-[#c94c2d] uppercase tracking-wider mb-1">
                  MODULE {safeIndex + 1} OF {item.modules.length} · {currentModule.duration}
                </div>
                <h3 className="text-2xl font-extrabold text-neutral-950 tracking-tight">
                  {currentModule.title}
                </h3>
                <p className="text-neutral-700 text-sm mt-2 leading-relaxed">
                  {currentModule.summary}
                </p>
              </div>
              <button
                type="button"
                onClick={() => toggleModuleComplete(currentModule.id, 100)}
                className={`px-4 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold shrink-0 transition ${
                  isModuleCompleted
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#0f1013] hover:bg-neutral-800 text-white'
                }`}
              >
                {isModuleCompleted ? 'Module Completed ✓' : 'Mark Module Complete'}
              </button>
            </div>

            {/* Architecture Blueprint Diagram */}
            <div className="bg-[#0c0d0f] border border-neutral-800 rounded-xl p-5 text-neutral-200">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#c94c2d]">
                  SYSTEM ARCHITECTURE TOPOLOGY BLUEPRINT
                </span>
                <span className="font-mono text-[11px] text-neutral-400">
                  INVARIANT VERIFIED
                </span>
              </div>
              <pre className="font-mono text-xs leading-relaxed overflow-x-auto text-amber-100/95 bg-[#141519] p-4 rounded-lg border border-white/10">
                {currentModule.architectureDiagram}
              </pre>
            </div>

            {/* Production Code Reference */}
            <div className="bg-[#0c0d0f] border border-neutral-800 rounded-xl overflow-hidden">
              <div className="px-4 py-2.5 bg-[#141519] border-b border-white/10 flex items-center justify-between">
                <span className="font-mono text-xs text-neutral-300">
                  {currentModule.codeSnippet.filename} ({currentModule.codeSnippet.language})
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="font-mono text-xs text-neutral-300 hover:text-white inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 font-mono text-xs text-neutral-100 overflow-x-auto leading-relaxed">
                {currentModule.codeSnippet.code}
              </pre>
            </div>

            {/* Production Trade-Off Matrix */}
            {currentModule.tradeOffs.length > 0 && (
              <div className="bg-[#faf8f5] border border-[#e2ddd3] rounded-xl p-5">
                <div className="font-mono text-xs uppercase tracking-wider text-[#c94c2d] mb-3">
                  ARCHITECTURAL TRADE-OFF MATRIX
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-[#e2ddd3] font-mono text-neutral-600 uppercase">
                        <th className="py-2 pr-3">Dimension</th>
                        <th className="py-2 pr-3">Selected Pattern</th>
                        <th className="py-2 pr-3">Alternative</th>
                        <th className="py-2">Engineering Verdict</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e8e3da]">
                      {currentModule.tradeOffs.map((row, i) => (
                        <tr key={i} className="text-neutral-800">
                          <td className="py-2.5 pr-3 font-bold">{row.dimension}</td>
                          <td className="py-2.5 pr-3 font-mono text-[#c94c2d]">
                            {row.chosenApproach}
                          </td>
                          <td className="py-2.5 pr-3 font-mono text-neutral-500">
                            {row.alternative}
                          </td>
                          <td className="py-2.5 text-neutral-700">{row.verdict}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Interactive Module Checkpoint Quiz */}
            <div className="bg-[#ebe6de] border border-[#ddd7cd] rounded-xl p-6">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#c94c2d]">
                  MODULE CHECKPOINT QUIZ · +{currentModule.quiz.xpReward} XP
                </span>
                {isQuizAlreadyPassed && (
                  <span className="font-mono text-xs text-emerald-700 font-semibold">
                    VERIFIED &amp; XP AWARDED ✓
                  </span>
                )}
              </div>
              <h4 className="text-neutral-950 font-extrabold text-base mb-4">
                {currentModule.quiz.question}
              </h4>

              <div className="space-y-2.5 mb-4">
                {currentModule.quiz.options.map((opt, idx) => {
                  const isSelected = selectedQuizOption === idx;
                  const isCorrect = idx === currentModule.quiz.correctIndex;
                  let optionStyle =
                    'bg-[#faf8f5] border-[#dcd6cc] text-neutral-900 hover:bg-white';
                  if (quizSubmitted) {
                    if (isCorrect) {
                      optionStyle = 'bg-emerald-50 border-emerald-600 text-emerald-950 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'bg-red-50 border-red-500 text-red-900';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-[#0f1013] border-[#0f1013] text-white font-semibold';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedQuizOption(idx);
                        setQuizSubmitted(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition flex items-center justify-between gap-3 ${optionStyle}`}
                    >
                      <span>{opt}</span>
                      <span className="font-mono text-xs opacity-70">[{idx + 1}]</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleQuizSubmit}
                  disabled={selectedQuizOption === null}
                  className="bg-[#c94c2d] hover:bg-[#b33e20] disabled:opacity-50 text-white font-mono text-xs uppercase tracking-wider font-semibold px-5 py-2.5 rounded-lg transition"
                >
                  Verify Checkpoint Answer →
                </button>

                {quizSubmitted && (
                  <div
                    className={`text-xs font-mono p-3 rounded-lg flex-1 ${
                      selectedQuizOption === currentModule.quiz.correctIndex
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-amber-100 text-amber-900 border border-amber-300'
                    }`}
                  >
                    {selectedQuizOption === currentModule.quiz.correctIndex
                      ? `CORRECT (+${currentModule.quiz.xpReward} XP): ${currentModule.quiz.explanation}`
                      : `INCORRECT — Review invariant: ${currentModule.quiz.explanation}`}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
