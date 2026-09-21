import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/ww1Data';
import { sound } from '../utils/audio';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, BookOpen } from 'lucide-react';

export const ChapterQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('');

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    sound.playClick();
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    if (selectedOption === currentQ.correctIndex) {
      sound.playSuccess();
      setScore((prev) => prev + 1);
    } else {
      sound.playClick();
    }
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    sound.playClick();
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
  };

  // Convert raw score out of 8 into Ukrainian 12-point school grading scale
  const grade12 = Math.round((score / QUIZ_QUESTIONS.length) * 12);

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Banner */}
      <div className="archive-card p-6 md:p-8 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="archive-badge mb-3">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Розділ 8 • Контрольний тест для 10 класу</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-white tracking-wide">
            Перевірка знань: Епоха 1914–1916 років
          </h2>
          <p className="mt-3 text-slate-200 font-serif-text text-sm sm:text-base max-w-2xl leading-relaxed">
            Тест охоплює питання військової форми, відзнак Легіону УСС, появи танків, кулеметного терору та трагедії розколотої України за шкільною програмою.
          </p>
        </div>

        {!isQuizCompleted && (
          <div className="bg-[#172226] border border-[#27373e] p-4 rounded-xl text-center shrink-0 min-w-[120px]">
            <span className="text-xs text-amber-400 block uppercase font-mono tracking-wider font-semibold">Прогрес</span>
            <div className="text-2xl font-bold text-white font-heading mt-0.5">
              {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}
            </div>
          </div>
        )}
      </div>

      {/* Active Question or Completion Certificate */}
      {!isQuizCompleted ? (
        <div className="archive-card p-6 md:p-8 space-y-6">
          {/* Progress bar */}
          <div className="w-full h-2.5 bg-[#121a1d] rounded-full overflow-hidden border border-[#27373e]">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`,
              }}
            />
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
              Питання №{currentQuestionIndex + 1} з {QUIZ_QUESTIONS.length}
            </span>
            <h3 className="text-lg md:text-xl font-bold font-heading text-white leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let style = 'bg-[#141d21] border-[#25353c] text-slate-200 hover:border-[#3a5059] hover:bg-[#192429]';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  style = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold';
                } else if (isSelected && !isCorrect) {
                  style = 'bg-rose-950/70 border-rose-500 text-rose-200';
                } else {
                  style = 'opacity-40 bg-[#141d21] border-[#25353c] text-slate-400';
                }
              } else if (isSelected) {
                style = 'bg-[#1e2a2f] border-amber-500 ring-1 ring-amber-500/50 shadow-md font-semibold text-white';
              }

              return (
                <button
                  key={option}
                  id={`quiz-option-${idx}`}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-start justify-between gap-3 font-serif-text ${style}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#1e2a2f] border border-[#2d3e45] flex items-center justify-center text-xs font-mono text-amber-400 font-bold shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed">{option}</span>
                  </div>
                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Callout once submitted */}
          {isAnswerSubmitted && (
            <div className="p-5 rounded-xl bg-[#172226] border border-[#27373e] space-y-2 animate-fadeIn font-serif-text">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 font-sans">
                <BookOpen className="w-4 h-4 text-amber-400" />
                Історичне пояснення:
              </div>
              <p className="text-slate-200 text-sm leading-relaxed">
                {currentQ.explanation}
              </p>
              <span className="text-xs text-slate-400 block pt-1 font-mono">
                Джерело: {currentQ.sourceContext}
              </span>
            </div>
          )}

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-[#243339]">
            <span className="text-xs sm:text-sm text-slate-300 font-serif-text">
              Поточний результат: <strong className="text-amber-400 font-sans font-bold">{score}</strong> правильних
            </span>

            {!isAnswerSubmitted ? (
              <button
                id="submit-quiz-answer-btn"
                disabled={selectedOption === null}
                onClick={handleSubmitAnswer}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md"
              >
                Відповісти
              </button>
            ) : (
              <button
                id="next-quiz-question-btn"
                onClick={handleNextQuestion}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
              >
                <span>{currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? 'Наступне питання' : 'Переглянути результат'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results & Certificate Screen */
        <div className="archive-card p-8 md:p-12 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#1b2529] border border-[#2e4047] flex items-center justify-center text-amber-400">
            <Award className="w-8 h-8 text-amber-400" />
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              Свідоцтво знавця історії Першої світової війни
            </span>
            <h3 className="text-2xl md:text-3xl font-bold font-heading text-white mt-1">
              Підсумок тестування
            </h3>
          </div>

          {/* Final Grades Display */}
          <div className="max-w-md mx-auto bg-[#172226] p-6 rounded-2xl border border-[#27373e] space-y-4">
            <div className="flex justify-around items-center">
              <div>
                <span className="text-xs text-slate-400 block uppercase font-mono">Правильних відповідей</span>
                <span className="text-3xl font-bold text-white font-heading">{score} / {QUIZ_QUESTIONS.length}</span>
              </div>
              <div className="w-px h-12 bg-[#25353c]" />
              <div>
                <span className="text-xs text-slate-400 block uppercase font-mono">Шкільний бал (1–12)</span>
                <span className="text-3xl font-bold text-amber-400 font-heading">{grade12} балів</span>
              </div>
            </div>

            <div className="text-sm text-slate-200 pt-3 border-t border-[#25353c] font-serif-text">
              {grade12 >= 10 ? (
                <span className="text-emerald-400 font-medium">
                  🌟 Відмінний рівень! Ви блискуче орієнтуєтеся в одностроях, зброї та ролі УСС у війні 1914–1916 років.
                </span>
              ) : grade12 >= 7 ? (
                <span className="text-slate-200 font-medium">
                  👍 Добре! Ви добре засвоїли матеріал, зверніть увагу на деталі еволюції військової форми.
                </span>
              ) : (
                <span className="text-slate-300">
                  📖 Варто повторити матеріал розділів про шапку-мазепинку, кулемет Максим та першу появу танків.
                </span>
              )}
            </div>
          </div>

          {/* Certificate Name Input */}
          <div className="max-w-sm mx-auto space-y-2 text-left">
            <label className="text-xs text-slate-300 block font-serif-text">
              Введіть ім'я учня/учениці для класної презентації:
            </label>
            <input
              type="text"
              id="student-name-input"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Наприклад: Олександр або Софія"
              className="w-full px-4 py-2.5 rounded-xl bg-[#141d21] border border-[#27373e] text-white text-sm focus:outline-none focus:border-amber-500 shadow-xs"
            />
            {studentName && (
              <p className="text-xs text-slate-300 font-serif-text italic text-center pt-1">
                Сертифікат засвідчено для: <strong className="font-sans not-italic text-amber-400">{studentName}</strong> (10 клас)
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              id="restart-quiz-btn"
              onClick={handleRestartQuiz}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Пройти тест ще раз</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
