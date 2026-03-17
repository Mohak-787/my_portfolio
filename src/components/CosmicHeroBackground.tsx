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
          radial-gradient(ellipse at 50% 78%, rgba(59, 130, 246, 0.10) 0%, rgba(15, 23, 42, 0.18) 38%, transparent 72%),
          radial-gradient(ellipse at 50% 85%, rgba(148, 163, 184, 0.06) 0%, transparent 65%)
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
          bottom: '12vh',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '46vw',
          height: '90vh',
          background: 'radial-gradient(ellipse at bottom, rgba(59, 130, 246, 0.14) 0%, rgba(30, 64, 175, 0.06) 48%, transparent 88%)',
          pointerEvents: 'none',
          filter: 'blur(140px)',
          zIndex: 1,
        }}
      />

      {/* Subtle Horizon Glow */}
      <div 
        style={{
          position: 'absolute',
          bottom: '29vh',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '28vw',
          height: '8vh',
          background: 'radial-gradient(ellipse at center, rgba(226, 232, 240, 0.22) 0%, rgba(191, 219, 254, 0.08) 35%, transparent 78%)',
          pointerEvents: 'none',
          filter: 'blur(28px)',
          zIndex: 5,
        }}
      />

      {/* Detailed Hero Content Overlay */}
      <div 
        style={{
          position: 'absolute',
          top: '42%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '1200px',
          textAlign: 'center',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 20px',
        }}
      >
        {/* Pill Badge */}
        <div 
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            color: '#0f172a',
            padding: '8px 20px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '40px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
            animation: 'fadeInDown 0.8s ease-out forwards',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Powering Apps Behind the Scenes
        </div>

        {/* Main Heading */}
        <h1 
          style={{
            fontSize: 'max(48px, 8vw)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: '0 0 16px 0',
            background: 'linear-gradient(to bottom, #FFFFFF 30%, #94A3B8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'fadeInUp 1s ease-out 0.2s forwards',
            opacity: 0,
          }}
        >
          Mohak Devkota
        </h1>

        {/* Subheading */}
        <p 
          style={{
            fontSize: 'max(16px, 1.8vw)',
            color: '#94A3B8',
            maxWidth: '600px',
            margin: '0 0 48px 0',
            fontWeight: 400,
            animation: 'fadeInUp 1s ease-out 0.4s forwards',
            opacity: 0,
          }}
        >
          Backend Developer
        </p>

        {/* Action Buttons */}
        <div 
          style={{
            display: 'flex',
            gap: '20px',
            animation: 'fadeInUp 1s ease-out 0.6s forwards',
            opacity: 0,
          }}
        >
          <button 
            style={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              padding: '16px 36px',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#1a1a1a';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#000000';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Download CV
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 13L12 18L17 13M12 18V4" />
              <path d="M20 20H4" />
            </svg>
          </button>
          
          <button 
            style={{
              backgroundColor: '#FFFFFF',
              color: '#000000',
              padding: '16px 36px',
              borderRadius: '9999px',
              border: 'none',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 20px -5px rgba(255, 255, 255, 0.2)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 15px 30px -5px rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            View source
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* The Refined Horizon Arc (Moderate Curve) */}
      <div 
        style={{
          position: 'relative',
          width: '100%', 
          height: '40vh',
          zIndex: 10,
          overflow: 'hidden',
        }}
      >
        <svg
          viewBox="0 0 1000 300"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <defs>
            <linearGradient id="horizonRim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0" />
              <stop offset="20%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="80%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="7" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Planet Body */}
          <path
            d="M -100,300 L 1100,300 L 1100,250 Q 500,50 -100,250 Z"
            fill="#000000"
          />
          
          {/* Detailed Rim Path */}
          <path
            d="M -100,250 Q 500,50 1100,250"
            fill="none"
            stroke="url(#horizonRim)"
            strokeWidth="4"
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
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default CosmicHeroBackground;
