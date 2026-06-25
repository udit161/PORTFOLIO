import { useRef, useEffect } from 'react';

export default function BlackholeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = window.innerWidth;
    let H = window.innerHeight;
    let animId;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);


    const bh = () => ({ x: W * 0.5, y: H * 0.5 });

    const NUM_STARS = 320;
    const stars = Array.from({ length: NUM_STARS }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.6 + 0.2,
      baseAlpha: Math.random() * 0.7 + 0.2,
      alpha: 0,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.012 + 0.004,
    }));


    const NUM_DISK = 800;
    const diskParticles = Array.from({ length: NUM_DISK }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const minR = 80, maxR = 340;
      const dist = minR + Math.pow(Math.random(), 1.4) * (maxR - minR);
      const speed = 0.004 + (1 - (dist - minR) / (maxR - minR)) * 0.022;
      return {
        angle,
        dist,
        speed: speed * (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.4 + 0.8),
        alpha: Math.random() * 0.85 + 0.15,
        r: Math.random() * 2.4 + 0.4,
        hue: Math.random() * 40,
        life: 1,
      };
    });


    const NUM_INFALL = 120;
    const makeFaller = () => {
      const angle = Math.random() * Math.PI * 2;
      const startDist = 280 + Math.random() * 200;
      return {
        angle,
        dist: startDist,
        startDist,
        speed: 0.006 + Math.random() * 0.01,
        shrink: 0.985 + Math.random() * 0.01,
        alpha: Math.random() * 0.6 + 0.3,
        r: Math.random() * 2 + 0.5,
        hue: Math.random() * 60,
      };
    };
    const fallers = Array.from({ length: NUM_INFALL }, makeFaller);



    let t = 0;

    const draw = () => {
      t += 0.016;
      const center = bh();
      ctx.fillStyle = 'rgba(2, 2, 6, 0.35)';
      ctx.fillRect(0, 0, W, H);


      for (const s of stars) {
        s.phase += s.speed;
        s.alpha = s.baseAlpha * (0.5 + 0.5 * Math.sin(s.phase));


        const dx = center.x - s.x;
        const dy = center.y - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const lensStrength = Math.max(0, 1 - dist / 600);
        const lx = s.x + dx * lensStrength * 0.06;
        const ly = s.y + dy * lensStrength * 0.06;

        ctx.beginPath();
        ctx.arc(lx, ly, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha * (1 - lensStrength * 0.9)})`;
        ctx.fill();
      }


      for (const p of diskParticles) {
        p.angle += p.speed;

        const px = center.x + Math.cos(p.angle) * p.dist;
        const py = center.y + Math.sin(p.angle) * p.dist * 0.32;

        const heat = 1 - (p.dist - 80) / 260;
        const r = Math.round(255);
        const g = Math.round(heat * 180 + p.hue * 1.5);
        const b = Math.round(heat * 60);
        const behindFactor = py > center.y ? 0.4 : 1.0;

        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha * behindFactor})`;
        ctx.fill();
      }


      for (const f of fallers) {
        f.angle += f.speed;
        f.dist *= f.shrink;

        const fx = center.x + Math.cos(f.angle) * f.dist;
        const fy = center.y + Math.sin(f.angle) * f.dist * 0.32;

        const lifeRatio = f.dist / f.startDist;

        if (lifeRatio < 0.18) {

          Object.assign(f, makeFaller());
        }

        const heat = 1 - lifeRatio;
        const fr = 255;
        const fg = Math.round(heat * 200 + 50);
        const fb = Math.round(heat * 100);

        ctx.beginPath();
        ctx.arc(fx, fy, f.r * lifeRatio + 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${fr},${fg},${fb},${f.alpha * lifeRatio})`;
        ctx.fill();
      }

      const photonR = 72;
      const photonGrad = ctx.createRadialGradient(
        center.x, center.y, photonR - 6,
        center.x, center.y, photonR + 14
      );
      photonGrad.addColorStop(0, 'rgba(255,180,60,0)');
      photonGrad.addColorStop(0.4, 'rgba(255,200,100,0.55)');
      photonGrad.addColorStop(0.65, 'rgba(255,120,20,0.28)');
      photonGrad.addColorStop(1, 'rgba(255,80,0,0)');
      ctx.beginPath();
      ctx.arc(center.x, center.y, photonR + 14, 0, Math.PI * 2);
      ctx.fillStyle = photonGrad;
      ctx.fill();


      const haloGrad = ctx.createRadialGradient(
        center.x, center.y, photonR,
        center.x, center.y, photonR + 180
      );
      haloGrad.addColorStop(0, 'rgba(180,80,0,0.18)');
      haloGrad.addColorStop(0.4, 'rgba(100,30,0,0.08)');
      haloGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(center.x, center.y, photonR + 180, 0, Math.PI * 2);
      ctx.fillStyle = haloGrad;
      ctx.fill();


      const ehGrad = ctx.createRadialGradient(
        center.x, center.y, 0,
        center.x, center.y, photonR
      );
      ehGrad.addColorStop(0, 'rgba(0,0,0,1)');
      ehGrad.addColorStop(0.75, 'rgba(0,0,0,1)');
      ehGrad.addColorStop(1, 'rgba(0,0,0,0.85)');
      ctx.beginPath();
      ctx.arc(center.x, center.y, photonR, 0, Math.PI * 2);
      ctx.fillStyle = ehGrad;
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  );
}
