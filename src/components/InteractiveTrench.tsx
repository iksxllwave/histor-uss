import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { 
  Crosshair, 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  Eye, 
  Info, 
  Maximize2,
  ChevronRight,
  Flame,
  Radio
} from 'lucide-react';

interface TrenchHotspot {
  id: string;
  title: string;
  subtitle: string;
  x: number; // percentage
  y: number; // percentage
  depth: string;
  militaryPurpose: string;
  historicalReality: string;
  dangerLevel: 'Критична' | 'Висока' | 'Помірна';
  soundType: 'machinegun' | 'gasbell' | 'rumble' | 'click';
}

const TRENCH_HOTSPOTS: TrenchHotspot[] = [
  {
    id: 'periscope',
    title: 'Снайперський перископ та бійниця',
    subtitle: 'Оптичний нагляд без ризику кулі в лоб',
    x: 28,
    y: 22,
    depth: '0.2 м над рівнем землі',
    militaryPurpose: 'Стеження за ворожою «нічиєю землею» через дзеркальні призми або сталеві бійниці товщиною 8–10 мм.',
    historicalReality: 'Висунути голову з окопу хоча б на 3 секунди означало гарантовану кулю ворожого снайпера. Перископи врятували життя тисячам дозорних.',
    dangerLevel: 'Критична',
    soundType: 'click'
  },
  {
    id: 'sandbags',
    title: 'Бруствер та мішки з піском',
    subtitle: 'Передній захисний вал піхотинця',
    x: 48,
    y: 18,
    depth: 'Висота бруствера: 1.2–1.6 м',
    militaryPurpose: 'Поглинання кінетичної енергії куль калібру 7.62–8 мм та уламків шрапнельних розривів.',
    historicalReality: 'Мішки швидко гнили від осінніх дощів і розсипалися під артилерійським вогнем. Їх щоночі відновлювали під прикриттям темряви.',
    dangerLevel: 'Висока',
    soundType: 'rumble'
  },
  {
    id: 'maxim-nest',
    title: 'Кулеметне гніздо з «Максимом»',
    subtitle: 'Головний господар позиційного фронту',
    x: 72,
    y: 35,
    depth: 'Напівзаглиблений каземат',
    militaryPurpose: 'Фланкуючий вогонь вздовж лінії колючого дроту. Темп стрільби — 500–600 постр./хв.',
    historicalReality: 'Один кулеметний розрахунок з 4 осіб міг повністю знищити наступаючий батальйон піхоти (до 800 людей) за лічені хвилини.',
    dangerLevel: 'Критична',
    soundType: 'machinegun'
  },
  {
    id: 'duckboards',
    title: 'Дерев’яні гаті (Duckboards)',
    subtitle: 'Порятунок від «траншейної стопи»',
    x: 42,
    y: 78,
    depth: 'Дно траншеї: 2.0–2.5 м',
    militaryPurpose: 'Дерев’яні ґратчасті настили над дренажними канавами з багнюкою і крижаною водою.',
    historicalReality: 'Стояння днями у воді викликало грибковий некроз тканин («окопну стопу»), що нерідко закінчувалося ампутацією кінцівок.',
    dangerLevel: 'Помірна',
    soundType: 'click'
  },
  {
    id: 'dugout',
    title: 'Глибокий бліндаж (Dugout / Фольварк)',
    subtitle: 'Підземне укриття від важких гаубиць',
    x: 82,
    y: 72,
    depth: 'Глибина: 6–10 метрів під землею',
    militaryPurpose: 'Захист командного пункту, поранених та солдатів під час багатоденних артилерійських ураганів.',
    historicalReality: 'Німецькі бліндажі мали електричне освітлення та дерев’яні нари. Пряме влучання 420-мм снаряда могло поховати заживо весь підрозділ.',
    dangerLevel: 'Висока',
    soundType: 'rumble'
  },
  {
    id: 'gas-alarm',
    title: 'Газовий гонг та засоби РХБЗ',
    subtitle: 'Сигнал про смертельну хмару хлору чи фосгену',
    x: 18,
    y: 52,
    depth: 'Стінка траншеї зв’язку',
    militaryPurpose: 'Мідна гільза від снаряда як гонг для миттєвого оповіщення про початок хімічної атаки.',
    historicalReality: 'Боєць мав 20–30 секунд, щоб одягти протигаз. Запізнення означало спалення легенів і болісну задуху.',
    dangerLevel: 'Критична',
    soundType: 'gasbell'
  }
];

