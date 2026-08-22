import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { triggerSpiderConfetti } from '../utils/soundEffects';

export default function PeterPorker() {
  const [oinkCount, setOinkCount] = useState(0);
  const [isWobbling, setIsWobbling] = useState(false);
  const [oinkText, setOinkText] = useState(null);

  const oinkPhrases = ['OINK! 🐷', 'OINK OINK! 🐽', 'SQUEAAAL! ✨', 'SNORT! 🐷', 'PORKER POWER! 🦸‍♂️'];

  const handlePorkerClick = (e) => {
    // Play genuine cartoon pig oink audio
    try {
      const audio = new Audio('/audio/pig-oink.mp3');
      audio.volume = 0.9;
      const startTimes = [0, 0.35, 0.8, 1.3, 1.9];
      audio.currentTime = startTimes[Math.floor(Math.random() * startTimes.length)];
      audio.play().catch(() => {});
      setTimeout(() => {
        try {
          audio.pause();
        } catch (e) {}
      }, 950);
    } catch (err) {}

    setOinkCount((prev) => prev + 1);
    setIsWobbling(true);

    const randomPhrase = oinkPhrases[Math.floor(Math.random() * oinkPhrases.length)];
    setOinkText(randomPhrase);

    setTimeout(() => setIsWobbling(false), 300);
    setTimeout(() => setOinkText(null), 1200);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerSpiderConfetti(x, y);
  };

  return (
    <section className="comic-panel-pastel pt-7 pb-5 px-3 sm:px-6 flex flex-col items-center text-center">
      {/* Chapter Tape */}
      <div className="panel-header-tape-pastel">
        PETER PORKER • SPIDER-HAM
      </div>

      <div className="flex flex-col items-center mt-2 w-full max-w-sm">
        
        {/* Instruction Badge */}
        <div className="bg-[#FEF08A] text-[#0F172A] font-['Bangers'] text-xs sm:text-sm tracking-wider px-4 py-1 border-2 border-[#0F172A] rounded-full shadow-[2px_2px_0_#0F172A] -rotate-1 mb-3">
          👉 TAP PETER PORKER! 👈
        </div>

        {/* Interactive Peter Porker Frame */}
        <div
          onClick={handlePorkerClick}
          className={`relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl border-4 border-[#0F172A] bg-gradient-to-b from-amber-100 via-orange-50 to-pink-50 shadow-[6px_6px_0_#0F172A,0_15px_30px_rgba(0,0,0,0.25)] flex items-center justify-center p-3 cursor-pointer transition-transform duration-200 select-none group active:scale-90 ${
            isWobbling ? 'scale-110 -rotate-6' : 'hover:scale-105'
          }`}
          title="Click me to Oink!"
        >
          {/* Floating Comic Oink Pop-up */}
          {oinkText && (
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#FF3366] text-white font-['Bangers'] text-base sm:text-lg px-4 py-1 rounded-full border-2 border-[#0F172A] shadow-[3px_3px_0_#0F172A] animate-bounce z-30 whitespace-nowrap">
              {oinkText}
            </div>
          )}

          {/* Peter Porker Fiery Sticker Image */}
          <img
            src="/images/peter-porker.png"
            alt="Peter Porker Spider-Ham on Fire"
            className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(255,87,34,0.35)] group-hover:scale-108 transition-transform pointer-events-none"
          />
        </div>

        {/* Counter Pill */}
        <div className="mt-4 inline-flex items-center gap-2 bg-white text-[#0F172A] font-['Outfit'] font-bold text-xs sm:text-sm px-4 py-1.5 rounded-full border-2 border-[#0F172A] shadow-[2px_2px_0_#0F172A]">
          <span>🐷 Total Oinks:</span>
          <span className="text-[#FF3366] font-extrabold">{oinkCount}</span>
        </div>

      </div>
    </section>
  );
}
