/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ChapterId } from './types';
import { CHAPTERS } from './data/ww1Data';
import { sound } from './utils/audio';
import { Header } from './components/Header';
import { ChapterChronicle } from './components/ChapterChronicle';
import { ChapterUniforms } from './components/ChapterUniforms';
import { ChapterInsignia } from './components/ChapterInsignia';
import { ChapterArmament } from './components/ChapterArmament';
import { ChapterCavalry } from './components/ChapterCavalry';
import { ChapterInteractiveGames } from './components/ChapterInteractiveGames';
import { ChapterFacts } from './components/ChapterFacts';
import { ChapterQuiz } from './components/ChapterQuiz';
import { ChapterConclusion } from './components/ChapterConclusion';
import { PresentationMode } from './components/PresentationMode';
import { SpeakerNotesModal } from './components/SpeakerNotesModal';
import { ChevronRight, ChevronLeft, Mic, User, GraduationCap, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [currentChapter, setCurrentChapter] = useState<ChapterId>('overview');
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSpeakerNotesOpen, setIsSpeakerNotesOpen] = useState<boolean>(false);

  const toggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    sound.isMuted = nextState;
  };

  const currentIndex = CHAPTERS.findIndex((c) => c.id === currentChapter);

  // Keyboard shortcut 'm' or 'n' to open speaker notes anytime
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input/textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }
      if (e.key === 'm' || e.key === 'M' || e.key === 'n' || e.key === 'N') {
        setIsSpeakerNotesOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderActiveChapter = () => {
    switch (currentChapter) {
      case 'overview':
        return <ChapterChronicle />;
      case 'uniforms':
        return <ChapterUniforms />;
      case 'insignia':
        return <ChapterInsignia />;
      case 'armament':
        return <ChapterArmament />;
      case 'cavalry':
        return <ChapterCavalry />;
      case 'interactive-games':
        return <ChapterInteractiveGames />;
      case 'facts':
        return <ChapterFacts />;
      case 'quiz':
        return <ChapterQuiz />;
      case 'conclusion':
        return (
          <ChapterConclusion
            onGoToQuiz={() => setCurrentChapter('quiz')}
            onGoToPresentation={() => setIsPresentationMode(true)}
          />
        );
      default:
        return <ChapterChronicle />;
    }
  };

  if (isPresentationMode) {
    return (
      <PresentationMode
        currentChapter={currentChapter}
        onSelectChapter={setCurrentChapter}
        onExit={() => setIsPresentationMode(false)}
      >
        {renderActiveChapter()}
      </PresentationMode>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c1012] text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      {/* Top Main Navigation Header */}
      <Header
        currentChapter={currentChapter}
        onSelectChapter={setCurrentChapter}
        isPresentationMode={isPresentationMode}
        onTogglePresentationMode={() => setIsPresentationMode(true)}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        onOpenSpeakerNotes={() => setIsSpeakerNotesOpen(true)}
      />

      {/* Main Chapter Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {renderActiveChapter()}

        {/* Bottom Chapter Next/Prev Navigator in Atlas Mode */}
        <div className="mt-12 pt-6 border-t border-[#233137] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            id="footer-prev-chapter-btn"
            disabled={currentIndex === 0}
            onClick={() => {
              if (currentIndex > 0) {
                sound.playClick();
                setCurrentChapter(CHAPTERS[currentIndex - 1].id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#162024] border border-[#27373e] text-slate-300 hover:text-white hover:bg-[#1d2a30] disabled:opacity-25 disabled:cursor-not-allowed text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>
              Попередній розділ: {currentIndex > 0 ? CHAPTERS[currentIndex - 1].title : 'Початок'}
            </span>
          </button>

          {/* Center Speaker Cheat Sheet Trigger */}
          <button
            id="footer-open-speech-btn"
            onClick={() => {
              sound.playClick();
              setIsSpeakerNotesOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all"
          >
            <Mic className="w-4 h-4 text-amber-400" />
            <span>Шпаргалка доповідача до цього розділу</span>
          </button>

          <button
            id="footer-next-chapter-btn"
            disabled={currentIndex === CHAPTERS.length - 1}
            onClick={() => {
              if (currentIndex < CHAPTERS.length - 1) {
                sound.playClick();
                setCurrentChapter(CHAPTERS[currentIndex + 1].id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold disabled:opacity-25 disabled:cursor-not-allowed text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <span>
              {currentIndex < CHAPTERS.length - 1
                ? `Наступний: ${CHAPTERS[currentIndex + 1].title}`
                : 'Кінець дослідження'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Educational Project Footer with Prominent Attribution */}
      <footer className="border-t border-[#233137] bg-[#0e1417] py-6 text-center text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-slate-300">
            <div className="flex items-center gap-1.5 font-medium">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Шкільний проєкт з історії України та Всесвітньої історії (10 клас)</span>
            </div>
            <span className="hidden sm:inline text-slate-600">•</span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#172125] border border-[#2b3b42] text-amber-300 font-semibold">
              <User className="w-3.5 h-3.5 text-sky-400" />
              <span>Автор проєкту: Гладкий Ігор, учень 10-Б класу</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
            <span>Період: 1914–1916 рр.</span>
            <span>•</span>
            <span>Легіон УСС & Європейські армії</span>
            <span>•</span>
            <button
              onClick={() => setIsSpeakerNotesOpen(true)}
              className="text-amber-400 hover:underline flex items-center gap-1"
            >
              <Mic className="w-3 h-3" />
              <span>Шпаргалка для розповіді</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Speaker Notes Modal */}
      <SpeakerNotesModal
        isOpen={isSpeakerNotesOpen}
        onClose={() => setIsSpeakerNotesOpen(false)}
        currentChapter={currentChapter}
        onSelectChapter={setCurrentChapter}
      />
    </div>
  );
}
