import CosmicHeroBackground from "./CosmicHeroBackground"

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

          <button
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
            View source
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
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </CosmicHeroBackground>
  )
}

