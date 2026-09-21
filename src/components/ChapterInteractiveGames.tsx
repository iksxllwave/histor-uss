import React, { useState } from 'react';
import { EQUIP_GAME_ITEMS } from '../data/ww1Data';
import { sound } from '../utils/audio';
import { GalicianLionBadge, MazepynkaCapIcon, IronCrossBadge, TankMark1Icon } from './HistoricIcons';
import { Gamepad2, Sparkles, Shield, Eye } from 'lucide-react';

export const ChapterInteractiveGames: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'equip' | 'decipher'>('equip');

  // Mini-Game 1: Equip Soldier State
  const [selectedHead, setSelectedHead] = useState<string>('adrian-m15');
  const [selectedChest, setSelectedChest] = useState<string>('bleu-horizon-trench');
  const [selectedWeapon, setSelectedWeapon] = useState<string>('lee-enfield-rifle');
  const [selectedAccessory, setSelectedAccessory] = useState<string>('zelinsky-respirator');

  const headItem = EQUIP_GAME_ITEMS.find((i) => i.id === selectedHead)!;
  const chestItem = EQUIP_GAME_ITEMS.find((i) => i.id === selectedChest)!;
  const weaponItem = EQUIP_GAME_ITEMS.find((i) => i.id === selectedWeapon)!;
  const accessoryItem = EQUIP_GAME_ITEMS.find((i) => i.id === selectedAccessory)!;

  const totalSurvival = Math.max(
    5,
    Math.min(
      100,
      50 +
        headItem.survivalScore +
        chestItem.survivalScore +
        weaponItem.survivalScore +
        accessoryItem.survivalScore
    )
  );

  const totalCamouflage = Math.max(
    5,
    Math.min(
      100,
      50 +
        headItem.camouflageScore +
        chestItem.camouflageScore +
        weaponItem.camouflageScore +
        accessoryItem.camouflageScore
    )
  );

  // Apply Presets
  const applyPreset = (type: 'french-1914' | 'uss-1915' | 'stormtrooper-1916') => {
    sound.playClick();
    if (type === 'french-1914') {
      setSelectedHead('kepi-red');
      setSelectedChest('red-trousers-blue-coat');
      setSelectedWeapon('sabre-cavalry');
      setSelectedAccessory('urine-soaked-rag');
    } else if (type === 'uss-1915') {
      setSelectedHead('mazepynka-cap-item');
      setSelectedChest('uss-hechtgrau-tunic');
      setSelectedWeapon('mannlicher-m95-item');
      setSelectedAccessory('stielhandgranate-bundle');
    } else if (type === 'stormtrooper-1916') {
      setSelectedHead('stahlhelm-m16');
      setSelectedChest('feldgrau-tunic');
      setSelectedWeapon('lee-enfield-rifle');
      setSelectedAccessory('zelinsky-respirator');
    }
  };

  // Mini-Game 2: Decipher Badges State
  const [decipherRound, setDecipherRound] = useState<number>(0);
  const [decipherScore, setDecipherScore] = useState<number>(0);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState<boolean>(false);
  const [chosenOption, setChosenOption] = useState<string | null>(null);

  const DECIPHER_QUESTIONS = [
    {
      id: 1,
      name: 'Кокарда із золотим левом на скелі',
      badgeType: 'lion',
      prompt: 'Якому військовому формуванню Першої світової війни належала ця кокарда?',
      options: [
        'Легіон Українських Січових Стрільців (УСС)',
        'Британські королівські фузилери',
        'Королівська баварська армія',
        'Французький Іноземний легіон'
      ],
      correctIndex: 0,
      fact: 'Кокарду носили добровольці УСС з осені 1914 року. Лев на скелі — давній герб Галицько-Волинської держави Русі.'
    },
    {
      id: 2,
      name: 'Шапка з клиноподібним V-розрізом спереду',
      badgeType: 'mazepynka',
      prompt: 'Як називається цей унікальний формений головний убір, розроблений у 1916 році?',
      options: [
        'Кепі генерала Адріана',
        'Шапка-Мазепинка',
        'Пікельхельм',
        'Папаха генерала Корнілова'
      ],
      correctIndex: 1,
      fact: 'Створена Левком Лепким для стрільців УСС як знак козацької спадковості гетьмана Івана Мазепи.'
    },
    {
      id: 3,
      name: 'Залізний Хрест (Eisernes Kreuz)',
      badgeType: 'iron-cross',
      prompt: 'Яка країна масово нагороджувала цим хрестом за виняткову мужність у 1914–1918 роках?',
      options: [
        'Німецька імперія (Пруссія)',
        'Російська імперія',
        'Османська імперія',
        'Італійське королівство'
      ],
      correctIndex: 0,
      fact: 'Заснований ще 1813 року, відновлений кайзером Вільгельмом II 5 серпня 1914 року.'
    },
    {
      id: 4,
      name: 'Британський ромбоподібний танк Mark I',
      badgeType: 'tank',
      prompt: 'У якій грандіозній битві 1916 року вперше в історії людства пішли в атаку ці сталеві велетні?',
      options: [
        'Битва на річці Сомма (15 вересня 1916)',
        'Битва під Верденом',
        'Брусиловський прорив у Галичині',
        'Дарданелльська операція (Галліполі)'
      ],
      correctIndex: 0,
      fact: '15 вересня 1916 р. біля Флер-Курселет 32 танки прорвали німецьку оборону, шокувавши піхоту.'
    }
  ];

  const currentDecipher = DECIPHER_QUESTIONS[decipherRound];

  const handleDecipherAnswer = (index: number) => {
    if (showAnswerFeedback) return;
    setChosenOption(currentDecipher.options[index]);
    setShowAnswerFeedback(true);
    if (index === currentDecipher.correctIndex) {
      sound.playSuccess();
      setDecipherScore((prev) => prev + 1);
    } else {
      sound.playClick();
    }
  };

  const nextDecipherRound = () => {
    sound.playClick();
    setShowAnswerFeedback(false);
    setChosenOption(null);
    if (decipherRound < DECIPHER_QUESTIONS.length - 1) {
      setDecipherRound((prev) => prev + 1);
    } else {
      setDecipherRound(0);
      setDecipherScore(0);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="archive-card p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="archive-badge mb-3">
              <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Розділ 6 • Інтерактивна лабораторія та міні-ігри</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-white tracking-wide">
              Перевір інтуїцію: Споряди солдата та дешифруй відзнаки
            </h2>
            <p className="mt-3 text-slate-200 font-serif-text text-base md:text-lg max-w-3xl leading-relaxed">
              Чи вижили б ви в окопах 1916 року? Спробуйте самостійно скомбінувати екіпірування або ідентифікувати рідкісні військові реліквії часів Першої світової війни.
            </p>
          </div>

          {/* Game Switcher Tabs */}
          <div className="flex bg-[#141d21] p-1.5 rounded-xl border border-[#25353c] shrink-0">
            <button
              id="switch-to-game-equip"
              onClick={() => {
                sound.playClick();
                setActiveGame('equip');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeGame === 'equip'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              1. Споряди бійця
            </button>
            <button
              id="switch-to-game-decipher"
              onClick={() => {
                sound.playClick();
                setActiveGame('decipher');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeGame === 'decipher'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              2. Дешифрувальник відзнак
            </button>
          </div>
        </div>
      </div>

      {/* GAME 1: EQUIP SOLDIER */}
      {activeGame === 'equip' && (
        <div className="space-y-6">
          {/* Presets Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#172226] p-4 rounded-xl border border-[#27373e]">
            <span className="text-xs text-amber-300 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Швидкі історичні сценарії:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                id="preset-french-1914"
                onClick={() => applyPreset('french-1914')}
                className="px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 border border-rose-700/60 text-rose-200 text-xs font-medium transition-colors"
              >
                Француз 1914 (Фатальна помилка)
              </button>
              <button
                id="preset-uss-1915"
                onClick={() => applyPreset('uss-1915')}
                className="px-3 py-1.5 rounded-lg bg-sky-950/60 hover:bg-sky-900/80 border border-sky-700/60 text-sky-200 text-xs font-medium transition-colors"
              >
                Січовий Стрілець (УСС 1915/16)
              </button>
              <button
                id="preset-stormtrooper-1916"
                onClick={() => applyPreset('stormtrooper-1916')}
                className="px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/60 text-emerald-200 text-xs font-medium transition-colors"
              >
                Окопний ветеран (1916)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Loadout Selection Controls */}
            <div className="lg:col-span-7 space-y-4">
              {/* Slot 1: Headgear */}
              <div className="archive-card p-5">
                <label className="text-xs uppercase tracking-wider font-bold text-amber-400 block mb-2 font-mono">
                  1. Головний убір:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {EQUIP_GAME_ITEMS.filter((i) => i.slot === 'head').map((item) => (
                    <button
                      key={item.id}
                      id={`equip-item-${item.id}`}
                      onClick={() => {
                        sound.playClick();
                        setSelectedHead(item.id);
                      }}
                      className={`p-3 rounded-lg text-left text-xs transition-all border ${
                        selectedHead === item.id
                          ? 'bg-[#1e2a2f] border-amber-500 text-white font-bold ring-1 ring-amber-500/50 shadow-sm'
                          : 'bg-[#141d21] border-[#25353c] text-slate-300 hover:border-[#384c54] hover:bg-[#192429]'
                      }`}
                    >
                      <div className="font-semibold text-white">{item.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 font-serif-text">{item.country}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slot 2: Uniform */}
              <div className="archive-card p-5">
                <label className="text-xs uppercase tracking-wider font-bold text-amber-400 block mb-2 font-mono">
                  2. Мундир / Шинель:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {EQUIP_GAME_ITEMS.filter((i) => i.slot === 'chest').map((item) => (
                    <button
                      key={item.id}
                      id={`equip-item-${item.id}`}
                      onClick={() => {
                        sound.playClick();
                        setSelectedChest(item.id);
                      }}
                      className={`p-3 rounded-lg text-left text-xs transition-all border ${
                        selectedChest === item.id
                          ? 'bg-[#1e2a2f] border-amber-500 text-white font-bold ring-1 ring-amber-500/50 shadow-sm'
                          : 'bg-[#141d21] border-[#25353c] text-slate-300 hover:border-[#384c54] hover:bg-[#192429]'
                      }`}
                    >
                      <div className="font-semibold text-white">{item.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 font-serif-text">{item.country}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slot 3: Weapon */}
              <div className="archive-card p-5">
                <label className="text-xs uppercase tracking-wider font-bold text-amber-400 block mb-2 font-mono">
                  3. Зброя:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {EQUIP_GAME_ITEMS.filter((i) => i.slot === 'weapon').map((item) => (
                    <button
                      key={item.id}
                      id={`equip-item-${item.id}`}
                      onClick={() => {
                        sound.playClick();
                        setSelectedWeapon(item.id);
                      }}
                      className={`p-3 rounded-lg text-left text-xs transition-all border ${
                        selectedWeapon === item.id
                          ? 'bg-[#1e2a2f] border-amber-500 text-white font-bold ring-1 ring-amber-500/50 shadow-sm'
                          : 'bg-[#141d21] border-[#25353c] text-slate-300 hover:border-[#384c54] hover:bg-[#192429]'
                      }`}
                    >
                      <div className="font-semibold text-white">{item.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 font-serif-text">{item.country}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slot 4: Accessory */}
              <div className="archive-card p-5">
                <label className="text-xs uppercase tracking-wider font-bold text-amber-400 block mb-2 font-mono">
                  4. Окопний захист / Спецспорядження:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {EQUIP_GAME_ITEMS.filter((i) => i.slot === 'accessory').map((item) => (
                    <button
                      key={item.id}
                      id={`equip-item-${item.id}`}
                      onClick={() => {
                        sound.playClick();
                        setSelectedAccessory(item.id);
                      }}
                      className={`p-3 rounded-lg text-left text-xs transition-all border ${
                        selectedAccessory === item.id
                          ? 'bg-[#1e2a2f] border-amber-500 text-white font-bold ring-1 ring-amber-500/50 shadow-sm'
                          : 'bg-[#141d21] border-[#25353c] text-slate-300 hover:border-[#384c54] hover:bg-[#192429]'
                      }`}
                    >
                      <div className="font-semibold text-white">{item.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 font-serif-text">{item.country}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Combat Assessment Result Board */}
            <div className="lg:col-span-5 archive-card p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                  Аналітичний вердикт штабу
                </span>
                <h3 className="text-xl font-bold font-heading text-white">
                  Шанси виживання в окопі 1916 року
                </h3>

                {/* Score Meters */}
                <div className="my-5 space-y-4 bg-[#172226] p-5 rounded-xl border border-[#27373e]">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-200 font-semibold flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-amber-400" />
                        Ймовірність виживання під шрапнеллю:
                      </span>
                      <span className={`font-mono font-bold text-sm ${
                        totalSurvival >= 75 ? 'text-emerald-400' : totalSurvival >= 40 ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {totalSurvival}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-[#11181b] rounded-full overflow-hidden border border-[#27373e]">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          totalSurvival >= 75 ? 'bg-emerald-500' : totalSurvival >= 40 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${totalSurvival}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-200 font-semibold flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        Рівень маскування від снайперів:
                      </span>
                      <span className={`font-mono font-bold text-sm ${
                        totalCamouflage >= 70 ? 'text-emerald-400' : totalCamouflage >= 35 ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {totalCamouflage}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-[#11181b] rounded-full overflow-hidden border border-[#27373e]">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          totalCamouflage >= 70 ? 'bg-emerald-500' : totalCamouflage >= 35 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${totalCamouflage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Item-by-item critique */}
                <div className="space-y-2.5 text-xs text-slate-200">
                  <div className="p-3 rounded-lg bg-[#172226] border border-[#27373e]">
                    <strong className="text-amber-400 block mb-0.5 font-sans font-semibold">Голова:</strong>
                    <span className="font-serif-text text-slate-300">{headItem.critique}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#172226] border border-[#27373e]">
                    <strong className="text-amber-400 block mb-0.5 font-sans font-semibold">Тіло:</strong>
                    <span className="font-serif-text text-slate-300">{chestItem.critique}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#172226] border border-[#27373e]">
                    <strong className="text-amber-400 block mb-0.5 font-sans font-semibold">Зброя:</strong>
                    <span className="font-serif-text text-slate-300">{weaponItem.critique}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#172226] border border-[#27373e]">
                    <strong className="text-amber-400 block mb-0.5 font-sans font-semibold">Захист:</strong>
                    <span className="font-serif-text text-slate-300">{accessoryItem.critique}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Result Badge */}
              <div className={`p-4 rounded-xl text-center border font-semibold text-xs sm:text-sm font-serif-text ${
                totalSurvival >= 75
                  ? 'bg-emerald-950/60 border-emerald-600/70 text-emerald-200'
                  : totalSurvival >= 40
                  ? 'bg-amber-950/60 border-amber-600/70 text-amber-200'
                  : 'bg-rose-950/60 border-rose-600/70 text-rose-200'
              }`}>
                {totalSurvival >= 75
                  ? '🎖️ Зразкове екіпірування! Ви готові до штурму ворожих позицій і захищені від осколків та газу.'
                  : totalSurvival >= 40
                  ? '⚠️ Середні шанси: у вас є шанс вижити, але окремі елементи форми демаскують позицію.'
                  : '☠️ Катастрофа 1914 року: з таким демаскуючим спорядженням бійця знімуть снайпери в перші хвилини наступу!'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GAME 2: DECIPHER BADGES */}
      {activeGame === 'decipher' && (
        <div className="max-w-3xl mx-auto archive-card p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#243339] pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Раунд {decipherRound + 1} з {DECIPHER_QUESTIONS.length}
              </span>
              <h3 className="text-xl font-bold font-heading text-white mt-1">
                {currentDecipher.name}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block font-serif-text">Рахунок:</span>
              <span className="text-xl font-bold text-amber-400 font-heading">
                {decipherScore} / {DECIPHER_QUESTIONS.length}
              </span>
            </div>
          </div>

          {/* Central Visual Artifact */}
          <div className="bg-[#172226] rounded-2xl border border-[#27373e] p-8 flex flex-col items-center justify-center min-h-[190px]">
            {currentDecipher.badgeType === 'lion' && <GalicianLionBadge size={80} />}
            {currentDecipher.badgeType === 'mazepynka' && <MazepynkaCapIcon size={80} />}
            {currentDecipher.badgeType === 'iron-cross' && <IronCrossBadge size={80} />}
            {currentDecipher.badgeType === 'tank' && <TankMark1Icon size={100} />}
            <span className="text-xs font-mono text-slate-400 mt-3">Історичний експонат #{currentDecipher.id}</span>
          </div>

          {/* Question Prompt */}
          <div className="text-white text-base font-semibold text-center font-serif-text">
            {currentDecipher.prompt}
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentDecipher.options.map((opt, idx) => {
              const isCorrect = idx === currentDecipher.correctIndex;
              const isChosen = chosenOption === opt;

              let btnStyle = 'bg-[#141d21] border-[#25353c] text-slate-200 hover:border-[#384c54] hover:bg-[#192429]';
              if (showAnswerFeedback) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold';
                } else if (isChosen && !isCorrect) {
                  btnStyle = 'bg-rose-950/70 border-rose-500 text-rose-200';
                } else {
                  btnStyle = 'opacity-40 bg-[#141d21] border-[#25353c] text-slate-400';
                }
              }

              return (
                <button
                  key={opt}
                  id={`decipher-option-${idx}`}
                  disabled={showAnswerFeedback}
                  onClick={() => handleDecipherAnswer(idx)}
                  className={`p-4 rounded-xl border text-sm text-left transition-all font-serif-text ${btnStyle}`}
                >
                  <span className="font-mono text-amber-400 mr-2 font-bold">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next Button */}
          {showAnswerFeedback && (
            <div className="p-5 rounded-xl bg-[#172226] border border-[#27373e] space-y-3 animate-fadeIn">
              <div className="text-sm text-slate-200 font-serif-text">
                <strong className="text-amber-400 block mb-1 font-sans font-semibold">Історична довідка:</strong>
                {currentDecipher.fact}
              </div>
              <button
                id="next-decipher-round-btn"
                onClick={nextDecipherRound}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md"
              >
                {decipherRound < DECIPHER_QUESTIONS.length - 1 ? 'Наступний експонат →' : 'Завершити розбір та почати знову'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
