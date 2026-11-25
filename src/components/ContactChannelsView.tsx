import React, { useState } from 'react';
import {
  Mail,
  GitBranch,
  Youtube,
  MessageSquare,
  Briefcase,
  ArrowUpRight,
  CheckCircle2,
  Send,
  Building2,
  Flame,
  ExternalLink,
} from 'lucide-react';
import { PartnerCompany } from '../types';
import { useCareer } from '../context/CareerContext';

const UNIFIED_RECIPIENT_EMAIL = 'hotburnstudios@gmail.com';

const DIRECT_CHANNELS = [
  {
    id: 'chan-unified-email',
    name: 'Unified Email Desk (Both Companies)',
    handle: UNIFIED_RECIPIENT_EMAIL,
    topicPreset: 'BOTH COMPANIES — Course, Project Review & Hiring Query',
    icon: Mail,
  },
  {
    id: 'chan-janken-email',
    name: 'JANKEN CORPS Cloud, Web & Data Desk',
    handle: `JANKEN CORPS → ${UNIFIED_RECIPIENT_EMAIL}`,
    topicPreset: 'JANKEN CORPS — AWS Cloud / Web / SQL / Data Analytics Query',
    icon: Building2,
  },
  {
    id: 'chan-hotburn-email',
    name: 'HOTBURN STUDIOS 3D, Gaea & Godot Desk',
    handle: `HOTBURN STUDIOS → ${UNIFIED_RECIPIENT_EMAIL}`,
    topicPreset: 'HOTBURN STUDIOS — Blender / Rigger / Gaea / Godot Showreel Query',
    icon: Flame,
  },
  {
    id: 'chan-github',
    name: 'GitHub & Showreel Repository',
    handle: 'github.com/janken-hotburn-labs',
    topicPreset: 'Project & Portfolio Evaluation Review',
    icon: GitBranch,
  },
  {
    id: 'chan-discord',
    name: 'Discord Training Cohort',
    handle: 'discord.gg/janken-hotburn',
    topicPreset: 'Course & Career Track Mentorship',
    icon: MessageSquare,
  },
];

const INQUIRY_TOPICS = [
  'BOTH COMPANIES — Course, Project Review & Hiring Query',
  'JANKEN CORPS — AWS Cloud / Web / SQL / Data Analytics Query',
  'HOTBURN STUDIOS — Blender / Rigger / Gaea / Godot Showreel Query',
  'Project & Portfolio Evaluation Review',
  'Course & Career Track Mentorship',
];

