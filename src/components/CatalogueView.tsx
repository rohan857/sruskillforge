import React, { useMemo, useState } from 'react';
import { Search, Cloud, Gamepad2, Layers, Lock, CheckCircle2 } from 'lucide-react';
import { CatalogueCategory, CatalogueItem, CompanyFilter } from '../types';
import { CATALOGUE_ITEMS } from '../seedData';
import { useCareer } from '../context/CareerContext';
import { calculateCourseCompletion } from '../utils/careerEngine';

interface CatalogueViewProps {
  onOpenCourse: (item: CatalogueItem) => void;
}

const JANKEN_CATEGORIES: CatalogueCategory[] = [
  'AWS CLOUD',
  'WEB DESIGNING',
  'DATA MANAGING (SQL / MONGODB)',
  'DATA ANALYTICS',
];

const HOTBURN_CATEGORIES: CatalogueCategory[] = [
  'BLENDER & 3D MODELLING',
  'ANIMATION & RIGGING',
  'WORLD DESIGN, GAEA & ENV ART',
  'GODOT, TECH ART & STORY',
];

export const CatalogueView: React.FC<CatalogueViewProps> = ({ onOpenCourse }) => {
  const { state, authUser, requireAuth, selectCompanyAndRole } = useCareer();
  const [companyFilter, setCompanyFilter] = useState<CompanyFilter>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<CatalogueCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const handleStartCourse = (item: CatalogueItem) => {
    requireAuth(
      `Sign in or create a free account to start "${item.title}" and save your completed modules to the database.`,
      () => onOpenCourse(item)
    );
  };

  const visibleCategories: CatalogueCategory[] = useMemo(() => {
    if (companyFilter === 'JANKEN CORPS') return ['ALL', ...JANKEN_CATEGORIES];
    if (companyFilter === 'HOTBURN STUDIOS') return ['ALL', ...HOTBURN_CATEGORIES];
    return ['ALL', ...JANKEN_CATEGORIES, ...HOTBURN_CATEGORIES];
  }, [companyFilter]);

  const categoryCounts = useMemo(() => {
    const counts: Record<CatalogueCategory, number> = {
      ALL: 0,
      'AWS CLOUD': 0,
      'WEB DESIGNING': 0,
      'DATA MANAGING (SQL / MONGODB)': 0,
      'DATA ANALYTICS': 0,
      'BLENDER & 3D MODELLING': 0,
      'ANIMATION & RIGGING': 0,
      'WORLD DESIGN, GAEA & ENV ART': 0,
      'GODOT, TECH ART & STORY': 0,
    };
    for (const item of CATALOGUE_ITEMS) {
      if (companyFilter === 'ALL' || item.company === companyFilter) {
        counts.ALL += 1;
        counts[item.category] += 1;
      }
    }
    return counts;
  }, [companyFilter]);

  const filteredItems = useMemo(() => {
    return CATALOGUE_ITEMS.filter((item) => {
      const matchesCompany = companyFilter === 'ALL' || item.company === companyFilter;
      const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCompany && matchesCat;
      const inTitle = item.title.toLowerCase().includes(q);
      const inSub = item.categorySubLabel.toLowerCase().includes(q);
      const inDesc = item.description.toLowerCase().includes(q);
      const inSkills = item.skillsCovered.some((s) => s.toLowerCase().includes(q));
      return matchesCompany && matchesCat && (inTitle || inSub || inDesc || inSkills);
    });
  }, [companyFilter, selectedCategory, searchQuery]);

  return (
    <div>
      {/* Top Black Banner */}
      <section className="bg-[#0c0d0f] py-14 px-6 lg:px-20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-[#c94c2d] font-mono text-xs uppercase tracking-[0.18em] mb-3">
            SKILLFORGE LAB · MULTI-COMPANY COURSE &amp; TRAINING CATALOGUE
          </div>
          <h1 className="text-white text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            SkillForge Lab Training Academy
          </h1>
          <p className="text-neutral-300 text-base lg:text-lg max-w-3xl leading-relaxed">
            Browse all courses freely across partner companies <strong>JANKEN CORPS</strong> (AWS Cloud, Web Designing,
            SQL/SQL Workbench/MongoDB Data Managing, Data Analytics) and{' '}
            <strong>HOTBURN STUDIOS</strong> (3D Modeller, Animator, Rigger, Technical Artist, World
            Designer, Environmental Artist, Story Writer/Director, Godot 4, Blender, Gaea). Click{' '}
            <strong>Start Course</strong> on any module to sign in and begin training.
          </p>
        </div>
      </section>

      {/* Stone Filter Bar */}
      <div className="max-w-7xl mx-auto mt-10 px-6 lg:px-8 space-y-4">
        <div className="bg-[#ebe6de] border border-[#ddd7cd] rounded-xl p-4 space-y-3.5">
          {/* Top Row: Partner Company Tabs + Search Input */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 pb-3 border-b border-[#ddd7cd]">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setCompanyFilter('ALL');
                  setSelectedCategory('ALL');
                }}
                className={
                  companyFilter === 'ALL'
                    ? 'bg-[#0f1013] text-white font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg font-semibold flex items-center gap-1.5'
                    : 'bg-[#faf8f5] hover:bg-white text-neutral-800 border border-[#dcd6cc] font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition flex items-center gap-1.5'
                }
              >
                <Layers className="w-3.5 h-3.5 text-[#c94c2d]" />
                <span>ALL COMPANIES ({CATALOGUE_ITEMS.length})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCompanyFilter('JANKEN CORPS');
                  setSelectedCategory('ALL');
                  selectCompanyAndRole('JANKEN CORPS');
                }}
                className={
                  companyFilter === 'JANKEN CORPS'
                    ? 'bg-[#c94c2d] text-white font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg font-semibold flex items-center gap-1.5'
                    : 'bg-[#faf8f5] hover:bg-white text-neutral-800 border border-[#dcd6cc] font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition flex items-center gap-1.5'
                }
              >
                <Cloud className="w-3.5 h-3.5" />
                <span>1. JANKEN CORPS (AWS · WEB · SQL/MONGO · ANALYTICS)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCompanyFilter('HOTBURN STUDIOS');
                  setSelectedCategory('ALL');
                  selectCompanyAndRole('HOTBURN STUDIOS');
                }}
                className={
                  companyFilter === 'HOTBURN STUDIOS'
                    ? 'bg-[#c94c2d] text-white font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg font-semibold flex items-center gap-1.5'
                    : 'bg-[#faf8f5] hover:bg-white text-neutral-800 border border-[#dcd6cc] font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition flex items-center gap-1.5'
                }
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>2. HOTBURN STUDIOS (BLENDER · RIGGING · GAEA · GODOT · STORY)</span>
              </button>
            </div>

            {/* Right Search Input */}
            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AWS, SQL, Godot, Blender, Gaea..."
                aria-label="Search Catalogue Tracks"
                className="bg-[#faf8f5] border border-[#dcd6cc] rounded-lg pl-9 pr-4 py-2 text-sm font-mono text-neutral-800 placeholder:text-neutral-400 w-full focus:outline-none focus:border-[#c94c2d]"
              />
            </div>
          </div>

          {/* Second Row: Domain Category Pills */}
          <div
            className="flex flex-wrap items-center gap-2"
            role="tablist"
            aria-label="Catalogue Category Filter"
          >
            {visibleCategories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={
                    isActive
                      ? 'bg-[#0f1013] text-white font-mono text-xs uppercase tracking-wider px-3.5 py-2 rounded-lg font-semibold whitespace-nowrap shrink-0'
                      : 'bg-[#faf8f5] hover:bg-white text-neutral-800 border border-[#dcd6cc] font-mono text-xs uppercase tracking-wider px-3.5 py-2 rounded-lg transition whitespace-nowrap shrink-0'
                  }
                >
                  {category} ({categoryCounts[category]})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3-Column Card Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {filteredItems.length === 0 ? (
          <div className="bg-[#faf8f5] border border-[#e2ddd3] rounded-2xl p-12 text-center">
            <div className="font-mono text-xs uppercase text-[#c94c2d] mb-2">
              NO MATCHING TRACKS
            </div>
            <h3 className="text-xl font-extrabold text-neutral-950 mb-2">
              No courses matched &ldquo;{searchQuery}&rdquo;
            </h3>
            <button
              type="button"
              onClick={() => {
                setCompanyFilter('ALL');
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              className="mt-3 bg-[#0f1013] text-white font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg"
            >
              Reset Catalogue Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredItems.map((item) => {
              const completionPct = calculateCourseCompletion(
                item,
                state.completedModuleIds,
                state.passedQuizIds
              );
              const displayBadge = completionPct === 100 ? 'FINISHED' : item.statusBadge;

              return (
                <article
                  key={item.id}
                  onClick={() => handleStartCourse(item)}
                  className="bg-[#faf8f5] border border-[#e2ddd3] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col cursor-pointer group"
                >
                  {/* Top Media Container */}
                  <div className="h-56 relative overflow-hidden bg-neutral-900">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute top-3 left-3 bg-[#141518]/90 backdrop-blur-md border border-white/15 text-white font-mono text-[11px] uppercase tracking-wider px-3 py-1 rounded-md shadow-sm">
                      {item.company} · {displayBadge}
                    </span>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[11px] text-neutral-200">
                      <span>{item.skillsCovered.slice(0, 2).join(' · ')}</span>
                      <span className="bg-[#0c0d0f]/80 px-2.5 py-0.5 rounded border border-white/15 tabular-nums">
                        {completionPct}% Ready
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[#c94c2d] font-mono text-xs font-semibold mb-1.5">
                        {item.category}
                      </div>
                      <h2 className="text-neutral-950 font-extrabold text-xl tracking-tight mb-2 group-hover:text-[#c94c2d] transition-colors">
                        {item.title}
                      </h2>
                      <p className="text-neutral-600 text-sm line-clamp-2 mb-4">
                        {item.description}
                      </p>
                    </div>

                    {/* Metadata Footer */}
                    <div className="pt-4 border-t border-[#e8e3da] flex items-center justify-between gap-2 font-mono text-xs">
                      <span className="text-neutral-700 truncate">
                        {item.difficulty} · {item.duration}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartCourse(item);
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
        )}
      </div>
    </div>
  );
};
