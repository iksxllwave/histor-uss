import React, { useState } from 'react';
import { INSIGNIA_LIST } from '../data/ww1Data';
import { InsigniaItem } from '../types';
import { sound } from '../utils/audio';
import { GalicianLionBadge, MazepynkaCapIcon, IronCrossBadge } from './HistoricIcons';
import { Award, Shield, Sparkles, Filter, Bookmark } from 'lucide-react';
import { HistoricPhoto } from './HistoricPhoto';

export const ChapterInsignia: React.FC = () => {
  const [selectedInsignia, setSelectedInsignia] = useState<InsigniaItem>(INSIGNIA_LIST[0]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredItems = INSIGNIA_LIST.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const renderBadgeVisual = (item: InsigniaItem) => {
    switch (item.svgIconType) {
      case 'lion':
        return <GalicianLionBadge size={48} />;
      case 'mazepynka':
        return <MazepynkaCapIcon size={48} />;
      case 'iron-cross':
        return <IronCrossBadge size={48} />;
      default:
        return <Award className="w-8 h-8 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Header */}
      <div className="archive-card p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="archive-badge mb-3">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Розділ 3 • Військові відзнаки та символіка</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-white tracking-wide">
              Знаки честі, кокарди та народження національної геральдики
            </h2>
            <p className="mt-3 text-slate-200 font-serif-text text-base md:text-lg max-w-3xl leading-relaxed">
              Відзнака на кашкеті чи петлиці була не просто прикрасою — вона визначала належність солдата, його ранг та честь. Саме в полум’ї 1914–1916 років стрільці УСС відродили золотого галицького лева та козацьку мазепинку, поклавши початок новітній українській мілітарній традиції.
            </p>
          </div>

          <div className="archive-card-subtle p-5 rounded-xl text-center shrink-0 min-w-[200px] border border-[#27373e]">
            <span className="text-xs text-amber-400 block uppercase font-semibold">Символ Соборності</span>
            <div className="text-2xl font-bold text-white font-heading my-1">У.С.С. 1914</div>
            <span className="text-xs text-slate-300 font-serif-text">Перша українська кокарда XX ст.</span>
          </div>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <span className="text-xs text-slate-400 flex items-center gap-1 mr-1 font-mono font-medium">
          <Filter className="w-3 h-3 text-amber-400" />
          Категорія:
        </span>
        {[
          { id: 'all', label: 'Усі відзнаки' },
          { id: 'кокарда', label: 'Кокарди' },
          { id: 'головний убір', label: 'Головні убори' },
          { id: 'орден', label: 'Ордени та хрести' },
          { id: 'погон', label: 'Погони' }
        ].map((cat) => (
          <button
            key={cat.id}
            id={`filter-insignia-${cat.id}`}
            onClick={() => {
              sound.playClick();
              setActiveCategory(cat.id);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'bg-[#151e22] border border-[#26363d] text-slate-300 hover:bg-[#1c272c] hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Insignia Gallery & Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Badges Grid List */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const isSelected = item.id === selectedInsignia.id;
            return (
              <div
                key={item.id}
                id={`insignia-card-${item.id}`}
                onClick={() => {
                  sound.playClick();
                  setSelectedInsignia(item);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between text-left group ${
                  isSelected
                    ? 'bg-[#1b2529] border-amber-500 shadow-lg ring-1 ring-amber-500/50'
                    : 'bg-[#131b1e] border-[#243339] hover:border-[#354850] hover:bg-[#172125]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="bg-[#1e2a2f] text-amber-300 px-2 py-0.5 rounded text-[11px] font-medium capitalize border border-[#2d3e45]">
                      {item.category}
                    </span>
                    <span className="font-mono text-amber-400 font-bold">{item.year}</span>
                  </div>

                  <div className="flex items-center justify-center my-3 py-3 bg-[#182226] rounded-xl border border-[#28373e]">
                    {renderBadgeVisual(item)}
                  </div>

                  <h3 className="font-bold text-white text-sm font-heading">
                    {item.name}
                  </h3>
                  <span className="text-xs text-slate-400 block mt-0.5 font-serif-text">{item.countryOrUnit}</span>
                </div>

                <div className="mt-4 pt-2 border-t border-[#233137] flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Статус:</span>
                  <span className="font-semibold text-amber-300">
                    {item.rarity}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Insignia Detailed Dossier */}
        <div className="lg:col-span-6 archive-card p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Header of the detail card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#243339] pb-5">
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  {selectedInsignia.countryOrUnit} • {selectedInsignia.year}
                </span>
                <h3 className="text-xl md:text-2xl font-bold font-heading text-white mt-1">
                  {selectedInsignia.name}
                </h3>
              </div>
              <span className="px-3 py-1 bg-[#1e2a2f] border border-[#2d3e45] text-amber-300 text-xs rounded-full font-medium self-start sm:self-auto">
                {selectedInsignia.rarity}
              </span>
            </div>

            {/* Historic Photo for this Insignia */}
            {selectedInsignia.imageUrl && (
              <div>
                <HistoricPhoto
                  src={selectedInsignia.imageUrl}
                  alt={selectedInsignia.name}
                  caption={selectedInsignia.imageCaption || selectedInsignia.name}
                  year={selectedInsignia.year}
                  aspectRatio="video"
                  badge={selectedInsignia.category}
                />
              </div>
            )}

            {/* Visual Description */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-2 flex items-center gap-1.5 font-mono">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                Опис та виготовлення
              </h4>
              <p className="text-slate-200 font-serif-text text-sm md:text-base leading-relaxed bg-[#182327] p-4 rounded-xl border border-[#28383f]">
                {selectedInsignia.description}
              </p>
            </div>

            {/* Symbolism */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-2 flex items-center gap-1.5 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Символічне значення
              </h4>
              <p className="text-slate-200 font-serif-text text-sm md:text-base leading-relaxed bg-[#182327] p-4 rounded-xl border border-[#28383f]">
                {selectedInsignia.symbolism}
              </p>
            </div>

            {/* Historical Significance for 10th Grade curriculum */}
            <div className="bg-[#182327] border border-[#28383f] p-5 rounded-xl">
              <h4 className="text-xs uppercase tracking-wider text-white font-bold mb-2 flex items-center gap-1.5 font-heading">
                <Bookmark className="w-4 h-4 text-amber-400" />
                Історичне значення для України та Першої світової
              </h4>
              <p className="text-slate-200 font-serif-text text-sm leading-relaxed">
                {selectedInsignia.historicalSignificance}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#243339] flex items-center justify-between text-xs text-slate-400 font-serif-text">
            <span>Експонат військового музею</span>
            <span className="font-mono text-amber-400">{selectedInsignia.rarity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