export const ContactChannelsView: React.FC = () => {
  const { state, submitInquiry } = useCareer();

  const [name, setName] = useState(state.name);
  const [email, setEmail] = useState(state.email);
  const [companyScope, setCompanyScope] = useState<'BOTH' | PartnerCompany>('BOTH');
  const [topic, setTopic] = useState(INQUIRY_TOPICS[0]);
  const [message, setMessage] = useState('');
  const [connectedChannelId, setConnectedChannelId] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [formNotice, setFormNotice] = useState<string | null>(null);
  const [lastMailtoUrl, setLastMailtoUrl] = useState<string | null>(null);

  const handleChannelConnect = (chan: (typeof DIRECT_CHANNELS)[number]) => {
    setConnectedChannelId(chan.id);
    setTopic(chan.topicPreset);
    setMessage(
      `Hello JANKEN CORPS & HOTBURN STUDIOS Team (${UNIFIED_RECIPIENT_EMAIL}),\n\nI am training in the "${state.targetRole}" track (Dossier ID: ${state.dossierHash}). I would like to request feedback on my coursework / project portfolio.`
    );
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormNotice('Please complete your name, email address, and query message.');
      return;
    }

    setIsSending(true);
    const primaryCompany: PartnerCompany =
      companyScope === 'BOTH' ? state.selectedCompany : companyScope;
    const formattedTopic =
      companyScope === 'BOTH' ? `[BOTH COMPANIES] ${topic}` : `[${companyScope}] ${topic}`;

    const result = await submitInquiry({
      company: primaryCompany,
      name: name.trim(),
      email: email.trim(),
      topic: formattedTopic,
      message: message.trim(),
    });

    setIsSending(false);
    setLastMailtoUrl(result.mailtoUrl);
    setMessage('');
    setFormNotice(
      `Query dispatched for ${companyScope === 'BOTH' ? 'BOTH COMPANIES (JANKEN CORPS & HOTBURN STUDIOS)' : companyScope} to ${result.recipientEmail} and saved to the database!`
    );
  };

  return (
    <div>
      {/* Top Black Banner */}
      <section className="bg-[#0c0d0f] py-14 px-6 lg:px-20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-[#c94c2d] font-mono text-xs uppercase tracking-[0.18em] mb-3">
            SKILLFORGE LAB · UNIFIED EMAIL SENDER FOR BOTH COMPANIES · {UNIFIED_RECIPIENT_EMAIL}
          </div>
          <h1 className="text-white text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            SkillForge Lab Unified Query &amp; Email Desk
          </h1>
          <p className="text-neutral-300 text-base lg:text-lg max-w-2xl leading-relaxed">
            Any query or project submission you send for <strong className="text-white">JANKEN CORPS</strong>{' '}
            (AWS Cloud, Web Designing, SQL/MongoDB, Data Analytics) or{' '}
            <strong className="text-white">HOTBURN STUDIOS</strong> (Blender, Rigging, Gaea, Godot
            4, Story) is automatically routed to{' '}
            <strong className="text-[#c94c2d] font-mono">{UNIFIED_RECIPIENT_EMAIL}</strong>.
          </p>
        </div>
      </section>

      {/* Main Twin-Column Split Panel Layout */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Panel (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-[#ebe6de] border border-[#ddd7cd] rounded-2xl p-7 space-y-6">
          <div>
            <div className="text-[#c94c2d] font-mono text-xs uppercase tracking-[0.15em] mb-2">
              OFFICIAL DESTINATION INBOX
            </div>
            <h2 className="text-neutral-950 text-2xl font-extrabold mb-2">
              Both Companies Route Here
            </h2>
            <div className="bg-[#0f1013] text-white rounded-xl p-4 font-mono text-xs space-y-1.5">
              <div className="text-neutral-400 uppercase text-[10px]">
                UNIFIED RECIPIENT FOR JANKEN CORPS &amp; HOTBURN STUDIOS:
              </div>
              <div className="text-base font-bold text-[#c94c2d] break-all">
                {UNIFIED_RECIPIENT_EMAIL}
              </div>
              <div className="text-[11px] text-emerald-400">
                ✓ Cloud Firestore + Email Relay Active
              </div>
            </div>
          </div>

          <div className="space-y-3.5">
            {DIRECT_CHANNELS.map((chan) => {
              const IconComponent = chan.icon;
              const isConnected = connectedChannelId === chan.id;
              return (
                <div
                  key={chan.id}
                  className="bg-[#faf8f5] border border-[#e2ddd3] rounded-xl p-4 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-[#f2eee7] border border-[#e0dbd1] flex items-center justify-center text-[#c94c2d] shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-extrabold text-neutral-950 text-sm truncate">
                        {chan.name}
                      </div>
                      <div className="font-mono text-xs text-neutral-500 truncate">
                        {chan.handle}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleChannelConnect(chan)}
                    className={`font-mono text-xs font-medium px-3.5 py-2 rounded-lg flex items-center gap-1.5 shrink-0 transition ${
                      isConnected
                        ? 'bg-[#0f1013] text-white'
                        : 'bg-[#e6e1d8] hover:bg-[#dad4c8] text-neutral-900'
                    }`}
                  >
                    <span>{isConnected ? 'Filled' : 'Select'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-[#ebe6de] border border-[#ddd7cd] rounded-2xl p-8">
          <div className="text-[#c94c2d] font-mono text-xs uppercase tracking-[0.15em] mb-2">
            DIRECT EMAIL SENDER → {UNIFIED_RECIPIENT_EMAIL}
          </div>
          <h2 className="text-neutral-950 text-2xl font-extrabold mb-6">
            Send a Query to Both Companies
          </h2>

          {formNotice && (
            <div className="mb-5 bg-emerald-100 border border-emerald-300 text-emerald-950 font-mono text-xs p-4 rounded-xl space-y-2.5">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{formNotice}</span>
              </div>
              {lastMailtoUrl && (
                <div className="pt-1">
                  <a
                    href={lastMailtoUrl}
                    className="inline-flex items-center gap-1.5 bg-[#0f1013] hover:bg-neutral-800 text-white px-3.5 py-2 rounded-lg font-mono text-xs font-semibold transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#c94c2d]" />
                    <span>Also Open in Gmail / Mail Client ({UNIFIED_RECIPIENT_EMAIL}) →</span>
                  </a>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleFormSubmit}>
            {/* Company Routing Selector */}
            <div className="mb-5">
              <div className="block font-mono uppercase text-xs text-neutral-700 mb-2">
                WHICH COMPANY IS THIS QUERY FOR? (ALL SENT TO {UNIFIED_RECIPIENT_EMAIL})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'BOTH' as const, label: 'Both Companies' },
                  { id: 'JANKEN CORPS' as const, label: '1. JANKEN CORPS' },
                  { id: 'HOTBURN STUDIOS' as const, label: '2. HOTBURN STUDIOS' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setCompanyScope(opt.id)}
                    className={`py-2.5 px-3 rounded-lg font-mono text-xs font-semibold border transition ${
                      companyScope === opt.id
                        ? 'bg-[#0f1013] text-white border-[#0f1013]'
                        : 'bg-[#faf8f5] text-neutral-800 border-[#dcd6cc] hover:bg-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2-Column Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-mono uppercase text-xs text-neutral-700 mb-2"
                >
                  YOUR NAME
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rohan Bandi"
                  className="w-full bg-[#faf8f5] border border-[#dcd6cc] rounded-lg px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-[#c94c2d]"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-mono uppercase text-xs text-neutral-700 mb-2"
                >
                  YOUR EMAIL ADDRESS
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#faf8f5] border border-[#dcd6cc] rounded-lg px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-[#c94c2d]"
                />
              </div>
            </div>

            {/* Full-Width Select */}
            <div className="mb-5">
              <label
                htmlFor="contact-topic"
                className="block font-mono uppercase text-xs text-neutral-700 mb-2"
              >
                QUERY SUBJECT / CAREER TRACK TOPIC
              </label>
              <select
                id="contact-topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-[#faf8f5] border border-[#dcd6cc] rounded-lg px-4 py-3 text-sm font-mono text-neutral-900 focus:outline-none focus:border-[#c94c2d]"
              >
                {INQUIRY_TOPICS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Full-Width Textarea */}
            <div className="mb-6">
              <label
                htmlFor="contact-message"
                className="block font-mono uppercase text-xs text-neutral-700 mb-2"
              >
                YOUR QUERY MESSAGE (SENT TO {UNIFIED_RECIPIENT_EMAIL})
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your question about courses, project reviews, or job roles at JANKEN CORPS and HOTBURN STUDIOS..."
                className="w-full bg-[#faf8f5] border border-[#dcd6cc] rounded-lg px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-[#c94c2d]"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="bg-[#c94c2d] hover:bg-[#b33e20] disabled:opacity-50 text-white font-mono text-xs uppercase tracking-wider font-semibold px-6 py-3.5 rounded-lg inline-flex items-center gap-2 shadow-sm transition"
            >
              <Send className="w-4 h-4" />
              <span>
                {isSending
                  ? 'Dispatching Query...'
                  : `SEND QUERY TO ${UNIFIED_RECIPIENT_EMAIL} →`}
              </span>
            </button>
          </form>

          {/* Recent Dispatched Inquiries */}
          {state.inquiries.length > 0 && (
            <div className="mt-8 pt-6 border-t border-[#ddd7cd]">
              <div className="font-mono text-xs uppercase text-neutral-600 mb-3">
                SENT EMAIL QUERIES LOG ({state.inquiries.length}) → {UNIFIED_RECIPIENT_EMAIL}
              </div>
              <div className="space-y-2.5">
                {state.inquiries.slice(0, 4).map((inq) => (
                  <div
                    key={inq.id}
                    className="bg-[#faf8f5] border border-[#e2ddd3] rounded-xl p-3.5 text-xs font-mono"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-neutral-500 mb-1">
                      <span className="font-bold text-neutral-900">{inq.topic}</span>
                      <span className="text-emerald-700 font-semibold">
                        To: {inq.recipientEmail || UNIFIED_RECIPIENT_EMAIL} ✓
                      </span>
                    </div>
                    <p className="text-neutral-700 font-sans">{inq.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
