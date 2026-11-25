import React, { useMemo, useState } from 'react';
import {
  Bookmark,
  Plus,
  ShieldCheck,
  ThumbsUp,
} from 'lucide-react';
import { FeedCategory } from '../types';
import { useCareer } from '../context/CareerContext';

const FEED_CATEGORIES: FeedCategory[] = [
  'All Signals',
  'Cloud, Web & SQL Breakdowns',
  'Game Dev, Godot & 3D Showcases',
  'Project Reviews & Post-Mortems',
  'Open Referral Drops',
];

export const NetworkFeedView: React.FC = () => {
  const {
    state,
    createFeedPost,
    togglePostUpvote,
    togglePostBookmark,
    requestPostReferral,
    addPostComment,
  } = useCareer();

  const [selectedCategory, setSelectedCategory] = useState<FeedCategory>('All Signals');
  const [showComposer, setShowComposer] = useState(false);

  // Composer Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Exclude<FeedCategory, 'All Signals'>>(
    state.selectedCompany === 'JANKEN CORPS'
      ? 'Cloud, Web & SQL Breakdowns'
      : 'Game Dev, Godot & 3D Showcases'
  );
  const [body, setBody] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [verifiedBadge, setVerifiedBadge] = useState(
    `${state.selectedCompany} · ELO ${state.eloRating}`
  );
  const [composerError, setComposerError] = useState('');

  // Comment Input per Post
  const [commentTextById, setCommentTextById] = useState<Record<string, string>>({});

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All Signals') return state.feedPosts;
    return state.feedPosts.filter((p) => p.category === selectedCategory);
  }, [state.feedPosts, selectedCategory]);

  const handlePublishPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setComposerError('Please provide both a project/technical headline and post body.');
      return;
    }
    createFeedPost({
      company: state.selectedCompany,
      title: title.trim(),
      category,
      body: body.trim(),
      codeSnippet: codeSnippet.trim() || undefined,
      verifiedBadge: verifiedBadge.trim(),
    });
    setTitle('');
    setBody('');
    setCodeSnippet('');
    setComposerError('');
    setShowComposer(false);
  };

  return (
    <div>
      {/* Top Black Banner */}
      <section className="bg-[#0c0d0f] py-14 px-6 lg:px-20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="text-[#c94c2d] font-mono text-xs uppercase tracking-[0.18em] mb-3">
              SKILLFORGE LAB · PROOF-OF-WORK SHOWCASE FEED
            </div>
            <h1 className="text-white text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              SkillForge Lab Project Showcases &amp; Peer Vouching
            </h1>
            <p className="text-neutral-300 text-base lg:text-lg max-w-2xl leading-relaxed">
              Share your AWS Cloud architectures, SQL Workbench queries, and Data Analytics cohorts
              for <strong className="text-white">JANKEN CORPS</strong>, or showcase your Blender 3D
              models, IK/FK rigs, Gaea terrains, and Godot 4 prototypes for{' '}
              <strong className="text-white">HOTBURN STUDIOS</strong>.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowComposer((prev) => !prev)}
            className="bg-[#c94c2d] hover:bg-[#b33e20] text-white font-mono text-xs uppercase tracking-wider font-semibold px-5 py-3.5 rounded-lg inline-flex items-center gap-2 shadow-lg shrink-0 transition"
          >
            <Plus className="w-4 h-4" />
            <span>{showComposer ? 'Close Composer' : 'Publish Project / Showcase Post'}</span>
          </button>
        </div>
      </section>

      {/* Stone Filter Bar */}
      <div className="max-w-6xl mx-auto mt-10 px-6 lg:px-8">
        <div className="bg-[#ebe6de] border border-[#ddd7cd] rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {FEED_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={
                    isActive
                      ? 'bg-[#0f1013] text-white font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg font-semibold'
                      : 'bg-[#faf8f5] hover:bg-white text-neutral-800 border border-[#dcd6cc] font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition'
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Feed Column */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8 space-y-6">
        {/* Create Proof-of-Work Post Composer */}
        {showComposer && (
          <form
            onSubmit={handlePublishPost}
            className="bg-[#ebe6de] border border-[#ddd7cd] rounded-2xl p-7 space-y-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[#c94c2d] font-mono text-xs uppercase tracking-[0.15em]">
                  NEW PROJECT OR TECHNICAL SIGNAL ({state.selectedCompany})
                </div>
                <h2 className="text-neutral-950 text-2xl font-extrabold">
                  Publish Project Showcase or Breakdown
                </h2>
              </div>
              <span className="font-mono text-xs bg-[#0f1013] text-white px-3 py-1.5 rounded-lg">
                Attached Dossier: {state.dossierHash}
              </span>
            </div>

            {composerError && (
              <div className="bg-red-100 border border-red-300 text-red-900 font-mono text-xs p-3 rounded-lg">
                {composerError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="post-title"
                  className="block font-mono uppercase text-xs text-neutral-700 mb-2"
                >
                  PROJECT / SHOWCASE HEADLINE
                </label>
                <input
                  id="post-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Gaea Volcanic Terrain Splatmap + Godot 4 Triplanar Shader"
                  className="w-full bg-[#faf8f5] border border-[#dcd6cc] rounded-lg px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-[#c94c2d]"
                />
              </div>

              <div>
                <label
                  htmlFor="post-category"
                  className="block font-mono uppercase text-xs text-neutral-700 mb-2"
                >
                  SIGNAL CATEGORY
                </label>
                <select
                  id="post-category"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as Exclude<FeedCategory, 'All Signals'>)
                  }
                  className="w-full bg-[#faf8f5] border border-[#dcd6cc] rounded-lg px-4 py-3 text-sm font-mono text-neutral-900 focus:outline-none focus:border-[#c94c2d]"
                >
                  {FEED_CATEGORIES.filter((c) => c !== 'All Signals').map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="post-body"
                className="block font-mono uppercase text-xs text-neutral-700 mb-2"
              >
                PROJECT BREAKDOWN / ARCHITECTURE / ART PIPELINE NOTES
              </label>
              <textarea
                id="post-body"
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your AWS/SQL/Analytics metrics or Blender/Gaea/Godot workflow notes..."
                className="w-full bg-[#faf8f5] border border-[#dcd6cc] rounded-lg px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-[#c94c2d]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="post-code"
                  className="block font-mono uppercase text-xs text-neutral-700 mb-2"
                >
                  EMBEDDED SQL / GDSCRIPT / SHADER / TOPOLOGY SNIPPET (OPTIONAL)
                </label>
                <textarea
                  id="post-code"
                  rows={3}
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  placeholder="SELECT ... / extends CharacterBody3D ... / Shader code"
                  className="w-full bg-[#0c0d0f] border border-neutral-800 rounded-lg px-4 py-2.5 text-xs font-mono text-neutral-100 focus:outline-none focus:border-[#c94c2d]"
                />
              </div>

              <div>
                <label
                  htmlFor="post-badge"
                  className="block font-mono uppercase text-xs text-neutral-700 mb-2"
                >
                  ATTACHED ACHIEVEMENT BADGE
                </label>
                <input
                  id="post-badge"
                  type="text"
                  value={verifiedBadge}
                  onChange={(e) => setVerifiedBadge(e.target.value)}
                  className="w-full bg-[#faf8f5] border border-[#dcd6cc] rounded-lg px-4 py-3 text-xs font-mono text-neutral-900"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#c94c2d] hover:bg-[#b33e20] text-white font-mono text-xs uppercase tracking-wider font-semibold px-6 py-3 rounded-lg shadow-sm transition"
              >
                PUBLISH TO NETWORK FEED →
              </button>
            </div>
          </form>
        )}

        {/* Feed Posts List */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-[#faf8f5] border border-[#e2ddd3] rounded-2xl p-6 lg:p-7 shadow-xs space-y-4"
            >
              {/* Post Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-[#e8e3da]">
                <div>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    <span className="font-extrabold text-neutral-950 text-sm">{post.author}</span>
                    <span className="text-neutral-400">·</span>
                    <span className="text-[#c94c2d] font-semibold">{post.company}</span>
                    <span className="text-neutral-400">·</span>
                    <span className="text-neutral-700 font-semibold">Elo {post.authorElo}</span>
                    <span className="text-neutral-400">·</span>
                    <span className="text-neutral-500">{post.timestamp}</span>
                  </div>
                  <div className="text-xs font-mono text-neutral-600 mt-0.5">
                    {post.authorRole}
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="bg-[#ebe6de] border border-[#ddd7cd] text-neutral-900 px-3 py-1 rounded-md font-semibold">
                    {post.category}
                  </span>
                  <span className="bg-[#0f1013] text-white px-3 py-1 rounded-md">
                    {post.verifiedBadge}
                  </span>
                </div>
              </div>

              {/* Post Title & Body */}
              <div>
                <h2 className="text-xl lg:text-2xl font-extrabold text-neutral-950 tracking-tight mb-2.5">
                  {post.title}
                </h2>
                <p className="text-neutral-700 text-sm leading-relaxed whitespace-pre-line">
                  {post.body}
                </p>
              </div>

              {/* Embedded Code / Architecture Snippet */}
              {post.codeSnippet && (
                <pre className="bg-[#0c0d0f] border border-neutral-800 rounded-xl p-4 font-mono text-xs text-amber-50 overflow-x-auto leading-relaxed">
                  {post.codeSnippet}
                </pre>
              )}

              {/* Interactive Action Bar */}
              <div className="pt-3 border-t border-[#e8e3da] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => togglePostUpvote(post.id)}
                    className={`px-3.5 py-2 rounded-lg border inline-flex items-center gap-1.5 transition ${
                      post.upvotedByMe
                        ? 'bg-[#0f1013] text-white border-[#0f1013] font-semibold'
                        : 'bg-[#ebe6de] hover:bg-[#e2ddd3] text-neutral-900 border-[#ddd7cd]'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Endorse Project ({post.upvotes})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => togglePostBookmark(post.id)}
                    className={`px-3.5 py-2 rounded-lg border inline-flex items-center gap-1.5 transition ${
                      post.bookmarkedByMe
                        ? 'bg-[#c94c2d] text-white border-[#c94c2d] font-semibold'
                        : 'bg-[#ebe6de] hover:bg-[#e2ddd3] text-neutral-900 border-[#ddd7cd]'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{post.bookmarkedByMe ? 'Saved' : 'Bookmark'}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => requestPostReferral(post.id)}
                  className={`px-4 py-2 rounded-lg inline-flex items-center gap-1.5 font-semibold transition ${
                    post.referralRequestedByMe
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#c94c2d] hover:bg-[#b33e20] text-white'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>
                    {post.referralRequestedByMe
                      ? `Dossier ${state.dossierHash} Attached ✓`
                      : 'Request Peer Vouch / Referral ↗'}
                  </span>
                </button>
              </div>

              {/* Comments Section */}
              <div className="bg-[#f4f1ea] border border-[#e2ddd3] rounded-xl p-4 space-y-3">
                {post.comments.length > 0 && (
                  <div className="space-y-2.5">
                    {post.comments.map((c) => (
                      <div
                        key={c.id}
                        className="bg-[#faf8f5] border border-[#e2ddd3] rounded-lg p-3 text-xs"
                      >
                        <div className="flex items-center justify-between font-mono text-[11px] text-neutral-500 mb-1">
                          <span className="font-bold text-neutral-900">
                            {c.author} · {c.authorRole}
                          </span>
                          <span>{c.timestamp}</span>
                        </div>
                        <p className="text-neutral-800">{c.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={commentTextById[post.id] || ''}
                    onChange={(e) =>
                      setCommentTextById((prev) => ({
                        ...prev,
                        [post.id]: e.target.value,
                      }))
                    }
                    placeholder="Add a peer review on topology, SQL indexing, or shader math..."
                    aria-label={`Comment on ${post.title}`}
                    className="flex-1 bg-[#faf8f5] border border-[#dcd6cc] rounded-lg px-3 py-2 text-xs font-mono text-neutral-900 focus:outline-none focus:border-[#c94c2d]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const txt = commentTextById[post.id] || '';
                      if (!txt.trim()) return;
                      addPostComment(post.id, txt);
                      setCommentTextById((prev) => ({ ...prev, [post.id]: '' }));
                    }}
                    className="bg-[#0f1013] hover:bg-neutral-800 text-white font-mono text-xs px-3.5 py-2 rounded-lg font-semibold"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
