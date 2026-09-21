import React, { useState } from 'react';
import { UNTOLD_FACTS } from '../data/ww1Data';
import { FactCard } from '../types';
import { sound } from '../utils/audio';
import { Sparkles, Quote, Bookmark } from 'lucide-react';
import { HistoricPhoto } from './HistoricPhoto';

export const ChapterFacts: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeFact, setActiveFact] = useState<FactCard>(UNTOLD_FACTS[0]);

  const categories = [
    { id: 'all', label: 'Усі факти' },
    { id: 'Гуманізм', label: 'Людяність та перемир\'я' },
    { id: 'Несподіване', label: 'Незвичайне та парадокси' },
    { id: 'Винахід', label: 'Військові винаходи' },
    { id: 'Український вимір', label: 'Українська історія' }
  ];

  const filteredFacts = UNTOLD_FACTS.filter((fact) => {
    if (selectedCategory === 'all') return true;
    return fact.category === selectedCategory;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="archive-card p-6 md:p-8">
        <div>
          <div className="archive-badge mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Розділ 7 • Маловідомі факти та людські долі</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-white tracking-wide">
            Неймовірні факти Першої світової (1914–1916)
          </h2>
          <p className="mt-3 text-slate-200 font-serif-text text-base md:text-lg max-w-3xl leading-relaxed">
            За сухими датами підручників ховаються вражаючі історії: як футбол зупинив війну на один день, чому наручні годинники стали необхідністю лише в шанцях, і як українські добровольці писали нову сторінку військової слави в Карпатах.
          </p>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`filter-fact-${cat.id}`}
            onClick={() => {
              sound.playClick();
              setSelectedCategory(cat.id);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'bg-[#151e22] border border-[#26363d] text-slate-300 hover:bg-[#1c272c] hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Facts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Cards List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredFacts.map((fact) => {
            const isSelected = fact.id === activeFact.id;
            return (
              <div
                key={fact.id}
                id={`fact-card-${fact.id}`}
                onClick={() => {
                  sound.playClick();
                  setActiveFact(fact);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'bg-[#1b2529] border-amber-500 shadow-lg ring-1 ring-amber-500/50 translate-x-1'
                    : 'bg-[#131b1e] border-[#243339] hover:border-[#354850] hover:bg-[#172125]'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="bg-[#1e2a2f] text-amber-300 px-2.5 py-0.5 rounded text-[11px] font-medium border border-[#2d3e45]">
                    {fact.category}
                  </span>
                  <span className="font-mono text-amber-400 font-bold">{fact.year}</span>
                </div>

                <h3 className="text-base font-bold font-heading text-white">
                  {fact.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2 font-serif-text">
                  {fact.lead}
                </p>
              </div>
            );
          })}
        </div>

        {/* Expanded Fact Dossier */}
        <div className="lg:col-span-7 archive-card p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="border-b border-[#243339] pb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 bg-[#1e2a2f] border border-[#2d3e45] text-amber-300 text-xs rounded-full font-mono font-medium">
                  {activeFact.year}
                </span>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider font-mono">
                  {activeFact.category}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-heading text-white">
                {activeFact.title}
              </h3>
              <p className="text-slate-300 text-sm mt-1.5 italic font-serif-text">
                {activeFact.lead}
              </p>
            </div>

            {/* Historic Photo for this Fact */}
            {activeFact.imageUrl && (
              <div>
                <HistoricPhoto
                  src={activeFact.imageUrl}
                  alt={activeFact.title}
                  caption={activeFact.imageCaption || activeFact.title}
                  year={activeFact.year}
                  aspectRatio="video"
                  badge={activeFact.category}
                />
              </div>
            )}

            {/* Main Content */}
            <div className="text-slate-200 text-sm md:text-base leading-relaxed space-y-4 font-serif-text">
              <p>{activeFact.content}</p>

              {/* Quote box if available */}
              {activeFact.quote && (
                <div className="bg-[#182327] border-l-4 border-amber-500 p-5 rounded-r-xl my-4 border-y border-r border-[#28383f]">
                  <Quote className="w-5 h-5 text-amber-400 mb-1" />
                  <p className="italic text-white text-sm leading-relaxed">
                    «{activeFact.quote.text}»
                  </p>
                  <span className="block text-xs text-amber-300 font-mono mt-2 text-right">
                    — {activeFact.quote.author}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[#243339] flex items-center justify-between text-xs text-slate-400 font-serif-text">
            <span className="flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              Історичний нарис для уроку історії
            </span>
            <span className="font-mono text-amber-400">10 клас</span>
          </div>
        </div>
      </div>
    </div>
  );
};
