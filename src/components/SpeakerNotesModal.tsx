import React, { useState } from 'react';
import { ChapterId } from '../types';
import { CHAPTERS } from '../data/ww1Data';
import { SPEAKER_NOTES, SpeakerNote } from '../data/speakerNotes';
import {
  CHAPTER_CONTEXT_GUIDES,
  HISTORICAL_GLOSSARY,
  AUTHENTIC_PHOTO_CATALOG,
  PhotoVerificationItem
} from '../data/cheatSheetData';
import { sound } from '../utils/audio';
import {
  Mic,
  X,
  Clock,
  Lightbulb,
  ArrowRight,
  User,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Image as ImageIcon,
  Search,
  ShieldCheck,
  HelpCircle,
  ZoomIn,
  Sparkles
} from 'lucide-react';

interface SpeakerNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentChapter: ChapterId;
  onSelectChapter?: (id: ChapterId) => void;
}

type TabType = 'speech' | 'context' | 'glossary' | 'photos';

export const SpeakerNotesModal: React.FC<SpeakerNotesModalProps> = ({
  isOpen,
  onClose,
  currentChapter,
  onSelectChapter,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('speech');
  const [selectedNoteChapter, setSelectedNoteChapter] = useState<ChapterId>(currentChapter);
  const [glossarySearch, setGlossarySearch] = useState<string>('');
  const [glossaryCategory, setGlossaryCategory] = useState<string>('all');
  const [photoSearch, setPhotoSearch] = useState<string>('');
  const [enlargedPhoto, setEnlargedPhoto] = useState<PhotoVerificationItem | null>(null);

  // Sync with current chapter when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setSelectedNoteChapter(currentChapter);
    }
  }, [isOpen, currentChapter]);

  if (!isOpen) return null;

  const note: SpeakerNote = SPEAKER_NOTES[selectedNoteChapter] || SPEAKER_NOTES['overview'];
  const contextGuide = CHAPTER_CONTEXT_GUIDES.find(c => c.id === selectedNoteChapter) || CHAPTER_CONTEXT_GUIDES[0];

  const filteredGlossary = HISTORICAL_GLOSSARY.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      item.definition.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      item.context.toLowerCase().includes(glossarySearch.toLowerCase());
    const matchesCategory = glossaryCategory === 'all' || item.category === glossaryCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredPhotos = AUTHENTIC_PHOTO_CATALOG.filter(photo => {
    return photo.title.toLowerCase().includes(photoSearch.toLowerCase()) ||
      photo.chapterUsedIn.toLowerCase().includes(photoSearch.toLowerCase()) ||
      photo.historicalSubject.toLowerCase().includes(photoSearch.toLowerCase()) ||
      photo.contextExplanation.toLowerCase().includes(photoSearch.toLowerCase());
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#141b1e] border border-[#2a383d] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="bg-[#1a2327] border-b border-[#2a383d] px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
                  Шпаргалка дослідника та контекст
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-sky-400" />
                  <strong className="text-slate-200">Гладкий Ігор (10-Б)</strong>
                </span>
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-bold font-heading text-slate-100 mt-0.5">
                Повний путівник: про що говориться, тези виступу та верифікація фото
              </h3>
            </div>
          </div>

          <button
            id="close-speaker-notes-btn"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-[#222d32] border border-[#33444b] text-slate-300 hover:text-white hover:bg-[#2b3a40] transition-colors shrink-0"
            title="Закрити шпаргалку (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Navigation Tabs */}
        <div className="bg-[#0f1416] border-b border-[#243035] px-4 sm:px-6 flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('speech');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'speech'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-[#182024] text-slate-300 hover:text-white hover:bg-[#202c31] border border-[#263339]'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>🎙️ Текст для розповіді</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('context');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'context'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-[#182024] text-slate-300 hover:text-white hover:bg-[#202c31] border border-[#263339]'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>💡 Про що говориться (Суть розділів)</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('glossary');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'glossary'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-[#182024] text-slate-300 hover:text-white hover:bg-[#202c31] border border-[#263339]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>📖 Словничок термінів</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('photos');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'photos'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-[#182024] text-slate-300 hover:text-white hover:bg-[#202c31] border border-[#263339]'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>🖼️ Фото-гід та перевірка ({AUTHENTIC_PHOTO_CATALOG.length})</span>
          </button>
        </div>

        {/* Chapter quick switcher pill row (only shown for Speech & Context tabs) */}
        {(activeTab === 'speech' || activeTab === 'context') && (
          <div className="bg-[#12181b] border-b border-[#243035] px-4 sm:px-6 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono shrink-0 mr-1">
              Розділ:
            </span>
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
        )}

        {/* Scrollable content body based on active tab */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* TAB 1: SPEECH NOTES FOR ORAL PRESENTATION */}
          {activeTab === 'speech' && (
            <div className="space-y-5 animate-fadeIn">
              {/* Note Title & Duration Meta */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#253237] pb-3">
                <div>
                  <span className="text-xs text-sky-400 font-mono">Розділ: {note.chapterTitle}</span>
                  <h4 className="text-lg font-bold font-heading text-white">
                    Текст доповіді для виступу перед класом та вчителем
                  </h4>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-amber-300 bg-amber-950/40 border border-amber-800/40 px-2.5 py-1 rounded-full font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Час виступу: {note.timeEstimate}</span>
                </div>
              </div>

              {/* Opening sentence to speak */}
              <div className="bg-[#1b252a] border-l-4 border-amber-500 rounded-r-xl p-4">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-bold block mb-1">
                  Початкова фраза (скажи вголос, щоб привернути увагу):
                </span>
                <p className="text-slate-100 font-serif-text text-base italic leading-relaxed">
                  {note.openingLine}
                </p>
              </div>

              {/* Key Bullet Points */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-300 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Головні тези для озвучення (кажи своїми словами):</span>
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
                    Коронний факт (для відмінної оцінки):
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
                  <span className="font-medium text-slate-400">Фраза переходу до наступного розділу:</span>
                </div>
                <span className="text-amber-200 font-serif-text italic text-right max-w-sm">
                  {note.closingLine}
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: CONTEXT GUIDE ("ПРО ЩО ГОВОРИТЬСЯ ПРОСТИМИ СЛОВАМИ") */}
          {activeTab === 'context' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="border-b border-[#253237] pb-3">
                <span className="text-xs text-sky-400 font-mono">Контекст теми: {contextGuide.chapterTitle}</span>
                <h4 className="text-lg font-bold font-heading text-white">
                  Про що тут ідеться мова простими та зрозумілими словами
                </h4>
              </div>

              {/* Summary box */}
              <div className="bg-sky-950/30 border border-sky-800/50 rounded-xl p-4">
                <span className="text-xs uppercase tracking-wider text-sky-400 font-bold block mb-1.5">
                  Суть розділу за 30 секунд:
                </span>
                <p className="text-slate-100 text-sm sm:text-base leading-relaxed">
                  {contextGuide.shortSummary}
                </p>
              </div>

              {/* Why it matters */}
              <div className="bg-[#1a2327] border border-[#2b3a41] rounded-xl p-4">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-bold block mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Чому це важливо розуміти:</span>
                </span>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  {contextGuide.whyItMatters}
                </p>
              </div>

              {/* Key narrative points */}
              <div className="space-y-2.5">
                <span className="text-xs uppercase tracking-wider text-slate-300 font-bold block">
                  Ключові смислові акценти (про що говорити):
                </span>
                {contextGuide.keyNarrativePoints.map((point, idx) => (
                  <div key={idx} className="bg-[#161f22] border border-[#253338] rounded-xl p-3 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <p className="text-slate-200 text-sm leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>

              {/* Common misconception */}
              <div className="bg-rose-950/30 border border-rose-800/50 rounded-xl p-4 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-rose-300 font-bold block mb-1">
                    Поширена помилка (як правильно розуміти):
                  </span>
                  <p className="text-rose-100 text-sm sm:text-base leading-relaxed">
                    {contextGuide.commonMisconception}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HISTORICAL GLOSSARY */}
          {activeTab === 'glossary' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-[#253237] pb-3">
                <div>
                  <h4 className="text-lg font-bold font-heading text-white">
                    Словничок термінів епохи (1914–1916)
                  </h4>
                  <p className="text-xs text-slate-400">
                    Значення назв одностроїв, зброї, битв та унікальних явищ війни
                  </p>
                </div>

                {/* Search input */}
                <div className="relative min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={glossarySearch}
                    onChange={(e) => setGlossarySearch(e.target.value)}
                    placeholder="Пошук терміна..."
                    className="w-full bg-[#182024] border border-[#2b393f] rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-amber-500 transition-colors"
                  />
                  {glossarySearch && (
                    <button
                      onClick={() => setGlossarySearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {[
                  { id: 'all', label: 'Всі терміни' },
                  { id: 'uniform', label: 'Однострої та каски' },
                  { id: 'ukraine', label: 'Український вимір' },
                  { id: 'weapon', label: 'Зброя та розвідка' },
                  { id: 'tactic', label: 'Тактика і битви' },
                  { id: 'culture', label: 'Винаходи та культура' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      sound.playClick();
                      setGlossaryCategory(cat.id);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all shrink-0 ${
                      glossaryCategory === cat.id
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-[#182024] text-slate-400 hover:text-slate-200 border border-[#263338]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Term Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {filteredGlossary.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#172024] border border-[#26353b] hover:border-[#384950] rounded-xl p-3.5 transition-all shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-heading font-bold text-amber-300 text-sm sm:text-base">
                          {item.term}
                        </span>
                        {item.originalLanguage && (
                          <span className="text-[10px] text-sky-400 font-mono bg-sky-950/40 px-2 py-0.5 rounded border border-sky-800/40">
                            {item.originalLanguage}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-2 font-medium">
                        {item.definition}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-[#222e33] text-[11px] text-slate-400 leading-relaxed font-serif-text">
                      <strong className="text-amber-400/90 font-sans">Історичний контекст: </strong>
                      {item.context}
                    </div>
                  </div>
                ))}
              </div>

              {filteredGlossary.length === 0 && (
                <div className="text-center py-12 text-slate-400 text-sm">
                  За запитом «{glossarySearch}» нічого не знайдено.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: COMPLETE PHOTO CATALOG & VERIFICATION GUIDE */}
          {activeTab === 'photos' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-[#253237] pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-bold font-heading text-white">
                      Фото-довідник та верифікація (Всі {AUTHENTIC_PHOTO_CATALOG.length} фото)
                    </h4>
                    <span className="bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Всі фото перевірено</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Кожне фото в проєкті відповідає темі, не містить випадкових заглушок і має історичне обґрунтування.
                  </p>
                </div>

                {/* Photo Search input */}
                <div className="relative min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={photoSearch}
                    onChange={(e) => setPhotoSearch(e.target.value)}
                    placeholder="Пошук фото чи розділу..."
                    className="w-full bg-[#182024] border border-[#2b393f] rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-amber-500 transition-colors"
                  />
                  {photoSearch && (
                    <button
                      onClick={() => setPhotoSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Photos Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                {filteredPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => setEnlargedPhoto(photo)}
                    className="bg-[#172024] border border-[#27363c] hover:border-amber-500/50 rounded-xl overflow-hidden transition-all shadow-sm hover:shadow-lg cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="flex gap-3 p-3">
                      {/* Image Thumbnail */}
                      <div className="relative w-28 h-24 sm:w-32 sm:h-28 rounded-lg overflow-hidden shrink-0 bg-[#0d1315] border border-[#2a3a41]">
                        <img
                          src={photo.imageSrc}
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-amber-300">
                          <ZoomIn className="w-5 h-5 drop-shadow" />
                        </div>
                      </div>

                      {/* Content metadata */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[10px] text-amber-400 font-mono bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-800/40 truncate">
                              {photo.chapterUsedIn}
                            </span>
                          </div>
                          <h5 className="font-heading font-bold text-slate-100 text-sm leading-snug line-clamp-2 group-hover:text-amber-300 transition-colors">
                            {photo.title}
                          </h5>
                          <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                            {photo.historicalSubject}
                          </p>
                        </div>

                        <div className="mt-2 flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{photo.verifiedTag}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#12191c] px-3 py-2 border-t border-[#233036] text-[11px] text-slate-400 font-serif-text leading-relaxed">
                      <strong className="text-slate-300 font-sans">Чому підходить: </strong>
                      {photo.contextExplanation}
                    </div>
                  </div>
                ))}
              </div>

              {filteredPhotos.length === 0 && (
                <div className="text-center py-12 text-slate-400 text-sm">
                  За запитом «{photoSearch}» жодного фото не знайдено.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#182226] border-t border-[#2a383d] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
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
            <span>Зрозуміло, повертаємось до проєкту</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Enlarged Photo Inspection Modal */}
      {enlargedPhoto && (
        <div 
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setEnlargedPhoto(null)}
        >
          <div 
            className="relative max-w-2xl w-full bg-[#151c20] border border-[#2b3a41] rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-5 text-slate-100 flex flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#26353c] pb-2.5">
              <div>
                <span className="text-[11px] text-amber-400 font-mono">{enlargedPhoto.chapterUsedIn}</span>
                <h4 className="text-base sm:text-lg font-bold font-heading text-white">{enlargedPhoto.title}</h4>
              </div>
              <button
                onClick={() => setEnlargedPhoto(null)}
                className="p-1.5 rounded-lg bg-[#212b30] hover:bg-[#2c3a41] text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden border border-[#2c3d45] max-h-[55vh] flex items-center justify-center bg-black/50">
              <img
                src={enlargedPhoto.imageSrc}
                alt={enlargedPhoto.title}
                className="max-h-[55vh] w-auto object-contain"
              />
            </div>

            <div className="space-y-1.5 text-xs sm:text-sm">
              <p className="text-slate-200">
                <strong className="text-amber-400">Що зображено: </strong> {enlargedPhoto.historicalSubject}
              </p>
              <p className="text-slate-300 font-serif-text">
                <strong className="text-sky-400 font-sans">Історична відповідність: </strong> {enlargedPhoto.contextExplanation}
              </p>
              <div className="pt-2 flex items-center justify-between text-xs text-emerald-400">
                <span className="flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-4 h-4" /> {enlargedPhoto.verifiedTag}
                </span>
                <span className="text-slate-500 font-mono text-[11px]">{enlargedPhoto.imageSrc}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
