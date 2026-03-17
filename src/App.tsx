import "./index.css"
import HeroSection from "./components/HeroSection"
import { PixelCanvas } from "./components/ui/pixel-canvas"

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
            padding: 0,
            position: "relative",
            overflow: "hidden",
            backgroundColor: "#000000",
          }}
        >
          <PixelCanvas
            gap={10}
            speed={25}
            colors={["#e0f2fe", "#7dd3fc", "#0ea5e9"]}
            variant="default"
          />
          <div
            aria-hidden
            style={{
              position: "relative",
              zIndex: 1,
              height: "clamp(180px, 22vw, 320px)",
            }}
          />
        </section>

        <section
          id="projects"
          style={{
            minHeight: "100svh",
            padding: "96px clamp(16px, 5vw, 64px)",
            backgroundColor: "#000000",
          }}
        >
        </section>

        <section
          id="contact"
          style={{
            minHeight: "75svh",
            padding: "96px clamp(16px, 5vw, 64px)",
            background:
              "radial-gradient(1000px 420px at 50% 0%, rgba(255,255,255,0.08), transparent 55%), linear-gradient(to bottom, #020207 0%, #000000 100%)",
          }}
        >
          <h2 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "12px" }}>
            Contact
          </h2>
          <p style={{ maxWidth: "70ch", color: "rgba(226,232,240,0.78)", lineHeight: 1.7 }}>
            Hook your contact form or CTA here.
          </p>
        </section>
      </main>
    </>
  )
}

export default App
