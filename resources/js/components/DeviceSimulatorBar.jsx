import React from 'react';
import { Smartphone, Tablet, Monitor } from 'lucide-react';
import { playComicPopSound } from '../utils/soundEffects';

export default function DeviceSimulatorBar({ deviceMode, setDeviceMode }) {
  const handleSelect = (mode) => {
    playComicPopSound(500);
    setDeviceMode(mode);
  };

  return (
    <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50 bg-[#0F172A]/90 text-white py-1.5 px-3 sm:px-4 rounded-full border-2 border-[#FEF08A] shadow-[0_4px_16px_rgba(0,0,0,0.5),2px_2px_0_#0F172A] flex items-center gap-2 sm:gap-3 backdrop-blur-md">
      <span className="font-['Bangers'] text-xs sm:text-sm tracking-wider text-[#FEF08A] hidden xs:inline">
        🖥️ SIMULATOR:
      </span>
      
      <div className="flex items-center gap-1.5">
        {/* Mobile Button */}
        <button
          onClick={() => handleSelect('mobile')}
          className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold font-['Outfit'] transition-all cursor-pointer ${
            deviceMode === 'mobile'
              ? 'bg-[#FF3366] text-white shadow-[0_0_10px_#FF3366]'
              : 'bg-white/10 text-slate-300 hover:bg-white/20'
          }`}
          title="Tampilan Layar HP (Smartphone 390px)"
        >
          <Smartphone size={13} />
          <span>Mobile (HP)</span>
        </button>

        {/* iPad Button */}
        <button
          onClick={() => handleSelect('ipad')}
          className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold font-['Outfit'] transition-all cursor-pointer ${
            deviceMode === 'ipad'
              ? 'bg-[#38BDF8] text-[#0F172A] shadow-[0_0_10px_#38BDF8]'
              : 'bg-white/10 text-slate-300 hover:bg-white/20'
          }`}
          title="Tampilan iPad / Tablet (768px)"
        >
          <Tablet size={13} />
          <span>iPad</span>
        </button>

        {/* Full Desktop Button */}
        <button
          onClick={() => handleSelect('full')}
          className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold font-['Outfit'] transition-all cursor-pointer ${
            deviceMode === 'full'
              ? 'bg-[#FEF08A] text-[#0F172A] shadow-[0_0_10px_#FEF08A]'
              : 'bg-white/10 text-slate-300 hover:bg-white/20'
          }`}
          title="Tampilan Layar Penuh"
        >
          <Monitor size={13} />
          <span>Penuh</span>
        </button>
      </div>
    </div>
  );
}
