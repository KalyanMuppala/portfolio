import { useEffect, useRef } from 'react';

// Blue → purple → red → orange → yellow, mapped around the halo and mirrored so it wraps smoothly.
const STOPS: [number, number, number][] = [
  [52, 110, 240],
  [124, 58, 190],
  [226, 50, 70],
  [247, 124, 30],
  [250, 194, 25],
];
const COLOR_BUCKETS = 32;
const ALPHA_TIERS = [0.35, 0.65, 0.95];
const SPACING = 30;
const RING_RADIUS = 250;
const RING_WIDTH = 150;

const palette = Array.from({ length: COLOR_BUCKETS }, (_, i) => {
  const t = (i / (COLOR_BUCKETS - 1)) * (STOPS.length - 1);
  const lo = Math.floor(t);
  const hi = Math.min(lo + 1, STOPS.length - 1);
  const f = t - lo;
  const [r, g, b] = STOPS[lo].map((c, k) => Math.round(c + (STOPS[hi][k] - c) * f));
  return `rgb(${r}, ${g}, ${b})`;
});

interface Particle {
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
}

// A quiet field of dots. Around a halo that trails the cursor, dots within a ring
// light up as colored dashes pointing away from the center, pushed outward on a spring.
const WaveBackground = ({ isDark }: { isDark: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDarkRef = useRef(isDark);
  isDarkRef.current = isDark;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    let haloX = 0;
    let haloY = 0;
    let mouseX: number | null = null;
    let mouseY: number | null = null;
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = [];
      for (let gy = -SPACING; gy < h + SPACING; gy += SPACING) {
        for (let gx = -SPACING; gx < w + SPACING; gx += SPACING) {
          const hx = gx + (Math.random() - 0.5) * SPACING * 0.8;
          const hy = gy + (Math.random() - 0.5) * SPACING * 0.8;
          particles.push({ hx, hy, x: hx, y: hy, vx: 0, vy: 0, phase: Math.random() * Math.PI * 2 });
        }
      }
      if (!haloX) {
        haloX = w * 0.5;
        haloY = h * 0.45;
      }
    };

    const draw = (time: number) => {
      const t = time / 1000;
      // Without a cursor (touch, or before the first move) the halo wanders on its own.
      const targetX = mouseX ?? w * 0.5 + Math.sin(t * 0.23) * w * 0.25;
      const targetY = mouseY ?? h * 0.45 + Math.cos(t * 0.31) * h * 0.2;
      haloX += (targetX - haloX) * 0.06;
      haloY += (targetY - haloY) * 0.06;

      const radius = RING_RADIUS + Math.sin(t * 1.2) * 25;
      const spin = t * 0.06;
      const dots = new Path2D();
      const dashes = Array.from({ length: COLOR_BUCKETS * ALPHA_TIERS.length }, () => new Path2D());

      for (const p of particles) {
        const dx = p.hx - haloX;
        const dy = p.hy - haloY;
        const dist = Math.hypot(dx, dy) || 1;
        const ux = dx / dist;
        const uy = dy / dist;
        const k = Math.exp(-(((dist - radius) / RING_WIDTH) ** 2));

        // Push ring particles outward, with a ripple running through them.
        const push = k * (18 + 8 * Math.sin(dist * 0.045 - t * 3 + p.phase));
        p.vx += (p.hx + ux * push - p.x) * 0.08;
        p.vy += (p.hy + uy * push - p.y) * 0.08;
        p.vx *= 0.8;
        p.vy *= 0.8;
        p.x += p.vx;
        p.y += p.vy;

        if (k < 0.08) {
          dots.moveTo(p.x, p.y);
          dots.lineTo(p.x + 0.01, p.y);
          continue;
        }

        const half = (1 + k * 6) / 2;
        const around = (Math.atan2(uy, ux) / (Math.PI * 2) + 0.5 + spin) % 1;
        const color = Math.round(Math.abs(around * 2 - 1) * (COLOR_BUCKETS - 1));
        const tier = k > 0.7 ? 2 : k > 0.35 ? 1 : 0;
        const path = dashes[color * ALPHA_TIERS.length + tier];
        path.moveTo(p.x - ux * half, p.y - uy * half);
        path.lineTo(p.x + ux * half, p.y + uy * half);
      }

      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = 'round';

      ctx.lineWidth = 1.6;
      ctx.globalAlpha = 1;
      ctx.strokeStyle = isDarkRef.current ? 'rgba(255, 255, 255, 0.22)' : 'rgba(0, 0, 0, 0.25)';
      ctx.stroke(dots);

      ctx.lineWidth = 2.4;
      dashes.forEach((path, i) => {
        ctx.globalAlpha = ALPHA_TIERS[i % ALPHA_TIERS.length];
        ctx.strokeStyle = palette[Math.floor(i / ALPHA_TIERS.length)];
        ctx.stroke(path);
      });
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onMouseLeave = () => {
      mouseX = null;
      mouseY = null;
    };
    const onResize = () => {
      resize();
      if (reduceMotion) draw(0);
    };

    resize();
    window.addEventListener('resize', onResize);
    if (reduceMotion) {
      // Settle the springs so the still frame shows the ring in place.
      for (let i = 0; i < 60; i++) draw(0);
    } else {
      window.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseleave', onMouseLeave);
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 -z-10 pointer-events-none transition-colors duration-1000 ${isDark ? 'bg-[#050505]' : 'bg-[#fafafa]'}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default WaveBackground;
