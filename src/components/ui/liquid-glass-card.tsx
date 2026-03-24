import React from 'react';

interface LiquidGlassCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  className?: string;
}

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({ title, description, imageSrc, className }) => {
  return (
    <div className={`relative group ${className}`} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      {/* SVG Filter for distortion */}
      <svg className="hidden">
        <defs>
          <filter id="liquid-distortion">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.01"
              numOctaves="3"
              result="noise"
              seed="1"
            >
              <animate
                attributeName="baseFrequency"
                values="0.01 0.01; 0.015 0.015; 0.01 0.01"
                dur="10s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" />
          </filter>
        </defs>
      </svg>

      <div
        style={{
          background: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "40px",
          padding: "64px 48px",
          maxWidth: "800px",
          width: "100%",
          boxShadow: "0 25px 80px -12px rgba(0, 0, 0, 0.6)",
          textAlign: "center",
          position: "relative",
          zIndex: 10,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
        className="liquid-filter-target"
      >
        {/* Subtle highlight glare */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "50%",
            height: "100%",
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)",
            transform: "skewX(-25deg)",
            transition: "0.75s",
          }}
          className="group-hover:left-[150%]"
        />

        {imageSrc && (
          <div style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            padding: "4px",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            background: "rgba(255, 255, 255, 0.05)",
            marginBottom: "8px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          }}>
            <img
              src={imageSrc}
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </div>
        )}

        <div style={{ maxWidth: "600px" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: 800,
              color: "#FFFFFF",
              marginBottom: "20px",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              fontFamily: 'Outfit, sans-serif',
              background: "linear-gradient(to bottom, #FFFFFF 30%, #94A3B8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontSize: "clamp(16px, 2.2vw, 19px)",
              color: "#94A3B8",
              lineHeight: 1.7,
              fontWeight: 400,
              textAlign: "justify",
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>

        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: -1,
          }}
        />
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .liquid-filter-target {
          transition: transform 0.3s ease-out;
        }
        .liquid-filter-target:hover {
          /* We don't apply the liquid filter by default as it can be heavy, 
             but we can toggle it or keep it subtle */
          /* filter: url(#liquid-distortion); */
        }
      `}} />
    </div>
  );
};
