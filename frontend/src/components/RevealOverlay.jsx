import React, { useRef, useEffect, forwardRef, useImperativeHandle, useState } from 'react';






const RevealOverlay = forwardRef((props, ref) => {
  const [isCleared, setIsCleared] = useState(false);
  const canvasRef = useRef(null);

  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.96)';
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

    
  useImperativeHandle(ref, () => ({
    reveal(x, y) {
      if (isCleared) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const radius = 80; 
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    },
    clear() {
      setIsCleared(true);
    },
  }));

  return (
    <canvas
      ref={canvasRef}
      className="reveal-canvas"
      style={{
        opacity: isCleared ? 0 : 1,
        transition: 'opacity 1s ease-in-out',
        pointerEvents: isCleared ? 'none' : 'auto'
      }}
    />
  );
});

export default RevealOverlay;
