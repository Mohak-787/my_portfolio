import HeroSection from "./components/layout/HeroSection"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import ContactSection from "./components/features/ContactSection"
import { WebGLShader } from "./components/ui/web-gl-shader"
import { LiquidGlassCard } from "./components/ui/liquid-glass-card"

import ProjectCardStream from "./components/features/ProjectCardStream"
import TechStack from "./components/features/TechStack"
import Testimonials from "./components/features/Testimonials"

function App() {
  return (
    <>
      <Navbar />
      <main>
        <section id="home" style={{ padding: "0" }}>
          <HeroSection />
        </section>

        <section
          id="about"
          style={{
            padding: "120px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1100px" }}>
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
            minHeight: "30svh",
            padding: "120px 0 140px",
            backgroundColor: "#000000",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <div style={{ width: "100%", maxWidth: "1200px", padding: "0 24px" }}>
            <h2 style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 800,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: "16px",
              fontFamily: 'Outfit, sans-serif',
              background: "linear-gradient(to bottom, #FFFFFF 30%, #94A3B8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center"
            }}>
              Featured Projects
            </h2>
            <p style={{
              color: "#94A3B8",
              fontSize: "18px",
              maxWidth: "760px",
              margin: "0 auto 56px",
              lineHeight: "1.6",
              textAlign: "center"
            }}>
              A curated selection of backend systems focused on performance, scalability, and clean architecture.
            </p>
          </div>
          <ProjectCardStream />
        </section>

        <section
          id="testimonials"
          style={{
            padding: "120px 24px 140px",
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
            marginBottom: "56px",
            fontFamily: 'Outfit, sans-serif',
            background: "linear-gradient(to bottom, #FFFFFF 30%, #94A3B8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center"
          }}>
            Testimonials
          </h2>
          <Testimonials />
        </section>
        <section
          id="contact"
          style={{
            minHeight: "40svh",
            padding: "120px 24px 140px",
            backgroundColor: "#000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <WebGLShader />
          <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1100px" }}>
            <h2 style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 800,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: "12px",
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
              maxWidth: "850px",
              margin: "0 auto 8px",
              lineHeight: "1.6"
            }}>
              I'm always open to new opportunities and collaborations. Feel free to reach out!
            </p>
            <ContactSection />
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

export default App
