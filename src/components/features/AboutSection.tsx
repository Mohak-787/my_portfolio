import { useEffect, useRef } from "react";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("about-in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section"
    >
      <div className="about-container">
        <div className="about-right">
          <div className="about-photo reveal">
            <img src="/images/icon.png" alt="Mohak Devkota" />
          </div>

          <div className="about-metrics">
            <div className="metric reveal delay-1">
              <div className="metric-value">3+</div>
              <div className="metric-label">Production-ready systems</div>
            </div>
            <div className="metric reveal delay-2">
              <div className="metric-value">10k+</div>
              <div className="metric-label">Requests handled (demo load)</div>
            </div>
            <div className="metric reveal delay-3">
              <div className="metric-value">99.9%</div>
              <div className="metric-label">Uptime design target</div>
            </div>
          </div>
        </div>

        <div className="about-left">
          <h2 className="about-title reveal delay-1">
            About me
          </h2>
          <p className="about-subtitle reveal delay-2">
            I am a Computer Science student passionate about software development, AI/ML, and FinTech innovation. I focus on building scalable web applications and backend solutions that solve practical problems. I am motivated by continuous learning, professional growth, and collaboration with experts across both technology and business sectors.
          </p>
        </div>
      </div>

      <style>{`
        .about-section {
          position: relative;
          padding: 120px 24px;
          background: #000000;
          overflow: hidden;
        }
        .about-container {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 56px;
          align-items: center;
        }
        .about-left {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .about-title {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-family: 'Outfit, sans-serif';
          background: linear-gradient(to bottom, #FFFFFF 25%, #94A3B8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
        }
        .about-subtitle {
          color: #CBD5E1;
          font-size: 18px;
          line-height: 1.7;
          max-width: 520px;
          margin: 0;
          font-family: 'Outfit, sans-serif';
        }
        .about-right {
          display: grid;
          gap: 20px;
          justify-items: center;
        }
        .about-photo {
          width: min(320px, 85vw);
          aspect-ratio: 1 / 1;
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.04);
          box-shadow: 0 30px 80px -30px rgba(0, 0, 0, 0.8);
          overflow: hidden;
        }
        .about-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .about-metrics {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }
        .metric {
          padding: 18px;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
          text-align: left;
        }
        .metric-value {
          font-size: 24px;
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: 0.02em;
          font-family: 'Outfit, sans-serif';
        }
        .metric-label {
          font-size: 12px;
          color: #94A3B8;
          margin-top: 6px;
          line-height: 1.4;
        }
        .reveal {
          opacity: 0;
          transform: translateY(24px) scale(0.98);
          filter: blur(6px);
          transition: all 0.9s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .about-in-view .reveal {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }
        .delay-1 { transition-delay: 0.12s; }
        .delay-2 { transition-delay: 0.24s; }
        .delay-3 { transition-delay: 0.36s; }

        @media (max-width: 960px) {
          .about-container {
            grid-template-columns: 1fr;
            gap: 36px;
            text-align: left;
          }
          .about-metrics {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 640px) {
          .about-section {
            padding: 100px 20px;
          }
          .about-metrics {
            grid-template-columns: 1fr;
          }
          .about-subtitle {
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
