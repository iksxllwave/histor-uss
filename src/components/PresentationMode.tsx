import React, { useEffect, useState } from 'react';
import { ChapterId } from '../types';
import { CHAPTERS } from '../data/ww1Data';
import { sound } from '../utils/audio';
import { ChevronLeft, ChevronRight, X, Mic, User, GraduationCap } from 'lucide-react';
import { SpeakerNotesModal } from './SpeakerNotesModal';

interface PresentationModeProps {
  currentChapter: ChapterId;
  onSelectChapter: (id: ChapterId) => void;
  onExit: () => void;
  children: React.ReactNode;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  currentChapter,
  onSelectChapter,
  onExit,
  children,
}) => {
  const [isSpeakerNotesOpen, setIsSpeakerNotesOpen] = useState(false);
  const currentIndex = CHAPTERS.findIndex((c) => c.id === currentChapter);
  const currentChapterMeta = CHAPTERS[currentIndex] || CHAPTERS[0];

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

  // Keyboard navigation Left / Right / Escape / M for Mic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrev();
      } else if (e.key === 'Escape') {
        if (isSpeakerNotesOpen) {
          setIsSpeakerNotesOpen(false);
        } else {
          onExit();
        }
      } else if (e.key === 'n' || e.key === 'N' || e.key === 'm' || e.key === 'M') {
        setIsSpeakerNotesOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isSpeakerNotesOpen]);

  return (
    <div className="min-h-screen bg-[#0c1012] text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      {/* Top Presentation Bar */}
      <div className="bg-[#12191c]/95 border-b border-[#243339] px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold bg-[#1b2529] text-amber-400 border border-[#2e4047] px-3 py-1 rounded-full uppercase">
            Слайд {currentIndex + 1} з {CHAPTERS.length}
          </span>
          <h2 className="text-sm sm:text-base font-bold text-white font-heading hidden sm:block">
            {currentChapterMeta.title}
          </h2>
          <span className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 border-l border-[#27363c] pl-3">
            <User className="w-3.5 h-3.5 text-sky-400" />
            <span>Гладкий Ігор (10-Б)</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Speaker Notes Button */}
          <button
            id="pres-speaker-notes-btn"
            onClick={() => {
              sound.playClick();
              setIsSpeakerNotesOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold transition-colors shadow-sm"
            title="Відкрити шпаргалку для усного розказу (Гаряча клавіша: N або M)"
          >
            <Mic className="w-4 h-4 text-slate-950 animate-pulse" />
            <span className="hidden sm:inline">Шпаргалка для розповіді</span>
            <span className="sm:hidden">Шпаргалка</span>
          </button>

          {/* Quick jump menu */}
          <select
            value={currentChapter}
            onChange={(e) => {
              sound.playClick();
              onSelectChapter(e.target.value as ChapterId);
            }}
            className="bg-[#182327] border border-[#2c3d44] text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500 font-medium"
          >
            {CHAPTERS.map((ch, idx) => (
              <option key={ch.id} value={ch.id} className="bg-[#141b1e] text-slate-100">
                {idx + 1}. {ch.title}
              </option>
            ))}
          </select>

          {/* Exit Presentation Mode */}
          <button
            id="exit-presentation-btn"
            onClick={() => {
              sound.playClick();
              onExit();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#182327] border border-[#2c3d44] hover:border-slate-400 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
            title="Вийти з режиму презентації (Esc)"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Вийти</span>
          </button>
        </div>
      </div>

      {/* Slide Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>

      {/* Bottom Floating Presentation Control Dock */}
      <div className="sticky bottom-0 z-40 bg-[#12191c]/95 border-t border-[#243339] px-4 sm:px-6 py-3 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-xs text-slate-400 hidden md:flex items-center gap-2 font-serif-text">
            <span>Керування показом:</span>
            <kbd className="px-1.5 py-0.5 bg-[#1a2428] border border-[#2e4047] rounded font-mono text-slate-300">←</kbd>
            <kbd className="px-1.5 py-0.5 bg-[#1a2428] border border-[#2e4047] rounded font-mono text-slate-300">→</kbd>
            <kbd className="px-1.5 py-0.5 bg-[#1a2428] border border-[#2e4047] rounded font-mono text-slate-300">M: шпаргалка</kbd>
            <kbd className="px-1.5 py-0.5 bg-[#1a2428] border border-[#2e4047] rounded font-mono text-slate-300">Esc</kbd>
          </div>

          {/* Center Progress Dots */}
          <div className="flex items-center gap-1.5">
            {CHAPTERS.map((ch, idx) => (
              <button
                key={ch.id}
                id={`dot-slide-${ch.id}`}
                onClick={() => {
                  sound.playClick();
                  onSelectChapter(ch.id);
                }}
                className={`h-2.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-7 bg-amber-500 shadow-sm'
                    : 'w-2.5 bg-[#25343a] hover:bg-[#394f58]'
                }`}
                title={ch.title}
              />
            ))}
          </div>

          {/* Prev/Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              id="slide-prev-btn"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-[#182327] hover:bg-[#223035] border border-[#2c3d44] disabled:opacity-25 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Назад</span>
            </button>
            <button
              id="slide-next-btn"
              onClick={handleNext}
              disabled={currentIndex === CHAPTERS.length - 1}
              className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 border border-amber-500 text-slate-950 disabled:opacity-25 disabled:cursor-not-allowed text-xs font-bold transition-colors shadow-sm"
            >
              <span>Далі</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Speaker Notes Modal for Presenter */}
      <SpeakerNotesModal
        isOpen={isSpeakerNotesOpen}
        onClose={() => setIsSpeakerNotesOpen(false)}
        currentChapter={currentChapter}
        onSelectChapter={onSelectChapter}
      />
    </div>
  );
};
