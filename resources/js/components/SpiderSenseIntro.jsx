import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { playThwipSound, playComicPopSound, triggerSpiderConfetti } from '../utils/soundEffects';

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
  const [isTransitioning, setIsTransitioning] = useState(false); // Smooth cinematic fade transition
  
  // Wish popup modal state
  const [showWishModal, setShowWishModal] = useState(false);
  const [savedWish, setSavedWish] = useState('');

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
      }, 16);

      return () => clearInterval(intervalLine1);
    }, 150);

    return () => {
      clearTimeout(startDelay);
      if (intervalLine2) clearInterval(intervalLine2);
    };
  }, [currentStep]);

  const handleNextStep = () => {
    playComicPopSound(500);
    triggerSpiderConfetti(0.5, 0.4);

    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleUnlockFlowers = () => {
    // 1. Play comic superhero pop sound
    playThwipSound();

    // 2. Trigger colorful celebration confetti explosion
    triggerSpiderConfetti(0.5, 0.5);

    // 3. Initiate smooth dark cinematic cross-fade
    setIsTransitioning(true);

    // 4. Trigger next stage callback
    setTimeout(() => {
      onUnlock();
    }, 600);
  };

  const handleOpenWishModal = () => {
    playComicPopSound(500);
    const wish = localStorage.getItem('user_birthday_wish') || '';
    setSavedWish(wish);
    setShowWishModal(true);
  };

  return (
    <>
      {/* Smooth Dark Celestial Cross-Fade Overlay */}
      <div
        className={`fixed inset-0 z-50 pointer-events-none transition-all duration-800 ease-in-out bg-gradient-to-b from-[#090A1E] via-[#1A0C2E] to-[#2B0938] ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <section
        className={`min-h-[75vh] flex flex-col justify-center items-center px-3 sm:px-6 py-6 sm:py-10 relative z-10 animate-page-enter max-w-5xl mx-auto w-full transition-all duration-800 ease-out ${
          isTransitioning ? 'opacity-0 scale-95 -translate-y-4 filter blur-xs pointer-events-none' : 'opacity-100 scale-100 translate-y-0'
        }`}
      >
        {/* Spider-Sense Header Waves */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="flex flex-col gap-1 items-end">
            <span className="block h-1.5 bg-[#FF3366] rounded-full shadow-[0_0_8px_#FF3366] w-8 spider-sense-wave-1"></span>
            <span className="block h-1.5 bg-[#FF758F] rounded-full shadow-[0_0_8px_#FF758F] w-6 spider-sense-wave-2"></span>
            <span className="block h-1.5 bg-[#BAE6FD] rounded-full shadow-[0_0_8px_#BAE6FD] w-5 spider-sense-wave-3"></span>
          </div>

          {/* Comic Alert Badge - Clickable to View Wishes */}
          <button
            onClick={handleOpenWishModal}
            className="bg-[#FEF08A] hover:bg-[#FDE047] active:translate-x-0.5 active:translate-y-0.5 text-[#0F172A] font-['Bangers'] text-base sm:text-lg px-5 py-1.5 rounded-full border-[2.5px] border-[#0F172A] shadow-[3px_3px_0_#0F172A] -rotate-1 tracking-wider inline-flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
            title="Click to view Maxi's Birthday Wish"
          >
            <span>🕷️</span>
            <span>SPIDEY-SENSE DETECTS A BIRTHDAY!</span>
            <span>✨</span>
          </button>

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
                          <span>{currentStep === 1 ? 'NEXT' : 'CONTINUE'}</span>
                          <span className="group-hover:translate-x-1.5 transition-transform text-2xl">➔</span>
                        </div>
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* STEP 3: Final Call to Action -> Flower Bouquet Unlock */}
              {currentStep === 3 && (
                <div className="flex flex-col items-center text-center animate-comic-pop">
                  <div className="inline-block bg-[#FEF08A] text-[#0F172A] font-['Bangers'] text-sm sm:text-base px-4 py-1 rounded-full border-2 border-[#0F172A] shadow-[2px_2px_0_#0F172A] mb-3 -rotate-1">
                    FINAL SURPRISE UNLOCKED
                  </div>

                  <h2 className="font-['Bangers'] text-2xl sm:text-3xl lg:text-4xl text-[#0F172A] tracking-wider mb-3">
                    A SPECIAL FLOWER BOUQUET FOR YOU!
                  </h2>

                  <p className="font-['Outfit'] text-slate-700 text-base sm:text-lg leading-relaxed max-w-lg mb-6">
                    A digital flower bouquet with 5 secret birthday surprises prepared just for you. Click below to enter!
                  </p>

                  <button
                    onClick={handleUnlockFlowers}
                    className="relative inline-flex items-center justify-center px-10 sm:px-14 py-3.5 sm:py-4 bg-gradient-to-b from-[#FF4D6D] via-[#FF2A55] to-[#E6194B] text-white rounded-full border-[3.5px] border-[#0F172A] shadow-[0_6px_0_#0F172A,0_12px_24px_rgba(255,42,85,0.4)] hover:shadow-[0_8px_0_#0F172A,0_16px_28px_rgba(255,42,85,0.55)] hover:-translate-y-1 active:translate-y-1.5 active:shadow-[0_1px_0_#0F172A] transition-all cursor-pointer overflow-hidden group animate-bounce-subtle"
                  >
                    <div className="absolute top-1 left-4 right-4 h-2 bg-gradient-to-r from-white/90 via-pink-100/60 to-transparent rounded-full pointer-events-none" />
                    
                    <div className="flex items-center gap-3 font-['Bangers'] text-xl sm:text-2xl tracking-widest text-white drop-shadow-[2px_2px_0_#0F172A]">
                      <span>ENTER THE CELEBRATION</span>
                      <span className="text-2xl group-hover:scale-125 transition-transform">🌸</span>
                    </div>
                  </button>
                </div>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* ================= MODAL: MAXI'S BIRTHDAY WISH VAULT ================= */}
      {showWishModal && (
        <div
          onClick={() => setShowWishModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white rounded-3xl border-4 border-[#0F172A] shadow-[8px_8px_0_#0F172A,0_20px_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-comic-pop"
          >
            {/* Top Modal Header */}
            <div className="px-5 sm:px-6 py-3.5 flex items-center justify-between border-b-3 border-[#0F172A] bg-gradient-to-r from-amber-100 via-pink-50 to-rose-100">
              <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                <h3 className="font-['Bangers'] text-lg sm:text-xl text-[#0F172A] tracking-wider">
                  SPIDEY-SENSE BIRTHDAY WISH VAULT
                </h3>
              </div>

              <button
                onClick={() => {
                  playComicPopSound(400);
                  setShowWishModal(false);
                }}
                className="w-8 h-8 sm:w-9 sm:h-9 bg-[#FEF08A] hover:bg-[#FDE047] text-[#0F172A] rounded-full border-2 border-[#0F172A] shadow-[2px_2px_0_#0F172A] flex items-center justify-center font-bold transition-transform active:scale-90 cursor-pointer"
              >
                <X size={18} strokeWidth={3} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-7 bg-[#FFF1F2] flex flex-col items-center text-center">
              {savedWish ? (
                /* Wish is Present */
                <div className="w-full flex flex-col items-center">
                  <div className="inline-block bg-[#FEF08A] text-[#0F172A] font-['Bangers'] text-xs sm:text-sm px-4 py-1 rounded-full border-2 border-[#0F172A] shadow-[2px_2px_0_#0F172A] mb-3.5 -rotate-1">
                    MAXI'S CHAPTER 21 WISH
                  </div>

                  <div className="w-full bg-white border-3 border-[#0F172A] rounded-2xl p-5 sm:p-6 shadow-[4px_4px_0_#0F172A] text-left relative mb-4">
                    <span className="text-[10px] sm:text-xs font-bold uppercase text-pink-600 font-mono tracking-wider block mb-1.5">
                      SEALED WISH:
                    </span>
                    <p className="font-['Outfit'] font-semibold text-sm sm:text-base text-slate-800 italic leading-relaxed">
                      "{savedWish}"
                    </p>
                  </div>

                  <p className="font-['Outfit'] font-bold text-xs sm:text-sm text-pink-600 mb-4">
                    ✨ Locked in the stars • May every word come true! ✨
                  </p>
                </div>
              ) : (
                /* No Wish Yet */
                <div className="w-full flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2.5 border-[#0F172A] flex items-center justify-center text-3xl mb-3 shadow-[2px_2px_0_#0F172A]">
                    🎂
                  </div>

                  <h4 className="font-['Bangers'] text-xl sm:text-2xl text-[#0F172A] tracking-wide mb-2">
                    NO BIRTHDAY WISH DETECTED YET!
                  </h4>

                  <p className="font-['Outfit'] font-medium text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mb-5">
                    Proceed to the flower bouquet, explore all 5 surprises, and blow out the Chapter 21 candles on the Birthday Cake to lock in your special wish!
                  </p>
                </div>
              )}

              <button
                onClick={() => {
                  playComicPopSound(400);
                  setShowWishModal(false);
                }}
                className="py-2.5 px-8 bg-[#FF4D6D] hover:bg-[#FF3366] active:translate-x-0.5 active:translate-y-0.5 text-white font-['Bangers'] text-sm sm:text-base tracking-wider rounded-xl border-2 border-[#0F172A] shadow-[2px_2px_0_#0F172A] cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
