import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';

// --- Types ---

interface Project {
  id: number;
  title: string;
  image: string;
  url: string;
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

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [asciiContent, setAsciiContent] = useState("");

  useEffect(() => {
    setAsciiContent(generateCode(66, 19));
  }, []);

  useEffect(() => {
    const updateClipping = () => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const scannerX = window.innerWidth / 2;
      const scannerLeft = scannerX - SCAN_WIDTH / 2;
      const scannerRight = scannerX + SCAN_WIDTH / 2;

      const cardLeft = rect.left;
      const cardRight = rect.right;
      const width = rect.width;

      const normalCard = cardRef.current.querySelector('.card-normal') as HTMLElement;
      const asciiCard = cardRef.current.querySelector('.card-ascii') as HTMLElement;

      if (!normalCard || !asciiCard) return;

      if (cardLeft < scannerRight && cardRight > scannerLeft) {
        const scannerIntersectLeft = Math.max(scannerLeft - cardLeft, 0);
        const scannerIntersectRight = Math.min(scannerRight - cardLeft, width);

        const normalClipRight = (scannerIntersectLeft / width) * 100;
        const asciiClipLeft = (scannerIntersectRight / width) * 100;

        normalCard.style.setProperty("--clip-right", `${normalClipRight}%`);
        asciiCard.style.setProperty("--clip-left", `${asciiClipLeft}%`);
      } else {
        if (cardRight < scannerLeft) {
          normalCard.style.setProperty("--clip-right", "100%");
          asciiCard.style.setProperty("--clip-left", "100%");
        } else if (cardLeft > scannerRight) {
          normalCard.style.setProperty("--clip-right", "0%");
          asciiCard.style.setProperty("--clip-left", "0%");
        }
      }
    };

    const raf = requestAnimationFrame(function animate() {
      updateClipping();
      requestAnimationFrame(animate);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      className="card-wrapper"
      style={{
        position: 'relative',
        width: `${CARD_WIDTH}px`,
        height: '250px',
        flexShrink: 0,
        display: 'block',
        textDecoration: 'none',
        transition: 'transform 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <div
        className="card card-normal"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '15px',
          overflow: 'hidden',
          zIndex: 2,
          clipPath: 'inset(0 0 0 var(--clip-right, 0%))',
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)',
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.9) contrast(1.1)',
          }}
        />
        <div style={{
          position: 'absolute',
          bottom: '24px',
          left: '24px',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
          textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}>
          {project.title}
        </div>
      </div>

      <div
        className="card card-ascii"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '15px',
          overflow: 'hidden',
          zIndex: 1,
          backgroundColor: 'transparent',
          clipPath: 'inset(0 calc(100% - var(--clip-left, 0%)) 0 0)',
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
            color: 'rgba(220, 210, 255, 0.6)',
            fontFamily: '"Courier New", monospace',
            fontSize: '11px',
            lineHeight: '13px',
            whiteSpace: 'pre',
            padding: '10px',
            maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 100%)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 100%)',
          }}
        >
          {asciiContent}
        </div>
      </div>
    </a>
  );
};

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
    const maxParticles = 300;

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

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(0.5, 'rgba(139, 92, 246, 1)');
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.fillRect(canvas.width / 2 - 2, 0, 4, canvas.height);

      if (particles.length < maxParticles) {
        particles.push(createParticle());
      }

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
        ctx.fillStyle = '#c4b5fd';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 300;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, width: '100%', height: '300px', zIndex: 15, pointerEvents: 'none' }} />;
};

const ProjectCardStream: React.FC = () => {
  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const lastMouseX = useRef(0);
  const velocity = useRef(50);
  const direction = useRef(1);

  const projects: Project[] = useMemo(() => [
    { 
      id: 1, 
      title: 'AUTH SYSTEM', 
      image: '/images/projects/auth-system.png', 
      url: 'https://github.com/Mohak-787/auth-system' 
    },
    { 
      id: 2, 
      title: 'MOVEX BACKEND', 
      image: '/images/projects/movex-backend.png', 
      url: 'https://github.com/Mohak-787/MoveX-Backend' 
    },
    { 
      id: 3, 
      title: 'BANKLEDGER', 
      image: '/images/projects/bankledger-backend.png', 
      url: 'https://github.com/Mohak-787/BankLedger-Backend' 
    },
    { 
      id: 4, 
      title: 'CHATIEE', 
      image: '/images/projects/chatiee.png', 
      url: 'https://github.com/Mohak-787/chatiee' 
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

      if (!isDragging) {
        setPosition(prev => {
          let next = prev + velocity.current * direction.current * dt;
          if (next < -totalWidth / 2) next += totalWidth / 3;
          if (next > 0) next -= totalWidth / 3;
          return next;
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isDragging, totalWidth]);

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
    setPosition(prev => prev + deltaX);
  };

  const onMouseUp = () => {
    setIsDragging(false);
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
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: `${CARD_GAP}px`,
          position: 'absolute',
          left: 0,
          transform: `translateX(${position}px)`,
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
          width: '4px',
          height: '350px',
          borderRadius: '30px',
          background: 'linear-gradient(to bottom, transparent, #00ffff, #00ffff, #00ffff, transparent)',
          boxShadow: '0 0 20px #00ffff, 0 0 40px rgba(0, 255, 255, 0.4)',
          zIndex: 20,
        }}
      />
    </div>
  );
};

export default ProjectCardStream;
