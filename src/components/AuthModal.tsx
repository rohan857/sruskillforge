import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Building2,
  Flame,
  LogIn,
  UserPlus,
  Database,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { InterviewRole, PartnerCompany } from '../types';
import { CAREER_TRACK_OPTIONS } from '../seedData';
import { useCareer } from '../context/CareerContext';

export const AuthModal: React.FC = () => {
  const {
    state,
    isAuthModalOpen,
    authModalReason,
    closeAuthModal,
    signInWithGoogle,
    signInWithStudioAccount,
  } = useCareer();

  const [tab, setTab] = useState<'signup' | 'login'>('signup');
  const [name, setName] = useState(state.name === 'Rohan Bandi' ? '' : state.name);
  const [email, setEmail] = useState(
    state.email === 'bandirohan43@gmail.com' ? '' : state.email
  );
  const [selectedCompany, setSelectedCompany] = useState<PartnerCompany>(state.selectedCompany);
  const [selectedRole, setSelectedRole] = useState<InterviewRole>(state.targetRole);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const companyTracks = CAREER_TRACK_OPTIONS.filter((t) => t.company === selectedCompany);

  const handleCompanySelect = (company: PartnerCompany) => {
    setSelectedCompany(company);
    const defaultTrack = CAREER_TRACK_OPTIONS.find((t) => t.company === company)?.title;
    if (defaultTrack) {
      setSelectedRole(defaultTrack);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setIsLoadingGoogle(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('popup') || msg.includes('cancelled') || msg.includes('unauthorized')) {
        setErrorMsg(
          'Google Popup was blocked or closed in the preview window. Use the Instant Studio Account form below to sign in immediately!'
        );
      } else {
        setErrorMsg(
          'Could not complete Google popup sign-in. You can sign in immediately using the Studio Account form below.'
        );
      }
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  const handleStudioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || (tab === 'login' ? 'Rohan Bandi' : '');
    const finalEmail = email.trim();

    if (!finalEmail || !finalEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address to continue.');
      return;
    }
    if (tab === 'signup' && !finalName) {
      setErrorMsg('Please enter your full name so we can generate your career dossier.');
      return;
    }

    signInWithStudioAccount({
      name: finalName || finalEmail.split('@')[0],
      email: finalEmail,
      company: selectedCompany,
      role: selectedRole,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Sign In or Create Account"
    >
      <div className="bg-[#f4f1ea] border border-[#ddd7cd] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
        {/* Top Obsidian Header */}
        <div className="bg-[#0c0d0f] px-6 py-5 border-b border-neutral-800 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#16181d] border border-[#c94c2d]/50 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#c94c2d]" />
            </div>
            <div>
              <div className="text-[#c94c2d] font-mono text-[11px] uppercase tracking-[0.18em]">
                SKILLFORGE LAB · CLOUD DATABASE AUTH
              </div>
              <h2 className="text-white text-xl font-extrabold tracking-tight mt-0.5">
                {tab === 'signup'
                  ? 'Create Your Career Training Account'
                  : 'Sign In to Your Training Portal'}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={closeAuthModal}
            aria-label="Close Login Modal"
            className="p-2 rounded-lg bg-[#16181d] border border-white/15 text-neutral-300 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5 bg-drafting-grid">
          {/* Action Context Banner */}
          <div className="bg-[#ebe6de] border border-[#ddd7cd] rounded-xl p-3.5 flex items-start gap-3">
            <Database className="w-4 h-4 text-[#c94c2d] shrink-0 mt-0.5" />
            <p className="text-xs font-mono text-neutral-800 leading-relaxed">
              {authModalReason}
            </p>
          </div>

          {/* Mode Switcher Tabs (Sign Up vs Log In) */}
          <div className="grid grid-cols-2 gap-2 bg-[#ebe6de] p-1.5 rounded-xl border border-[#ddd7cd]">
            <button
              type="button"
              onClick={() => {
                setTab('signup');
                setErrorMsg(null);
              }}
              className={`py-2.5 px-4 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold inline-flex items-center justify-center gap-2 transition ${
                tab === 'signup'
                  ? 'bg-[#0f1013] text-white shadow-xs'
                  : 'text-neutral-700 hover:text-neutral-950'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5 text-[#c94c2d]" />
              <span>Sign Up (New Learner)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('login');
                setErrorMsg(null);
              }}
              className={`py-2.5 px-4 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold inline-flex items-center justify-center gap-2 transition ${
                tab === 'login'
                  ? 'bg-[#0f1013] text-white shadow-xs'
                  : 'text-neutral-700 hover:text-neutral-950'
              }`}
            >
              <LogIn className="w-3.5 h-3.5 text-[#c94c2d]" />
              <span>Log In (Existing)</span>
            </button>
          </div>

          {/* 1-Click Firebase Google Sign-In */}
          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoadingGoogle}
              className="w-full bg-[#0f1013] hover:bg-neutral-800 disabled:opacity-60 text-white font-mono text-xs uppercase tracking-wider font-semibold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2.5 shadow-md transition"
            >
              <Sparkles className="w-4 h-4 text-[#c94c2d]" />
              <span>
                {isLoadingGoogle
                  ? 'Connecting to Firebase Auth...'
                  : 'Continue with Google (Firebase Cloud Database Sync)'}
              </span>
            </button>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-[#dcd6cc]" />
            <span className="flex-shrink mx-3 font-mono text-[11px] uppercase text-neutral-500">
              OR SIGN IN DIRECTLY WITH EMAIL &amp; TRACK
            </span>
            <div className="flex-grow border-t border-[#dcd6cc]" />
          </div>

          {errorMsg && (
            <div className="bg-amber-100 border border-amber-300 text-amber-950 font-mono text-xs p-3 rounded-xl">
              {errorMsg}
            </div>
          )}

          {/* Direct Studio Account Form */}
          <form onSubmit={handleStudioSubmit} className="space-y-4">
            {tab === 'signup' && (
              <div>
                <label
                  htmlFor="auth-name-input"
                  className="block font-mono text-xs uppercase text-neutral-700 mb-1.5"
                >
                  YOUR FULL NAME
                </label>
                <input
                  id="auth-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rohan Bandi"
                  className="w-full bg-[#faf8f5] border border-[#dcd6cc] rounded-lg px-3.5 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-[#c94c2d]"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="auth-email-input"
                className="block font-mono text-xs uppercase text-neutral-700 mb-1.5"
              >
                EMAIL ADDRESS
              </label>
              <input
                id="auth-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#faf8f5] border border-[#dcd6cc] rounded-lg px-3.5 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-[#c94c2d]"
              />
            </div>

            {/* Choose Company & Track */}
            <div className="space-y-2.5">
              <div className="font-mono text-xs uppercase text-neutral-700">
                SELECT PRIMARY TRAINING COMPANY
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleCompanySelect('JANKEN CORPS')}
                  className={`p-3 rounded-xl border text-left font-mono text-xs transition flex items-center gap-2.5 ${
                    selectedCompany === 'JANKEN CORPS'
                      ? 'bg-[#0f1013] text-white border-[#0f1013] font-semibold'
                      : 'bg-[#faf8f5] text-neutral-800 border-[#dcd6cc] hover:bg-white'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-[#c94c2d] shrink-0" />
                  <div>
                    <div>1. JANKEN CORPS</div>
                    <div className="text-[10px] opacity-75">AWS · Web · SQL · Analytics</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleCompanySelect('HOTBURN STUDIOS')}
                  className={`p-3 rounded-xl border text-left font-mono text-xs transition flex items-center gap-2.5 ${
                    selectedCompany === 'HOTBURN STUDIOS'
                      ? 'bg-[#c94c2d] text-white border-[#c94c2d] font-semibold'
                      : 'bg-[#faf8f5] text-neutral-800 border-[#dcd6cc] hover:bg-white'
                  }`}
                >
                  <Flame className="w-4 h-4 text-amber-300 shrink-0" />
                  <div>
                    <div>2. HOTBURN STUDIOS</div>
                    <div className="text-[10px] opacity-75">3D · Rigging · Gaea · Godot</div>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="auth-track-select"
                className="block font-mono text-xs uppercase text-neutral-700 mb-1.5"
              >
                TARGET CAREER TRACK ({selectedCompany})
              </label>
              <select
                id="auth-track-select"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as InterviewRole)}
                className="w-full bg-[#faf8f5] border border-[#dcd6cc] rounded-lg px-3.5 py-2.5 text-xs font-mono text-neutral-900 focus:outline-none focus:border-[#c94c2d]"
              >
                {companyTracks.map((t) => (
                  <option key={t.id} value={t.title}>
                    {t.category} — {t.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#c94c2d] hover:bg-[#b33e20] text-white font-mono text-xs uppercase tracking-wider font-semibold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 shadow-md transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {tab === 'signup'
                  ? `Create Account & Start ${selectedCompany} Track →`
                  : 'Sign In & Continue to Course →'}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
