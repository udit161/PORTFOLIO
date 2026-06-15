import { useState, useEffect, useRef } from 'react';
import DraggableBrush from './components/DraggableBrush';
import userPic from './assets/user_pic.jpg';
import './App.css';

// Pre-generate static stars for performance
const STARS = Array.from({ length: 80 }).map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: Math.random() * 2 + 1,
  delay: `${Math.random() * 8}s`,
  duration: `${Math.random() * 4 + 3}s`,
}));

export default function App() {
  const [particles, setParticles] = useState([]);
  const particlesRef = useRef([]);

  // Handle spawning particles at the brush tip
  const handleBrushMove = (x, y) => {
    // Spawn 3 particles per move event for a rich trail
    const newParticles = Array.from({ length: 3 }).map(() => {
      // Golden/Orange meteorite hues (HSL Hue between 15 and 45)
      const hue = Math.floor(Math.random() * 35) + 15;
      const size = Math.random() * 8 + 4; // 4px to 12px
      
      return {
        id: Math.random() + Date.now(),
        x,
        y,
        size,
        color: `hsl(${hue}, 100%, 60%)`,
        opacity: 1,
        // Small random explosion/drift vector
        vx: (Math.random() - 0.5) * 2.5,
        vy: Math.random() * 2.5 + 0.5, // Drift downward
        life: 1, // 100% life
      };
    });

    particlesRef.current = [...particlesRef.current, ...newParticles];
  };

  // High performance particle animation loop
  useEffect(() => {
    let animationFrameId;

    const updateParticles = () => {
      // Age and move particles
      particlesRef.current = particlesRef.current
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          opacity: p.opacity - 0.022, // Fades out in ~45 frames
        }))
        .filter((p) => p.opacity > 0); // Remove dead particles

      setParticles([...particlesRef.current]);
      animationFrameId = requestAnimationFrame(updateParticles);
    };

    animationFrameId = requestAnimationFrame(updateParticles);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="meteorite-app-root">
      
      {/* 1. Twinkling Stars Background */}
      <div className="stars-container">
        {STARS.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>

      {/* 2. Automated Shooting Stars / Meteorites */}
      <div className="shooting-stars-container">
        <div className="meteorite met-1" />
        <div className="meteorite met-2" />
        <div className="meteorite met-3" />
        <div className="meteorite met-4" />
      </div>

      {/* 3. Drag-Trail Particle Emitter (Embers) */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="meteor-spark"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 1.5}px ${p.color}`,
          }}
        />
      ))}

      {/* 4. Main Profile Component (Web Dev & AI Engineer Profile Card) */}
      <div className="profile-card-wrapper">
        <div className="profile-card paper-texture">
          <div className="profile-pic-border">
            <div className="profile-pic-container">
              <img src={userPic} alt="Udit Kumar" className="profile-pic" />
            </div>
          </div>
          <h1 className="profile-name">Udit Kumar</h1>
          <p className="profile-title">Web Developer &amp; Aspiring AI Engineer</p>
          <p className="profile-bio">
            Building intelligent web applications, crafting interactive experiences, and training models to bridge the gap between AI and the user interface.
          </p>
          <div className="profile-links">
            <a href="https://github.com" target="_blank" rel="noreferrer" title="GitHub" className="profile-link-btn">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'block' }}>
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
            </a>
            <a href="mailto:udit.kumar@example.com" title="Email Udit" className="profile-link-btn">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'block' }}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* 5. Draggable Paintbrush (Floating on top) */}
      <DraggableBrush onMove={handleBrushMove} />

    </div>
  );
}
