import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

// This component renders a full-screen canvas that starts black and allows
// parts of it to be erased (revealed) by drawing transparent circles.
// It exposes a `reveal(x, y)` method via a ref so that other components
// (e.g., the draggable brush) can trigger the erasing.

const RevealOverlay = forwardRef((props, ref) => {
  const canvasRef = useRef(null);

  // Initialize canvas size and fill with black
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Fill the whole canvas with a semi‑transparent black overlay
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

  // Expose the reveal method to parent components
  useImperativeHandle(ref, () => ({
    reveal(x, y) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const radius = 80; // brush radius for revealing
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    },
  }));

  return (
    <canvas
      ref={canvasRef}
      className="reveal-canvas"
    />
  );
});

export default RevealOverlay;
