import React, { useState, useEffect } from 'react';
import { playThwipSound, triggerSpiderConfetti } from '../utils/soundEffects';

const step1Lines = [
  "Hey Maxi! It's been way too long since we last caught up. I hope you're doing really well and having a great week.",
  "Anyway, I just realized it's your birthday—happy birthday, wishing you all the best!"
];

const step2Lines = [
  "And just like I promised, I finally made a special website just for your birthday.",
  "I really wanted to keep my word and build something cool for you, so I hope you love how it turned out and have an amazing day!"
];

export default function SpiderSenseIntro({ onUnlock }) {
  const [currentStep, setCurrentStep] = useState(1); // 1, 2, or 3
  const [displayedLine1, setDisplayedLine1] = useState('');
  const [displayedLine2, setDisplayedLine2] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Typewriter effect triggered whenever currentStep changes (for steps 1 & 2)
  useEffect(() => {
    if (currentStep === 3) {
      setIsTypingComplete(true);
      return;
    }

    setDisplayedLine1('');
    setDisplayedLine2('');
    setIsTypingComplete(false);

    const activeLines = currentStep === 1 ? step1Lines : step2Lines;
    const line1 = activeLines[0];
    const line2 = activeLines[1];

    let i1 = 0;
    let i2 = 0;
    let intervalLine2 = null;

    const startDelay = setTimeout(() => {
      const CHARS_PER_TICK = 2;

      const intervalLine1 = setInterval(() => {
        if (i1 < line1.length) {
          i1 = Math.min(line1.length, i1 + CHARS_PER_TICK);
          setDisplayedLine1(line1.slice(0, i1));
        } else {
          clearInterval(intervalLine1);

          // Start typing line 2 smoothly & fast
          intervalLine2 = setInterval(() => {
            if (i2 < line2.length) {
              i2 = Math.min(line2.length, i2 + CHARS_PER_TICK);
              setDisplayedLine2(line2.slice(0, i2));
            } else {
              clearInterval(intervalLine2);
              setIsTypingComplete(true);
            }
          }, 14);
        }
      }, 14);

      return () => {
        clearInterval(intervalLine1);
        if (intervalLine2) clearInterval(intervalLine2);
      };
    }, 80);

    return () => {
      clearTimeout(startDelay);
      if (intervalLine2) clearInterval(intervalLine2);
    };
  }, [currentStep]);

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleUnlock = () => {
    playThwipSound();
    triggerSpiderConfetti(0.5, 0.5);
    setTimeout(() => triggerSpiderConfetti(0.3, 0.4), 200);
    setTimeout(() => triggerSpiderConfetti(0.7, 0.4), 400);
    onUnlock();
  };

  return (
    <section className="min-h-[75vh] flex flex-col justify-center items-center px-3 sm:px-6 py-6 sm:py-10 relative z-10 animate-page-enter max-w-5xl mx-auto w-full">
      
      {/* Spider-Sense Header Waves */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <div className="flex flex-col gap-1 items-end">
          <span className="block h-1.5 bg-[#FF3366] rounded-full shadow-[0_0_8px_#FF3366] w-8 spider-sense-wave-1"></span>
          <span className="block h-1.5 bg-[#FF758F] rounded-full shadow-[0_0_8px_#FF758F] w-6 spider-sense-wave-2"></span>
          <span className="block h-1.5 bg-[#BAE6FD] rounded-full shadow-[0_0_8px_#BAE6FD] w-5 spider-sense-wave-3"></span>
        </div>

        {/* Comic Alert Badge */}
        <div className="bg-[#FEF08A] text-[#0F172A] font-['Bangers'] text-base sm:text-lg px-5 py-1.5 rounded-full border-[2.5px] border-[#0F172A] shadow-[3px_3px_0_#0F172A] -rotate-1 tracking-wider inline-flex items-center gap-2">
          <span>🕷️</span>
          <span>SPIDEY-SENSE DETECTS A BIRTHDAY!</span>
          <span>✨</span>
        </div>

        <div className="flex flex-col gap-1 items-start">
          <span className="block h-1.5 bg-[#FF3366] rounded-full shadow-[0_0_8px_#FF3366] w-8 spider-sense-wave-1"></span>
          <span className="block h-1.5 bg-[#FF758F] rounded-full shadow-[0_0_8px_#FF758F] w-6 spider-sense-wave-2"></span>
          <span className="block h-1.5 bg-[#BAE6FD] rounded-full shadow-[0_0_8px_#BAE6FD] w-5 spider-sense-wave-3"></span>
        </div>
      </div>

      {/* Main 2-Column Section: Swinging Spiderman on the left, Card beside it on the right */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12 mt-2">
        
        {/* LEFT: Swinging Spiderman with Natural Web Physics Animation */}
        <div className="flex flex-col items-center relative flex-shrink-0 animate-comic-pop anim-delay-1">
          {/* Entire Spiderman + Web swings together as a pendulum */}
          <div className="animate-spidey-swing flex flex-col items-center select-none cursor-pointer">
            {/* Hanging web strand connecting from top into Spiderman's hand */}
            <div className="w-0.5 h-12 sm:h-20 bg-gradient-to-b from-pink-300 via-sky-300 to-slate-800 shadow-[0_0_6px_rgba(255,77,109,0.5)] -mb-1 z-0 ml-16 sm:ml-20" />
            
            {/* Spiderman Character Figure */}
            <div className="relative group transition-transform duration-300 hover:scale-105">
              <img
                src="/images/spiderman-transparent.png"
                alt="Cute Spiderman with Flowers for Maxi"
                className="w-48 sm:w-56 md:w-64 lg:w-72 h-auto object-contain drop-shadow-[0_14px_28px_rgba(255,77,109,0.35)] pointer-events-none"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* RIGHT: Dynamic Multi-Step Card */}
        <div className="w-full flex-1 max-w-2xl lg:max-w-3xl flex flex-col animate-comic-pop anim-delay-2">
          
          <div className="w-full bg-white/95 p-6 sm:p-8 md:p-9 rounded-3xl border-3.5 border-[#0F172A] shadow-[6px_6px_0_#0F172A,0_15px_35px_rgba(255,77,109,0.15)] backdrop-blur-md">
            
            {/* STEPS 1 & 2: Birthday Messages */}
            {currentStep <= 2 && (
              <>
                {/* Main Headline */}
                <h1 className="font-['Bangers'] text-3xl sm:text-4xl lg:text-[2.75rem] tracking-wider leading-tight text-[#0F172A] drop-shadow-[2px_2px_0_#FFD1DC] mb-4 text-center">
                  HAPPY BIRTHDAY, <span className="text-[#FF3366] drop-shadow-[2px_2px_0_#0F172A]">MAXI!</span>
                </h1>

                {/* Clean & Elegant Message with Typewriter Typing Effect */}
                <div className="text-slate-700 font-['Outfit'] space-y-3.5 text-base sm:text-lg leading-relaxed text-center">
                  <p className="font-medium text-slate-800">
                    {displayedLine1}
                    {!displayedLine2 && !isTypingComplete && (
                      <span className="inline-block w-0.5 h-4 bg-[#FF3366] ml-1 animate-pulse align-middle" />
                    )}
                  </p>
                  
                  {displayedLine2 && (
                    <p className="text-slate-600">
                      {displayedLine2}
                      {!isTypingComplete && (
                        <span className="inline-block w-0.5 h-4 bg-[#FF3366] ml-1 animate-pulse align-middle" />
                      )}
                    </p>
                  )}
                </div>

                {/* Next Button for Step 1 and Step 2 */}
                {isTypingComplete && (
                  <div className="w-full flex justify-center mt-7 pt-1 pb-1">
                    <button
                      onClick={handleNextStep}
                      className="relative inline-flex items-center justify-center px-10 sm:px-14 py-3 sm:py-3.5 bg-gradient-to-b from-[#FF4D6D] via-[#FF2A55] to-[#E6194B] text-white rounded-full border-[3px] border-[#0F172A] shadow-[0_5px_0_#0F172A,0_8px_18px_rgba(255,42,85,0.35)] hover:shadow-[0_7px_0_#0F172A,0_12px_22px_rgba(255,42,85,0.5)] hover:-translate-y-0.5 active:translate-y-1.5 active:shadow-[0_1px_0_#0F172A] transition-all cursor-pointer overflow-hidden group animate-comic-pop"
                    >
                      {/* Top Gloss Highlight */}
                      <div className="absolute top-1 left-4 right-4 h-1.5 bg-gradient-to-r from-white/85 via-pink-100/50 to-transparent rounded-full pointer-events-none" />
                      
                      <div className="flex items-center gap-2.5 font-['Bangers'] text-xl sm:text-2xl tracking-widest text-white drop-shadow-[1.5px_1.5px_0_#0F172A]">
                        <span>NEXT</span>
                        <span className="text-lg group-hover:translate-x-1 transition-transform">➔</span>
                      </div>
                    </button>
                  </div>
                )}
              </>
            )}

            {/* STEP 3: Discord Promise Proof Screenshot */}
            {currentStep === 3 && (
              <div className="animate-comic-pop flex flex-col items-center">
                {/* Header Tag */}
                <div className="inline-flex items-center gap-2 bg-[#FEF08A] text-[#0F172A] border-2 border-[#0F172A] font-['Bangers'] text-sm sm:text-base px-4 py-1 rounded-full shadow-[2px_2px_0_#0F172A] mb-3">
                  <span>📜</span>
                  <span>A PROMISE FULFILLED!</span>
                  <span>✨</span>
                </div>

                {/* Screenshot Container */}
                <div className="w-full rounded-2xl overflow-hidden border-2.5 border-[#0F172A] shadow-[4px_4px_0_#0F172A] bg-[#313338] p-2 sm:p-3 mb-5">
                  <img
                    src="/images/promise-proof.png"
                    alt="Discord Promise Proof"
                    className="w-full h-auto max-h-[360px] object-contain rounded-xl mx-auto"
                  />
                </div>

                {/* Final Unlock Action Button */}
                <div className="w-full flex justify-center pt-1">
                  <button
                    onClick={handleUnlock}
                    className="relative inline-flex items-center justify-center px-8 sm:px-12 py-3 sm:py-3.5 bg-gradient-to-b from-[#FF4D6D] via-[#FF2A55] to-[#E6194B] text-white rounded-full border-[3px] border-[#0F172A] shadow-[0_5px_0_#0F172A,0_8px_18px_rgba(255,42,85,0.35)] hover:shadow-[0_7px_0_#0F172A,0_12px_22px_rgba(255,42,85,0.5)] hover:-translate-y-0.5 active:translate-y-1.5 active:shadow-[0_1px_0_#0F172A] transition-all cursor-pointer overflow-hidden group"
                  >
                    {/* Top Gloss Highlight */}
                    <div className="absolute top-1 left-4 right-4 h-1.5 bg-gradient-to-r from-white/85 via-pink-100/50 to-transparent rounded-full pointer-events-none" />
                    
                    <div className="flex items-center gap-2 font-['Bangers'] text-lg sm:text-xl tracking-wider text-white drop-shadow-[1.5px_1.5px_0_#0F172A]">
                      <span>OPEN THE GIFT</span>
                      <span>🎁✨</span>
                    </div>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  );
}
