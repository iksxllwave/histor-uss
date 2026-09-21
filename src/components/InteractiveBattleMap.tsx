import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { 
  MapPin, 
  Compass, 
  Calendar, 
  Users, 
  Award, 
  Sparkles, 
  Flag, 
  ChevronRight, 
  Shield, 
  Layers
} from 'lucide-react';
import { HistoricPhoto } from './HistoricPhoto';

export interface BattlePoint {
  id: string;
  name: string;
  subtitle: string;
  year: 1914 | 1915 | 1916;
  dateString: string;
  front: 'ukraine' | 'western';
  location: string;
  coordinates: { x: number; y: number }; // percentage on stylized tactical canvas
  belligerents: {
    sideA: string;
    sideB: string;
  };
  casualties: string;
  tacticalOutcome: string;
  ukraineContext: string;
  imageUrl?: string;
  imageCaption?: string;
  historicalPill: string;
}

export const BATTLES_DATA: BattlePoint[] = [
  {
    id: 'galicia-1914',
    name: 'Галицька битва',
    subtitle: 'Крах австрійської оборони та перша окупація Львова',
    year: 1914,
    dateString: '18 серпня – 21 вересня 1914',
    front: 'ukraine',
    location: 'Східна Галичина, Львів, Перемишль',
    coordinates: { x: 68, y: 48 },
    belligerents: {
      sideA: 'Російська імперська армія (Південно-Західний фронт)',
      sideB: 'Австро-угорська армія'
    },
    casualties: 'Понад 350 000 австро-угорців (100 000 полонених), ~230 000 росіян',
    tacticalOutcome: 'Російські війська захопили всю Східну Галичину та частину Буковини, оточили фортецю Перемишль.',
    ukraineContext: 'Трагедія братовбивства: у складі російських полків наступали сотні тисяч українців-наддніпрянців проти українців-галичан у формі австрійського ландверу. Царська влада розпочала русифікацію Галичини.',
    historicalPill: 'Галицький фронт 1914',
    imageUrl: '/images/austria_infantry_1915.jpg',
    imageCaption: 'Австро-угорські піхотинці в окопах Галичини під час відступу до Карпат, осінь 1914 року.'
  },
  {
    id: 'marne-1914',
    name: 'Битва на Марні («Диво на Марні»)',
    subtitle: 'Провал плану Шліффена і перехід до окопної війни',
    year: 1914,
    dateString: '5 – 12 вересня 1914',
    front: 'western',
    location: 'Франція, річка Марна (поблизу Парижа)',
    coordinates: { x: 26, y: 42 },
    belligerents: {
      sideA: 'Франція та Британський експедиційний корпус',
      sideB: 'Німецька імперська армія'
    },
    casualties: 'Близько 500 000 вбитими та пораненими з обох сторін',
    tacticalOutcome: 'Німців відкинуто від Парижа. Замість стрімкої війни сторони закопалися в землю від Північного моря до Швейцарії.',
    ukraineContext: 'Створення суцільного 700-кілометрового фронту окопів примусило обидві сторони мобілізувати всі колонії та ресурси.',
    historicalPill: 'Західний фронт 1914',
    imageUrl: '/images/french_infantry_1914.jpg',
    imageCaption: 'Французькі солдати у формі з червоними штанами перед контрнаступом на Марні, вересень 1914 року.'
  },
  {
    id: 'makivka-1915',
    name: 'Битва за гору Маківка',
    subtitle: 'Бойове хрещення та безсмертна слава Легіону УСС',
    year: 1915,
    dateString: '29 квітня – 4 травня 1915',
    front: 'ukraine',
    location: 'Карпати (біля Славська, Сколівщина)',
    coordinates: { x: 64, y: 56 },
    belligerents: {
      sideA: 'Легіон Українських Січових Стрільців (УСС) + австрійські частини',
      sideB: 'Царська 78-ма піхотна дивізія генерала Альфтана'
    },
    casualties: 'УСС: 42 загиблих, 76 поранених. Російські війська втратили понад 3000 вояків убитими і полоненими.',
    tacticalOutcome: 'Стрільці відбили кілька потужних штурмів переважаючих сил противника і втримали стратегічну панівну висоту 958 метрів.',
    ukraineContext: 'Ключовий символ української військової звитяги ХХ століття. Командування відзначило стрільців як найхоробріший підрозділ. Тут гартувалися майбутні творці УНР і ЗУНР (Дмитро Вітовський та інші).',
    historicalPill: 'Слава Легіону УСС 1915',
    imageUrl: '/images/ww1_uss_makivka_battle_1790008480190.jpg',
    imageCaption: 'Українські Січові Стрільці обороняють вершину гори Маківка від штурму царських військ, травень 1915 року.'
  },
  {
    id: 'ypres-1915',
    name: 'Друга битва під Іпром: Газова атака',
    subtitle: 'Початок ери хімічної зброї та народження протигаза',
    year: 1915,
    dateString: '22 квітня – 25 травня 1915',
    front: 'western',
    location: 'Бельгія, Фландрія (Іпрський виступ)',
    coordinates: { x: 28, y: 34 },
    belligerents: {
      sideA: 'Німецька армія',
      sideB: 'Французькі та канадські війська'
    },
    casualties: 'Понад 100 000 жертв; від першої хвилі хлору отруїлося 15 000 бійців',
    tacticalOutcome: 'Німці випустили 168 тонн рідкого хлору з балонів. Зелено-жовта смертоносна хмара спричинила паніку.',
    ukraineContext: 'Змусило всі воюючі держави негайно винаходити вугільні та марлеві протигази Зелінського-Кумманта і змінити форму солдатів.',
    historicalPill: 'Хімічна війна 1915',
    imageUrl: '/images/gas_attack_1915.jpg',
    imageCaption: 'Хмара отруйного газу наближається до передових окопів союзників під Іпром, 1915 рік.'
  },
  {
    id: 'gorlice-1915',
    name: 'Горлицький прорив',
    subtitle: 'Великий відступ російської армії з України',
    year: 1915,
    dateString: '2 – 10 травня 1915',
    front: 'ukraine',
    location: 'Малопольща та Галичина (Горлиці – Тарнів)',
    coordinates: { x: 60, y: 46 },
    belligerents: {
      sideA: 'Німецько-австрійські війська під командуванням Макензена',
      sideB: '3-тя російська армія Радко-Дмитрієва'
    },
    casualties: 'Російська армія втратила понад 500 000 бійців (включаючи полонених через снарядний голод)',
    tacticalOutcome: 'Фронт прорвано. Росіяни залишили Львів, Перемишль, Варшаву. «Снарядний голод» царської армії.',
    ukraineContext: 'Під час відступу російські війська застосовували тактику "випаленої землі", депортувавши вглиб Росії сотні тисяч українців і галичан.',
    historicalPill: 'Великий відступ 1915',
    imageUrl: '/images/artillery_horses_1916.jpg',
    imageCaption: 'Кінна тяга важкої артилерії під час перекидання гармат під час Горлицького наступу 1915 року.'
  },
  {
    id: 'verdun-1916',
    name: 'Битва під Верденом («Верденська м’ясорубка»)',
    subtitle: '300 днів сталі, шоломи Адріана та Штальгельм',
    year: 1916,
    dateString: '21 лютого – 18 грудня 1916',
    front: 'western',
    location: 'Франція, фортеця Верден',
    coordinates: { x: 33, y: 44 },
    belligerents: {
      sideA: 'Французька республіка під керівництвом Петена',
      sideB: 'Німецька імперія під керівництвом Фалькенгайна'
    },
    casualties: 'Понад 700 000 вбитих, поранених і зниклих безвісти',
    tacticalOutcome: 'Французи втримали фортецю під гаслом «Ils ne passeront pas!» («Вони не пройдуть!»). Запроваджено каски Адріана і шоломи М16.',
    ukraineContext: 'Артилерійський шквал перетворив ландшафт на місячну поверхню, випаливши ліси та села.',
    historicalPill: 'М’ясорубка Вердена 1916',
    imageUrl: '/images/stahlhelm_trench_1916.jpg',
    imageCaption: 'Німецькі штурмовики в сталевих шоломах Stahlhelm M1916 в окопах під Верденом, 1916 рік.'
  },
  {
    id: 'brusilov-1916',
    name: 'Брусиловський прорив',
    subtitle: 'Наймасштабніший наступ на Волині та Галичині',
    year: 1916,
    dateString: '4 червня – 20 вересня 1916',
    front: 'ukraine',
    location: 'Волинь, Галичина, Буковина (Луцьк, Чернівці, Броди)',
    coordinates: { x: 74, y: 42 },
    belligerents: {
      sideA: 'Російський Південно-Західний фронт генерала Брусилова',
      sideB: 'Австро-угорські та німецькі війська'
    },
    casualties: 'Австро-Угорщина: до 1,5 млн (понад 400 000 полонених). Росія: до 500 000.',
    tacticalOutcome: 'Фронт прорвано одночасними ударами на ділянці 300 км. Австро-Угорщина фактично втратила здатність воювати без підтримки Берліна.',
    ukraineContext: 'Брусиловський прорив змусив німців перекинути сили з-під Вердена, чим врятував Францію від поразки. Але українські землі знову зазнали масштабних спустошень.',
    historicalPill: 'Волинський фронт 1916',
    imageUrl: '/images/maxim_crew_1916.jpg',
    imageCaption: 'Кулеметний розрахунок веде вогонь під час наступу на Волині, літо 1916 року.'
  },
  {
    id: 'lysonia-1916',
    name: 'Битва на горі Лисоня (Бережани)',
    subtitle: 'Кривава вершина та героїчна самопожертва УСС',
    year: 1916,
    dateString: 'Серпень – вересень 1916',
    front: 'ukraine',
    location: 'Галичина, гора Лисоня поблизу м. Бережани (Тернопільщина)',
    coordinates: { x: 70, y: 52 },
    belligerents: {
      sideA: 'Легіон УСС (полк під проводом отамана Антіна Вариводи)',
      sideB: 'Царські наступальні війська'
    },
    casualties: 'Легіон УСС зазнав тяжких втрат: понад 1000 стрільців загинули, були поранені або потрапили в полон.',
    tacticalOutcome: 'Попри колосальні втрати, стрільці зупинили просування російських частин на Бережани і врятували австрійський фланг.',
    ukraineContext: 'Лисоня стала місцем національної пам\'яті та жертовності. Про битву складено десятки стрілецьких пісень («Ой, там на горі, на Лисоні...»).',
    historicalPill: 'Легенда Лисоні 1916',
    imageUrl: '/images/sich_riflemen_1915.jpg',
    imageCaption: 'Старшини та стрільці Легіону УСС перед битвою на горі Лисоня під Бережанами, літо 1916 року.'
  },
  {
    id: 'somme-1916',
    name: 'Битва на річці Сомма: Перша атака танків',
    subtitle: '15 вересня 1916: Дебют броньованих монстрів Mark I',
    year: 1916,
    dateString: '1 липня – 18 листопада 1916 (танки з 15 вересня)',
    front: 'western',
    location: 'Франція, річка Сомма (Флер-Курселетт)',
    coordinates: { x: 24, y: 38 },
    belligerents: {
      sideA: 'Британська імперія та Франція',
      sideB: 'Німецька імперія'
    },
    casualties: 'Понад 1 000 000 людей за всю битву (одна з найкривавіших в історії людства)',
    tacticalOutcome: 'Перші 32 англійські танки Mark I прорвали німецьку оборону на глибину 5 км за 5 годин, що раніше вимагало тижнів і тисяч жертв.',
    ukraineContext: 'Народження абсолютно нового роду військ — бронетанкових сил. Кулеметний позиційний глухий кут нарешті отримав відповідь.',
    historicalPill: 'Епоха танків 1916',
    imageUrl: '/images/ww1_somme_tanks_1916_1790008493937.jpg',
    imageCaption: 'Британський важкий танк Mark I долає залиті багнюкою окопи на річці Сомма, 15 вересня 1916 року.'
  }
];

