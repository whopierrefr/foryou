import React, { useState } from 'react';
import { playComicPopSound } from '../utils/soundEffects';

export default function ComicStartScreen({ onStart }) {
  const [isExiting, setIsExiting] = useState(false);

  const handleStartClick = () => {
    if (isExiting) return;
    playComicPopSound(540);
    setIsExiting(true);
    setTimeout(() => {
      onStart();
    }, 400);
  };

  return (
    <section
      className={`min-h-[80vh] flex flex-col justify-center items-center text-center px-2 sm:px-4 relative z-10 py-10 w-full max-w-full transition-all ${
        isExiting ? 'animate-comic-exit pointer-events-none' : ''
      }`}
    >
      {/* 1. Header & Maxi Title */}
      <div className="flex flex-col items-center w-full max-w-full" style={{ marginBottom: '32px' }}>
        
        {/* SPECIAL FOR YOU BADGE (POP-OUT 1) */}
        <div 
          className="inline-flex items-center justify-center bg-[#FEF08A] text-[#0F172A] font-['Bangers'] text-xs sm:text-sm rounded-full border-[2.5px] border-[#0F172A] shadow-[2.5px_2.5px_0_#0F172A] -rotate-2 mb-3.5 tracking-wider whitespace-nowrap animate-comic-pop anim-delay-1"
          style={{ minWidth: '140px', padding: '5px 16px' }}
        >
          SPECIAL FOR YOU
        </div>

        {/* HAPPY BIRTHDAY MAXI! (POP-OUT 2) */}
        <h1 
          className="font-['Bangers'] text-[#0F172A] tracking-wider leading-none drop-shadow-[3px_3px_0_#FFD1DC] my-1 whitespace-nowrap text-center animate-comic-pop anim-delay-2"
          style={{ fontSize: 'clamp(1.75rem, 6.2vw, 4.4rem)' }}
        >
          HAPPY BIRTHDAY <span className="text-[#FF3366] drop-shadow-[3px_3px_0_#0F172A]">MAXI!</span>
        </h1>
      </div>

      {/* 2. Card: I have a surprise for you (POP-OUT 3) */}
      <div className="w-full flex justify-center" style={{ marginBottom: '38px' }}>
        <div 
          className="font-['Outfit'] font-bold text-sm sm:text-base text-slate-800 bg-white/95 rounded-full border-2 border-[#0F172A] shadow-[3px_3px_0_#0F172A] inline-flex items-center justify-center backdrop-blur-sm whitespace-nowrap animate-comic-pop anim-delay-3"
          style={{ minWidth: '190px', padding: '7px 20px' }}
        >
          I have a surprise for you...
        </div>
      </div>

      {/* 3. PILL-SHAPED COMIC SPIDER-MAN "START" BUTTON (POP-OUT 4 & 5) */}
      <div className="relative group animate-comic-pop anim-delay-4" style={{ marginTop: '6px' }}>
        
        {/* Cute Comic Tag (POP-OUT 5) */}
        <div className="absolute -top-3.5 -right-3 bg-[#FEF08A] text-[#0F172A] font-['Bangers'] text-xs sm:text-sm px-3.5 py-0.5 border-2 border-[#0F172A] rounded-full shadow-[2px_2px_0_#0F172A] rotate-12 z-20 group-hover:scale-110 transition-transform pointer-events-none animate-comic-pop anim-delay-5">
          💥 PRESS ME!
        </div>

        <button
          onClick={handleStartClick}
          className="relative inline-flex items-center justify-center px-14 sm:px-20 py-4 sm:py-5 bg-gradient-to-b from-[#FF4D6D] via-[#FF2A55] to-[#E6194B] text-white rounded-full border-[4.5px] border-[#0F172A] shadow-[0_8px_0_#0F172A,0_15px_25px_rgba(255,42,85,0.45)] hover:shadow-[0_10px_0_#0F172A,0_18px_30px_rgba(255,42,85,0.6)] hover:-translate-y-1 active:translate-y-2 active:shadow-[0_2px_0_#0F172A] transition-all cursor-pointer overflow-hidden group"
          style={{ minWidth: '260px' }}
        >
          {/* Top Glossy Inner Highlight */}
          <div className="absolute top-1.5 left-6 right-6 h-2 sm:h-2.5 bg-gradient-to-r from-white/90 via-pink-200/60 to-transparent rounded-full pointer-events-none" />
          
          {/* Left Pill Gloss Reflection Pill */}
          <div className="absolute top-2.5 left-3.5 w-3 h-3 bg-white rounded-full opacity-90 pointer-events-none" />

          {/* Button Text */}
          <div className="flex items-center gap-3 font-['Bangers'] text-2xl sm:text-4xl tracking-widest text-white drop-shadow-[2px_2px_0_#0F172A]">
            <span className="text-xl sm:text-2xl group-hover:rotate-12 transition-transform">🕸️</span>
            <span>START</span>
            <span className="text-xl sm:text-2xl group-hover:-rotate-12 transition-transform">▶</span>
          </div>
        </button>

      </div>

    </section>
  );
}
