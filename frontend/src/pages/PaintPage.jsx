import { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const COLORS = [
  '#ffffff', '#c2a43f', '#FF5F1F', '#00CEC9', '#e74c3c',
  '#3498db', '#2ecc71', '#9b59b6', '#f39c12', '#1abc9c',
];

const BRUSH_SIZES = [4, 8, 14, 22, 34];

export default function PaintPage() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPoint = useRef(null);

  const [color, setColor] = useState('#ffffff');
  const [brushSize, setBrushSize] = useState(8);
  const [isEraser, setIsEraser] = useState(false);
  const [tool, setTool] = useState('brush'); 

  
  useEffect(() => {
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctxRef.current = ctx;
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const getPos = useCallback((e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }, []);

  const startDraw = useCallback((e) => {
    e.preventDefault();
    isDrawing.current = true;
    lastPoint.current = getPos(e);
  }, [getPos]);

  const draw = useCallback((e) => {
    if (!isDrawing.current || !ctxRef.current) return;
    e.preventDefault();

    const ctx = ctxRef.current;
    const pos = getPos(e);
    const last = lastPoint.current;

    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(pos.x, pos.y);

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.lineWidth = brushSize * 2.5;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.shadowColor = color;
      ctx.shadowBlur = brushSize * 0.4;
    }

    ctx.stroke();
    ctx.shadowBlur = 0;
    lastPoint.current = pos;
  }, [color, brushSize, tool, getPos]);

  const stopDraw = useCallback(() => {
    isDrawing.current = false;
    lastPoint.current = null;
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="paint-page">
      <canvas
        ref={canvasRef}
        className="paint-canvas"
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={stopDraw}
      />
      <div className="paint-top-bar">
        <Link to="/" className="paint-back-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </Link>
        <span className="paint-title">🎨 Canvas</span>
        <a href="https://www.instagram.com/the.sketch.man66/" target="_blank" rel="noreferrer" className="paint-share-cta">
          Share your art with me on
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
          Instagram
        </a>
      </div>


      <div className="paint-toolbar">

        <div className="paint-tool-group">
          <span className="paint-tool-label">Color</span>
          <div className="paint-color-row">
            {COLORS.map((c) => (
              <button
                key={c}
                className={`paint-color-swatch ${color === c && tool === 'brush' ? 'active' : ''}`}
                style={{ backgroundColor: c }}
                onClick={() => { setColor(c); setTool('brush'); }}
                title={c}
              />
            ))}
          </div>
        </div>


        <div className="paint-tool-group">
          <span className="paint-tool-label">Size</span>
          <div className="paint-size-row">
            {BRUSH_SIZES.map((s) => (
              <button
                key={s}
                className={`paint-size-btn ${brushSize === s ? 'active' : ''}`}
                onClick={() => setBrushSize(s)}
                title={`${s}px`}
              >
                <span className="paint-size-dot" style={{ width: s, height: s }} />
              </button>
            ))}
          </div>
        </div>


        <div className="paint-tool-group">
          <span className="paint-tool-label">Tools</span>
          <div className="paint-tools-row">
            <button
              className={`paint-tool-btn ${tool === 'brush' ? 'active' : ''}`}
              onClick={() => setTool('brush')}
              title="Brush"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z" />
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                <path d="M2 2l7.586 7.586" />
                <circle cx="11" cy="11" r="2" />
              </svg>
            </button>
            <button
              className={`paint-tool-btn ${tool === 'eraser' ? 'active' : ''}`}
              onClick={() => setTool('eraser')}
              title="Eraser"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 20H7L3 16a1 1 0 010-1.4l9.6-9.6a1 1 0 011.4 0l7 7a1 1 0 010 1.4L15 20" />
                <path d="M6 12l6-6" />
              </svg>
            </button>
            <button
              className="paint-tool-btn"
              onClick={clearCanvas}
              title="Clear canvas"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-2 14H7L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4h6v2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
