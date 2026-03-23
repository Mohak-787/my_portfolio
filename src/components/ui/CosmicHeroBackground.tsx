import React, { useEffect, useMemo, useRef } from "react"

type CosmicHeroBackgroundProps = {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const CosmicHeroBackground: React.FC<CosmicHeroBackgroundProps> = ({
  children,
  className,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number>()

  const gradients = useMemo(
    () => `
      radial-gradient(ellipse at 50% 78%, rgba(59, 130, 246, 0.10) 0%, rgba(15, 23, 42, 0.18) 38%, transparent 72%),
      radial-gradient(ellipse at 50% 85%, rgba(148, 163, 184, 0.06) 0%, transparent 65%)
    `,
    [],
  )

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let stars: {
      x: number
      y: number
      size: number
      baseOpacity: number
      phase: number
      speed: number
    }[] = []
    const starCount = 120

    const initStars = (width: number, height: number) => {
      stars = []
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * (height * 0.8),
          size: Math.random() * 1.5,
          baseOpacity: Math.random() * 0.6 + 0.1,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.35 + 0.05,
        })
      }
    }

    const startTime = performance.now()
    const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

    const animate = (time: number) => {
      const t = time - startTime
      const width = canvas.width / (window.devicePixelRatio || 1)
      const height = canvas.height / (window.devicePixelRatio || 1)

      ctx.clearRect(0, 0, width, height)

      const starsFade = clamp01((t - 900) / 2200)

      ctx.fillStyle = "#e2e8f0";
      stars.forEach(star => {
        star.x += star.speed * 0.18
        star.y += star.speed * 0.05
        if (star.x > width + 2) star.x = -2
        if (star.y > height * 0.82) star.y = -2

        const opacity =
          (star.baseOpacity + Math.sin(time * 0.001 + star.phase) * 0.2) *
          starsFade

        ctx.globalAlpha = Math.max(0, opacity);
        ctx.fillRect(star.x - star.size / 2, star.y - star.size / 2, star.size, star.size)
      })
      ctx.globalAlpha = 1.0;

      requestRef.current = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      ctx.scale(dpr, dpr)

      initStars(rect.width, rect.height)
    }

    const ro = new ResizeObserver(() => handleResize())
    ro.observe(container)
    handleResize()
    requestRef.current = requestAnimationFrame(animate)

    return () => {
      ro.disconnect()
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        minHeight: "100svh",
        backgroundColor: "#000000",
        backgroundImage: gradients,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        ...style,
      }}
    >
      {/* Animated Starfield */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
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
          background:
            'radial-gradient(ellipse at bottom, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.04) 28%, transparent 90%)',
          pointerEvents: 'none',
          filter: 'blur(80px)', // Reduced from 140px
          zIndex: 1,
          opacity: 0,
          animation: 'horizonGlowIn 2.2s ease-out 0.25s forwards, glowDrift 12s ease-in-out 1.2s infinite',
        }}
      />

      {/* Subtle Horizon Glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '29vh',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '34vw',
          height: '10vh',
          background:
            'radial-gradient(ellipse at center, rgba(226, 232, 240, 0.12) 0%, rgba(59, 130, 246, 0.04) 48%, transparent 78%)',
          pointerEvents: 'none',
          filter: 'blur(24px)', // Reduced from 34px
          zIndex: 5,
          opacity: 0,
          animation: 'horizonGlowIn 2.0s ease-out 0.35s forwards, glowDrift 11s ease-in-out 1.2s infinite',
        }}
      />

      {/* Clean "emission" bloom above the arc center */}
      <div
        style={{
          position: 'absolute',
          bottom: '27vh',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '18vw',
          height: '6vh',
          background:
            'radial-gradient(ellipse at center, rgba(248, 250, 252, 0.12) 0%, rgba(226, 232, 240, 0.08) 30%, transparent 78%)',
          pointerEvents: 'none',
          filter: 'blur(16px)', // Reduced from 22px
          zIndex: 6,
          opacity: 0,
          animation: 'horizonGlowIn 1.8s ease-out 0.4s forwards, glowBreathe 7.5s ease-in-out 1.4s infinite',
        }}
      />

      {/* Hero content slot */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 clamp(16px, 4vw, 32px)",
        }}
      >
        {children}
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
            style={{ opacity: 0, animation: 'rimIn 2.1s ease-out 0.35s forwards' }}
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
        @keyframes horizonGlowIn {
          0% { opacity: 0; transform: translateX(-50%) translateY(16px); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes rimIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes glowDrift {
          0%, 100% { transform: translateX(-50%) translateY(0) scale(1); }
          50% { transform: translateX(-50%) translateY(-6px) scale(1.015); }
        }
        @keyframes glowBreathe {
          0%, 100% { transform: translateX(-50%) translateY(0) scale(1); opacity: 1; }
          50% { transform: translateX(-50%) translateY(-6px) scale(1.05); opacity: 0.95; }
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
  )
}

export default CosmicHeroBackground;
