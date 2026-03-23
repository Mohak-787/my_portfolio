import CosmicHeroBackground from "../ui/CosmicHeroBackground"

export default function HeroSection() {
  return (
    <CosmicHeroBackground>
      <div
        style={{
          maxWidth: "1100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: "translateY(-6vh)",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            color: "#0f172a",
            padding: "6px 18px",
            borderRadius: "9999px",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "22px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            animation: "fadeInDown 0.5s ease-out forwards",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Powering Apps Behind the Scenes
        </div>

        <h1
          style={{
            fontSize: "clamp(56px, 5.8vw, 72px)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            margin: "0 0 18px 0",
            background: "linear-gradient(to bottom, #FFFFFF 30%, #94A3B8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "fadeInUp 0.7s ease-out 0.12s forwards",
            opacity: 0,
          }}
        >
          Mohak Devkota
        </h1>

        <p
          style={{
            fontSize: "19px",
            color: "#94A3B8",
            maxWidth: "600px",
            margin: "0 0 30px 0",
            fontWeight: 400,
            lineHeight: 1.6,
            animation: "fadeInUp 0.7s ease-out 0.22s forwards",
            opacity: 0,
          }}
        >
          Backend Developer
        </p>

        <div
          className="hero-buttons"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "14px",
            animation: "fadeInUp 0.7s ease-out 0.32s forwards",
            opacity: 0,
          }}
        >
          <button
            style={{
              backgroundColor: "#3B82F6",
              color: "#F8FAFC",
              padding: "12px 20px",
              borderRadius: "11px",
              border: "1px solid rgba(59, 130, 246, 0.45)",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#2563EB"
              e.currentTarget.style.boxShadow =
                "0 8px 25px rgba(59, 130, 246, 0.45)"
              e.currentTarget.style.transform = "translateY(-2px)"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#3B82F6"
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(59, 130, 246, 0.3)"
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            Download CV
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 13L12 18L17 13M12 18V4" />
              <path d="M20 20H4" />
            </svg>
          </button>

          <a
            href="https://github.com/Mohak-787"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "rgba(241, 245, 249, 0.95)",
              color: "#0F172A",
              padding: "12px 20px",
              borderRadius: "11px",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              textDecoration: "none",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#FFFFFF"
              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(0, 0, 0, 0.12)"
              e.currentTarget.style.transform = "translateY(-2px)"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(241, 245, 249, 0.95)"
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(0, 0, 0, 0.08)"
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View Source
          </a>
        </div>
      </div>
    </CosmicHeroBackground>
  )
}

