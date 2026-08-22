import React, { useState, useEffect } from 'react';
import { Heart, Send, MessageSquareHeart } from 'lucide-react';
import { playThwipSound, triggerSpiderConfetti } from '../utils/soundEffects';

export default function LiveGuestbook() {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [sticker, setSticker] = useState('🕷️');
  const [submitting, setSubmitting] = useState(false);

  const stickers = ['🕷️', '🕸️', '🌸', '💖', '⚡', '🎉', '🍕', '🌟'];

  const fetchWishes = async () => {
    try {
      const res = await fetch('/api/wishes');
      if (res.ok) {
        const data = await res.json();
        setWishes(data);
      }
    } catch (e) {
      console.error('Failed to load wishes:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) return;

    setSubmitting(true);
    playThwipSound();

    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken || '',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          sender_name: senderName.trim(),
          message: message.trim(),
          sticker,
        }),
      });

      if (res.ok) {
        const newWish = await res.json();
        setWishes([newWish, ...wishes]);
        setSenderName('');
        setMessage('');
        triggerSpiderConfetti(0.5, 0.5);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (id) => {
    playThwipSound();
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      const res = await fetch(`/api/wishes/${id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken || '',
          Accept: 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
        setWishes(
          wishes.map((w) => (w.id === id ? { ...w, likes: data.likes } : w))
        );
        triggerSpiderConfetti(0.5, 0.7);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="comic-panel-pastel pt-8">
      <div className="panel-header-tape-pastel">CHAPTER 3: LIVE HERO GUESTBOOK</div>

      <div className="mb-4 text-center">
        <h3 className="font-['Bangers'] text-lg sm:text-xl text-[#FF3366] tracking-wider flex items-center justify-center gap-1.5">
          <MessageSquareHeart size={20} className="text-[#FF3366]" />
          <span>KIRIM UCAPAN & DOA (DATABASE REALTIME) ✨</span>
        </h3>
        <p className="text-xs text-slate-600 font-medium">
          Tulis pesanmu untuk sang superhero, pesan otomatis tersimpan ke Laravel SQLite!
        </p>
      </div>

      {/* Submit Form */}
      <form onSubmit={handleSubmit} className="bg-pink-50/70 border-2 border-[#0F172A] rounded-2xl p-4 mb-5 shadow-[3px_3px_0_#0F172A]">
        <div className="mb-3">
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Nama / Panggilanmu:
          </label>
          <input
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Contoh: Ned Leeds / Sahabat Terbaik"
            className="w-full bg-white border-2 border-[#0F172A] rounded-xl px-3 py-1.5 text-sm text-[#0F172A] font-medium focus:outline-none focus:border-[#FF3366] focus:ring-2 focus:ring-pink-200"
            required
            maxLength={60}
          />
        </div>

        <div className="mb-3">
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Pesan & Doa Ulang Tahun:
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tuliskan ucapan terbaikmu..."
            rows={3}
            className="w-full bg-white border-2 border-[#0F172A] rounded-xl px-3 py-1.5 text-sm text-[#0F172A] font-medium focus:outline-none focus:border-[#FF3366] focus:ring-2 focus:ring-pink-200"
            required
            maxLength={500}
          />
        </div>

        {/* Sticker Picker */}
        <div className="mb-3.5">
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Pilih Icon Stiker:
          </label>
          <div className="flex gap-2 flex-wrap">
            {stickers.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setSticker(s)}
                className={`w-9 h-9 rounded-xl text-base flex items-center justify-center transition-all ${
                  sticker === s
                    ? 'bg-[#FF3366] border-2 border-[#0F172A] text-white scale-110 shadow-[2px_2px_0_#0F172A]'
                    : 'bg-white border-2 border-slate-300 hover:border-slate-600'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#FF3366] hover:bg-[#ff1e56] text-white font-['Bangers'] text-base tracking-wider py-2.5 rounded-xl border-2 border-[#0F172A] shadow-[3px_3px_0_#0F172A] flex items-center justify-center gap-2 transition-all active:translate-y-0.5 cursor-pointer"
        >
          <Send size={16} />
          <span>{submitting ? 'MENGIRIM JARING...' : 'KIRIM UCAPAN SPIDER-HERO 💖'}</span>
        </button>
      </form>

      {/* Wishes List Board */}
      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        {loading ? (
          <div className="text-center py-4 text-xs text-slate-500 font-medium">
            🌸 Memuat pesan-pesan dari database...
          </div>
        ) : wishes.length === 0 ? (
          <div className="text-center py-4 text-xs text-slate-500 font-medium">
            Belum ada ucapan. Jadilah pahlawan pertama yang kirim ucapan!
          </div>
        ) : (
          wishes.map((w) => (
            <div
              key={w.id}
              className="bg-white text-[#0F172A] border-2 border-[#0F172A] rounded-2xl p-3.5 shadow-[3px_3px_0_#0F172A] relative transform transition-all hover:scale-[1.01]"
            >
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl">{w.sticker || '🕷️'}</span>
                  <strong className="font-['Outfit'] font-bold text-sm text-[#0F172A]">
                    {w.sender_name}
                  </strong>
                </div>
                <button
                  onClick={() => handleLike(w.id)}
                  className="flex items-center gap-1 text-xs text-rose-600 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-full border border-rose-300 font-bold active:scale-95 transition-all cursor-pointer"
                  title="Sukai Ucapan Ini"
                >
                  <Heart size={13} className="fill-rose-500 text-rose-500" />
                  <span>{w.likes || 0}</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-['Outfit'] pl-1">
                {w.message}
              </p>
              <div className="text-[10px] text-slate-400 text-right mt-1.5">
                {new Date(w.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
