/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CatalogueItem, NavTab } from './types';
import { CareerProvider } from './context/CareerContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CatalogueView } from './components/CatalogueView';
import { AIInterviewView } from './components/AIInterviewView';
import { JobBoardView } from './components/JobBoardView';
import { NetworkFeedView } from './components/NetworkFeedView';
import { ContactChannelsView } from './components/ContactChannelsView';
import { CoursePlayerModal } from './components/CoursePlayerModal';
import { CandidateDossierModal } from './components/CandidateDossierModal';
import { AuthModal } from './components/AuthModal';

function JankenCorpsShell() {
  const [activeTab, setActiveTab] = useState<NavTab>('Home');
  const [activeCourseItem, setActiveCourseItem] = useState<CatalogueItem | null>(null);
  const [dossierOpen, setDossierOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-drafting-grid text-neutral-950">
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDossier={() => setDossierOpen(true)}
      />

      <main className="flex-1">
        {activeTab === 'Home' && (
          <HeroBanner
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCourse={(item) => setActiveCourseItem(item)}
            onOpenDossier={() => setDossierOpen(true)}
          />
        )}

        {activeTab === 'Catalogue' && (
          <CatalogueView onOpenCourse={(item) => setActiveCourseItem(item)} />
        )}

        {activeTab === 'AI Interview' && <AIInterviewView />}

        {activeTab === 'Job Board' && <JobBoardView />}

        {activeTab === 'Network' && <NetworkFeedView />}

        {activeTab === 'Contact' && <ContactChannelsView />}
      </main>

      {/* Clean Architectural Footer */}
      <footer className="bg-[#0c0d0f] border-t border-neutral-800 py-8 px-6 lg:px-12 text-neutral-400 font-mono text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            SKILLFORGE LAB · WEB TECH CAREER PORTAL (JANKEN CORPS &amp; HOTBURN STUDIOS) · QUERIES: hotburnstudios@gmail.com
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => setActiveTab('Catalogue')}
              className="hover:text-white transition"
            >
              Courses &amp; Tracks
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('AI Interview')}
              className="hover:text-white transition"
            >
              Mock Interview &amp; Review
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('Job Board')}
              className="hover:text-white transition"
            >
              Jobs &amp; Hiring
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('Contact')}
              className="hover:text-white transition"
            >
              Email Desk (hotburnstudios@gmail.com)
            </button>
            <button
              type="button"
              onClick={() => setDossierOpen(true)}
              className="text-[#c94c2d] hover:underline"
            >
              Candidate Dossier
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Slide-Over Drawers */}
      <CoursePlayerModal
        item={activeCourseItem}
        onClose={() => setActiveCourseItem(null)}
      />

      <CandidateDossierModal
        isOpen={dossierOpen}
        onClose={() => setDossierOpen(false)}
      />

      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <CareerProvider>
      <JankenCorpsShell />
    </CareerProvider>
  );
}
