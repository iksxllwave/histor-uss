import React, { useState } from 'react';
import { UNIFORMS } from '../data/ww1Data';
import { UniformItem } from '../types';
import { sound } from '../utils/audio';
import { MazepynkaCapIcon } from './HistoricIcons';
import { Shield, Eye, Info, CheckCircle2, ArrowRightLeft } from 'lucide-react';
import { HistoricPhoto } from './HistoricPhoto';

export const ChapterUniforms: React.FC = () => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>('uss-ukraine-1914-1916');
  const [activePointId, setActivePointId] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState<boolean>(false);

  const activeUniform: UniformItem = UNIFORMS.find((u) => u.id === selectedCountryId) || UNIFORMS[0];
  const selectedPoint = activeUniform.interactivePoints.find((p) => p.id === activePointId) || activeUniform.interactivePoints[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="archive-card p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="archive-badge mb-3">
              <Shield className="w-3.5 h-3.5 text-sky-400" />
              <span>Розділ 2 • Військова форма та спорядження 1914–1916</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-white tracking-wide">
              Еволюція однострою: Від парадного маршу до окопного виживання
            </h2>
            <p className="mt-3 text-slate-200 font-serif-text text-base md:text-lg max-w-3xl leading-relaxed">
              У 1914 році армії Європи вирушили на фронт у кольорових мундирах XIX століття. Проте кулеметний вогонь і шрапнель змусили за два роки переосмислити все: з’явилися маскувальні кольори (фельдграу, хакі, горизонт), сталеві каски та самобутня українська шапка-мазепинка.
            </p>
          </div>

          <button
            id="toggle-uniform-compare-btn"
            onClick={() => {
              sound.playClick();
              setCompareMode(!compareMode);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1a252a] hover:bg-[#233137] border border-[#2e4047] text-amber-300 hover:text-amber-200 rounded-xl text-xs font-semibold transition-all shadow-xs shrink-0 self-start md:self-auto"
          >
            <ArrowRightLeft className="w-4 h-4 text-amber-400" />
            <span>{compareMode ? 'Звичайний інспектор' : 'Порівняти 1914 vs 1916'}</span>
          </button>
        </div>
      </div>

      {/* Country Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {UNIFORMS.map((u) => {
          const isSelected = u.id === selectedCountryId;
          return (
            <button
              key={u.id}
              id={`select-uniform-${u.id}`}
              onClick={() => {
                sound.playClick();
                setSelectedCountryId(u.id);
                setActivePointId(null);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 border ${
                isSelected
                  ? 'bg-amber-500 border-amber-500 text-slate-950 font-bold shadow-md'
                  : 'bg-[#141d21] border-[#25353c] text-slate-300 hover:bg-[#1a252a] hover:text-white'
              }`}
            >
              <span className="text-base">{u.flag}</span>
              <span>{u.country}</span>
            </button>
          );
        })}
      </div>

      {/* Compare Mode Callout */}
      {compareMode && (
        <div className="archive-card p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#243339] pb-4">
            <div>
              <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-amber-400" />
                Великий перелом: Чому форма змінилася до невпізнаваності?
              </h3>
              <p className="text-slate-300 text-xs font-serif-text mt-1">
                Порівняльна наочна панорама: кардинальний перехід армій від романтики XIX століття до брудної практичності окопів.
              </p>
            </div>
            <span className="text-xs font-mono text-amber-400 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-full shrink-0">
              Аналіз військового стандарту
            </span>
          </div>

          {/* Comparative Historic Visual Artifact */}
          <div className="max-w-4xl mx-auto">
            <HistoricPhoto
              src="/images/ww1_uniforms_evolution_1790008511665.jpg"
              alt="Еволюція військової форми: 1914 проти 1916"
              caption="Історичний порівняльний розріз одностроїв 1914–1916: Французький піхотинець з червоними штанами, німець у шкіряному пікельгаубе 1914 року та їхні наступники 1916 року в сталевих касках Адріана, Штальгельмах M16 та маскувальному сукні."
              year="1914–1916"
              aspectRatio="video"
              badge="Еволюція захисту"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#182024] border border-rose-900/50 p-5 rounded-xl">
              <span className="text-xs font-mono uppercase tracking-widest text-rose-400 font-bold block mb-3">
                1914 рік • Ілюзія шляхетного бою
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-serif-text">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong className="text-white">Франція:</strong> яскраві багряні штани та темно-сині шинелі. Солдати були мішенями на відстані до 1,5 км.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong className="text-white">Німеччина:</strong> лакований шкіряний шолом Pickelhaube зі шпилем, що відблискував на сонці та чіплявся за дріт.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong className="text-white">Головні убори:</strong> сукняні кашкети й кепі. 0% захисту від уламків та шрапнелі, що вибухала в повітрі.</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#182024] border border-emerald-900/50 p-5 rounded-xl">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-3">
                1916 рік • Окопний реалізм і технології
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-serif-text">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-white">Сталеві каски:</strong> французький Adrian M15, британський Brodie та німецький Stahlhelm M16 зберегли сотні тисяч життів.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-white">Захисні барви:</strong> Bleu Horizon, Khaki, Feldgrau стали стандартом маскування. Потаємні планки ґудзиків.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-white">Український внесок:</strong> Створення шапки-мазепинки УСС (1916) як першого національного військового убору нового часу.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Main Interactive Soldier Inspector Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Archival Photo & Hotspot Selector */}
        <div className="lg:col-span-5 archive-card p-6 flex flex-col justify-between">
          {/* Top Badge Info */}
          <div className="w-full flex items-center justify-between text-xs border-b border-[#243339] pb-3 mb-4">
            <span className="font-semibold text-white flex items-center gap-1.5 text-sm">
              <span className="text-lg">{activeUniform.flag}</span>
              <span>{activeUniform.soldierType}</span>
            </span>
            <span className="font-mono text-amber-400 bg-[#1a2529] px-2.5 py-0.5 rounded border border-[#2b3c43]">
              {activeUniform.period}
            </span>
          </div>

          {/* Historical Photograph */}
          <div className="mb-4">
            <HistoricPhoto
              src={activeUniform.imageUrl}
              alt={activeUniform.soldierType}
              caption={activeUniform.imageCaption || activeUniform.soldierType}
              year={activeUniform.period}
              aspectRatio="portrait"
              badge={activeUniform.country}
            />
          </div>

          {/* If Ukrainian Sich Riflemen, note Mazepynka badge */}
          {activeUniform.id === 'uss-ukraine-1914-1916' && (
            <div className="p-3 mb-4 rounded-xl bg-[#192327] border border-[#2e4047] flex items-center gap-3">
              <div className="p-2 bg-[#223035] rounded-lg border border-[#354951]">
                <MazepynkaCapIcon size={36} />
              </div>
              <div>
                <span className="text-xs font-bold font-heading text-white block">Шапка-мазепинка (1916)</span>
                <span className="text-[11px] text-slate-300 font-serif-text">Особливий клиноподібний розріз спереду, знак козацьких традицій</span>
              </div>
            </div>
          )}

          {/* Interactive Inspection Points List */}
          <div>
            <span className="text-xs uppercase font-semibold tracking-wider text-amber-400 block mb-2 font-mono">
              Оберіть елемент для детального аналізу:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeUniform.interactivePoints.map((point) => {
                const isPointSelected = selectedPoint.id === point.id;
                return (
                  <button
                    key={point.id}
                    id={`hotspot-${point.id}`}
                    onClick={() => {
                      sound.playClick();
                      setActivePointId(point.id);
                    }}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                      isPointSelected
                        ? 'bg-amber-500 border-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'bg-[#151e22] border-[#26363d] text-slate-300 hover:border-[#3a5059] hover:bg-[#1a252a] hover:text-white'
                    }`}
                  >
                    <span>{point.label}</span>
                    <Eye className="w-3.5 h-3.5 opacity-60" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Point Dossier & Uniform Stats */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Hotspot Inspector Card */}
          <div className="archive-card p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-[#243339] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold bg-[#1b262a] px-2.5 py-1 rounded border border-[#2e4047]">
                  {selectedPoint.label}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-serif-text">{activeUniform.army}</span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold font-heading text-white">
              {selectedPoint.title}
            </h3>
            <p className="text-slate-200 font-serif-text text-base leading-relaxed">
              {selectedPoint.description}
            </p>
          </div>

          {/* Comprehensive Uniform Dossier */}
          <div className="archive-card-subtle p-6 space-y-4 border border-[#27373e]">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2 font-heading">
              <Info className="w-4 h-4 text-amber-400" />
              Характеристики однострою ({activeUniform.country})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="bg-[#162024] p-3.5 rounded-xl border border-[#26363d]">
                <span className="text-slate-400 block text-xs">Головний убір:</span>
                <span className="text-white font-medium font-serif-text">{activeUniform.headgear}</span>
              </div>
              <div className="bg-[#162024] p-3.5 rounded-xl border border-[#26363d]">
                <span className="text-slate-400 block text-xs">Колір кітеля/шинелі:</span>
                <span className="text-white font-medium font-serif-text">{activeUniform.jacketColor}</span>
              </div>
              <div className="bg-[#162024] p-3.5 rounded-xl border border-[#26363d]">
                <span className="text-slate-400 block text-xs">Штани:</span>
                <span className="text-white font-medium font-serif-text">{activeUniform.trousersColor}</span>
              </div>
              <div className="bg-[#162024] p-3.5 rounded-xl border border-[#26363d]">
                <span className="text-slate-400 block text-xs">Взуття:</span>
                <span className="text-white font-medium font-serif-text">{activeUniform.footwear}</span>
              </div>
            </div>

            {/* Historical Context Callout */}
            <div className="bg-[#172226] border border-[#2b3c43] p-4 rounded-xl text-xs sm:text-sm text-slate-200 font-serif-text leading-relaxed space-y-2">
              <div>
                <strong className="text-white block mb-1 font-heading">Ключова інновація / досвід:</strong>
                {activeUniform.keyInnovation}
              </div>
              {activeUniform.ukrainianConnection && (
                <div className="pt-2 border-t border-[#26363d]">
                  <strong className="text-amber-400 block mb-1 font-heading">Український вимір:</strong>
                  {activeUniform.ukrainianConnection}
                </div>
              )}
            </div>

            {/* Survival & Efficiency Stats Ratings */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-3 font-mono">
                Оцінка бойової ефективності спорядження (за шкалою 1–10)
              </span>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-serif-text">Маскувальні властивості (камуфляж на місцевості)</span>
                    <span className="font-mono text-amber-400 font-bold">{activeUniform.stats.camouflageRating}/10</span>
                  </div>
                  <div className="w-full h-2 bg-[#1b2529] rounded-full overflow-hidden border border-[#27373e]">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${activeUniform.stats.camouflageRating * 10}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-serif-text">Захист голови від шрапнелі й уламків</span>
                    <span className="font-mono text-amber-400 font-bold">{activeUniform.stats.headProtectionRating}/10</span>
                  </div>
                  <div className="w-full h-2 bg-[#1b2529] rounded-full overflow-hidden border border-[#27373e]">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${activeUniform.stats.headProtectionRating * 10}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-serif-text">Мобільність в окопній багнюці</span>
                    <span className="font-mono text-amber-400 font-bold">{activeUniform.stats.mobilityRating}/10</span>
                  </div>
                  <div className="w-full h-2 bg-[#1b2529] rounded-full overflow-hidden border border-[#27373e]">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${activeUniform.stats.mobilityRating * 10}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
