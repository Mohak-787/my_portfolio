import React, { useEffect, useRef } from 'react';

const CosmicHeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let stars: { x: number; y: number; size: number; baseOpacity: number; phase: number }[] = [];
    const starCount = 200;

    const initStars = (width: number, height: number) => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * (height * 0.8), // Keep stars mostly in the upper 80%
          size: Math.random() * 1.5,
          baseOpacity: Math.random() * 0.6 + 0.1,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const animate = (time: number) => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      stars.forEach(star => {
        const opacity = star.baseOpacity + Math.sin(time * 0.001 + star.phase) * 0.2;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 232, 240, ${Math.max(0.1, opacity)})`;
        ctx.fill();
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      initStars(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div 
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        backgroundImage: `
          radial-gradient(circle at 50% 85%, rgba(29, 78, 216, 0.15) 0%, transparent 60%),
          radial-gradient(circle at 50% 80%, rgba(30, 41, 59, 0.4) 0%, transparent 70%)
        `,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      {/* Animated Starfield */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />

      {/* Atmospheric Central Glow (Vertical Column/Pillar) */}
      <div 
        style={{
          position: 'absolute',
          bottom: '20vh',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '25vw',
          height: '110vh',
          background: 'radial-gradient(ellipse at bottom, rgba(37, 99, 235, 0.35) 0%, rgba(30, 64, 175, 0.1) 40%, transparent 85%)',
          pointerEvents: 'none',
          filter: 'blur(90px)',
          zIndex: 1,
        }}
      />

      {/* Central Light Beam (The Core Pillar) */}
      <div 
        style={{
          position: 'absolute',
          bottom: '38vh',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '8vw',
          height: '60vh',
          background: 'radial-gradient(ellipse at bottom, rgba(255, 255, 255, 0.3) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 90%)',
          filter: 'blur(25px)',
          zIndex: 2,
        }}
      />

      {/* Peak Bright Glow (Intense White-Hot Center) */}
      <div 
        style={{
          position: 'absolute',
          bottom: '48vh',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '12vw',
          height: '8vh',
          background: 'radial-gradient(circle at center, rgba(255, 255, 255, 1) 0%, rgba(147, 197, 253, 0.6) 20%, rgba(37, 99, 235, 0.2) 50%, transparent 90%)',
          pointerEvents: 'none',
          filter: 'blur(15px)',
          zIndex: 5,
        }}
      />

      {/* The Refined Horizon Arc */}
      <div 
        style={{
          position: 'relative',
          width: '100%', 
          height: '65vh',
          zIndex: 10,
          overflow: 'hidden',
        }}
      >
        <svg
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <defs>
            <linearGradient id="horizonRim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0" />
              <stop offset="30%" stopColor="#3B82F6" stopOpacity="0.4" />
              <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="10" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Planet Body */}
          <path
            d="M -100,600 L 1100,600 L 1100,550 Q 500,0 -100,550 Z"
            fill="#000000"
          />
          
          {/* Detailed Rim Path */}
          <path
            d="M -100,550 Q 500,0 1100,550"
            fill="none"
            stroke="url(#horizonRim)"
            strokeWidth="6"
            filter="url(#glow)"
          />
        </svg>
      </div>

      {/* Deep black overlap for the horizon area */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '10vh',
          backgroundColor: '#000000',
          zIndex: 11,
        }}
      />

      <style>{`
        @keyframes subtlePulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
};

export default CosmicHeroBackground;
