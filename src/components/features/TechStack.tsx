import React from 'react';
import { IconCloud } from "../ui/interactive-icon-cloud";

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

const TechStack: React.FC = () => {
  return (
    <section
      id="skills"
      style={{
        padding: "96px 24px",
        backgroundColor: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div 
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "48px",
          flexWrap: "wrap" // For basic responsiveness if screen gets too narrow
        }}
        className="tech-stack-container"
      >
        <div style={{ flex: "1", minWidth: "300px", textAlign: "left" }}>
          <h2 style={{
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 800,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            fontFamily: 'Outfit, sans-serif',
            background: "linear-gradient(to bottom, #FFFFFF 30%, #94A3B8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0,
            lineHeight: "1.1"
          }}>
            My<br />Skills
          </h2>
          <p style={{
            color: "#94A3B8",
            fontSize: "18px",
            marginTop: "24px",
            maxWidth: "400px",
            lineHeight: "1.6"
          }}>
            I build backend systems with Node.js, focusing on fast and reliable APIs. I work with PostgreSQL and MongoDB, and I care about writing clean, maintainable code that performs well in real-world applications.
          </p>
        </div>
        
        <div style={{ 
          flex: "1", 
          minWidth: "300px", 
          display: "flex", 
          justifyContent: "center",
          position: "relative"
        }}>
          <div className="relative flex size-full items-center justify-center overflow-hidden rounded-lg px-4 pb-20 pt-8">
            <IconCloud iconSlugs={slugs} />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 868px) {
          .tech-stack-container {
            flex-direction: column !important;
            text-align: center !important;
            gap: 24px !important;
          }
          .tech-stack-container > div {
            text-align: center !important;
          }
          .tech-stack-container h2 {
            font-size: 48px !important;
            text-align: center !important;
          }
          .tech-stack-container p {
            margin: 24px auto !important;
          }
        }
      `}} />
    </section>
  );
};

export default TechStack;
