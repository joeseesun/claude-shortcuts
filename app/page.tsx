'use client';

import { useState, useEffect, useCallback } from 'react';
import { shortcuts, categories, type Shortcut } from './data/shortcuts';

type Mode = 'browse' | 'quiz';
type QuizState = 'question' | 'result';

// Category color config — no emoji, pure CSS
const catConfig: Record<string, { dot: string; badge: string; border: string; glow: string; label: string }> = {
  general:   { dot: 'bg-blue-400',   badge: 'bg-blue-400/10 text-blue-400 border-blue-400/20',   border: 'border-l-blue-400',   glow: 'shadow-blue-500/20',   label: '通用控制' },
  text:      { dot: 'bg-purple-400', badge: 'bg-purple-400/10 text-purple-400 border-purple-400/20', border: 'border-l-purple-400', glow: 'shadow-purple-500/20', label: '文本编辑' },
  multiline: { dot: 'bg-emerald-400',badge: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',border: 'border-l-emerald-400',glow: 'shadow-emerald-500/20',label: '多行输入' },
  quick:     { dot: 'bg-amber-400',  badge: 'bg-amber-400/10 text-amber-400 border-amber-400/20',   border: 'border-l-amber-400',  glow: 'shadow-amber-500/20',  label: '快捷命令' },
  'vim-mode':{ dot: 'bg-red-400',    badge: 'bg-red-400/10 text-red-400 border-red-400/20',         border: 'border-l-red-400',    glow: 'shadow-red-500/20',    label: 'Vim 切换' },
  'vim-nav': { dot: 'bg-indigo-400', badge: 'bg-indigo-400/10 text-indigo-400 border-indigo-400/20', border: 'border-l-indigo-400', glow: 'shadow-indigo-500/20', label: 'Vim 导航' },
  'vim-edit':{ dot: 'bg-orange-400', badge: 'bg-orange-400/10 text-orange-400 border-orange-400/20', border: 'border-l-orange-400', glow: 'shadow-orange-500/20', label: 'Vim 编辑' },
  'vim-text':   { dot: 'bg-pink-400',   badge: 'bg-pink-400/10 text-pink-400 border-pink-400/20',         border: 'border-l-pink-400',   glow: 'shadow-pink-500/20',   label: 'Vim 文本对象' },
  'cmd-session':{ dot: 'bg-sky-400',    badge: 'bg-sky-400/10 text-sky-400 border-sky-400/20',             border: 'border-l-sky-400',    glow: 'shadow-sky-500/20',    label: '会话管理' },
  'cmd-info':   { dot: 'bg-teal-400',   badge: 'bg-teal-400/10 text-teal-400 border-teal-400/20',           border: 'border-l-teal-400',   glow: 'shadow-teal-500/20',   label: '信息查看' },
  'cmd-model':  { dot: 'bg-violet-400', badge: 'bg-violet-400/10 text-violet-400 border-violet-400/20',     border: 'border-l-violet-400', glow: 'shadow-violet-500/20', label: '模式控制' },
  'cmd-config': { dot: 'bg-slate-400',  badge: 'bg-slate-400/10 text-slate-400 border-slate-400/20',        border: 'border-l-slate-400',  glow: 'shadow-slate-500/20',  label: '配置管理' },
  'cmd-code':   { dot: 'bg-rose-400',   badge: 'bg-rose-400/10 text-rose-400 border-rose-400/20',           border: 'border-l-rose-400',   glow: 'shadow-rose-500/20',   label: '代码工具' },
  'cmd-ext':    { dot: 'bg-lime-400',   badge: 'bg-lime-400/10 text-lime-400 border-lime-400/20',           border: 'border-l-lime-400',   glow: 'shadow-lime-500/20',   label: '集成扩展' },
};

function KeyBadge({ text }: { text: string }) {
  // Slash commands get code block styling
  if (text.startsWith('/') || text.startsWith('!')) {
    return (
      <code className="inline-block px-2.5 py-0.5 bg-gray-900 text-green-300 text-sm font-mono border border-gray-700 rounded-lg leading-6">
        {text}
      </code>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 flex-wrap">
      {text.split(' / ').map((part, i) => (
        <span key={i} className="inline-flex items-center gap-1">
          {i > 0 && <span className="text-gray-500 text-xs font-normal">or</span>}
          {part.split('+').map((k, j) => (
            <span key={j} className="inline-flex items-center gap-0.5">
              {j > 0 && <span className="text-gray-500 text-xs">+</span>}
              <kbd className="
                inline-block px-2 py-0.5 min-w-[24px] text-center
                bg-gray-900 text-green-300 text-xs font-mono font-medium
                border border-gray-600 rounded
                shadow-[0_2px_0_0_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.06)]
                leading-5
              ">
                {k.trim()}
              </kbd>
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

function CategoryBadge({ categoryId }: { categoryId: string }) {
  const cfg = catConfig[categoryId];
  if (!cfg) return null;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium border ${cfg.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function ShortcutCard({ shortcut, revealed, onClick }: {
  shortcut: Shortcut;
  revealed: boolean;
  onClick: () => void;
}) {
  return (
    <div className="cursor-pointer group" onClick={onClick}>
      <div className={`
        rounded-xl border bg-gray-950 transition-all duration-200
        ${revealed
          ? 'border-green-500/60 shadow-[0_0_12px_0_rgba(34,197,94,0.15)]'
          : 'border-gray-800 hover:border-gray-600'
        }
      `}>
        <div className="p-4">
          {revealed ? (
            /* Revealed state */
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <KeyBadge text={shortcut.key} />
                <CategoryBadge categoryId={shortcut.category} />
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-snug">{shortcut.description}</p>
                {shortcut.context && (
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{shortcut.context}</p>
                )}
              </div>
            </div>
          ) : (
            /* Hidden state */
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <p className="text-gray-200 text-sm font-medium leading-snug">{shortcut.description}</p>
                <CategoryBadge categoryId={shortcut.category} />
              </div>
              {shortcut.context && (
                <p className="text-gray-600 text-xs leading-relaxed">{shortcut.context}</p>
              )}
              <p className="text-gray-700 text-xs group-hover:text-gray-500 transition-colors pt-0.5">
                点击揭示答案 →
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function QuizMode() {
  const [quizShortcuts, setQuizShortcuts] = useState<Shortcut[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [quizState, setQuizState] = useState<QuizState>('question');
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const initQuiz = useCallback(() => {
    const pool = selectedCategory === 'all'
      ? shortcuts
      : shortcuts.filter(s => s.category === selectedCategory);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 20);
    setQuizShortcuts(shuffled);
    setCurrent(0);
    setScore(0);
    setQuizState('question');
    setSelected(null);
    setFinished(false);
  }, [selectedCategory]);

  useEffect(() => { initQuiz(); }, [initQuiz]);

  useEffect(() => {
    if (quizShortcuts.length === 0) return;
    const correct = quizShortcuts[current];
    const others = shortcuts
      .filter(s => s.id !== correct.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(s => s.key);
    const opts = [...others, correct.key].sort(() => Math.random() - 0.5);
    setOptions(opts);
    setSelected(null);
    setQuizState('question');
  }, [current, quizShortcuts]);

  if (quizShortcuts.length === 0) return null;

  const q = quizShortcuts[current];

  const handleAnswer = (opt: string) => {
    if (quizState !== 'question') return;
    setSelected(opt);
    setQuizState('result');
    if (opt === q.key) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= quizShortcuts.length) setFinished(true);
    else setCurrent(c => c + 1);
  };

  if (finished) {
    const pct = Math.round((score / quizShortcuts.length) * 100);
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-6">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl
          bg-gradient-to-br from-green-400/20 to-cyan-400/20 border border-green-400/30">
          {pct >= 80 ? '★' : pct >= 60 ? '✓' : '↑'}
        </div>
        <div className="text-center space-y-1">
          <div className="text-5xl font-bold tabular-nums">
            <span className="text-green-400">{score}</span>
            <span className="text-gray-600">/{quizShortcuts.length}</span>
          </div>
          <div className="text-gray-400">正确率 {pct}%</div>
        </div>
        <p className={`text-base font-medium ${pct >= 80 ? 'text-green-400' : pct >= 60 ? 'text-yellow-400' : 'text-gray-400'}`}>
          {pct >= 80 ? '已掌握，继续保持' : pct >= 60 ? '不错，再练几遍' : '继续学习，重复是记忆之母'}
        </p>
        <button
          onClick={initQuiz}
          className="px-8 py-2.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors"
        >
          再来一次
        </button>
      </div>
    );
  }

  const cfg = catConfig[q.category];

  return (
    <div className="max-w-xl mx-auto">
      {/* Category filter */}
      <div className="mb-6 flex flex-wrap gap-1.5">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedCategory === 'all' ? 'bg-white text-black' : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'}`}
        >
          全部
        </button>
        {Object.entries(catConfig).map(([id, c]) => (
          <button
            key={id}
            onClick={() => setSelectedCategory(id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedCategory === id ? 'bg-white text-black' : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="mb-6 space-y-2">
        <div className="flex justify-between text-xs text-gray-500">
          <span>第 {current + 1} 题 / 共 {quizShortcuts.length} 题</span>
          <span className="text-green-400 tabular-nums">{score} 分</span>
        </div>
        <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-cyan-400 transition-all duration-500 ease-out"
            style={{ width: `${(current / quizShortcuts.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-gray-950 border border-gray-800 rounded-xl p-5 mb-5">
        <CategoryBadge categoryId={q.category} />
        <h3 className="text-lg font-semibold text-white mt-3 mb-1">{q.description}</h3>
        {q.context && <p className="text-gray-500 text-sm">{q.context}</p>}
      </div>

      {/* Options */}
      <div className="space-y-2">
        {options.map((opt) => {
          let cls = 'border-gray-800 bg-gray-950 text-gray-300 hover:border-gray-600 hover:text-white hover:bg-gray-900';
          if (quizState === 'result') {
            if (opt === q.key)        cls = 'border-green-500 bg-green-500/10 text-green-300';
            else if (opt === selected) cls = 'border-red-500 bg-red-500/10 text-red-400';
            else                       cls = 'border-gray-900 bg-gray-950/50 text-gray-700';
          }
          return (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              disabled={quizState === 'result'}
              className={`w-full p-3.5 rounded-xl border text-left transition-all duration-150 ${cls}`}
            >
              <KeyBadge text={opt} />
            </button>
          );
        })}
      </div>

      {quizState === 'result' && (
        <div className="mt-4 space-y-3">
          <div className={`text-sm px-4 py-3 rounded-xl border ${selected === q.key ? 'border-green-500/30 bg-green-500/5 text-green-400' : 'border-red-500/30 bg-red-500/5 text-red-400'}`}>
            {selected === q.key ? '正确' : `正确答案：${q.key}`}
          </div>
          <button
            onClick={handleNext}
            className="w-full py-3 bg-white text-black text-sm font-semibold rounded-xl hover:bg-gray-100 transition-colors"
          >
            {current + 1 >= quizShortcuts.length ? '查看结果' : '下一题'}
          </button>
        </div>
      )}
    </div>
  );
}

function BrowseMode() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');

  const filtered = shortcuts.filter(s => {
    const matchCat = activeCategory === 'all' || s.category === activeCategory;
    const matchSearch = !search ||
      s.key.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleReveal = (id: string) => {
    setRevealed(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const revealAll = () => setRevealed(new Set(filtered.map(s => s.id)));
  const hideAll = () => setRevealed(new Set());

  return (
    <div>
      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="搜索快捷键或描述..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-gray-600 text-sm transition-colors"
          />
        </div>
      </div>

      {/* Category tabs — scrollable row */}
      <div className="mb-4 flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        <button
          onClick={() => setActiveCategory('all')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeCategory === 'all' ? 'bg-white text-black' : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'}`}
        >
          全部 {shortcuts.length}
        </button>
        {Object.entries(catConfig).map(([id, cfg]) => {
          const count = shortcuts.filter(s => s.category === id).length;
          return (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeCategory === id ? 'bg-white text-black' : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
              {cfg.label}
              <span className="opacity-50">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Controls row */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600 text-xs tabular-nums">{filtered.length} 个快捷键</span>
        <div className="flex gap-3">
          <button onClick={revealAll} className="text-xs text-gray-600 hover:text-gray-300 transition-colors">全部显示</button>
          <button onClick={hideAll} className="text-xs text-gray-600 hover:text-gray-300 transition-colors">全部隐藏</button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {filtered.map(s => (
          <ShortcutCard
            key={s.id}
            shortcut={s}
            revealed={revealed.has(s.id)}
            onClick={() => toggleReveal(s.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-700 text-sm">
          没有找到匹配的快捷键
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [mode, setMode] = useState<Mode>('browse');

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Subtle dot grid */}
      <div className="fixed inset-0 opacity-30"
        style={{ backgroundImage: 'radial-gradient(circle, #1f2937 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 text-xs font-mono mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            claude-code / interactive-mode
          </div>

          <h1 className="text-4xl md:text-[52px] font-bold tracking-tight mb-3 leading-none">
            <span className="text-white">Claude Code</span>
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">完整指南</span>
          </h1>
          <p className="text-gray-500 text-base max-w-sm mx-auto leading-relaxed">
            快捷键 · 内置命令 · Vim 模式，一网打尽
          </p>
          <p className="text-gray-700 text-xs mt-2 font-mono tabular-nums">
            {shortcuts.length} entries · {categories.length} categories
          </p>
        </div>

        {/* Mode toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-950 border border-gray-800 rounded-xl p-1 gap-0.5">
            {(['browse', 'quiz'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  mode === m
                    ? 'bg-white text-black shadow-sm'
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {m === 'browse' ? '浏览学习' : '测验挑战'}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {mode === 'browse' ? <BrowseMode /> : <QuizMode />}

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-900 text-center">
          <p className="text-gray-700 text-xs font-mono">
            data source:{' '}
            <a
              href="https://code.claude.com/docs/en/interactive-mode"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-green-400 transition-colors underline underline-offset-2"
            >
              code.claude.com/docs
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
