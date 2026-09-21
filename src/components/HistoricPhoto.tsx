import React, { useState } from 'react';
import { ZoomIn, X, Image as ImageIcon, Shield } from 'lucide-react';

interface HistoricPhotoProps {
  src?: string;
  alt: string;
  caption?: string;
  year?: string;
  sourceNote?: string;
  className?: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide';
  badge?: string;
}

export const HistoricPhoto: React.FC<HistoricPhotoProps> = ({
  src,
  alt,
  caption,
  year,
  sourceNote = 'Архівне фото (1914–1916)',
  className = '',
  aspectRatio = 'video',
  badge
}) => {
  const [hasError, setHasError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const aspectClass = {
    video: 'aspect-[16/10]',
    wide: 'aspect-[16/9]',
    square: 'aspect-square',
    portrait: 'aspect-[4/5]'
  }[aspectRatio];

  return (
    <>
      <figure className={`group relative flex flex-col bg-[#141a1c] border border-[#273438] rounded-xl overflow-hidden shadow-lg transition-all hover:border-[#38bdf8]/60 hover:shadow-cyan-950/20 ${className}`}>
        {/* Photo Container */}
        <div 
          className={`relative w-full ${aspectClass} overflow-hidden bg-[#0d1112] cursor-pointer`}
          onClick={() => setIsOpen(true)}
          title="Натисніть для перегляду у великому розмірі"
        >
          {src && !hasError ? (
            <img
              src={src}
              alt={alt}
              referrerPolicy="no-referrer"
              onError={() => setHasError(true)}
              className="w-full h-full object-cover object-center filter contrast-[1.08] brightness-[0.95] transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            /* Atmospheric Trench Military Archival Plate */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#182124] to-[#0f1416] border-b border-[#243034]">
              <div className="w-12 h-12 rounded-xl bg-[#202c30] border border-[#34454b] flex items-center justify-center text-[#38bdf8] mb-3 shadow-inner">
                <ImageIcon className="w-6 h-6" />
              </div>
              <span className="font-mono-code text-[11px] uppercase tracking-widest text-[#7dd3fc] mb-1">
                АРХІВНА ХРОНІКА 1914–1916
              </span>
              <p className="font-heading text-sm font-semibold text-[#f1f5f9] line-clamp-2 max-w-xs">
                {alt}
              </p>
              {year && (
                <span className="mt-2.5 text-[11px] font-mono-code px-2.5 py-0.5 rounded bg-[#1e292d] text-[#94a3b8] border border-[#2f3f45]">
                  ДОКУМЕНТ: {year}
                </span>
              )}
            </div>
          )}

          {/* Archival Badge Overlay */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-[#090d0e]/85 backdrop-blur-md text-[#e2e8f0] text-[11px] font-mono-code px-2.5 py-1 rounded-md border border-[#273438] shadow-md">
            <Shield className="w-3 h-3 text-[#38bdf8]" />
            <span>{badge || year || 'АРХІВ 1914–1916'}</span>
          </div>

          {/* Zoom hint on hover */}
          <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-[#090d0e]/80 text-[#38bdf8] p-1.5 rounded-md border border-[#38bdf8]/40 shadow-md">
            <ZoomIn className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Caption Plate */}
        {(caption || alt) && (
          <figcaption className="p-3.5 bg-[#121719] border-t border-[#232e31] flex flex-col justify-between">
            <p className="font-serif-text text-xs text-[#cbd5e1] font-medium leading-relaxed">
              {caption || alt}
            </p>
            <div className="mt-2 flex items-center justify-between text-[10px] text-[#64748b] font-mono-code">
              <span className="text-[#94a3b8]">{sourceNote}</span>
              <span className="text-[#38bdf8] hover:text-[#7dd3fc] transition-colors cursor-pointer flex items-center gap-1" onClick={() => setIsOpen(true)}>
                Збільшити фото ↗
              </span>
            </div>
          </figcaption>
        )}
      </figure>

      {/* Lightbox Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#141a1c] rounded-xl overflow-hidden shadow-2xl border border-[#33444a]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 bg-[#0d1112] border-b border-[#243034] text-white">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono-code tracking-wider bg-[#1f292d] text-[#38bdf8] border border-[#33444a] px-2 py-0.5 rounded">
                  {year || '1914–1916'}
                </span>
                <h3 className="font-heading text-sm sm:text-base font-semibold text-slate-100 line-clamp-1">
                  {alt}
                </h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-[#1f292d] hover:bg-[#2d3a3f] text-slate-300 hover:text-white transition-colors border border-[#33444a]"
                aria-label="Закрити"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-hidden bg-[#07090a] flex items-center justify-center p-2">
              {src && !hasError ? (
                <img
                  src={src}
                  alt={alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-[66vh] object-contain rounded"
                />
              ) : (
                <div className="p-12 text-center text-slate-400">
                  <p className="text-lg font-heading text-slate-200 mb-2">{alt}</p>
                  <p className="text-sm font-serif-text text-slate-400">Історична фотодокументація Першої світової війни</p>
                </div>
              )}
            </div>

            <div className="p-4 sm:p-5 bg-[#121719] border-t border-[#232e31]">
              <p className="font-serif-text text-sm sm:text-base text-slate-200 leading-relaxed">
                {caption || alt}
              </p>
              <div className="mt-2.5 flex items-center justify-between text-xs text-slate-400 font-mono-code">
                <span>{sourceNote} • Загальнодоступний історичний архів</span>
                <span className="text-slate-500">ESC для виходу</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
