import React from 'react';

export default function HeroHeader({ name, tagline }) {
  return (
    <header className="text-center mb-6">
      <div className="inline-block bg-[#BAE6FD] text-[#0369A1] border-2 border-[#0F172A] font-['Bangers'] text-xs tracking-widest px-3.5 py-1 rounded-full mb-2.5 shadow-[2px_2px_0_#0F172A]">
        TOP SECRET • HERO DOSSIER ✨
      </div>
      <h1 className="font-['Bangers'] leading-tight">
        <span className="block text-2xl sm:text-3xl text-[#0F172A] tracking-wider drop-shadow-[1px_1px_0_#FFD1DC]">
          HAPPY BIRTHDAY,
        </span>
        <span className="block text-4xl sm:text-5xl text-[#FF3366] tracking-widest drop-shadow-[3px_3px_0_#0F172A]">
          {name}
        </span>
      </h1>
      <div className="inline-flex items-center gap-1.5 bg-white/90 border-2 border-[#0F172A] px-4 py-1.5 rounded-full mt-2.5 text-xs sm:text-sm text-[#0F172A] font-bold shadow-[2px_2px_0_#0F172A]">
        <span>🕷️</span>
        <span>{tagline}</span>
        <span>💖</span>
      </div>
    </header>
  );
}
