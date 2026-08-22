import React, { useEffect, useRef } from 'react';

export default function PastelBackgroundAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Floating cute particles (stars, hearts, spiders, bubbles, sakura)
    const particleTypes = ['✨', '🌸', '💖', '⭐', '🕷️', '🕸️', '🎈', '☁️'];
    const particleColors = ['#FF758F', '#BAE6FD', '#FDE047', '#E9D5FF', '#FFB3C1', '#A7F3D0'];

    const count = window.innerWidth < 640 ? 24 : 45;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 16 + 14,
      speedY: Math.random() * 0.6 + 0.3,
      speedX: (Math.random() - 0.5) * 0.4,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      opacity: Math.random() * 0.6 + 0.3,
      sway: Math.random() * 2 + 1,
      swaySpeed: Math.random() * 0.02 + 0.01,
      angle: Math.random() * Math.PI * 2,
    }));

    // Soft floating pastel orbs / bubbles
    const bubbles = Array.from({ length: 6 }, (_, i) => ({
      x: (canvas.width / 6) * i + Math.random() * 50,
      y: Math.random() * canvas.height,
      radius: Math.random() * 80 + 90,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      color: [
        'rgba(255, 209, 220, 0.45)',
        'rgba(186, 230, 253, 0.45)',
        'rgba(233, 213, 255, 0.4)',
        'rgba(254, 240, 138, 0.35)',
        'rgba(167, 243, 208, 0.35)',
      ][i % 5],
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw smooth animated pastel gradient bubbles
      bubbles.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;

        if (b.x < -b.radius) b.x = canvas.width + b.radius;
        if (b.x > canvas.width + b.radius) b.x = -b.radius;
        if (b.y < -b.radius) b.y = canvas.height + b.radius;
        if (b.y > canvas.height + b.radius) b.y = -b.radius;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        grad.addColorStop(0, b.color);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw floating cute symbols and emojis
      particles.forEach((p) => {
        p.angle += p.swaySpeed;
        p.x += p.speedX + Math.sin(p.angle) * p.sway * 0.3;
        p.y -= p.speedY; // float upwards gently
        p.rotation += p.rotationSpeed;

        // Reset when moving off screen
        if (p.y < -30) {
          p.y = canvas.height + 30;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -30) p.x = canvas.width + 30;
        if (p.x > canvas.width + 30) p.x = -30;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        // Draw cute emoji or glowing circle
        ctx.font = `${p.size}px 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.type, 0, 0);

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[2]" />;
}
