import React, { useState, useEffect } from 'react';
import { triggerSpiderConfetti, playComicPopSound, playFlowerBloomChimes } from '../utils/soundEffects';

export default function BirthdayCake21({ heroName = 'Maxi' }) {
  const [litCandles, setLitCandles] = useState({ two: true, one: true });
  const [wishText, setWishText] = useState('');
  const [submittedWish, setSubmittedWish] = useState('');
  const [isWishSubmitted, setIsWishSubmitted] = useState(false);

  // Multi-step note state
  const [noteStep, setNoteStep] = useState(1); // 1 = Birthday Note, 2 = Photo Apology & Promise Note, 3 = Grand Finale
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const messageStep1 = "Hey Maxi, it's Kai! Just wanted to drop by and wish you a super Happy 21st Birthday! Look at you officially leveling up to 21, absolutely legendary. I really hope you get the absolute best out of life, eat way too much good food, and never stop being your awesome self. Cheers to chapter 21!";
  
  const messageStep2 = "Also... quick apology for using your photos in here haha! I know it might seem a little random (honestly if I were you, I would've been creeped out too lmao). So yeah, please don't take it in a weird way! I really just wanted to fulfill my promise properly and make something memorable for your birthday. I genuinely hope you liked it! 😄";

  useEffect(() => {
    // Clear any previous persistent storage so refreshing always starts fresh!
    try {
      localStorage.removeItem('maxi_21st_birthday_wish');
    } catch (e) {}
  }, []);

  // Typewriter effect for Note Step 1 and Step 2
  useEffect(() => {
    if (isWishSubmitted && noteStep <= 2) {
      setDisplayedText('');
      setIsTypingComplete(false);
      
      const targetMessage = noteStep === 1 ? messageStep1 : messageStep2;
      let index = 0;
      const timer = setInterval(() => {
        if (index < targetMessage.length) {
          setDisplayedText(targetMessage.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
          setIsTypingComplete(true);
        }
      }, 20);

      return () => clearInterval(timer);
    }
  }, [isWishSubmitted, noteStep]);

  const toggleCandle = (candleKey, e) => {
    playComicPopSound(600);
    setLitCandles((prev) => {
      const updated = { ...prev, [candleKey]: !prev[candleKey] };
      if (!updated.two && !updated.one) {
        handleAllBlown(e);
      }
      return updated;
    });
  };

  const blowAll = (e) => {
    playComicPopSound(700);
    setLitCandles({ two: false, one: false });
    handleAllBlown(e);
  };

  const relight = () => {
    playComicPopSound(450);
    setLitCandles({ two: true, one: true });
  };

  const handleAllBlown = (e) => {
    playFlowerBloomChimes();
    if (e && e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      triggerSpiderConfetti(
        (rect.left + rect.width / 2) / window.innerWidth,
        (rect.top + rect.height / 2) / window.innerHeight
      );
    } else {
      triggerSpiderConfetti(0.5, 0.5);
    }
  };

  const handleSendWish = (e) => {
    e.preventDefault();
    if (!wishText.trim()) return;
    playComicPopSound(800);
    triggerSpiderConfetti(0.5, 0.4);
    const cleaned = wishText.trim();
    setSubmittedWish(cleaned);
    setIsWishSubmitted(true);
    setNoteStep(1);
    try {
      localStorage.setItem('user_birthday_wish', cleaned);
      window.dispatchEvent(new Event('wish_saved'));
    } catch (err) {}
  };

  const handleNextNote = () => {
    playComicPopSound(900);
    triggerSpiderConfetti(0.5, 0.5);
    setNoteStep(2);
  };

  const handleFinish = () => {
    playComicPopSound(1000);
    triggerSpiderConfetti(0.5, 0.4);
    triggerSpiderConfetti(0.3, 0.6);
    triggerSpiderConfetti(0.7, 0.6);
    setNoteStep(3);
  };

  const allOut = !litCandles.two && !litCandles.one;

  return (
    <div className="w-full flex flex-col items-center justify-center text-center px-2 sm:px-4 py-2 sm:py-4">
      
      {!isWishSubmitted ? (
        /* ================= STATE A: CAKE & WISH INPUT ================= */
        <>
          {/* 1. Header Chapter Badge */}
          <div className="inline-block bg-[#FEF08A] text-[#0F172A] px-4 py-1 rounded-full border-2 border-[#0F172A] shadow-[2px_2px_0_#0F172A] mb-2 -rotate-1">
            <span className="font-['Bangers'] text-xs sm:text-sm tracking-wider uppercase">
              CHAPTER 21 • THE BIRTHDAY CAKE
            </span>
          </div>

          {/* 2. Instruction Subtitle */}
          <p className="font-['Outfit'] font-semibold text-xs sm:text-sm text-slate-700 max-w-sm mb-3">
            {allOut
              ? 'Candles blown! Write your 21st birthday wish below.'
              : 'Tap the candles to blow them out, or click the button below.'}
          </p>

          {/* 3. Illustrated Vector Birthday Cake with Interactive 21 Candles */}
          <div className="relative w-full max-w-[300px] sm:max-w-[340px] flex flex-col items-center select-none my-1">
            <svg
              viewBox="0 0 320 280"
              className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
            >
              {/* Plate Pedestal Stand Base */}
              <path
                d="M 125 235 L 112 262 Q 160 272 208 262 L 195 235 Z"
                fill="#E2E8F0"
                stroke="#0F172A"
                strokeWidth="3"
              />
              <ellipse cx="160" cy="262" rx="48" ry="8" fill="#CBD5E1" stroke="#0F172A" strokeWidth="2.5" />

              {/* Plate Dish Rim */}
              <ellipse cx="160" cy="235" rx="146" ry="18" fill="#F8FAFC" stroke="#0F172A" strokeWidth="3" />
              <ellipse cx="160" cy="233" rx="138" ry="14" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />

              {/* Bottom Cake Layer */}
              <path
                d="M 38 170 Q 160 188 282 170 L 282 232 Q 160 250 38 232 Z"
                fill="#FFCCD5"
                stroke="#0F172A"
                strokeWidth="3"
              />
              <ellipse cx="160" cy="170" rx="122" ry="18" fill="#FFE4E6" stroke="#0F172A" strokeWidth="3" />
              <text
                x="160"
                y="210"
                textAnchor="middle"
                fontFamily="Bangers"
                fontSize="14"
                fill="#0F172A"
                letterSpacing="1.5"
              >
                HAPPY 21ST BIRTHDAY
              </text>

              {/* Middle Cake Layer */}
              <path
                d="M 68 115 Q 160 130 252 115 L 252 165 Q 160 180 68 165 Z"
                fill="#FEF08A"
                stroke="#0F172A"
                strokeWidth="3"
              />
              <ellipse cx="160" cy="115" rx="92" ry="15" fill="#FEF9C3" stroke="#0F172A" strokeWidth="3" />
              <rect x="95" y="132" width="130" height="20" rx="10" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
              <text
                x="160"
                y="146"
                textAnchor="middle"
                fontFamily="Bangers"
                fontSize="11"
                fill="#0F172A"
                letterSpacing="1"
              >
                MAXI'S CHAPTER 21
              </text>

              {/* Top Cake Layer */}
              <path
                d="M 98 70 Q 160 82 222 70 L 222 110 Q 160 122 98 110 Z"
                fill="#FF758F"
                stroke="#0F172A"
                strokeWidth="3"
              />
              <ellipse cx="160" cy="70" rx="62" ry="12" fill="#FFA8BA" stroke="#0F172A" strokeWidth="3" />

              {/* Top Frosting Drips */}
              <path
                d="M 98 70 Q 108 88 118 74 Q 128 92 138 74 Q 148 94 158 75 Q 168 94 178 75 Q 188 92 198 74 Q 208 88 222 70"
                fill="#FFFFFF"
                stroke="#0F172A"
                strokeWidth="2.5"
              />
              <circle cx="118" cy="65" r="4.5" fill="#E11D48" stroke="#0F172A" strokeWidth="1.5" />
              <circle cx="202" cy="65" r="4.5" fill="#E11D48" stroke="#0F172A" strokeWidth="1.5" />

              {/* Candle 2 */}
              <line x1="135" y1="46" x2="135" y2="38" stroke="#0F172A" strokeWidth="2" />
              <rect
                x="118"
                y="46"
                width="34"
                height="36"
                rx="8"
                fill="#FF4D6D"
                stroke="#0F172A"
                strokeWidth="2.5"
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={(e) => toggleCandle('two', e)}
              />
              <text x="135" y="72" textAnchor="middle" fontFamily="Bangers" fontSize="24" fill="#FFFFFF" className="pointer-events-none">
                2
              </text>
              {litCandles.two ? (
                <g className="cursor-pointer" onClick={(e) => toggleCandle('two', e)}>
                  <ellipse cx="135" cy="24" rx="8" ry="14" fill="#F59E0B" opacity="0.4" />
                  <path d="M 135 12 C 144 22 143 32 135 38 C 127 32 126 22 135 12 Z" fill="#F97316" />
                  <path d="M 135 18 C 140 25 139 32 135 36 C 131 32 130 25 135 18 Z" fill="#FEF08A" />
                </g>
              ) : (
                <text x="135" y="30" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#94A3B8" fontWeight="bold">
                  puff
                </text>
              )}

              {/* Candle 1 */}
              <line x1="185" y1="46" x2="185" y2="38" stroke="#0F172A" strokeWidth="2" />
              <rect
                x="168"
                y="46"
                width="34"
                height="36"
                rx="8"
                fill="#38BDF8"
                stroke="#0F172A"
                strokeWidth="2.5"
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={(e) => toggleCandle('one', e)}
              />
              <text x="185" y="72" textAnchor="middle" fontFamily="Bangers" fontSize="24" fill="#FFFFFF" className="pointer-events-none">
                1
              </text>
              {litCandles.one ? (
                <g className="cursor-pointer" onClick={(e) => toggleCandle('one', e)}>
                  <ellipse cx="185" cy="24" rx="8" ry="14" fill="#F59E0B" opacity="0.4" />
                  <path d="M 185 12 C 194 22 193 32 185 38 C 177 32 176 22 185 12 Z" fill="#F97316" />
                  <path d="M 185 18 C 190 25 189 32 185 36 C 181 32 180 25 185 18 Z" fill="#FEF08A" />
                </g>
              ) : (
                <text x="185" y="30" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#94A3B8" fontWeight="bold">
                  puff
                </text>
              )}
            </svg>
          </div>

          {/* Candle Action Button */}
          <div className="mt-2 w-full max-w-[280px]">
            {!allOut ? (
              <button
                onClick={blowAll}
                className="w-full py-2.5 px-6 bg-[#FF4D6D] hover:bg-[#FF3366] active:translate-x-0.5 active:translate-y-0.5 text-white font-['Bangers'] text-sm sm:text-base tracking-wider rounded-full border-3 border-[#0F172A] shadow-[3px_3px_0_#0F172A] transition-all cursor-pointer"
              >
                BLOW OUT CANDLES 21
              </button>
            ) : (
              <button
                onClick={relight}
                className="w-full py-1.5 px-4 bg-white hover:bg-slate-50 active:translate-x-0.5 active:translate-y-0.5 text-[#0F172A] font-['Bangers'] text-xs tracking-wider rounded-full border-2 border-[#0F172A] shadow-[2px_2px_0_#0F172A] transition-all cursor-pointer mb-2"
              >
                RELIGHT CANDLES
              </button>
            )}
          </div>

          {/* Wish Input Form (Active when candles are blown) */}
          {allOut && (
            <div className="mt-3 w-full max-w-md bg-white text-[#0F172A] p-4 rounded-2xl border-3 border-[#0F172A] shadow-[4px_4px_0_#0F172A] text-left animate-comic-pop">
              <div className="flex items-center justify-between border-b-2 border-pink-100 pb-2 mb-2.5">
                <span className="font-['Bangers'] text-sm sm:text-base text-[#FF4D6D] tracking-wide">
                  MAKE YOUR 21ST BIRTHDAY WISH
                </span>
                <span className="text-[10px] font-bold text-slate-400 font-['Outfit']">
                  CHAPTER 21
                </span>
              </div>

              <form onSubmit={handleSendWish} className="flex flex-col gap-2.5">
                <textarea
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  placeholder="Write your 21st birthday wish here..."
                  rows={3}
                  required
                  className="w-full bg-[#FFF1F2] text-[#0F172A] p-3 rounded-xl border-2 border-[#0F172A] font-['Outfit'] font-medium text-xs sm:text-sm resize-none focus:outline-none focus:bg-white focus:border-[#FF4D6D] shadow-inner placeholder:text-slate-400"
                />

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#FF4D6D] hover:bg-[#FF3366] active:translate-x-0.5 active:translate-y-0.5 text-white font-['Bangers'] text-sm tracking-wider rounded-xl border-2 border-[#0F172A] shadow-[2px_2px_0_#0F172A] transition-all cursor-pointer text-center"
                >
                  SEAL & SEND YOUR WISH
                </button>
              </form>
            </div>
          )}
        </>
      ) : noteStep === 1 ? (
        /* ================= STATE B (STEP 1): KAI'S BIRTHDAY WISH WITH TYPEWRITER ================= */
        <div className="w-full max-w-3xl flex flex-col items-center animate-comic-pop py-2 sm:py-4 px-2 sm:px-4">
          
          {/* Header Chapter Badge */}
          <div className="inline-block bg-[#FEF08A] text-[#0F172A] px-5 py-1.5 rounded-full border-2.5 border-[#0F172A] shadow-[2px_2px_0_#0F172A] mb-4 -rotate-1">
            <span className="font-['Bangers'] text-sm sm:text-base tracking-wider uppercase">
              CHAPTER 21 • A SPECIAL MESSAGE FROM KAI
            </span>
          </div>

          {/* Kai's Grand Prominent Message Card */}
          <div className="w-full bg-white border-3.5 border-[#0F172A] rounded-3xl p-6 sm:p-8 md:p-10 shadow-[6px_6px_0_#0F172A,0_20px_40px_rgba(0,0,0,0.15)] flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start text-left">
            
            {/* Left: Kai Avatar */}
            <div className="flex flex-col items-center shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-amber-50 border-3.5 border-[#0F172A] overflow-hidden p-2.5 shadow-[4px_4px_0_#0F172A] hover:rotate-2 transition-transform duration-300">
                <img
                  src="/images/kai-wish.png"
                  alt="Kai"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="mt-2 font-['Bangers'] text-lg sm:text-xl text-[#0F172A] tracking-wider">
                KAI
              </span>
            </div>

            {/* Right: Message Content with Real-time Typing Effect */}
            <div className="flex-1 flex flex-col justify-center min-h-[160px]">
              <div className="font-['Bangers'] text-xl sm:text-2xl md:text-3xl text-[#FF4D6D] tracking-wide mb-3">
                HAPPY 21ST BIRTHDAY, MAXI!
              </div>
              
              <p className="font-['Outfit'] font-semibold text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed min-h-[100px]">
                {displayedText}
                {!isTypingComplete && (
                  <span className="inline-block w-2 h-4 sm:h-5 bg-[#FF4D6D] ml-1 animate-ping align-middle" />
                )}
              </p>

              {/* NEXT Button - Revealed smoothly once typing finishes */}
              {isTypingComplete && (
                <div className="mt-6 flex justify-end animate-comic-pop">
                  <button
                    onClick={handleNextNote}
                    className="py-2.5 px-8 bg-[#FEF08A] hover:bg-[#FDE047] active:translate-x-0.5 active:translate-y-0.5 text-[#0F172A] font-['Bangers'] text-base sm:text-lg tracking-wider rounded-2xl border-3 border-[#0F172A] shadow-[3px_3px_0_#0F172A] flex items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105"
                  >
                    <span>NEXT</span>
                    <span className="text-xl">➔</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      ) : noteStep === 2 ? (
        /* ================= STATE B (STEP 2): KAI'S PHOTO APOLOGY & PROMISE NOTE ================= */
        <div className="w-full max-w-3xl flex flex-col items-center animate-comic-pop py-2 sm:py-4 px-2 sm:px-4">
          
          {/* Header Chapter Badge */}
          <div className="inline-block bg-[#FFD166] text-[#0F172A] px-5 py-1.5 rounded-full border-2.5 border-[#0F172A] shadow-[2px_2px_0_#0F172A] mb-4 -rotate-1">
            <span className="font-['Bangers'] text-sm sm:text-base tracking-wider uppercase">
              CHAPTER 21 • ONE LAST THING FROM KAI
            </span>
          </div>

          {/* Kai's Second Message Card */}
          <div className="w-full bg-white border-3.5 border-[#0F172A] rounded-3xl p-6 sm:p-8 md:p-10 shadow-[6px_6px_0_#0F172A,0_20px_40px_rgba(0,0,0,0.15)] flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start text-left">
            
            {/* Left: Kai Avatar */}
            <div className="flex flex-col items-center shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-sky-50 border-3.5 border-[#0F172A] overflow-hidden p-2.5 shadow-[4px_4px_0_#0F172A] hover:-rotate-2 transition-transform duration-300">
                <img
                  src="/images/kai-apology.png"
                  alt="Kai"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="mt-2 font-['Bangers'] text-lg sm:text-xl text-[#0F172A] tracking-wider">
                KAI
              </span>
            </div>

            {/* Right: Message Content with Real-time Typing Effect */}
            <div className="flex-1 flex flex-col justify-center min-h-[160px]">
              <div className="font-['Bangers'] text-xl sm:text-2xl md:text-3xl text-[#06D6A0] tracking-wide mb-3">
                ONE QUICK THING... 😅
              </div>
              
              <p className="font-['Outfit'] font-semibold text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed min-h-[100px]">
                {displayedText}
                {!isTypingComplete && (
                  <span className="inline-block w-2 h-4 sm:h-5 bg-[#06D6A0] ml-1 animate-ping align-middle" />
                )}
              </p>

              {/* FINISH Button - Revealed smoothly once typing finishes */}
              {isTypingComplete && (
                <div className="mt-6 flex justify-end animate-comic-pop">
                  <button
                    onClick={handleFinish}
                    className="py-2.5 px-8 bg-[#FF4D6D] hover:bg-[#FF3366] active:translate-x-0.5 active:translate-y-0.5 text-white font-['Bangers'] text-base sm:text-lg tracking-wider rounded-2xl border-3 border-[#0F172A] shadow-[3px_3px_0_#0F172A] flex items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105"
                  >
                    <span>CELEBRATE CHAPTER 21!</span>
                    <span className="text-xl">✨</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      ) : (
        /* ================= STATE C: FINAL CELEBRATION (MINIONS MEME ONLY) ================= */
        <div className="w-full max-w-md flex flex-col items-center justify-center animate-comic-pop py-2 sm:py-4 px-2">
          <div className="w-full bg-white border-3.5 border-[#0F172A] rounded-3xl p-3 sm:p-4 shadow-[6px_6px_0_#0F172A,0_20px_40px_rgba(0,0,0,0.15)] flex flex-col items-center overflow-hidden">
            <img
              src="/images/celebrate-minions.jpg"
              alt="Chapter 21 Celebration"
              className="w-full h-auto max-h-[65vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}

    </div>
  );
}
