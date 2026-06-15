import { useState, useEffect, useRef } from 'react';

export default function DraggableBrush({ onMove }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isCentered, setIsCentered] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [tilt, setTilt] = useState(0);

  const brushRef = useRef(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0, time: 0 });

  // Center the brush on initial mount
  useEffect(() => {
    if (isCentered && brushRef.current) {
      const rect = brushRef.current.getBoundingClientRect();
      const x = (window.innerWidth - rect.width) / 2;
      const y = (window.innerHeight - rect.height) / 2;
      setPosition({ x, y });
    }
  }, [isCentered]);

  // Handle global mouse/touch move and up events to ensure smooth dragging outside the brush bounds
  useEffect(() => {
    const handleMove = (clientX, clientY) => {
      if (!isDragging) return;

      const newX = clientX - dragStart.current.x;
      const newY = clientY - dragStart.current.y;

      // Restrict to viewport boundaries
      const brushWidth = brushRef.current ? brushRef.current.offsetWidth : 120;
      const brushHeight = brushRef.current ? brushRef.current.offsetHeight : 120;
      const x = Math.max(-brushWidth / 2, Math.min(window.innerWidth - brushWidth / 2, newX));
      const y = Math.max(-brushHeight / 2, Math.min(window.innerHeight - brushHeight / 2, newY));

      setPosition({ x, y });

      // Calculate velocity and tilt angle based on movement direction
      const now = performance.now();
      const dt = now - lastPos.current.time;
      if (dt > 10) {
        const dx = x - lastPos.current.x;
        const dy = y - lastPos.current.y;
        
        // Tilt factor proportional to speed (dx / dt) capped at a reasonable angle (e.g. -35 to 35 degrees)
        const speedX = dx / dt;
        let targetTilt = speedX * 45; // Tilt in direction of horizontal motion
        targetTilt = Math.max(-35, Math.min(35, targetTilt));
        setTilt(targetTilt);

        lastPos.current = { x, y, time: now };
      }

      // Notify parent to spawn particles at the brush tip
      // The tip is at the top-right of the 120x120 container
      if (onMove) {
        const tipX = x + brushWidth * 0.75;
        const tipY = y + brushHeight * 0.25;
        onMove(tipX, tipY);
      }
    };

    const handleMouseMove = (e) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setTilt(0); // Return to default angle
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, onMove]);

  // Drag start triggers
  const startDrag = (clientX, clientY) => {
    setIsCentered(false);
    setIsDragging(true);
    
    // Set drag offset relative to the brush container's current position
    dragStart.current = {
      x: clientX - position.x,
      y: clientY - position.y
    };

    lastPos.current = {
      x: position.x,
      y: position.y,
      time: performance.now()
    };
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only allow left clicks
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length > 0) {
      e.preventDefault(); // Prevents zooming and scrolling while dragging
      startDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div
      ref={brushRef}
      className={`draggable-brush-container ${isDragging ? 'dragging' : ''} ${isCentered ? 'centered-init' : ''}`}
      style={{
        left: isCentered ? '50%' : `${position.x}px`,
        top: isCentered ? '50%' : `${position.y}px`,
        transform: isCentered 
          ? 'translate(-50%, -50%)' 
          : `rotate(${tilt}deg)`,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      role="button"
      tabIndex={0}
      aria-label="Draggable paintbrush. Grab and drag to paint meteorite dust."
    >
      <div className="brush-glow-aura" />
      
      {/* Hand-drawn SVG paintbrush */}
      <svg 
        viewBox="0 0 120 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="draggable-brush-svg"
      >
        {/* Brush handle */}
        <path 
          d="M20 100 L65 55 L75 65 L30 110 Z" 
          fill="#3e3027" 
          stroke="#1e1815" 
          strokeWidth="1.5" 
        />
        <path 
          d="M23 103 L60 66" 
          stroke="#5a4538" 
          strokeWidth="1" 
        />
        {/* Ferrule (Metal band) */}
        <path 
          d="M65 55 L78 42 L88 52 L75 65 Z" 
          fill="#95a5a6" 
          stroke="#1e1815" 
          strokeWidth="1.5" 
        />
        <path 
          d="M69 51 L81 39" 
          stroke="#bdc3c7" 
          strokeWidth="1.2" 
        />
        {/* Brush hair bristles */}
        <path 
          d="M78 42 C85 28 92 20 105 15 C100 28 92 38 88 52 Z" 
          fill="#ff8c00" 
          stroke="#1e1815" 
          strokeWidth="1.5" 
        />
        {/* Glowing tip detail */}
        <path 
          d="M93 27 C97 21 102 18 105 15 C102 18 99 24 93 27 Z" 
          fill="#ffd700" 
        />
      </svg>
      
      {/* Helper cue text (visible when not dragging) */}
      {!isDragging && (
        <span className="brush-help-tag handwritten">
          Drag Me
        </span>
      )}
    </div>
  );
}
