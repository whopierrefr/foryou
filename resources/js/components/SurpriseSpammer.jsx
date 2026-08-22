import React, { useState } from 'react';
import { playThwipSound, triggerSpiderConfetti } from '../utils/soundEffects';

export default function SurpriseSpammer() {
  const [count, setCount] = useState(0);

  const handleSpam = (e) => {
    playThwipSound();
    setCount((prev) => prev + 1);

    const rect = e.target.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerSpiderConfetti(x, y);
  };

  return (
    <div className="text-center my-6">
      <button onClick={handleSpam} className="thwip-btn-pastel w-full max-w-md text-sm sm:text-base py-3.5 justify-center">
        <span>🌸 TEMBAK JARING KEJUTAN (SPAM KLIK!) 🕸️✨</span>
      </button>
      <div className="mt-2.5 text-xs font-['Bangers'] text-[#FF3366] tracking-wider">
        Jaring Ditembakkan: {count} Kali 💖
      </div>
    </div>
  );
}
