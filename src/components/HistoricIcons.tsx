import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const GalicianLionBadge: React.FC<IconProps> = ({ className = "w-16 h-16", size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="46" fill="#1e293b" stroke="#f59e0b" strokeWidth="4" />
    <circle cx="50" cy="50" r="41" stroke="#b45309" strokeWidth="1.5" strokeDasharray="3 3" />
    {/* Rock */}
    <path d="M22 80 L35 55 L48 65 L60 48 L75 80 Z" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
    {/* Stylized Rampant Lion */}
    <path d="M42 62 C40 55 45 42 50 38 C48 35 52 30 56 32 C58 33 60 30 63 32 C62 36 60 38 62 42 C64 45 68 47 67 52 C65 54 60 52 58 55 C56 58 58 64 54 68 C50 72 45 70 42 62 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
    <path d="M57 33 L62 27 L65 30" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
    {/* Lion crown & claws */}
    <circle cx="57" cy="30" r="2" fill="#ef4444" />
    <path d="M40 70 Q30 75 25 65" stroke="#f59e0b" strokeWidth="2" fill="none" />
    {/* Text around banner: У.С.С. 1914 */}
    <text x="50" y="22" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="bold" fontFamily="Cinzel, serif" letterSpacing="2">У.С.С.</text>
    <text x="50" y="90" textAnchor="middle" fill="#fef08a" fontSize="7" fontWeight="bold" fontFamily="Cinzel, serif" letterSpacing="1">1914</text>
  </svg>
);

export const MazepynkaCapIcon: React.FC<IconProps> = ({ className = "w-16 h-16", size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Mazepynka cap body */}
    <path d="M15 60 C15 35 30 20 50 22 C70 20 85 35 85 60 Z" fill="#3f4a3c" stroke="#657560" strokeWidth="2" />
    {/* Front characteristic V-notch (Rozriz) */}
    <path d="M40 22 L50 38 L60 22" fill="#283226" stroke="#d97706" strokeWidth="1.5" />
    {/* Foldable side flaps (Zakoty) with buttons */}
    <path d="M15 58 C25 62 40 64 50 64 C60 64 75 62 85 58 L85 68 C75 73 60 74 50 74 C40 74 25 73 15 68 Z" fill="#2d372b" stroke="#788c72" strokeWidth="1.5" />
    <circle cx="38" cy="67" r="2.5" fill="#f59e0b" />
    <circle cx="62" cy="67" r="2.5" fill="#f59e0b" />
    {/* Cockade on the front */}
    <circle cx="50" cy="46" r="6" fill="#1e3a8a" stroke="#fbbf24" strokeWidth="1.5" />
    <circle cx="50" cy="46" r="2" fill="#fbbf24" />
    {/* Visor */}
    <path d="M22 67 C35 73 65 73 78 67 C72 78 28 78 22 67 Z" fill="#1c1917" stroke="#44403c" strokeWidth="1.5" />
  </svg>
);

export const IronCrossBadge: React.FC<IconProps> = ({ className = "w-16 h-16", size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Silver outline */}
    <path d="M38 12 L62 12 Q56 34 68 38 L88 38 L88 62 Q66 56 62 68 L62 88 L38 88 Q44 66 32 62 L12 62 L12 38 Q34 44 38 32 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
    {/* Black cast iron interior */}
    <path d="M40 16 L60 16 Q54 36 66 40 L84 40 L84 60 Q64 54 60 66 L60 84 L40 84 Q46 64 34 60 L16 60 L16 40 Q36 46 40 36 Z" fill="#0f172a" />
    {/* Imperial crown and 1914 */}
    <path d="M46 25 L50 22 L54 25 L53 28 L47 28 Z" fill="#e2e8f0" />
    <text x="50" y="55" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold" fontFamily="Cinzel, serif">W</text>
    <text x="50" y="78" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontWeight="bold" fontFamily="Cinzel, serif">1914</text>
  </svg>
);

export const TankMark1Icon: React.FC<IconProps> = ({ className = "w-24 h-16", size = 80 }) => (
  <svg width={size * 1.3} height={size * 0.8} viewBox="0 0 140 85" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Rhomboid Track Frame */}
    <path d="M15 55 L35 22 L105 22 L128 50 L115 72 L28 72 Z" fill="#363c32" stroke="#525c4d" strokeWidth="3" />
    {/* Track links */}
    <path d="M12 55 L33 19 L107 19 L131 50 L117 75 L25 75 Z" stroke="#788770" strokeWidth="2" strokeDasharray="3 3" fill="none" />
    {/* Sponson (gun bay on the side) */}
    <path d="M55 35 L88 35 L92 60 L50 60 Z" fill="#252a23" stroke="#8a9981" strokeWidth="1.5" />
    {/* 6-pounder cannon barrel */}
    <rect x="80" y="44" width="38" height="6" rx="2" fill="#1c1917" stroke="#788770" strokeWidth="1" />
    {/* Armor rivets */}
    <circle cx="45" cy="30" r="1.5" fill="#9ca3af" />
    <circle cx="65" cy="30" r="1.5" fill="#9ca3af" />
    <circle cx="85" cy="30" r="1.5" fill="#9ca3af" />
    <circle cx="105" cy="30" r="1.5" fill="#9ca3af" />
    {/* Wheels in track */}
    <circle cx="35" cy="65" r="5" fill="#1c1917" stroke="#6b7280" />
    <circle cx="50" cy="65" r="5" fill="#1c1917" stroke="#6b7280" />
    <circle cx="65" cy="65" r="5" fill="#1c1917" stroke="#6b7280" />
    <circle cx="80" cy="65" r="5" fill="#1c1917" stroke="#6b7280" />
    <circle cx="95" cy="65" r="5" fill="#1c1917" stroke="#6b7280" />
    <circle cx="110" cy="65" r="5" fill="#1c1917" stroke="#6b7280" />
  </svg>
);

