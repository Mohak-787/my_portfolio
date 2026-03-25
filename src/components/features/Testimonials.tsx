import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { CardStack, CardStackItem } from "../ui/card-stack";

const testimonials: CardStackItem[] = [
  {
    id: 1,
    title: "Basanta Rana Magar",
    ctaLabel: "Computer Science Student",
    description: "Mohak is really strong in Node.js backend development. He builds clean, scalable APIs and thinks ahead about performance. He ensures everything is built properly from the start.",
    imageSrc: "/images/avatar-placeholder.png",
  },
  {
    id: 2,
    title: "Prabin Lamgade",
    ctaLabel: "Cybersecurity Enthusiast",
    description: "Mohak develops with a security-first mindset. His Node.js code is clean, well-structured, and avoids common vulnerabilities. He’s a reliable collaborator.",
    imageSrc: "/images/avatar-placeholder.png",
  },
  {
    id: 3,
    title: "Ethan Carter",
    ctaLabel: "Backend Developer",
    description: "Mohak designs efficient, easy-to-use APIs. His work with Node.js and databases is well-structured, showing great attention to detail and performance.",
    imageSrc: "/images/avatar-placeholder.png",
  },
  {
    id: 4,
    title: "Diya Khadka",
    ctaLabel: "Student",
    description: "Mohak organized our backend idea clearly and effectively. He’s patient, easy to work with, and explains technical concepts simply. He made the process much smoother.",
    imageSrc: "/images/avatar-placeholder.png",
  },
  {
    id: 5,
    title: "Arjun Mehta",
    ctaLabel: "Developer, XXXXX",
    description: "Working with Mohak on backend tasks was great. He writes consistent, clean Node.js code and understands database efficiency well. He’s a dependable team player.",
    imageSrc: "/images/avatar-placeholder.png",
  },
];

export default function Testimonials() {
  const [cardSize, setCardSize] = useState({ width: 520, height: 320 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardSize({ width: 340, height: 260 });
      } else if (window.innerWidth < 1024) {
        setCardSize({ width: 450, height: 300 });
      } else {
        setCardSize({ width: 520, height: 320 });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <CardStack
        items={testimonials}
        initialIndex={0}
        showDots
        cardWidth={cardSize.width}
        cardHeight={cardSize.height}
        renderCard={(item) => (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(24px) saturate(200%)",
              WebkitBackdropFilter: "blur(24px) saturate(200%)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "24px",
              padding: "40px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              boxShadow: "0 25px 80px -12px rgba(0, 0, 0, 0.6)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Header: Photo and Info */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                padding: "2px",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                background: "rgba(255, 255, 255, 0.05)",
                overflow: "hidden",
                flexShrink: 0
              }}>
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <h3 style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  fontFamily: 'Outfit, sans-serif',
                  margin: 0,
                  letterSpacing: "0.01em"
                }}>
                  {item.title}
                </h3>
                <span style={{
                  fontSize: "14px",
                  color: "#94A3B8",
                  fontWeight: 400,
                  fontFamily: 'Outfit, sans-serif',
                  textAlign: "left",
                }}>
                  {item.ctaLabel}
                </span>
              </div>
            </div>

            {/* Testimonial Text */}
            <p style={{
              fontSize: "16px",
              color: "#E2E8F0",
              lineHeight: 1.6,
              fontWeight: 400,
              margin: 0,
              fontFamily: 'Outfit, sans-serif',
            }}>
              "{item.description}"
            </p>

            {/* Star Rating */}
            <div style={{
              display: "flex",
              gap: "4px",
              marginTop: "auto",
              filter: "drop-shadow(0 0 8px rgba(250, 204, 21, 0.3))"
            }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#FACC15" color="#FACC15" />
              ))}
            </div>

            {/* Subtle glow highlight */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "100px",
                height: "100px",
                background: "radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
          </div>
        )}
      />
    </div>
  );
}
