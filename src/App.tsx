import HeroSection from "./components/layout/HeroSection"
import Navbar from "./components/layout/Navbar"
import { PixelCanvas } from "./components/ui/pixel-canvas"
import { LiquidGlassCard } from "./components/ui/liquid-glass-card"

import ProjectCardStream from "./components/features/ProjectCardStream"
import TechStack from "./components/features/TechStack"

function App() {
  return (
    <>
      <Navbar />
      <main style={{ paddingBottom: "96px" }}>
        <section id="home" style={{ padding: "40px 0" }}>
          <HeroSection />
        </section>

        <section
          id="about"
          style={{
            padding: "40px 0",
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
              gap={12}
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

        <TechStack />

        <section
          id="projects"
          style={{
            minHeight: "40svh",
            padding: "40px 0 40px 0",
            backgroundColor: "#000000",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
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

        <section
          id="contact"
          style={{
            minHeight: "40svh",
            padding: "40px 24px 80px 24px",
            backgroundColor: "#000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
          }}
        >
          <h2 style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 800,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            marginBottom: "24px",
            fontFamily: 'Outfit, sans-serif',
            background: "linear-gradient(to bottom, #FFFFFF 30%, #94A3B8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Get In Touch
          </h2>
          <p style={{
            color: "#94A3B8",
            fontSize: "18px",
            maxWidth: "600px",
            margin: "0 auto 32px",
            lineHeight: "1.6"
          }}>
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
          <a
            href="mailto:example@email.com"
            style={{
              padding: "14px 32px",
              borderRadius: "16px",
              backgroundColor: "#FFFFFF",
              color: "#000000",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "16px",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            Say Hello
          </a>
        </section>

      </main>
    </>
  )
}

export default App
