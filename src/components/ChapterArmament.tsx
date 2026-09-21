import React, { useState } from 'react';
import { WEAPONS_AND_VEHICLES } from '../data/ww1Data';
import { WeaponOrVehicle } from '../types';
import { sound } from '../utils/audio';
import { Crosshair, ShieldAlert, Cpu, Gauge } from 'lucide-react';
import { HistoricPhoto } from './HistoricPhoto';

export const ChapterArmament: React.FC = () => {
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponOrVehicle>(WEAPONS_AND_VEHICLES[0]);
  const [activeTab, setActiveTab] = useState<'all' | 'vehicles' | 'guns'>('all');

  const filteredItems = WEAPONS_AND_VEHICLES.filter((item) => {
    if (activeTab === 'vehicles') return item.type === 'Танк' || item.type === 'Бронеавтомобіль';
    if (activeTab === 'guns') return item.type === 'Кулемет' || item.type === 'Гвинтівка' || item.type === 'Хімічна зброя' || item.type === 'Артилерія' || item.type === 'Вогнемет';
    return true;
  });

  const handleSelectWeapon = (item: WeaponOrVehicle) => {
    if (item.type === 'Танк' || item.type === 'Бронеавтомобіль') {
      sound.playRumble();
    } else {
      sound.playClick();
    }
    setSelectedWeapon(item);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="archive-card p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="archive-badge mb-3">
              <Crosshair className="w-3.5 h-3.5 text-sky-400" />
              <span>Розділ 4 • Зброя, техніка та індустріальна революція війни</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-white tracking-wide">
              Кулеметний терор, перші танки Сомми та задушливі гази
            </h2>
            <p className="mt-3 text-slate-200 font-serif-text text-base md:text-lg max-w-3xl leading-relaxed">
              Перша світова війна стала першим в історії поєдинком технологій та інженерії. Кулемет перетворив відкритий наступ на самогубство, загнавши мільйони людей у землю, а у вересні 1916 року на річці Сомма з'явилася відповідь союзників — сталеві ромбоподібні танки Mark I.
            </p>
          </div>

          <div className="archive-card-subtle p-5 rounded-xl text-center shrink-0 min-w-[210px] border border-[#27373e]">
            <span className="text-xs text-amber-400 block uppercase font-semibold">Дебют танків</span>
            <div className="text-2xl font-bold text-white font-heading my-1">15 вересня 1916</div>
            <span className="text-xs text-slate-300 font-serif-text">Битва на річці Сомма</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          id="filter-armament-all"
          onClick={() => {
            sound.playClick();
            setActiveTab('all');
          }}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'all'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
              : 'bg-[#151e22] border border-[#26363d] text-slate-300 hover:bg-[#1c272c] hover:text-white'
          }`}
        >
          Усі зразки озброєння
        </button>
        <button
          id="filter-armament-vehicles"
          onClick={() => {
            sound.playClick();
            setActiveTab('vehicles');
          }}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'vehicles'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
              : 'bg-[#151e22] border border-[#26363d] text-slate-300 hover:bg-[#1c272c] hover:text-white'
          }`}
        >
          Бойові машини й танки
        </button>
        <button
          id="filter-armament-guns"
          onClick={() => {
            sound.playClick();
            setActiveTab('guns');
          }}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'guns'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
              : 'bg-[#151e22] border border-[#26363d] text-slate-300 hover:bg-[#1c272c] hover:text-white'
          }`}
        >
          Стрілецька зброя та гази
        </button>
      </div>

      {/* Main Grid Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Weapons List Selector */}
        <div className="lg:col-span-5 space-y-3">
          {filteredItems.map((item) => {
            const isSelected = item.id === selectedWeapon.id;
            return (
              <div
                key={item.id}
                id={`weapon-card-${item.id}`}
                onClick={() => handleSelectWeapon(item)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-left ${
                  isSelected
                    ? 'bg-[#1b2529] border-amber-500 shadow-lg ring-1 ring-amber-500/50 translate-x-1'
                    : 'bg-[#131b1e] border-[#243339] hover:border-[#354850] hover:bg-[#172125]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold'
                      : 'bg-[#1d292e] text-amber-400 border-[#2d3e45]'
                  }`}>
                    {item.type === 'Танк' ? <Gauge className="w-5 h-5" /> : <Crosshair className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white font-heading">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5 font-serif-text">
                      <span>{item.type}</span>
                      <span>•</span>
                      <span>{item.country}</span>
                    </div>
                  </div>
                </div>

                <span className="font-mono text-xs text-amber-400 font-semibold bg-[#1a2529] px-2.5 py-1 rounded border border-[#2b3c43]">
                  {item.yearIntroduced} р.
                </span>
              </div>
            );
          })}
        </div>

        {/* Selected Weapon / Vehicle Full Dossier */}
        <div className="lg:col-span-7 archive-card p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Title & Description */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#243339] pb-3 mb-3">
                <h3 className="text-xl md:text-2xl font-bold text-white font-heading">
                  {selectedWeapon.name}
                </h3>
                <span className="px-3 py-1 bg-[#1e2a2f] border border-[#2d3e45] text-amber-300 text-xs rounded-full font-mono">
                  Рік появи: {selectedWeapon.yearIntroduced}
                </span>
              </div>
              <p className="text-slate-200 font-serif-text text-sm md:text-base leading-relaxed">
                {selectedWeapon.description}
              </p>
            </div>

            {/* Historic Photo of the Weapon / Vehicle */}
            {selectedWeapon.imageUrl && (
              <div>
                <HistoricPhoto
                  src={selectedWeapon.imageUrl}
                  alt={selectedWeapon.name}
                  caption={selectedWeapon.imageCaption || selectedWeapon.name}
                  year={`${selectedWeapon.yearIntroduced} р.`}
                  aspectRatio="video"
                  badge={`${selectedWeapon.type} • ${selectedWeapon.country}`}
                />
              </div>
            )}

            {/* Tactical Specifications (ТТХ) */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-3 flex items-center gap-1.5 font-mono">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                Тактико-технічні характеристики (ТТХ)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                {Object.entries(selectedWeapon.specs).map(([key, val]) => (
                  <div key={key} className="bg-[#182327] p-3 rounded-lg border border-[#28383f] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span className="text-slate-200 font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shock Factor & Psychological Impact */}
            <div className="bg-[#182327] border border-[#28383f] rounded-xl p-5 space-y-2.5">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Психологічний фактор шоку на фронті
              </span>
              <p className="text-slate-200 italic font-serif-text text-xs sm:text-sm leading-relaxed">
                "{selectedWeapon.shockFactor}"
              </p>
              <div className="pt-2 border-t border-[#243339] text-xs text-slate-300 font-serif-text">
                <strong className="text-white">Вплив на тактику окопної війни: </strong>
                {selectedWeapon.impactOnTrenchWarfare}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#243339] flex items-center justify-between text-xs text-slate-400 font-serif-text">
            <span>Каталог військової техніки 1914–1916</span>
            <span className="font-mono text-amber-400">{selectedWeapon.type}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
