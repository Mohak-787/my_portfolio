import "./index.css"
import HeroSection from "./components/HeroSection"
import { PixelCanvas } from "./components/ui/pixel-canvas"
import { LiquidGlassCard } from "./components/ui/liquid-glass-card"

import ProjectCardStream from "./components/ProjectCardStream"

function App() {
  return (
    <>
      <main style={{ paddingBottom: "96px" }}>
        <section>
          <HeroSection />
        </section>

        <section
          id="about"
          style={{
            padding: "120px 0",
            position: "relative",
            overflow: "hidden",
            backgroundColor: "#000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ position: "absolute", inset: 0 }}>
            <PixelCanvas
              gap={8}
              speed={25}
              colors={["#3B82F6", "#60A5FA", "#93C5FD", "#2563EB", "#1D4ED8", "#1E3A8A"]}
              variant="default"
              permanent
            />
          </div>

          <div style={{ position: "relative", zIndex: 10, width: "100%", padding: "0 24px" }}>
            <LiquidGlassCard
              title="About me"
              description="I am a Computer Science student passionate about software development, AI/ML, and FinTech innovation. I focus on building scalable web applications and backend solutions that solve practical problems. I am motivated by continuous learning, professional growth, and collaboration with experts across both technology and business sectors."
              imageSrc="images/icon.png"
            />
          </div>
        </section>

        <section
          id="projects"
          style={{
            minHeight: "100svh",
            padding: "96px 0",
            backgroundColor: "#000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2 style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 800,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            marginBottom: "48px",
            fontFamily: 'Outfit, sans-serif',
            background: "linear-gradient(to bottom, #FFFFFF 30%, #94A3B8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center"
          }}>
            Featured Projects
          </h2>
          <ProjectCardStream />
        </section>

      </main>
    </>
  )
}

export default App
