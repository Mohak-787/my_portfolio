import { useState, useEffect } from "react";
import { CardStack, CardStackItem } from "../ui/card-stack";

const testimonials: CardStackItem[] = [
  {
    id: 1,
    title: "Alex Rivera",
    ctaLabel: "CTO, TechFlow",
    description: "Mohak's attention to detail in backend architecture is impressive. He delivered a scalable solution that exceeded our expectations.",
    imageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Sarah Chen",
    ctaLabel: "Senior Developer",
    description: "Working with Mohak was a breeze. He's a fast learner and brought a lot of fresh ideas to our AI/ML project.",
    imageSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "James Wilson",
    ctaLabel: "Product Manager",
    description: "The cosmic dashboard Mohak built is not only beautiful but also performant. Highly recommended for any frontend work.",
    imageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Elena Rodriguez",
    ctaLabel: "Backend Lead",
    description: "A brilliant problem solver. Mohak helped us optimize our database queries, reducing latency by over 40%.",
    imageSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Marcus Thorne",
    ctaLabel: "Founder, StartupX",
    description: "The API integrations were seamless. Mohak is a top-tier engineer who understands both business logic and technical depth.",
    imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
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
        maxWidth: "1100px", 
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
        autoAdvance
        intervalMs={5000}
        pauseOnHover
        showDots
        cardWidth={cardSize.width}
        cardHeight={cardSize.height}
        renderCard={(item) => (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(16px) saturate(180%)",
              WebkitBackdropFilter: "blur(16px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "24px",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              boxShadow: "0 25px 80px -12px rgba(0, 0, 0, 0.6)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Header: Photo and Info */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
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
              <div style={{ display: "flex", flexDirection: "column" }}>
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
