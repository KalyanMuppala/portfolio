import { useEffect, useRef } from 'react';

// Blue → purple → red → orange → yellow, left to right across the screen.
const STOPS: [number, number, number][] = [
  [37, 71, 230],
  [124, 58, 190],
  [226, 50, 70],
  [247, 124, 30],
  [250, 194, 25],
];
const COLOR_BUCKETS = 32;
const SPACING = 34;

const palette = Array.from({ length: COLOR_BUCKETS }, (_, i) => {
  const t = (i / (COLOR_BUCKETS - 1)) * (STOPS.length - 1);
  const lo = Math.floor(t);
  const hi = Math.min(lo + 1, STOPS.length - 1);
  const f = t - lo;
  const [r, g, b] = STOPS[lo].map((c, k) => Math.round(c + (STOPS[hi][k] - c) * f));
  return `rgb(${r}, ${g}, ${b})`;
});

// A field of short dashes laid out on concentric rings. A ripple travels outward
// from the center, and the center drifts toward the cursor.
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
    let cx = 0;
    let cy = 0;
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
      if (!cx) {
        cx = w * 0.5;
        cy = h * 0.55;
      }
    };

    const draw = (time: number) => {
      const t = time / 1000;
      const homeX = w * 0.5 + Math.sin(t * 0.13) * w * 0.06;
      const homeY = h * 0.55 + Math.cos(t * 0.11) * h * 0.05;
      const targetX = mouseX === null ? homeX : homeX + (mouseX - homeX) * 0.35;
      const targetY = mouseY === null ? homeY : homeY + (mouseY - homeY) * 0.35;
      cx += (targetX - cx) * 0.04;
      cy += (targetY - cy) * 0.04;

      // Two alpha tiers per color, so dashes on the ripple crest read brighter.
      const paths = Array.from({ length: COLOR_BUCKETS * 2 }, () => new Path2D());
      const maxR = Math.hypot(Math.max(cx, w - cx), Math.max(cy, h - cy)) + SPACING;

      for (let r = SPACING * 0.6; r < maxR; r += SPACING) {
        const count = Math.max(8, Math.floor((2 * Math.PI * r) / SPACING));
        const rot = t * 0.04 + r * 0.0012;
        const wave = 0.5 + 0.5 * Math.sin(r * 0.016 - t * 1.4);
        const nearCenter = Math.min(1, r / 320);

        for (let i = 0; i < count; i++) {
          const a = (i / count) * Math.PI * 2 + rot;
          const cos = Math.cos(a);
          const sin = Math.sin(a);
          const x = cx + cos * r;
          const y = cy + sin * r;
          if (x < -12 || x > w + 12 || y < -12 || y > h + 12) continue;

          const s = wave * (0.65 + 0.35 * Math.sin(a * 3 + t * 0.8));
          const half = (0.3 + s * 6 * nearCenter) / 2;
          const color = Math.floor(Math.min(1, Math.max(0, x / w)) * (COLOR_BUCKETS - 1));
          const path = paths[color * 2 + (s > 0.45 ? 1 : 0)];
          path.moveTo(x - cos * half, y - sin * half);
          path.lineTo(x + cos * half, y + sin * half);
        }
      }

      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = 'round';
      ctx.lineWidth = 2.4;
      const [dim, bright] = isDarkRef.current ? [0.45, 0.95] : [0.5, 0.95];
      paths.forEach((path, i) => {
        ctx.globalAlpha = i % 2 ? bright : dim;
        ctx.strokeStyle = palette[i >> 1];
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
      draw(0);
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