export const InteractiveBattleMap: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedFront, setSelectedFront] = useState<'all' | 'ukraine' | 'western'>('all');
  const [activeBattle, setActiveBattle] = useState<BattlePoint>(BATTLES_DATA[2]); // Default Makivka

  const filteredBattles = BATTLES_DATA.filter((battle) => {
    if (selectedYear !== 'all' && battle.year !== selectedYear) return false;
    if (selectedFront !== 'all' && battle.front !== selectedFront) return false;
    return true;
  });

  const handleSelectBattle = (battle: BattlePoint) => {
    sound.playClick();
    setActiveBattle(battle);
  };

  return (
    <div className="archive-card p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#233137] pb-5">
        <div>
          <div className="archive-badge mb-2">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Інтерактивна тактична карта 1914–1916</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold font-heading text-white">
            Театри воєнних дій: Від Карпатських вершин до річки Сомма
          </h3>
          <p className="text-slate-300 font-serif-text text-sm mt-1 max-w-2xl">
            Оберіть рік або фронт, натискайте на марковані позиції битв на мапі, щоб відкрити розгорнутий оперативний звіт і значення для України.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Year Buttons */}
          <div className="flex items-center bg-[#131b1e] p-1 rounded-xl border border-[#26373e]">
            {(['all', 1914, 1915, 1916] as const).map((yr) => (
              <button
                key={yr}
                onClick={() => {
                  sound.playClick();
                  setSelectedYear(yr);
                }}
                className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-all ${
                  selectedYear === yr
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {yr === 'all' ? 'Усі роки' : yr}
              </button>
            ))}
          </div>

          {/* Front Selector */}
          <div className="flex items-center bg-[#131b1e] p-1 rounded-xl border border-[#26373e]">
            <button
              onClick={() => {
                sound.playClick();
                setSelectedFront('all');
              }}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                selectedFront === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Всі
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setSelectedFront('ukraine');
              }}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all flex items-center gap-1 ${
                selectedFront === 'ukraine'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🇺🇦 Україна</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setSelectedFront('western');
              }}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                selectedFront === 'western'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Західний
            </button>
          </div>
        </div>
      </div>

      {/* Main Map Stage + Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Tactical Map Display */}
        <div className="lg:col-span-7 space-y-3">
          <div className="relative w-full aspect-[16/11] bg-[#0c1214] border border-[#27373e] rounded-2xl overflow-hidden shadow-2xl group select-none">
            {/* Map Background with Topographic contour styling */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Stylized European Frontline Boundaries Graphic */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              {/* Western Front line */}
              <path
                d="M 220 140 Q 250 200 270 280 T 290 350"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2.5"
                strokeDasharray="6,4"
              />
              {/* Eastern / Ukrainian Front line */}
              <path
                d="M 540 120 Q 560 220 580 320 T 600 420"
                fill="none"
                stroke="#eab308"
                strokeWidth="2.5"
                strokeDasharray="6,4"
              />
            </svg>

            {/* Geographic Region Labels */}
            <div className="absolute top-4 left-6 text-[10px] font-mono tracking-widest text-rose-400/80 uppercase font-semibold pointer-events-none">
              Західний театр воєнних дій
            </div>
            <div className="absolute top-4 right-6 text-[10px] font-mono tracking-widest text-amber-400/80 uppercase font-semibold pointer-events-none text-right">
              Східний та Український фронт
            </div>
            <div className="absolute bottom-4 left-6 text-[10px] font-mono text-slate-400 pointer-events-none">
              Масштаб: 1914–1916 роки
            </div>

            {/* Battle Markers */}
            {filteredBattles.map((battle) => {
              const isSelected = activeBattle.id === battle.id;
              const isUkraine = battle.front === 'ukraine';

              return (
                <button
                  key={battle.id}
                  id={`battle-pin-${battle.id}`}
                  onClick={() => handleSelectBattle(battle)}
                  style={{ top: `${battle.coordinates.y}%`, left: `${battle.coordinates.x}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 focus:outline-none group/pin"
                  aria-label={battle.name}
                >
                  <div className="relative flex flex-col items-center">
                    {/* Ring ping on select */}
                    {isSelected && (
                      <span className="absolute w-10 h-10 rounded-full bg-amber-400/30 animate-ping" />
                    )}

                    {/* Battle Marker Icon */}
                    <div
                      className={`px-2 py-1 rounded-lg text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-lg border transition-all ${
                        isSelected
                          ? 'bg-amber-500 border-white text-slate-950 scale-110 ring-4 ring-amber-500/30'
                          : isUkraine
                          ? 'bg-[#162328] border-amber-500/80 text-amber-300 hover:bg-amber-950/60'
                          : 'bg-[#162024] border-rose-500/80 text-rose-300 hover:bg-rose-950/60'
                      }`}
                    >
                      <MapPin className="w-3 h-3" />
                      <span className="truncate max-w-[110px]">{battle.name.split(':')[0]}</span>
                    </div>

                    <span className="mt-0.5 text-[9px] font-mono text-slate-400 bg-[#090e10]/90 px-1.5 py-0.2 rounded border border-[#202c31]">
                      {battle.year}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick List under map */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {filteredBattles.map((battle) => (
              <button
                key={battle.id}
                onClick={() => handleSelectBattle(battle)}
                className={`p-2.5 rounded-xl border text-left transition-all text-xs flex flex-col justify-between ${
                  activeBattle.id === battle.id
                    ? 'bg-[#1b272d] border-amber-500 shadow-md ring-1 ring-amber-500/50'
                    : 'bg-[#131b1e] border-[#243339] hover:bg-[#182327]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span className="font-mono text-amber-400 font-bold">{battle.year}</span>
                  <span className="truncate text-slate-400 font-serif-text">
                    {battle.front === 'ukraine' ? '🇺🇦 Галичина/Волинь' : '🇫🇷 Захід'}
                  </span>
                </div>
                <span className="font-heading font-bold text-white truncate text-xs">
                  {battle.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Battle Intelligence Dossier */}
        <div className="lg:col-span-5 bg-[#141e22] border border-[#27373e] rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="border-b border-[#243339] pb-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-mono text-amber-400 bg-[#1e2a2f] px-2 py-0.5 rounded border border-[#2f4048]">
                {activeBattle.dateString}
              </span>
              <span className="text-[11px] font-mono text-slate-300">
                {activeBattle.location}
              </span>
            </div>

            <h4 className="text-xl font-bold font-heading text-white">
              {activeBattle.name}
            </h4>
            <p className="text-xs text-slate-300 font-serif-text mt-1 italic">
              {activeBattle.subtitle}
            </p>
          </div>

          {/* Historic Photo for this Battle */}
          {activeBattle.imageUrl && (
            <div>
              <HistoricPhoto
                src={activeBattle.imageUrl}
                alt={activeBattle.name}
                caption={activeBattle.imageCaption || activeBattle.name}
                year={activeBattle.year.toString()}
                aspectRatio="video"
                badge={activeBattle.historicalPill}
              />
            </div>
          )}

          {/* Belligerents & Casualties */}
          <div className="bg-[#10171a] p-3.5 rounded-xl border border-[#233239] space-y-2 text-xs font-serif-text">
            <div>
              <span className="text-slate-400 font-mono block text-[10px] uppercase tracking-wider">
                Воюючі сторони:
              </span>
              <p className="text-slate-200 mt-0.5">
                <strong className="text-white">{activeBattle.belligerents.sideA}</strong> проти <strong className="text-white">{activeBattle.belligerents.sideB}</strong>
              </p>
            </div>
            <div className="pt-2 border-t border-[#1d2a30]">
              <span className="text-slate-400 font-mono block text-[10px] uppercase tracking-wider">
                Втрати сторін:
              </span>
              <p className="text-rose-300 mt-0.5 font-medium">
                {activeBattle.casualties}
              </p>
            </div>
          </div>

          {/* Tactical Outcome */}
          <div className="space-y-1.5 font-serif-text">
            <h5 className="text-xs font-mono uppercase text-amber-400 font-bold flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Військово-тактичний результат:
            </h5>
            <p className="text-sm text-slate-200 leading-relaxed bg-[#172328] p-3.5 rounded-xl border border-[#25363e]">
              {activeBattle.tacticalOutcome}
            </p>
          </div>

          {/* Ukrainian Dimension Callout */}
          <div className="space-y-1.5 font-serif-text">
            <h5 className="text-xs font-mono uppercase text-sky-400 font-bold flex items-center gap-1.5">
              <Flag className="w-3.5 h-3.5 text-sky-400" />
              Значення для України та українців:
            </h5>
            <p className="text-sm text-slate-300 leading-relaxed bg-[#15242b] p-3.5 rounded-xl border border-[#28404a]">
              {activeBattle.ukraineContext}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
