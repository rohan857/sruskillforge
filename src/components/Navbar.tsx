import React, { useEffect, useState } from 'react';
import {
  Flame,
  ShieldCheck,
  Menu,
  X,
  Gamepad2,
  ChevronDown,
  BookOpen,
  Sparkles,
  Briefcase,
  Users,
  Mail,
  Home,
  LogIn,
  LogOut,
  Cloud,
  CheckCircle2,
} from 'lucide-react';
import { InterviewRole, NavTab, PartnerCompany } from '../types';
import { CAREER_TRACK_OPTIONS } from '../seedData';
import { useCareer } from '../context/CareerContext';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenDossier: () => void;
}

const NAV_ITEMS: { tab: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
  { tab: 'Home', label: 'Home', icon: Home },
  { tab: 'Catalogue', label: 'Courses & Tracks', icon: BookOpen },
  { tab: 'AI Interview', label: 'Interview & Review', icon: Sparkles },
  { tab: 'Job Board', label: 'Jobs & Hiring', icon: Briefcase },
  { tab: 'Network', label: 'Showcase', icon: Users },
  { tab: 'Contact', label: 'Email Desk', icon: Mail },
];

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, onOpenDossier }) => {
  const {
    state,
    authUser,
    isAuthModalOpen,
    openAuthModal,
    logoutUser,
    selectCompanyAndRole,
  } = useCareer();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [companyMenuOpen, setCompanyMenuOpen] = useState(false);

  useEffect(() => {
    if (isAuthModalOpen) {
      setCompanyMenuOpen(false);
      setMobileMenuOpen(false);
    }
  }, [isAuthModalOpen]);

  const jankenTracks = CAREER_TRACK_OPTIONS.filter((t) => t.company === 'JANKEN CORPS');
  const hotburnTracks = CAREER_TRACK_OPTIONS.filter((t) => t.company === 'HOTBURN STUDIOS');

  const handleQuickPickTrack = (company: PartnerCompany, role: InterviewRole) => {
    selectCompanyAndRole(company, role);
    setCompanyMenuOpen(false);
    onSelectTab('Catalogue');
  };

  return (
    <header className="h-[72px] bg-[#0c0d0f] border-b border-white/10 px-4 lg:px-6 flex items-center justify-between gap-2 sticky top-0 z-50">
      {/* Left Brand Cluster + Interactive Company & Career Track Mega-Menu */}
      <div className="flex items-center gap-2.5 shrink-0 relative">
        <button
          type="button"
          onClick={() => {
            setCompanyMenuOpen(false);
            onSelectTab('Home');
          }}
          className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
          aria-label="SkillForge Lab Home"
        >
          <div className="w-10 h-10 rounded-xl bg-[#16181d] border border-[#c94c2d]/40 flex items-center justify-center shadow-inner group-hover:border-[#c94c2d] transition">
            {state.selectedCompany === 'HOTBURN STUDIOS' ? (
              <Gamepad2 className="w-5 h-5 text-[#c94c2d]" />
            ) : (
              <Flame className="w-5 h-5 text-[#c94c2d]" />
            )}
          </div>
          <div>
            <div className="text-white font-extrabold tracking-wider text-sm sm:text-base leading-none whitespace-nowrap">
              SKILLFORGE LAB
            </div>
            <div className="text-neutral-400 font-mono text-[10px] tracking-[0.14em] uppercase mt-1 whitespace-nowrap">
              WEB TECH &amp; CAREER HUB
            </div>
          </div>
        </button>

        {/* User-Friendly Company & Track Switcher Dropdown Button */}
        <div className="relative hidden md:block">
          <button
            type="button"
            onClick={() => setCompanyMenuOpen((prev) => !prev)}
            className="inline-flex items-center gap-1.5 bg-[#16181d] hover:bg-[#1f2229] border border-white/15 text-neutral-200 font-mono text-[11px] uppercase tracking-wider px-2.5 py-2 rounded-lg transition whitespace-nowrap"
          >
            <span>Switch Company / Track</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#c94c2d]" />
          </button>

          {companyMenuOpen && (
            <div className="absolute left-0 top-12 w-[560px] bg-[#121418] border border-white/15 rounded-2xl shadow-2xl p-5 z-50 grid grid-cols-2 gap-5">
              {/* Column 1: JANKEN CORPS */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    selectCompanyAndRole('JANKEN CORPS');
                    setCompanyMenuOpen(false);
                  }}
                  className="w-full text-left flex items-center justify-between px-3 py-2 rounded-lg bg-[#1b1e24] hover:bg-[#c94c2d] text-white font-mono text-xs font-bold transition"
                >
                  <span className="flex items-center gap-2">
                    <Cloud className="w-3.5 h-3.5 text-[#c94c2d]" />
                    1. JANKEN CORPS
                  </span>
                  {state.selectedCompany === 'JANKEN CORPS' && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </button>
                <div className="space-y-1">
                  {jankenTracks.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleQuickPickTrack('JANKEN CORPS', t.title)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition flex flex-col ${
                        state.targetRole === t.title
                          ? 'bg-[#c94c2d]/20 border border-[#c94c2d]/50 text-white'
                          : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="font-mono text-[10px] text-[#c94c2d] uppercase">
                        {t.category}
                      </span>
                      <span className="font-bold">{t.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Column 2: HOTBURN STUDIOS */}
              <div className="space-y-2.5 border-l border-white/10 pl-4">
                <button
                  type="button"
                  onClick={() => {
                    selectCompanyAndRole('HOTBURN STUDIOS');
                    setCompanyMenuOpen(false);
                  }}
                  className="w-full text-left flex items-center justify-between px-3 py-2 rounded-lg bg-[#1b1e24] hover:bg-[#c94c2d] text-white font-mono text-xs font-bold transition"
                >
                  <span className="flex items-center gap-2">
                    <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
                    2. HOTBURN STUDIOS
                  </span>
                  {state.selectedCompany === 'HOTBURN STUDIOS' && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </button>
                <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
                  {hotburnTracks.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleQuickPickTrack('HOTBURN STUDIOS', t.title)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition flex flex-col ${
                        state.targetRole === t.title
                          ? 'bg-[#c94c2d]/20 border border-[#c94c2d]/50 text-white'
                          : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="font-mono text-[10px] text-amber-400 uppercase">
                        {t.category}
                      </span>
                      <span className="font-bold">{t.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Navigation Cluster (Desktop) */}
      <div className="hidden xl:flex items-center gap-1">
        <nav aria-label="Primary Navigation" className="flex items-center gap-0.5">
          {NAV_ITEMS.map(({ tab, label, icon: Icon }) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setCompanyMenuOpen(false);
                  onSelectTab(tab);
                }}
                className={
                  isActive
                    ? 'bg-[#c94c2d] text-white px-3 py-2 rounded-lg text-xs font-semibold shadow-sm whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 transition'
                    : 'text-neutral-200 hover:text-white hover:bg-white/5 px-2.5 py-2 rounded-lg text-xs font-medium transition whitespace-nowrap shrink-0 inline-flex items-center gap-1.5'
                }
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        <div className="h-5 w-[1px] bg-neutral-800 mx-1.5" />

        {/* Auth Status / Login Button + Dossier Button */}
        {authUser ? (
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={onOpenDossier}
              className="border border-emerald-500/40 bg-[#141519] hover:border-emerald-400 text-neutral-100 px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition whitespace-nowrap shrink-0"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="max-w-[100px] truncate">{authUser.displayName}</span>
            </button>
            <button
              type="button"
              onClick={() => logoutUser()}
              title="Sign Out"
              aria-label="Sign Out"
              className="p-2 rounded-lg bg-[#16181d] border border-white/10 text-neutral-400 hover:text-white transition"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() =>
                openAuthModal(
                  'Sign in or create an account to save your courses, mock interviews, and project reviews to the database.'
                )
              }
              className="bg-[#16181d] hover:bg-[#c94c2d] border border-[#c94c2d]/50 text-white px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5 transition whitespace-nowrap shrink-0"
            >
              <LogIn className="w-3.5 h-3.5 text-[#c94c2d]" />
              <span>Log In / Sign Up</span>
            </button>
            <button
              type="button"
              onClick={onOpenDossier}
              className="border border-neutral-700 bg-[#141519] hover:border-neutral-500 text-neutral-200 px-2.5 py-1.5 rounded-full text-xs font-mono flex items-center gap-1 transition whitespace-nowrap shrink-0"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#c94c2d]" />
              <span>Dossier</span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile / Tablet Controls */}
      <div className="flex xl:hidden items-center gap-2">
        {!authUser && (
          <button
            type="button"
            onClick={() => openAuthModal()}
            className="bg-[#c94c2d] text-white px-3 py-1.5 rounded-lg text-xs font-mono font-semibold whitespace-nowrap"
          >
            Log In
          </button>
        )}
        <button
          type="button"
          onClick={onOpenDossier}
          className="border border-neutral-700 bg-[#141519] hover:border-neutral-500 text-neutral-200 px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 whitespace-nowrap"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#c94c2d]" />
          <span>{state.eloRating}</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle Navigation Menu"
          className="p-2 rounded-lg bg-[#16181d] border border-white/10 text-neutral-200 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-[72px] left-0 right-0 bg-[#0c0d0f] border-b border-neutral-800 px-6 py-4 flex flex-col gap-1.5 shadow-2xl z-50">
          <div className="flex items-center gap-2 pb-2 mb-2 border-b border-neutral-800">
            <button
              type="button"
              onClick={() => selectCompanyAndRole('JANKEN CORPS')}
              className={`flex-1 py-2 rounded-lg font-mono text-xs font-bold ${
                state.selectedCompany === 'JANKEN CORPS'
                  ? 'bg-[#c94c2d] text-white'
                  : 'bg-[#16181d] text-neutral-300'
              }`}
            >
              1. JANKEN CORPS
            </button>
            <button
              type="button"
              onClick={() => selectCompanyAndRole('HOTBURN STUDIOS')}
              className={`flex-1 py-2 rounded-lg font-mono text-xs font-bold ${
                state.selectedCompany === 'HOTBURN STUDIOS'
                  ? 'bg-[#c94c2d] text-white'
                  : 'bg-[#16181d] text-neutral-300'
              }`}
            >
              2. HOTBURN STUDIOS
            </button>
          </div>
          {NAV_ITEMS.map(({ tab, label, icon: Icon }) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  onSelectTab(tab);
                  setMobileMenuOpen(false);
                }}
                className={
                  isActive
                    ? 'bg-[#c94c2d] text-white px-4 py-2.5 rounded-lg text-sm font-semibold text-left flex items-center gap-2'
                    : 'text-neutral-200 hover:bg-white/5 px-4 py-2.5 rounded-lg text-sm font-medium text-left flex items-center gap-2'
                }
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
