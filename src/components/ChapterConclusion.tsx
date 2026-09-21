import React from 'react';
import { BookOpen, ShieldCheck, Zap, Globe, Sparkles, Flag, ArrowRight, Award } from 'lucide-react';

interface ConclusionProps {
  onGoToQuiz?: () => void;
  onGoToPresentation?: () => void;
}

export const ChapterConclusion: React.FC<ConclusionProps> = ({ onGoToQuiz, onGoToPresentation }) => {
  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Banner */}
      <div className="archive-card p-6 md:p-8">
        <div>
          <div className="archive-badge mb-3">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Розділ 9 • Історичні підсумки та висновки</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-white tracking-wide">
            Чому події 1914–1916 років змінили світ назавжди?
          </h2>
          <p className="mt-3 text-slate-200 font-serif-text text-base md:text-lg max-w-3xl leading-relaxed">
            Перша світова війна в 1914–1916 роках не просто зламала чотири великі імперії — вона назавжди знищила старий світ шляхетних дуелей і кавалерійських маршів, започаткувавши епоху технологічної індустріальної війни та пробудивши національну свідомість України.
          </p>
        </div>
      </div>

      {/* 4 Pillars of Historical Significance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1: Uniform and camouflage revolution */}
        <div className="archive-card p-6 md:p-8 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#1e2a2f] border border-[#2d3e45] flex items-center justify-center text-amber-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold font-heading text-white">
            1. Революція захисту та маскування
          </h3>
          <p className="text-slate-200 font-serif-text text-sm leading-relaxed">
            Події 1914–1916 років довели: <strong className="text-amber-300">яскрава форма вбиває</strong>. Відмова від французьких червоних штанів і німецьких шкіряних шпилів, масовий перехід на відтінки хакі, фельдграу і горизонт та винахід сталевих касок (Штальгельм, Адріан, Броді) зберегли сотні тисяч життів і сформували вигляд сучасного піхотинця.
          </p>
        </div>

        {/* Pillar 2: The death of cavalry & rise of tanks */}
        <div className="archive-card p-6 md:p-8 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#1e2a2f] border border-[#2d3e45] flex items-center justify-center text-amber-400">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold font-heading text-white">
            2. Занепад кінноти та народження бронетехніки
          </h3>
          <p className="text-slate-200 font-serif-text text-sm leading-relaxed">
            Кулемет Максим і суцільні пояси колючого дроту унеможливили класичний маневр кавалерії. Коні стали незамінними трудівниками логістики, а на заміну шабельним лавам прийшли <strong className="text-amber-300">перші сталеві танки Mark I</strong> (вересень 1916 р. на Соммі), які назавжди змінили тактику сухопутних операцій.
          </p>
        </div>

        {/* Pillar 3: Industrial & Chemical Total Warfare */}
        <div className="archive-card p-6 md:p-8 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#1e2a2f] border border-[#2d3e45] flex items-center justify-center text-amber-400">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold font-heading text-white">
            3. Тотальна індустріалізація та «війна моторів»
          </h3>
          <p className="text-slate-200 font-serif-text text-sm leading-relaxed">
            Війна перестала бути справою лише армії — вона підпорядкувала собі всю економіку, науку і промисловість держав. Поява бойових газів під Іпром, вогнеметів під Верденом та звукометрії зробила Першу світову першою війною інженерів, хіміків і фізиків.
          </p>
        </div>

        {/* Pillar 4: Ukrainian crucible */}
        <div className="archive-card p-6 md:p-8 space-y-3 border-amber-500/40">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
            <Flag className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold font-heading text-white">
            4. Горнило української державності
          </h3>
          <p className="text-slate-200 font-serif-text text-sm leading-relaxed">
            Попри трагедію братовбивчої війни, де українці воювали в лавах двох ворожих імперій, саме в 1914–1916 роках <strong className="text-amber-300">Легіон УСС</strong> виборов бойову славу на горі Маківка і Лисоня. Вони створили власну форму (мазепинку, кокарду з галицьким левом) та підготували офіцерів, які у 1917–1918 роках стали рушієм Української революції та фундаментом війська УНР і ЗУНР!
          </p>
        </div>
      </div>

      {/* Presentation Cheat-Sheet for Students */}
      <div className="archive-card p-6 md:p-8 space-y-5">
        <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          Головні тези для захисту проєкту перед класом (10 клас)
        </h3>
        <div className="space-y-3 text-sm text-slate-200 font-serif-text">
          <div className="p-4 bg-[#172226] rounded-xl border border-[#27373e]">
            <strong className="text-amber-400 block mb-1 font-sans font-semibold">Теза 1 (Про форму):</strong>
            «У 1914 році солдати вирушили на фронт у формі для парадів (як французи в червоних штанах), але кулемети змусили армії за 2 роки винайти каски, захисні кольори та протигази.»
          </div>
          <div className="p-4 bg-[#172226] rounded-xl border border-[#27373e]">
            <strong className="text-amber-400 block mb-1 font-sans font-semibold">Теза 2 (Про зброю та техніку):</strong>
            «Кулемет Максим створив позиційний тупик, коні стали головними трудівниками артилерії в багнюці, а щоб подолати траншеї, у вересні 1916 року на Соммі вперше застосували танки.»
          </div>
          <div className="p-4 bg-[#172226] rounded-xl border border-[#27373e]">
            <strong className="text-amber-400 block mb-1 font-sans font-semibold">Теза 3 (Про Україну):</strong>
            «Для України це була трагедія розколотого народу (3,5 млн у російській армії проти 300 тис. в австрійській), але саме Легіон УСС відродив українську мілітарну символіку (мазепинку, кокарду з левом) і підготував ґрунт для революції 1917 року.»
          </div>
        </div>

        {/* Quick Nav Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#243339]">
          {onGoToQuiz && (
            <button
              id="goto-quiz-btn"
              onClick={onGoToQuiz}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 shadow-md"
            >
              <Award className="w-4 h-4" />
              <span>Перейти до тесту (Розділ 8)</span>
            </button>
          )}

          {onGoToPresentation && (
            <button
              id="goto-presentation-btn"
              onClick={onGoToPresentation}
              className="px-5 py-2.5 bg-[#172226] hover:bg-[#1f2d33] text-amber-300 border border-[#27373e] font-semibold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2"
            >
              <span>Запустити режим презентації</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
