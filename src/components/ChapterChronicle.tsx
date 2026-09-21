import React, { useState } from 'react';
import { TIMELINE_EVENTS } from '../data/ww1Data';
import { sound } from '../utils/audio';
import { Calendar, MapPin, AlertCircle, Bookmark, Compass, Map, Layers, Clock } from 'lucide-react';
import { HistoricPhoto } from './HistoricPhoto';
import { InteractiveBattleMap } from './InteractiveBattleMap';
import { InteractiveTrench } from './InteractiveTrench';

export const ChapterChronicle: React.FC = () => {
  const [viewMode, setViewMode] = useState<'timeline' | 'battle-map' | 'trench-cutaway'>('timeline');
  const [filter, setFilter] = useState<'all' | 'ukraine' | 'key-battles'>('all');
  const [selectedEventIndex, setSelectedEventIndex] = useState<number>(0);

  const filteredEvents = TIMELINE_EVENTS.filter((ev) => {
    if (filter === 'ukraine') {
      return ev.ukraineFact || ev.region.includes('Україн') || ev.region.includes('Карпат');
    }
    if (filter === 'key-battles') {
      return ev.tag.includes('фронт') || ev.tag.includes('прорив') || ev.tag.includes('пекло');
    }
    return true;
  });

  const activeEvent = TIMELINE_EVENTS[selectedEventIndex] || TIMELINE_EVENTS[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Chapter Intro Banner */}
      <div className="archive-card p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="archive-badge mb-3">
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              <span>Розділ 1 • Історична панорама 1914–1916</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-white tracking-wide">
              Хроніка подій: Від бліцкригу до позиційного глухого кута
            </h2>
            <p className="mt-3 text-slate-200 font-serif-text text-base md:text-lg max-w-3xl leading-relaxed">
              У серпні 1914 року молоді солдати з квітами на багнетах були впевнені, що війна завершиться за три місяці. Проте поява кулеметів, артилерійських шквалів і колючого дроту перетворила європейські поля на гігантські мережі шанців, а українські землі — на епіцентр кривавого зіткнення двох імперій.
            </p>
          </div>

          {/* Quick Statistic Pill */}
          <div className="archive-card-subtle p-5 rounded-xl shrink-0 text-center min-w-[200px] border border-[#27373e]">
            <span className="text-xs text-amber-400 block uppercase tracking-wider font-semibold">Розірвана Україна</span>
            <div className="text-3xl font-bold text-white font-heading my-1">3,8 млн</div>
            <span className="text-xs text-slate-300 font-serif-text">українців у двох ворожих арміях</span>
          </div>
        </div>

        {/* Dual Empire Tragedy Callout */}
        <div className="mt-6 pt-6 border-t border-[#243339] grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#182327] p-4 rounded-xl border border-[#2b3c43] flex gap-3 items-start">
            <div className="w-3 h-3 rounded-full bg-rose-500 mt-1 shrink-0" />
            <div className="text-xs">
              <strong className="text-white block text-sm font-heading mb-1">
                У складі Російської армії (~3,5 млн українців)
              </strong>
              <p className="text-slate-200 font-serif-text leading-relaxed">
                Наддніпрянці воювали в піхотних корпусах царської армії; окупація Галичини супроводжувалася русифікацією, арештами греко-католицького духівництва та депортаціями.
              </p>
            </div>
          </div>
          <div className="bg-[#182327] p-4 rounded-xl border border-[#2b3c43] flex gap-3 items-start">
            <div className="w-3 h-3 rounded-full bg-amber-400 mt-1 shrink-0" />
            <div className="text-xs">
              <strong className="text-white block text-sm font-heading mb-1">
                У складі Австро-Угорщини (~300 тис. українців)
              </strong>
              <p className="text-slate-200 font-serif-text leading-relaxed">
                Галичани та буковинці в полках Ландверу; створення добровольчого <strong>Легіону УСС</strong> (2500 воїнів) як ідейного ядра майбутнього національного війська.
              </p>
            </div>
          </div>
        </div>

        {/* Major Visual View Switcher */}
        <div className="mt-6 pt-6 border-t border-[#243339] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono uppercase tracking-wider hidden sm:inline">Режим огляду:</span>
            <div className="inline-flex bg-[#0f1619] p-1.5 rounded-xl border border-[#26373e]">
              <button
                id="view-mode-timeline"
                onClick={() => {
                  sound.playClick();
                  setViewMode('timeline');
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                  viewMode === 'timeline'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-[#182429]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Хронологія подій</span>
              </button>
              <button
                id="view-mode-battle-map"
                onClick={() => {
                  sound.playClick();
                  setViewMode('battle-map');
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                  viewMode === 'battle-map'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-[#182429]'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span>Тактична мапа битв</span>
              </button>
              <button
                id="view-mode-trench"
                onClick={() => {
                  sound.playClick();
                  setViewMode('trench-cutaway');
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                  viewMode === 'trench-cutaway'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-[#182429]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>3D-зріз траншеї 1916</span>
              </button>
            </div>
          </div>

          <span className="text-xs text-amber-400/90 font-mono">
            {viewMode === 'timeline' ? '📅 1914–1916: 6 вузлових подій' : 
             viewMode === 'battle-map' ? '🗺️ 9 ключових битв на карті' : '🛡️ 6 тактичних вузлів оборони'}
          </span>
        </div>
      </div>

      {/* Conditional View Rendering */}
      {viewMode === 'battle-map' && <InteractiveBattleMap />}

      {viewMode === 'trench-cutaway' && <InteractiveTrench />}

      {viewMode === 'timeline' && (
        <div className="space-y-6">
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 bg-[#121a1d] p-1.5 rounded-xl border border-[#233137]">
              <button
                id="filter-chronicle-all"
                onClick={() => {
                  sound.playClick();
                  setFilter('all');
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-[#1c272c]'
                }`}
              >
                Усі ключові події
              </button>
              <button
                id="filter-chronicle-ukraine"
                onClick={() => {
                  sound.playClick();
                  setFilter('ukraine');
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === 'ukraine'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-[#1c272c]'
                }`}
              >
                Український фронт та УСС
              </button>
              <button
                id="filter-chronicle-battles"
                onClick={() => {
                  sound.playClick();
                  setFilter('key-battles');
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === 'key-battles'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-[#1c272c]'
                }`}
              >
                Головні битви (Верден, Сомма тощо)
              </button>
            </div>
            <span className="text-xs text-slate-400 font-serif-text">
              Натисніть на подію в стрічці, щоб відкрити ілюстроване досьє
            </span>
          </div>

          {/* Interactive Timeline Grid: Left column list, Right column expanded dossier */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Timeline Event List */}
            <div className="lg:col-span-5 space-y-3">
              {filteredEvents.map((ev, idx) => {
                const isSelected = ev.title === activeEvent.title;
                const originalIndex = TIMELINE_EVENTS.findIndex((e) => e.title === ev.title);

                return (
                  <div
                    key={ev.title}
                    id={`timeline-item-${idx}`}
                    onClick={() => {
                      sound.playClick();
                      setSelectedEventIndex(originalIndex);
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'bg-[#1b2529] border-amber-500 shadow-lg ring-1 ring-amber-500/50 translate-x-1'
                        : 'bg-[#131b1e] border-[#243339] hover:border-[#354850] hover:bg-[#172125]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-mono text-amber-400 font-bold tracking-wide">
                        {ev.year}
                      </span>
                      <span className="bg-[#1e2a2f] text-slate-300 px-2 py-0.5 rounded text-[11px] border border-[#2d3e45]">
                        {ev.region}
                      </span>
                    </div>

                    <h3 className="text-base font-bold font-heading text-white">
                      {ev.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2 font-serif-text">
                      {ev.description}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between text-[11px]">
                      <span className="text-amber-300/80 font-mono uppercase tracking-wider">
                        {ev.tag}
                      </span>
                      {ev.ukraineFact && (
                        <span className="text-sky-300 font-medium flex items-center gap-1 font-serif-text">
                          <Bookmark className="w-3 h-3" />
                          Український вимір
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Expanded Event Dossier */}
            <div className="lg:col-span-7 archive-card p-6 md:p-8 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Event Dossier Header */}
                <div className="border-b border-[#243339] pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 bg-[#1e2a2f] border border-[#2d3e45] text-amber-300 text-xs rounded-full font-mono font-medium">
                      {activeEvent.year}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider font-mono">
                      {activeEvent.region}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold font-heading text-white">
                    {activeEvent.title}
                  </h3>
                  <span className="inline-block mt-2 text-xs font-mono text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2.5 py-1 rounded">
                    Фокус аналізу: {activeEvent.tag}
                  </span>
                </div>

                {/* Historic Photo for this Event */}
                {activeEvent.imageUrl && (
                  <div>
                    <HistoricPhoto
                      src={activeEvent.imageUrl}
                      alt={activeEvent.title}
                      caption={activeEvent.imageCaption || activeEvent.title}
                      year={activeEvent.year}
                      aspectRatio="video"
                      badge={activeEvent.tag}
                    />
                  </div>
                )}

                {/* General Description */}
                <div className="space-y-4 text-slate-200 text-sm md:text-base leading-relaxed font-serif-text">
                  <p>{activeEvent.description}</p>

                  {/* Ukraine-specific context box */}
                  {activeEvent.ukraineFact && (
                    <div className="bg-[#182327] border border-[#2d3e46] rounded-xl p-5 mt-4">
                      <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider mb-2 font-heading">
                        <Bookmark className="w-4 h-4 text-amber-400" />
                        Український вимір та наслідки
                      </div>
                      <p className="text-slate-200 text-sm leading-relaxed font-serif-text">
                        {activeEvent.ukraineFact}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Historical Chronicle Note */}
              <div className="mt-8 pt-4 border-t border-[#243339] flex items-center justify-between text-xs text-slate-400 font-serif-text">
                <span className="flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-sky-400" />
                  Програма 10 класу: Історія України та Всесвітня історія
                </span>
                <span className="font-mono text-amber-400">Архів 1914–1916</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
