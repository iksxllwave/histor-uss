import React, { useState } from 'react';
import { CAVALRY_FACTS } from '../data/ww1Data';
import { CavalryFact } from '../types';
import { sound } from '../utils/audio';
import { Heart, Sparkles, BookOpen } from 'lucide-react';
import { HistoricPhoto } from './HistoricPhoto';

export const ChapterCavalry: React.FC = () => {
  const [selectedFact, setSelectedFact] = useState<CavalryFact>(CAVALRY_FACTS[0]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="archive-card p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="archive-badge mb-3">
              <Heart className="w-3.5 h-3.5 text-amber-400" />
              <span>Розділ 5 • Коні та тварини у вихорі війни</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-white tracking-wide">
              Безмовні герої: Загибель кавалерії та мільйони вірних коней
            </h2>
            <p className="mt-3 text-slate-200 font-serif-text text-base md:text-lg max-w-3xl leading-relaxed">
              Жодна армія Першої світової війни не протрималася б і тижня без коней. Від романтичних, але кривавих кавалерійських атак 1914 року до важкої тяглової праці в окопній багнюці — понад 8 мільйонів коней віддали свої життя на полях битв. Разом із ними служили голуби-зв'язківці та собаки-санітари.
            </p>
          </div>

          <div className="archive-card-subtle p-5 rounded-xl text-center shrink-0 min-w-[240px] border border-[#27373e]">
            <span className="text-xs text-amber-400 block uppercase font-semibold">Полеглі тварини</span>
            <div className="text-3xl font-bold text-white font-heading my-1">8 000 000+</div>
            <span className="text-xs text-slate-300 font-serif-text">коней та мулів загинуло у війні</span>
          </div>
        </div>
      </div>

      {/* 4 Thematic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CAVALRY_FACTS.map((fact) => {
          const isSelected = fact.id === selectedFact.id;
          return (
            <div
              key={fact.id}
              id={`cavalry-card-${fact.id}`}
              onClick={() => {
                sound.playClick();
                setSelectedFact(fact);
              }}
              className={`archive-card p-6 transition-all cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'ring-2 ring-amber-500 shadow-xl bg-[#1a2428]'
                  : 'hover:border-[#384c54]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs mb-3">
                  <span className="bg-[#1e2a2f] text-amber-300 px-3 py-1 rounded-full text-xs font-semibold border border-[#2d3e45]">
                    {fact.role}
                  </span>
                  <div className="text-right">
                    <span className="text-xl font-bold text-white font-heading block">
                      {fact.statistic}
                    </span>
                    <span className="text-[11px] text-slate-400 font-serif-text">
                      {fact.statLabel}
                    </span>
                  </div>
                </div>

                {fact.imageUrl && (
                  <div className="mb-4">
                    <HistoricPhoto
                      src={fact.imageUrl}
                      alt={fact.title}
                      caption={fact.imageCaption || fact.title}
                      aspectRatio="video"
                      badge={fact.role}
                    />
                  </div>
                )}

                <h3 className="text-lg font-bold text-white font-heading group-hover:text-amber-300 transition-colors">
                  {fact.title}
                </h3>
                <span className="text-xs text-slate-400 block mt-1 italic font-serif-text">
                  {fact.subtitle}
                </span>

                <p className="mt-3 text-slate-200 font-serif-text text-sm leading-relaxed">
                  {fact.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#243339] bg-[#162024] -mx-2 -mb-2 p-3.5 rounded-xl border border-[#27373e]">
                <span className="text-xs text-slate-300 font-serif-text">
                  <strong className="text-amber-400 font-sans font-semibold">Історичний урок: </strong>
                  {fact.impact}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Historical Anecdote & Empathy Box */}
      <div className="archive-card p-6 md:p-8 space-y-5">
        <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          Справжні історії про чотирилапих та крилатих побратимів
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm text-slate-200">
          <div className="bg-[#182327] p-5 rounded-xl border border-[#28383f] space-y-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <strong className="text-white font-heading text-base block">Голубка Шер Амі (Cher Ami)</strong>
            </div>
            <p className="font-serif-text text-slate-300 leading-relaxed text-sm">
              Британсько-американська поштова голубка, яка в жовтні 1918 р. доставила критичне донесення від оточеного «Втраченого батальйону», втративши лапку й око. Її нагородили французьким Воєнним хрестом!
            </p>
          </div>
          <div className="bg-[#182327] p-5 rounded-xl border border-[#28383f] space-y-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <strong className="text-white font-heading text-base block">Собаки-санітари (Sanitätshunde)</strong>
            </div>
            <p className="font-serif-text text-slate-300 leading-relaxed text-sm">
              Вівчарки та тер'єри були навчені ігнорувати загиблих і гавкати лише біля живих поранених. Вони несли на спинах сумки з медикаментами та водою прямо під кулями на нічийну землю.
            </p>
          </div>
          <div className="bg-[#182327] p-5 rounded-xl border border-[#28383f] space-y-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <strong className="text-white font-heading text-base block">Кінь Воїн (Warrior)</strong>
            </div>
            <p className="font-serif-text text-slate-300 leading-relaxed text-sm">
              Бойовий кінь генерала Джека Сілі, який пройшов усю війну з 1914 по 1918 рік, вижив під час газових атак, вибухів мін і штурмів, отримавши прізвисько «Кінь, якого німці не змогли вбити».
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
