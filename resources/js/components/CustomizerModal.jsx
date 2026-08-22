import React, { useState } from 'react';
import { X, Save, Sliders } from 'lucide-react';
import { playThwipSound, triggerSpiderConfetti } from '../utils/soundEffects';

export default function CustomizerModal({
  isOpen,
  onClose,
  name,
  setName,
  tagline,
  setTagline,
  quote,
  setQuote,
}) {
  const [tempName, setTempName] = useState(name);
  const [tempTagline, setTempTagline] = useState(tagline);
  const [tempQuote, setTempQuote] = useState(quote);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setName(tempName || 'MY HERO!');
    setTagline(tempTagline || 'With Great Age, Comes Great Awesomeness!');
    setQuote(tempQuote || 'Selamat ulang tahun superhero terbaik!');

    localStorage.setItem('spidey_react_name', tempName);
    localStorage.setItem('spidey_react_tagline', tempTagline);
    localStorage.setItem('spidey_react_quote', tempQuote);

    playThwipSound();
    triggerSpiderConfetti(0.5, 0.5);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex justify-center items-center p-4">
      <div className="bg-white border-3 border-[#0F172A] rounded-2xl w-full max-w-md p-5 shadow-[6px_6px_0_#0F172A]">
        <div className="flex justify-between items-center pb-2.5 border-b-2 border-pink-100 mb-3.5">
          <h3 className="font-['Bangers'] text-lg text-[#FF3366] tracking-wider flex items-center gap-1.5">
            <Sliders size={18} />
            <span>SESUAIKAN KARTU UCAPAN ✨</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-black">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Nama yang Ulang Tahun:
            </label>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Contoh: Peter Parker / Sarah"
              className="w-full bg-pink-50/50 border-2 border-[#0F172A] rounded-xl px-3 py-1.5 text-sm text-[#0F172A] font-medium focus:outline-none focus:border-[#FF3366]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Tagline / Usia:
            </label>
            <input
              type="text"
              value={tempTagline}
              onChange={(e) => setTempTagline(e.target.value)}
              placeholder="Contoh: Turning 21 with Great Power!"
              className="w-full bg-pink-50/50 border-2 border-[#0F172A] rounded-xl px-3 py-1.5 text-sm text-[#0F172A] font-medium focus:outline-none focus:border-[#FF3366]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Ucapan Pendek Karakter (Balon Komik):
            </label>
            <input
              type="text"
              value={tempQuote}
              onChange={(e) => setTempQuote(e.target.value)}
              placeholder="Ucapan singkat..."
              className="w-full bg-pink-50/50 border-2 border-[#0F172A] rounded-xl px-3 py-1.5 text-sm text-[#0F172A] font-medium focus:outline-none focus:border-[#FF3366]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FEF08A] hover:bg-[#fde047] text-[#0F172A] font-['Bangers'] text-base tracking-wider py-2.5 rounded-xl border-2 border-[#0F172A] shadow-[3px_3px_0_#0F172A] flex items-center justify-center gap-1.5 transition-all mt-4 cursor-pointer active:translate-y-0.5"
          >
            <Save size={16} />
            <span>SIMPAN & PERBARUI ✨</span>
          </button>
        </form>
      </div>
    </div>
  );
}
