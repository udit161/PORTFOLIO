import { useState, useEffect, useRef } from 'react';
// import DraggableBrush from './components/DraggableBrush';
import userPicNoBg from './assets/user_pic_no_bg.png';
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
  /*
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
  */

  return (
    <div className="meteorite-app-root">
      
      {/* 1. Full-screen Transparent Portrait Backdrop */}
      <div className="portrait-container">
        <img src={userPicNoBg} alt="Udit Kumar" className="portrait-image" />
      </div>

      {/* 2. Twinkling Stars Background */}
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

      {/* 3. Automated Shooting Stars / Meteorites */}
      <div className="shooting-stars-container">
        <div className="meteorite met-1" />
        <div className="meteorite met-2" />
        <div className="meteorite met-3" />
        <div className="meteorite met-4" />
      </div>

      {/* 4. Drag-Trail Particle Emitter (Embers) - Commented Out
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
      */}

      {/* 5. Animated Header text coming from above head */}
      <div className="cosmic-header-container">
        <h1 className="cosmic-heading">Hi, I am Udit Kumar</h1>
      </div>

      {/* 5. Draggable Paintbrush (Floating on top) - Commented Out
      <DraggableBrush onMove={handleBrushMove} />
      */}

    </div>
  );
}
