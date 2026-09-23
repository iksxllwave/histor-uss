export type ChapterId = 
  | 'overview'
  | 'uniforms'
  | 'insignia'
  | 'armament'
  | 'cavalry'
  | 'interactive-games'
  | 'facts'
  | 'quiz'
  | 'conclusion';

export interface Chapter {
  id: ChapterId;
  title: string;
  subtitle: string;
  badge: string;
  iconName: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  region: string;
  description: string;
  ukraineFact: string;
  tag: string;
  imageUrl?: string;
  imageCaption?: string;
}

export interface UniformItem {
  id: string;
  country: string;
  army: string;
  flag: string;
  soldierType: string;
  period: '1914' | '1915' | '1916' | '1914-1916';
  headgear: string;
  jacketColor: string;
  trousersColor: string;
  footwear: string;
  keyInnovation: string;
  historicalContext: string;
  whyChanged?: string;
  ukrainianConnection?: string;
  imageUrl?: string;
  imageCaption?: string;
  interactivePoints: {
    id: string;
    label: string;
    x: number; // percentage
    y: number; // percentage
    title: string;
    description: string;
  }[];
  stats: {
    camouflageRating: number; // 1-10
    headProtectionRating: number; // 1-10 (cloth cap = 1, steel helmet = 8-9)
    mobilityRating: number; // 1-10
  };
}

export interface InsigniaItem {
  id: string;
  name: string;
  countryOrUnit: string;
  category: 'кокарда' | 'головний убір' | 'погон' | 'орден' | 'нагрудний знак';
  year: string;
  description: string;
  symbolism: string;
  historicalSignificance: string;
  svgIconType: 'lion' | 'cross' | 'star' | 'iron-cross' | 'mazepynka' | 'eagle' | 'shield';
  rarity: 'Масовий' | 'Елітний' | 'Історична реліквія';
  imageUrl?: string;
  imageCaption?: string;
}

export interface WeaponOrVehicle {
  id: string;
  name: string;
  type: 'Танк' | 'Кулемет' | 'Гвинтівка' | 'Бронеавтомобіль' | 'Артилерія' | 'Хімічна зброя' | 'Вогнемет';
  country: string;
  yearIntroduced: number;
  specs: {
    caliberOrWeight?: string;
    rateOfFire?: string;
    range?: string;
    crew?: string;
    speed?: string;
  };
  description: string;
  impactOnTrenchWarfare: string;
  shockFactor: string; // Цитата чи враження солдатів
  imageTheme: string;
  imageUrl?: string;
  imageCaption?: string;
}

export interface CavalryFact {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  statistic: string;
  statLabel: string;
  role: 'Кавалерійська атака' | 'Артилерійська тяга' | 'Санітарний транспорт' | 'Зв\'язок та маскоти' | 'Санітарна служба' | 'Захист від гризунів' | 'Польовий зв\'язок';
  impact: string;
  imageUrl?: string;
  imageCaption?: string;
}

export interface FactCard {
  id: string;
  title: string;
  category: 'Несподіване' | 'Винахід' | 'Гуманізм' | 'Український вимір';
  year: string;
  lead: string;
  content: string;
  imageUrl?: string;
  imageCaption?: string;
  quote?: {
    text: string;
    author: string;
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceContext: string;
}

export interface EquipItem {
  id: string;
  slot: 'head' | 'chest' | 'legs' | 'weapon' | 'accessory';
  name: string;
  era: '1914-peace' | '1916-trench' | 'uss-special';
  country: 'Франція' | 'Німеччина' | 'Британія' | 'УСС (Україна)';
  survivalScore: number; // + or -
  camouflageScore: number;
  description: string;
  critique: string;
}
