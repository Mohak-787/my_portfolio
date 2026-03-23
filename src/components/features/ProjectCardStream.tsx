import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';

// --- Types ---

interface Project {
  id: number;
  title: string;
  image: string;
  url: string;
  description: string;
  isFeatured?: boolean;
}

// --- Constants ---
const SCAN_WIDTH = 8;
const PARTICLE_COUNT = 400;
const CARD_WIDTH = 400;
const CARD_GAP = 60;
const CODE_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/\"'`~?";

// --- Helper Functions ---
const generateCode = (width: number, height: number) => {
  const totalChars = width * height;
  let out = "";
  for (let i = 0; i < totalChars; i++) {
    out += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
    if ((i + 1) % width === 0 && i < totalChars - 1) out += "\n";
  }
  return out;
};

// --- Sub-Components ---

const ProjectCard: React.FC<{ project: Project }> = React.memo(({ project }) => {
  const [asciiContent, setAsciiContent] = useState("");

  useEffect(() => {
    setAsciiContent(generateCode(66, 19));
  }, []);

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-wrapper"
      style={{
        position: 'relative',
        width: `${CARD_WIDTH}px`,
        height: '250px',
        flexShrink: 0,
        display: 'block',
        textDecoration: 'none',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
      }}
    >
      {/* Normal Card (Design View) */}
      <div
        className="card card-normal"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '20px',
          overflow: 'hidden',
          zIndex: 2,
          clipPath: 'inset(0 0 0 var(--clip-right, 0%))',
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(16px)',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Compact Image */}
        <div style={{ position: 'relative', width: '100%', height: '90px', overflow: 'hidden' }}>
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {project.isFeatured && (
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              color: '#0f172a',
              padding: '4px 12px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Featured
            </div>
          )}
        </div>

        {/* Introduction */}
        <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            margin: '0',
            fontFamily: 'Outfit, sans-serif',
            background: 'linear-gradient(to bottom, #FFFFFF 30%, #94A3B8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {project.title}
          </h3>

          <p style={{
            color: '#94A3B8',
            fontSize: '14px',
            lineHeight: '1.6',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            margin: '4px 0',
          }}>
            {project.description}
          </p>

          <div style={{
            marginTop: 'auto',
            backgroundColor: 'rgba(241, 245, 249, 0.95)',
            color: '#0F172A',
            padding: '10px',
            borderRadius: '11px',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: 600,
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View Source
          </div>
        </div>
      </div>

      {/* ASCII Card */}
      <div
        className="card card-ascii"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '20px',
          overflow: 'hidden',
          zIndex: 1,
          backgroundColor: 'transparent',
          clipPath: 'inset(0 calc(100% - var(--clip-left, 0%)) 0 0)',
          border: 'none',
        }}
      >
        <div
          className="ascii-content"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            color: 'rgba(8, 145, 178, 0.6)',
            fontFamily: 'monospace',
            fontSize: '9px',
            lineHeight: '11px',
            whiteSpace: 'pre',
            padding: '10px',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 100%)',
          }}
        >
          {asciiContent}
        </div>
      </div>
    </a>
  );
});

const BackgroundParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -window.innerWidth / 2,
      window.innerWidth / 2,
      125,
      -125,
      1,
      1000
    );
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, 250);
    renderer.setClearColor(0x000000, 0);

    const pCanvas = document.createElement("canvas");
    pCanvas.width = 100;
    pCanvas.height = 100;
    const pCtx = pCanvas.getContext("2d")!;
    const half = pCanvas.width / 2;
    const gradient = pCtx.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0.025, "#fff");
    gradient.addColorStop(0.1, `hsl(217, 61%, 33%)`);
    gradient.addColorStop(0.25, `hsl(217, 64%, 6%)`);
    gradient.addColorStop(1, "transparent");
    pCtx.fillStyle = gradient;
    pCtx.beginPath();
    pCtx.arc(half, half, half, 0, Math.PI * 2);
    pCtx.fill();
    const texture = new THREE.CanvasTexture(pCanvas);

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const alphas = new Float32Array(PARTICLE_COUNT);
    const velocities = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * window.innerWidth * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
      positions[i * 3 + 2] = 0;
      alphas[i] = Math.random();
      velocities[i] = Math.random() * 60 + 30;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: { value: texture },
        size: { value: 15.0 },
      },
      vertexShader: `
        attribute float alpha;
        varying float vAlpha;
        void main() {
          vAlpha = alpha;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 15.0;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying float vAlpha;
        void main() {
          gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha) * texture2D(pointTexture, gl_PointCoord);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const pos = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos[i * 3] += velocities[i] * 0.016;
        if (pos[i * 3] > window.innerWidth / 2 + 100) {
          pos[i * 3] = -window.innerWidth / 2 - 100;
        }
      }
      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.left = -window.innerWidth / 2;
      camera.right = window.innerWidth / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, 250);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, width: '100%', height: '250px', zIndex: 0, pointerEvents: 'none' }} />;
};

const ScannerAura: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;

    let rafId: number;
    const particles: any[] = [];
    const maxParticles = 150; // Reduced count

    const createParticle = () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 4,
      y: Math.random() * canvas.height,
      vx: Math.random() * 2 + 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      life: 1.0,
      decay: Math.random() * 0.02 + 0.01,
      size: Math.random() * 1.5 + 0.5,
    });

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (particles.length < maxParticles) {
        particles.push(createParticle());
      }

      ctx.fillStyle = '#00ffff'; // Single color fill is faster

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = p.life;
        // Use fillRect instead of arc for performance
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      }
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 250;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, width: '100%', height: '250px', zIndex: 15, pointerEvents: 'none' }} />;
};

const ProjectCardStream: React.FC = () => {
  const positionRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const cardLineRef = useRef<HTMLDivElement>(null);
  const lastMouseX = useRef(0);
  const velocity = useRef(85); // Final refined speed
  const direction = useRef(1); // Left to Right

  const projects: Project[] = useMemo(() => [
    {
      id: 1,
      title: 'Auth System',
      image: '/images/projects/auth-system.png',
      url: 'https://github.com/Mohak-787/auth-system',
      description: 'Robust authentication system using JWT and Refresh Tokens with advanced security features.',
      isFeatured: true
    },
    {
      id: 2,
      title: 'MoveX Backend',
      image: '/images/projects/movex-backend.png',
      url: 'https://github.com/Mohak-787/MoveX-Backend',
      description: 'Scalable backend for storage services with real-time tracking.',
    },
    {
      id: 3,
      title: 'BankLedger',
      image: '/images/projects/bankledger-backend.png',
      url: 'https://github.com/Mohak-787/BankLedger-Backend',
      description: 'Secure banking ledger system with transaction processing and audit logs.',
    },
    {
      id: 4,
      title: 'Chatiee',
      image: '/images/projects/chatiee.png',
      url: 'https://github.com/Mohak-787/chatiee',
      description: 'Real-time chat app with group messaging and file sharing.',
    },
  ], []);
  const displayProjects = useMemo(() => [...projects, ...projects, ...projects], [projects]);
  const totalWidth = displayProjects.length * (CARD_WIDTH + CARD_GAP);

  useEffect(() => {
    let lastTime = performance.now();
    let rafId: number;

    const animate = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (!isDragging && !isPaused) {
        positionRef.current += velocity.current * direction.current * dt;
        if (positionRef.current < -totalWidth / 2) positionRef.current += totalWidth / 3;
        if (positionRef.current > 0) positionRef.current -= totalWidth / 3;
      }

      // High-performance DOM update
      if (cardLineRef.current) {
        cardLineRef.current.style.transform = `translateX(${positionRef.current}px)`;

        const cards = cardLineRef.current.children;
        const scannerX = window.innerWidth / 2;
        const scannerLeft = scannerX - SCAN_WIDTH / 2;
        const scannerRight = scannerX + SCAN_WIDTH / 2;

        for (let i = 0; i < cards.length; i++) {
          const card = cards[i] as HTMLElement;
          const cardLeft = positionRef.current + i * (CARD_WIDTH + CARD_GAP);
          const cardRight = cardLeft + CARD_WIDTH;

          const normalCard = card.querySelector('.card-normal') as HTMLElement;
          const asciiCard = card.querySelector('.card-ascii') as HTMLElement;
          if (!normalCard || !asciiCard) continue;

          if (cardLeft < scannerRight && cardRight > scannerLeft) {
            const scannerIntersectLeft = Math.max(scannerLeft - cardLeft, 0);
            const scannerIntersectRight = Math.min(scannerRight - cardLeft, CARD_WIDTH);
            normalCard.style.setProperty("--clip-right", `${(scannerIntersectLeft / CARD_WIDTH) * 100}%`);
            asciiCard.style.setProperty("--clip-left", `${(scannerIntersectRight / CARD_WIDTH) * 100}%`);
          } else {
            if (cardRight < scannerLeft) {
              normalCard.style.setProperty("--clip-right", "100%");
              asciiCard.style.setProperty("--clip-left", "100%");
            } else {
              normalCard.style.setProperty("--clip-right", "0%");
              asciiCard.style.setProperty("--clip-left", "0%");
            }
          }
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isDragging, totalWidth, isPaused]);

  const onMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    lastMouseX.current = clientX;
  };

  const onMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - lastMouseX.current;
    lastMouseX.current = clientX;
    positionRef.current += deltaX;

    // Bounds check during drag
    if (positionRef.current < -totalWidth / 2) positionRef.current += totalWidth / 3;
    if (positionRef.current > 0) positionRef.current -= totalWidth / 3;
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    positionRef.current -= delta;

    // Bounds check during scroll
    if (positionRef.current < -totalWidth / 2) positionRef.current += totalWidth / 3;
    if (positionRef.current > 0) positionRef.current -= totalWidth / 3;
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onMouseMove);
      window.addEventListener('touchend', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className="card-stream-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onWheel={onWheel}
      style={{
        position: 'relative',
        width: '100vw',
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#000000',
      }}
    >
      <BackgroundParticles />

      <div
        className="card-line"
        ref={cardLineRef}
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: `${CARD_GAP}px`,
          position: 'absolute',
          left: 0,
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          willChange: 'transform',
        }}
      >
        {displayProjects.map((project, idx) => (
          <ProjectCard
            key={`${project.id}-${idx}`}
            project={project}
          />
        ))}
      </div>

      <ScannerAura />

      <div
        className="scanner-line"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '3px',
          height: '350px',
          borderRadius: '30px',
          background: 'linear-gradient(to bottom, transparent, #0891b2, #0891b2, #0891b2, transparent)',
          boxShadow: '0 0 15px #0891b2, 0 0 30px rgba(8, 145, 178, 0.3)',
          zIndex: 20,
        }}
      />
    </div>
  );
};

export default ProjectCardStream;