export const MaximGunIcon: React.FC<IconProps> = ({ className = "w-20 h-16", size = 70 }) => (
  <svg width={size * 1.2} height={size * 0.9} viewBox="0 0 110 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Sokolov wheeled mount */}
    <circle cx="40" cy="62" r="14" fill="#292524" stroke="#78716c" strokeWidth="2.5" />
    <circle cx="40" cy="62" r="4" fill="#a8a29e" />
    {/* Wheel spokes */}
    <line x1="40" y1="48" x2="40" y2="76" stroke="#57534e" strokeWidth="1.5" />
    <line x1="26" y1="62" x2="54" y2="62" stroke="#57534e" strokeWidth="1.5" />
    {/* Trail mount */}
    <path d="M40 62 L85 70" stroke="#44403c" strokeWidth="4" strokeLinecap="round" />
    {/* Armored Shield */}
    <path d="M45 25 L45 60 L56 60 L56 25 Z" fill="#3f3f46" stroke="#71717a" strokeWidth="1.5" />
    {/* Water jacket barrel */}
    <rect x="25" y="38" width="60" height="12" rx="3" fill="#27272a" stroke="#52525b" strokeWidth="2" />
    {/* Fluted ribbed surface of barrel */}
    <line x1="35" y1="39" x2="35" y2="49" stroke="#71717a" />
    <line x1="45" y1="39" x2="45" y2="49" stroke="#71717a" />
    <line x1="55" y1="39" x2="55" y2="49" stroke="#71717a" />
    <line x1="65" y1="39" x2="65" y2="49" stroke="#71717a" />
    <line x1="75" y1="39" x2="75" y2="49" stroke="#71717a" />
    {/* Muzzle */}
    <rect x="15" y="42" width="10" height="4" fill="#18181b" />
    {/* Rear spade handles */}
    <path d="M85 36 L98 36 L98 52 L85 52" fill="none" stroke="#a1a1aa" strokeWidth="2" />
    {/* Ammo belt entering */}
    <path d="M70 50 Q75 58 73 66" stroke="#fbbf24" strokeWidth="3" strokeDasharray="2 2" fill="none" />
  </svg>
);

export const WarHorseIcon: React.FC<IconProps> = ({ className = "w-20 h-20", size = 70 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Silhouette of noble war horse */}
    <path d="M25 85 L32 55 C30 45 35 32 45 26 C47 22 50 18 52 14 C55 15 57 18 57 20 C62 20 70 25 76 30 C78 35 75 42 70 42 C64 42 62 48 60 55 L65 85" stroke="#a8a29e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Horse Head & Mane */}
    <path d="M52 14 C56 12 60 16 62 20 C68 22 75 25 78 30 C80 34 76 38 72 38 C68 38 65 35 62 34 C60 38 58 45 57 52" fill="#44403c" stroke="#d6d3d1" strokeWidth="1.5" />
    {/* Bridle & Military Harness */}
    <path d="M58 20 L72 38" stroke="#f59e0b" strokeWidth="1.5" />
    <path d="M64 26 L76 31" stroke="#f59e0b" strokeWidth="1.5" />
    <circle cx="67" cy="30" r="2.5" fill="#fbbf24" />
    {/* Canvas gas-mask bag on snout representation */}
    <path d="M70 33 C75 36 78 40 76 43 C72 45 68 42 67 37 Z" fill="#292524" stroke="#78716c" strokeWidth="1" />
    {/* Artillery draft collar on neck */}
    <path d="M48 38 C54 44 56 54 54 62" stroke="#b45309" strokeWidth="3" fill="none" />
  </svg>
);
