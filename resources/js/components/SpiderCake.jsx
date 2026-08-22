import React, { useState } from 'react';
import { playThwipSound, triggerSpiderConfetti, playTone } from '../utils/soundEffects';

export default function SpiderCake() {
  const [candles, setCandles] = useState([true, true, true]);
  const [allBlown, setAllBlown] = useState(false);

  const toggleCandle = (index) => {
    playThwipSound();
    const updated = [...candles];
    updated[index] = !updated[index];
    setCandles(updated);

    const isFinished = updated.every((c) => !c);
    if (isFinished && !allBlown) {
      setAllBlown(true);
      triggerSpiderConfetti(0.5, 0.5);
      playTone(523.25, 0, 0.6);
    }
  };

  const blowAllCandles = () => {
    playThwipSound();
    setCandles([false, false, false]);
    setAllBlown(true);
    triggerSpiderConfetti(0.5, 0.5);
    playTone(523.25, 0, 0.6);
  };

  return (
    <section className="comic-panel-pastel pt-8 flex flex-col items-center text-center">
      <div className="panel-header-tape-pastel">CHAPTER 2: SPIDER-CAKE CEREMONY</div>
      
      <p className="text-xs text-slate-600 mb-3 font-medium">
        Ketuk lilin untuk meniup & tembakkan jaring kebahagiaan! 🎂✨
      </p>

      {/* Virtual Cake Box */}
      <div className="relative w-36 my-2 cursor-pointer">
        {/* Candles */}
        <div className="flex justify-center gap-4 mb-[-4px] relative z-10">
          {candles.map((isLit, i) => (
            <div
              key={i}
              onClick={() => toggleCandle(i)}
              className="flex flex-col items-center cursor-pointer transition-transform active:scale-90"
            >
              <div
                className={`w-3 h-4 bg-gradient-to-t from-pink-500 to-yellow-300 rounded-full shadow-[0_0_10px_#FDE047] transition-all duration-300 ${
                  isLit ? 'flame-anim-cute opacity-100 scale-100' : 'opacity-0 scale-0 -translate-y-2'
                }`}
              />
              <div
                className={`w-2 h-6 rounded-sm border border-[#0F172A] ${
                  i % 2 === 0
                    ? 'bg-[repeating-linear-gradient(45deg,#FF758F,#FF758F_3px,#FFF_3px,#FFF_6px)]'
                    : 'bg-[repeating-linear-gradient(45deg,#38BDF8,#38BDF8_3px,#FFF_3px,#FFF_6px)]'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Cake Body */}
        <div className="w-full">
          <div className="bg-[#FF758F] h-5 rounded-t-xl border-2.5 border-[#0F172A] flex justify-center items-center">
            <span className="text-sm -translate-y-0.5">🕷️</span>
          </div>
          <div className="h-6 bg-[#BAE6FD] border-2.5 border-t-0 border-[#0F172A]" />
          <div className="h-8 bg-[#E9D5FF] border-2.5 border-t-0 border-[#0F172A] rounded-b-xl" />
        </div>
      </div>

      <button onClick={blowAllCandles} className="comic-action-btn-pastel mt-3">
        <span>💨 TIUP SEMUA LILIN</span>
      </button>

      {allBlown && (
        <div className="mt-3 text-[#FF3366] font-['Bangers'] text-base sm:text-lg tracking-wider animate-bounce">
          🎉 WISH GRANTED! Semoga semua impianmu terkabul! 💖
        </div>
      )}
    </section>
  );
}