export const InteractiveTrench: React.FC = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<TrenchHotspot>(TRENCH_HOTSPOTS[2]);
  const [isAmbientActive, setIsAmbientActive] = useState<boolean>(sound.isAmbientPlaying);
  const [showTacticalStats, setShowTacticalStats] = useState<boolean>(true);

  const toggleAmbientSound = () => {
    if (isAmbientActive) {
      sound.stopTrenchAmbient();
      setIsAmbientActive(false);
    } else {
      sound.startTrenchAmbient();
      setIsAmbientActive(true);
    }
  };

  const handleSelectHotspot = (spot: TrenchHotspot) => {
    setSelectedHotspot(spot);
    if (spot.soundType === 'machinegun') {
      sound.playMachineGun();
    } else if (spot.soundType === 'gasbell') {
      sound.playGasBell();
    } else if (spot.soundType === 'rumble') {
      sound.playRumble();
    } else {
      sound.playClick();
    }
  };

  return (
    <div className="archive-card p-6 md:p-8 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#233137] pb-5">
        <div>
          <div className="archive-badge mb-2">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Інтерактивний 3D-зріз фортифікацій</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold font-heading text-white">
            Анатомія траншеї 1916 року: Як був влаштований підземний фронт
          </h3>
          <p className="text-slate-300 font-serif-text text-sm mt-1 max-w-2xl">
            Натискайте на активні тактичні точки на схемі траншеї, щоб вивчити деталі фортифікацій, інженерні рішення та почути звуковий звіт.
          </p>
        </div>

        {/* Ambient Soundscape Controller */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            id="toggle-trench-ambient-btn"
            onClick={toggleAmbientSound}
            className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2 border transition-all shadow-md ${
              isAmbientActive
                ? 'bg-amber-500/20 border-amber-500 text-amber-300 ring-1 ring-amber-500/40'
                : 'bg-[#151e22] border-[#293940] text-slate-300 hover:text-white hover:border-[#38bdf8]'
            }`}
          >
            {isAmbientActive ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Звуки шанців (Увімкнено)</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span>Увімкнути атмосферу дощу</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Interactive Diagram Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Visual Trench Blueprint Container with Clickable Markers */}
        <div className="lg:col-span-8 space-y-3">
          <div className="relative rounded-2xl overflow-hidden border border-[#2d3e45] bg-[#0a0d0e] group shadow-2xl">
            {/* Architectural Cutaway Diagram */}
            <img
              src="/images/ww1_trench_anatomy_cutaway_1790008468158.jpg"
              alt="Анатомія траншеї 1916 року"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover filter contrast-[1.08] brightness-[0.95] select-none"
            />

            {/* Subtle Grid Overlay Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            {/* Tactical Pins on Diagram */}
            {TRENCH_HOTSPOTS.map((spot, idx) => {
              const isSelected = selectedHotspot.id === spot.id;
              return (
                <button
                  key={spot.id}
                  id={`trench-pin-${spot.id}`}
                  onClick={() => handleSelectHotspot(spot)}
                  style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/pin focus:outline-none"
                  aria-label={spot.title}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing ring */}
                    <span
                      className={`absolute w-8 h-8 rounded-full transition-all duration-500 ${
                        isSelected
                          ? 'bg-amber-400/40 animate-ping'
                          : 'bg-sky-400/20 group-hover/pin:scale-125'
                      }`}
                    />
                    
                    {/* Center Pin Button */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold border shadow-lg transition-transform ${
                        isSelected
                          ? 'bg-amber-500 border-white text-slate-950 scale-110 ring-4 ring-amber-500/30'
                          : 'bg-[#121c20] border-[#38bdf8] text-[#38bdf8] hover:bg-[#1a282e] hover:scale-105'
                      }`}
                    >
                      {idx + 1}
                    </div>

                    {/* Hover Tooltip on desktop */}
                    <div className="absolute bottom-full mb-2 hidden sm:group-hover/pin:block pointer-events-none z-30 whitespace-nowrap">
                      <div className="bg-[#0b1012]/95 backdrop-blur-md border border-[#2d3e45] text-white text-[11px] font-mono px-2.5 py-1 rounded-md shadow-xl">
                        {spot.title}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Legend bar inside canvas */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono bg-[#090d0e]/85 backdrop-blur-md border border-[#243339] px-3.5 py-2 rounded-xl text-slate-300">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Crosshair className="w-3.5 h-3.5" />
                Зріз типової лінії: Західний фронт / Галичина (1916)
              </span>
              <span className="hidden sm:inline text-slate-400">
                Оберіть точку (1–6) для дослідження
              </span>
            </div>
          </div>

          {/* Quick Hotspot Horizontal Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
            {TRENCH_HOTSPOTS.map((spot, idx) => (
              <button
                key={spot.id}
                onClick={() => handleSelectHotspot(spot)}
                className={`px-3 py-2 rounded-xl text-left border transition-all text-xs font-serif-text flex items-center gap-2 ${
                  selectedHotspot.id === spot.id
                    ? 'bg-[#1c292f] border-amber-500 text-white shadow-md'
                    : 'bg-[#121a1d] border-[#223137] text-slate-300 hover:bg-[#172227]'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-[#24343b] text-amber-400 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="truncate">{spot.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Hotspot Intelligence Dossier */}
        <div className="lg:col-span-4 bg-[#141e22] border border-[#27373e] rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="border-b border-[#243339] pb-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 bg-[#1e2a2f] px-2 py-0.5 rounded border border-[#2f4048]">
                Елемент №{TRENCH_HOTSPOTS.findIndex(s => s.id === selectedHotspot.id) + 1}
              </span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                selectedHotspot.dangerLevel === 'Критична'
                  ? 'bg-rose-950/60 border-rose-500/60 text-rose-300'
                  : selectedHotspot.dangerLevel === 'Висока'
                  ? 'bg-amber-950/60 border-amber-500/60 text-amber-300'
                  : 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300'
              }`}>
                Рівень загрози: {selectedHotspot.dangerLevel}
              </span>
            </div>

            <h4 className="text-lg font-bold font-heading text-white">
              {selectedHotspot.title}
            </h4>
            <p className="text-xs text-slate-300 font-serif-text mt-1 italic">
              {selectedHotspot.subtitle}
            </p>
          </div>

          {/* Depth / Coordinates Info */}
          <div className="bg-[#0f1719] p-3.5 rounded-xl border border-[#223137] space-y-1.5 text-xs font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Глибина / Розташування:</span>
              <span className="text-white font-bold">{selectedHotspot.depth}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Тип загрози:</span>
              <span className="text-amber-400 font-semibold">
                {selectedHotspot.soundType === 'machinegun' ? 'Кулеметний простріл' : 
                 selectedHotspot.soundType === 'gasbell' ? 'Хімічна хмара' : 'Арт-наліт'}
              </span>
            </div>
          </div>

          {/* Military Function */}
          <div className="space-y-1.5 font-serif-text">
            <h5 className="text-xs font-mono uppercase text-slate-300 font-bold flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              Військове призначення:
            </h5>
            <p className="text-sm text-slate-200 leading-relaxed bg-[#172328] p-3.5 rounded-xl border border-[#25363e]">
              {selectedHotspot.militaryPurpose}
            </p>
          </div>

          {/* Historical Reality */}
          <div className="space-y-1.5 font-serif-text">
            <h5 className="text-xs font-mono uppercase text-slate-300 font-bold flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              Окопна реальність (1914–1916):
            </h5>
            <p className="text-sm text-slate-300 leading-relaxed bg-[#172328] p-3.5 rounded-xl border border-[#25363e]">
              {selectedHotspot.historicalReality}
            </p>
          </div>

          {/* Interactive Audio Trigger Button */}
          <button
            onClick={() => handleSelectHotspot(selectedHotspot)}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <Radio className="w-4 h-4" />
            <span>Відтворити звук об'єкта</span>
          </button>
        </div>
      </div>
    </div>
  );
};
