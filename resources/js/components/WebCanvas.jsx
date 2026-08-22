import React, { useEffect, useRef } from 'react';

export default function WebCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let webs = [];
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const spawnWeb = (x, y) => {
      webs.push({
        x,
        y,
        radius: 10,
        maxRadius: Math.random() * 35 + 35,
        alpha: 1,
        spokes: 8,
        rings: 3,
      });
    };

    const handleClick = (e) => {
      if (
        e.target.tagName !== 'INPUT' &&
        e.target.tagName !== 'TEXTAREA' &&
        e.target.tagName !== 'BUTTON' &&
        !e.target.closest('button')
      ) {
        spawnWeb(e.clientX, e.clientY);
      }
    };
    window.addEventListener('click', handleClick);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = webs.length - 1; i >= 0; i--) {
        const web = webs[i];
        ctx.save();
        ctx.strokeStyle = `rgba(255, 255, 255, ${web.alpha * 0.75})`;
        ctx.lineWidth = 1.2;

        // Draw Spokes
        for (let s = 0; s < web.spokes; s++) {
          const angle = (s * Math.PI * 2) / web.spokes;
          const endX = web.x + Math.cos(angle) * web.radius;
          const endY = web.y + Math.sin(angle) * web.radius;
          ctx.beginPath();
          ctx.moveTo(web.x, web.y);
          ctx.lineTo(endX, endY);
          ctx.stroke();
        }

        // Draw Rings
        for (let r = 1; r <= web.rings; r++) {
          const ringRadius = (web.radius / web.rings) * r;
          ctx.beginPath();
          for (let s = 0; s <= web.spokes; s++) {
            const angle = (s * Math.PI * 2) / web.spokes;
            const rx = web.x + Math.cos(angle) * ringRadius;
            const ry = web.y + Math.sin(angle) * ringRadius;
            if (s === 0) ctx.moveTo(rx, ry);
            else ctx.lineTo(rx, ry);
          }
          ctx.stroke();
        }

        ctx.restore();

        if (web.radius < web.maxRadius) {
          web.radius += (web.maxRadius - web.radius) * 0.2 + 1;
        } else {
          web.alpha -= 0.03;
        }

        if (web.alpha <= 0) {
          webs.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-40" />;
}
