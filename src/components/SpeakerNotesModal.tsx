import React, { useState } from 'react';
import { ChapterId } from '../types';
import { CHAPTERS } from '../data/ww1Data';
import { SPEAKER_NOTES, SpeakerNote } from '../data/speakerNotes';
import { sound } from '../utils/audio';
import { Mic, X, Clock, Lightbulb, ArrowRight, User, CheckCircle2, ChevronRight } from 'lucide-react';

interface SpeakerNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentChapter: ChapterId;
  onSelectChapter?: (id: ChapterId) => void;
}

export const SpeakerNotesModal: React.FC<SpeakerNotesModalProps> = ({
  isOpen,
  onClose,
  currentChapter,
  onSelectChapter,
}) => {
  const [selectedNoteChapter, setSelectedNoteChapter] = useState<ChapterId>(currentChapter);

  // Sync with current chapter if modal opens
  React.useEffect(() => {
    if (isOpen) {
      setSelectedNoteChapter(currentChapter);
    }
  }, [isOpen, currentChapter]);

  if (!isOpen) return null;

  const note: SpeakerNote = SPEAKER_NOTES[selectedNoteChapter] || SPEAKER_NOTES['overview'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#141b1e] border border-[#2a383d] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="bg-[#1a2327] border-b border-[#2a383d] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
                  Шпаргалка для виступу
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-sky-400" />
                  <strong className="text-slate-200">Гладкий Ігор, 10-Б клас</strong>
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold font-heading text-slate-100 mt-0.5">
                Текст для усного розказу без читання з екрана
              </h3>
            </div>
          </div>

          <button
            id="close-speaker-notes-btn"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-lg bg-[#222d32] border border-[#33444b] text-slate-300 hover:text-white hover:bg-[#2b3a40] transition-colors"
            title="Закрити шпаргалку (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chapter quick switcher pill row */}
        <div className="bg-[#0f1416] border-b border-[#243035] px-4 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {CHAPTERS.map((ch, idx) => {
            const isSelected = ch.id === selectedNoteChapter;
            return (
              <button
                key={ch.id}
                id={`note-pill-${ch.id}`}
                onClick={() => {
                  sound.playClick();
                  setSelectedNoteChapter(ch.id);
                  if (onSelectChapter) {
                    onSelectChapter(ch.id);
                  }
                }}
                className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs font-medium transition-all shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-[#182024] text-slate-300 hover:text-white hover:bg-[#232f35] border border-[#273439]'
                }`}
              >
                <span>{idx + 1}.</span>
                <span>{ch.title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable notes body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Note Title & Duration Meta */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#253237] pb-3">
            <div>
              <span className="text-xs text-sky-400 font-mono">Розділ: {note.chapterTitle}</span>
              <h4 className="text-lg font-bold font-heading text-white">
                Що розказати вчителю та однокласникам
              </h4>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-amber-300 bg-amber-950/40 border border-amber-800/40 px-2.5 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5" />
              <span>Час доповіді: {note.timeEstimate}</span>
            </div>
          </div>

          {/* Opening sentence to speak */}
          <div className="bg-[#1b252a] border-l-4 border-amber-500 rounded-r-xl p-4">
            <span className="text-xs uppercase tracking-wider text-amber-400 font-bold block mb-1">
              Початкова фраза (скажи вголос):
            </span>
            <p className="text-slate-100 font-serif-text text-base italic leading-relaxed">
              {note.openingLine}
            </p>
          </div>

          {/* Key Bullet Points (Never read full blocks) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-300 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Головні тези для озвучення (не читай все підряд, кажи своїми словами):</span>
            </div>
            <div className="space-y-2.5">
              {note.keyBulletPoints.map((point, idx) => (
                <div 
                  key={idx}
                  className="bg-[#172024] border border-[#27353b] rounded-xl p-3.5 flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-sky-950 border border-sky-600 text-sky-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* High-value fact to impress the teacher */}
          <div className="bg-emerald-950/30 border border-emerald-800/50 rounded-xl p-4 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                Коронний факт (для високої оцінки):
              </span>
              <p className="text-emerald-100 text-sm sm:text-base font-serif-text leading-relaxed">
                {note.teacherImpressFact}
              </p>
            </div>
          </div>

          {/* Transition to next slide */}
          <div className="bg-[#182024] border border-[#2b393f] rounded-xl p-3.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-slate-300">
              <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-medium text-slate-400">Фраза переходу до наступного слайда:</span>
            </div>
            <span className="text-amber-200 font-serif-text italic text-right max-w-sm">
              {note.closingLine}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#182226] border-t border-[#2a383d] px-5 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Шпаргалка активна • Проєкт підготував <strong>Гладкий Ігор (10-Б)</strong></span>
          </div>

          <button
            id="modal-got-it-btn"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors shadow-sm flex items-center gap-1.5"
          >
            <span>Зрозуміло, продовжуємо виступ</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
