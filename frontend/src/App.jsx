import { useRef, useEffect } from 'react';
import userPic from './assets/user_pic.jpg';
import topoPattern from './assets/topo_pattern.png';
import BioBlock from './components/BioBlock';
import BioButtons from './components/BioButtons';
import BlackholeBackground from './components/BlackholeBackground';
import './App.css';



export default function App() {
  const canvasRef = useRef(null);
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const holesRef = useRef([]);
  const isOverPhotoRef = useRef(false);
  const topoImgRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0); // Reset scroll to top on mount
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const card = cardRef.current;
    if (!canvas || !card) return;

    const ctx = canvas.getContext('2d');

    // Load topographic pattern image
    const img = new Image();
    img.src = topoPattern;
    img.onload = () => {
      topoImgRef.current = img;
    };

    let logicalW = 0;
    let logicalH = 0;

    const resizeCanvas = () => {
      const rect = card.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      logicalW = rect.width;
      logicalH = rect.height;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(card);

    const colors = ['#ffffff', '#f1f5f9', '#cbd5e1', '#94a3b8', '#64748b', '#475569', '#334155', '#1e293b', '#000000'];

    const createParticleAndHole = (x, y) => {
      // 1. Spawning flying debris particles
      const count = Math.floor(Math.random() * 3) + 3;
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6 - 2,
          size: Math.floor(Math.random() * 8) + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1.0,
          decay: Math.random() * 0.02 + 0.015,
          gravity: 0.15,
        });
      }

      // 2. Spawning destruction hole in background
      holesRef.current.push({
        x: x,
        y: y,
        radius: 8,
        maxRadius: 28 + Math.random() * 12,
        alpha: 1.0,
        decay: 0.008 + Math.random() * 0.006 // slow healing to reveal background
      });
    };

    const drawCardBackground = (ctx, w, h) => {
      ctx.save();

      // Rounded Card shape clipping path
      ctx.beginPath();
      ctx.roundRect(0, 0, w, h, 24);
      ctx.clip();

      if (topoImgRef.current) {
        const img = topoImgRef.current;
        const imgRatio = img.width / img.height;
        const canvasRatio = w / h;
        let drawW = w;
        let drawH = h;
        let drawX = 0;
        let drawY = 0;

        if (canvasRatio > imgRatio) {
          drawH = w / imgRatio;
          drawY = (h - drawH) / 2;
        } else {
          drawW = h * imgRatio;
          drawX = (w - drawW) / 2;
        }

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
      } else {
        ctx.fillStyle = '#000000';
        ctx.fill();
      }

      ctx.restore();

      // Draw grid dot pattern
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      const spacing = 24;
      for (let dotX = 12; dotX < w; dotX += spacing) {
        for (let dotY = 12; dotY < h; dotY += spacing) {
          ctx.beginPath();
          ctx.arc(dotX, dotY, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // Border stroke
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(0, 0, w, h, 24);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    };

    let animationFrame;
    const draw = () => {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // 1. Draw solid gradient background and grid pattern at logical bounds
      drawCardBackground(ctx, logicalW, logicalH);

      // 2. Apply Composite Operation for transparent holes
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      const holes = holesRef.current;
      for (let i = holes.length - 1; i >= 0; i--) {
        const h = holes[i];
        h.radius += (h.maxRadius - h.radius) * 0.05;
        h.alpha -= h.decay;

        if (h.alpha <= 0) {
          holes.splice(i, 1);
          continue;
        }

        const radGrad = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, h.radius);
        radGrad.addColorStop(0, `rgba(0, 0, 0, ${h.alpha})`);
        radGrad.addColorStop(0.7, `rgba(0, 0, 0, ${h.alpha * 0.5})`);
        radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.fillStyle = radGrad;
        ctx.arc(h.x, h.y, h.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 3. Draw flying debris on top of the holes
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        ctx.restore();
      }
      ctx.restore();

      animationFrame = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      if (isOverPhotoRef.current) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createParticleAndHole(x, y);
    };

    card.addEventListener('mousemove', handleMouseMove);
    animationFrame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      resizeObserver.disconnect();
      card.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="wix-portfolio-root">

      {/* Black Hole Background Simulation */}
      <BlackholeBackground />

      <div className="wix-portfolio-container">

        {/* Left Column: Lavender Card Block */}
        <div className="profile-block">
          <div className="lavender-card" ref={cardRef}>
            <canvas ref={canvasRef} className="card-destruction-canvas" />
            <div className="lavender-card-accent" />
            <h1 className="hello-title">Hi, </h1>

            <div
              className="photo-container-wrapper"
              onMouseEnter={() => { isOverPhotoRef.current = true; }}
              onMouseLeave={() => { isOverPhotoRef.current = false; }}
            >
              <div className="photo-container">
                <img src={userPic} alt="Udit Kumar" className="photo-img" />

                {/* Social media grid overlapping the image */}
                <div className="social-badge-grid">
                  <a href="https://github.com/udit161" target="_blank" rel="noreferrer" title="GitHub" className="social-badge-item">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                      <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/udit-kumar-9aa031376" target="_blank" rel="noreferrer" title="LinkedIn" className="social-badge-item">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a href="mailto:udit56579@email.com" title="Email" className="social-badge-item">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </a>
                  <a href="https://x.com" target="_blank" rel="noreferrer" title="X" className="social-badge-item">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768 M20 20l-6.768 -6.768"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>


            <div className="name-title-container">
              <h2 className="profile-name">Udit Kumar</h2>
              <p className="profile-title">MERN Stack Developer &amp; AI & Machine Learning Enthusiast | React • Node.js • Python | Building Data-Driven Web Applications</p>
            </div>
          </div>
        </div>

        {/* Right Column: Bio / Intro Block */}
        <BioBlock>
          <BioButtons />
        </BioBlock>

      </div>

      {/* Footer */}
      <footer className="portfolio-footer">
        <div className="footer-col col-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#accessibility">Accessibility Statement</a>
        </div>

        <div className="footer-col col-contact">
          <p className="footer-label">Email</p>
          <a href="mailto:udit56579@email.com" className="footer-val">udit56579@email.com</a>
          <p className="footer-label" style={{ marginTop: '16px' }}>Phone</p>
          <p className="footer-val">123-456-7890</p>
        </div>

        <div className="footer-col col-social">
          <p className="footer-label">Follow Me</p>
          <div className="footer-social-links">
            <a href="https://github.com/udit161" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/udit-kumar-9aa031376" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
            <a href="udit56579@email.com">Email</a>
          </div>
        </div>

        <div className="footer-col col-copy">
          <p className="copyright-text">
            &copy; 2026 by Udit Kumar.<br />
            Powered and secured by Udit.
          </p>
        </div>
      </footer>
    </div>
  );
}
