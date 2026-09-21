import React from 'react';
import { ChapterId } from '../types';
import { CHAPTERS } from '../data/ww1Data';
import { sound } from '../utils/audio';
import { Volume2, VolumeX, Presentation, LayoutGrid, ChevronLeft, ChevronRight, Mic, User, GraduationCap } from 'lucide-react';

interface HeaderProps {
  currentChapter: ChapterId;
  onSelectChapter: (id: ChapterId) => void;
  isPresentationMode: boolean;
  onTogglePresentationMode: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenSpeakerNotes?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentChapter,
  onSelectChapter,
  isPresentationMode,
  onTogglePresentationMode,
  isMuted,
  onToggleMute,
  onOpenSpeakerNotes,
}) => {
  const currentIndex = CHAPTERS.findIndex((c) => c.id === currentChapter);

  const handlePrev = () => {
    if (currentIndex > 0) {
      sound.playClick();
      onSelectChapter(CHAPTERS[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < CHAPTERS.length - 1) {
      sound.playClick();
      onSelectChapter(CHAPTERS[currentIndex + 1].id);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#12191c]/95 backdrop-blur-md border-b border-[#243339] shadow-md">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#1b2529] border border-[#2e4047] flex items-center justify-center text-amber-400 font-heading font-bold shadow-inner">
            1914
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] tracking-wider uppercase font-semibold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
                10 клас • Історія України
              </span>
              <span className="text-xs text-slate-400 font-serif-text">1914–1916 рр.</span>
              <span className="text-[11px] text-sky-300 bg-sky-950/50 border border-sky-800/50 px-2 py-0.5 rounded flex items-center gap-1 font-medium">
                <User className="w-3 h-3 text-sky-400" />
                <span>Гладкий Ігор (10-Б)</span>
              </span>
            </div>
            <h1 className="text-sm sm:text-base md:text-lg font-bold text-slate-100 font-heading tracking-wide mt-0.5">
              Перша світова війна: Уніформа, зброя та відзнаки
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Speaker Cheat Sheet Notes Button */}
          {onOpenSpeakerNotes && (
            <button
              id="header-speaker-notes-btn"
              onClick={() => {
                sound.playClick();
                onOpenSpeakerNotes();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold transition-all shadow-md"
              title="Відкрити шпаргалку для усного виступу"
            >
              <Mic className="w-4 h-4 text-slate-950 animate-pulse" />
              <span className="hidden sm:inline">Шпаргалка для розповіді</span>
              <span className="sm:hidden">Шпаргалка</span>
            </button>
          )}

          {/* Ambient Trench Atmosphere toggle */}
          <button
            id="header-toggle-ambient-btn"
            onClick={() => {
              if (sound.isAmbientPlaying) {
                sound.stopTrenchAmbient();
              } else {
                sound.startTrenchAmbient();
              }
              sound.playClick();
            }}
            className={`p-2 rounded-lg border text-xs font-mono transition-all shadow-xs flex items-center gap-1.5 ${
              sound.isAmbientPlaying
                ? 'bg-amber-500/20 border-amber-500 text-amber-300 ring-1 ring-amber-500/40'
                : 'bg-[#182327] border-[#2c3d44] text-slate-300 hover:text-white hover:bg-[#202e33]'
            }`}
            title={sound.isAmbientPlaying ? "Зупинити окопну атмосферу" : "Увімкнути атмосферу окопів (дощ та далекий гул)"}
          >
            <Volume2 className={`w-4 h-4 ${sound.isAmbientPlaying ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
            <span className="hidden xl:inline text-[11px]">
              {sound.isAmbientPlaying ? 'Атмосфера: Увімкн.' : 'Атмосфера шанців'}
            </span>
          </button>

          {/* Audio toggle */}
          <button
            id="toggle-sound-btn"
            onClick={() => {
              onToggleMute();
              sound.playClick();
            }}
            className="p-2 rounded-lg bg-[#182327] border border-[#2c3d44] text-slate-300 hover:text-white hover:bg-[#202e33] transition-colors shadow-xs"
            title={isMuted ? "Увімкнути звукові ефекти" : "Вимкнути звук"}
            aria-label="Перемикач звуку"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Presentation mode toggle */}
          <button
            id="toggle-presentation-btn"
            onClick={() => {
              sound.playClick();
              onTogglePresentationMode();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-medium transition-all shadow-xs ${
              isPresentationMode
                ? 'bg-sky-600 border-sky-500 text-white font-semibold'
                : 'bg-[#182327] border-[#2c3d44] text-slate-200 hover:text-white hover:bg-[#202e33]'
            }`}
          >
            {isPresentationMode ? (
              <>
                <LayoutGrid className="w-4 h-4 text-white" />
                <span>Режим атласу</span>
              </>
            ) : (
              <>
                <Presentation className="w-4 h-4 text-sky-400" />
                <span className="hidden sm:inline">Показ презентації</span>
                <span className="sm:hidden">Показ</span>
              </>
            )}
          </button>

          {/* Nav arrows */}
          <div className="flex items-center ml-1 bg-[#182327] border border-[#2c3d44] rounded-lg p-0.5 shadow-xs">
            <button
              id="prev-chapter-btn"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-1.5 rounded text-slate-400 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
              title="Попередній розділ"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono px-2 text-slate-400">
              {currentIndex + 1}/{CHAPTERS.length}
            </span>
            <button
              id="next-chapter-btn"
              onClick={handleNext}
              disabled={currentIndex === CHAPTERS.length - 1}
              className="p-1.5 rounded text-slate-400 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
              title="Наступний розділ"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Chapter Tabs Scrollable */}
      <div className="border-t border-[#222f35] bg-[#0e1416] overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 flex space-x-1 py-1.5 min-w-max">
          {CHAPTERS.map((ch, idx) => {
            const isActive = ch.id === currentChapter;
            return (
              <button
                key={ch.id}
                id={`tab-chapter-${ch.id}`}
                onClick={() => {
                  sound.playClick();
                  onSelectChapter(ch.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-[#192226]'
                }`}
              >
                <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-mono font-bold ${
                  isActive ? 'bg-slate-950 text-amber-400' : 'bg-[#1e2a2f] text-slate-400'
                }`}>
                  {idx + 1}
                </span>
                <span>{ch.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
