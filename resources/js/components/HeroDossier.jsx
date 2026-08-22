import React from 'react';

export default function HeroDossier({ quote }) {
  return (
    <section className="comic-panel-pastel pt-8 text-center flex flex-col items-center">
      <div className="panel-header-tape-pastel">CHAPTER 1: SPIDEY'S BIRTHDAY WISH</div>
      
      <div className="flex flex-col items-center mt-2 w-full">
        {/* Web string */}
        <div className="w-0.5 h-6 bg-gradient-to-b from-[#FF4D6D] to-[#BAE6FD] shadow-[0_0_6px_rgba(255,77,109,0.5)]"></div>
        
        {/* Avatar Frame */}
        <div className="relative flex flex-col items-center">
          <div className="bg-[#FEF08A] text-[#0F172A] font-['Bangers'] text-xs tracking-wider px-3 py-1 border-2 border-[#0F172A] rounded-md shadow-[2px_2px_0_#0F172A] -rotate-6 -mb-3 z-10">
            🕷️ SPIDEY'S MESSAGE FOR MAXI! ✨
          </div>
          
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-[#FF4D6D] overflow-hidden shadow-[0_0_20px_rgba(255,77,109,0.4)] bg-white flex items-center justify-center p-1">
            <img
              src="/images/spidey-cute-doodle.jpg"
              alt="Cute Spidey Doodle"
              className="w-full h-full object-contain scale-105"
            />
          </div>
        </div>

        {/* Comic Speech Bubble */}
        <div className="relative bg-[#FFF0F5] text-[#0F172A] border-2.5 border-[#0F172A] rounded-2xl p-4 mt-4 shadow-[3px_3px_0_#0F172A] font-['Outfit'] font-semibold text-sm sm:text-base leading-relaxed w-full max-w-md">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-[#FFF0F5]"></div>
          <p>"{quote}"</p>
        </div>
      </div>
    </section>
  );
}
