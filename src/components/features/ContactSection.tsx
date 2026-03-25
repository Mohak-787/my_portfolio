import React from 'react';
import { Mail, Linkedin, Github, ArrowRight } from 'lucide-react';

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  detail: string;
  link: string;
  linkText: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ icon, title, detail, link, linkText }) => {
  return (
    <div style={{
      flex: '1',
      minWidth: '320px',
      maxWidth: '380px',
      background: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(24px) saturate(200%)',
      WebkitBackdropFilter: 'blur(24px) saturate(200%)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '24px',
      padding: '44px 28px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: '24px',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      cursor: 'default',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
    }}
      className="group"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px)';
        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        e.currentTarget.style.boxShadow = '0 40px 80px -12px rgba(0, 0, 0, 0.8)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.7)';
      }}
    >
      {/* Glare Effect on Hover */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '50%',
          height: '100%',
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)',
          transform: 'skewX(-25deg)',
          transition: '0.75s',
          pointerEvents: 'none',
        }}
        className="contact-glare"
      />

      {/* Icon Circle */}
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        marginBottom: '4px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      }}>
        {icon}
      </div>

      <div>
        <h3 style={{
          fontSize: '22px',
          fontWeight: 800,
          color: '#FFFFFF',
          fontFamily: 'Outfit, sans-serif',
          margin: '0 0 10px 0',
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          background: "linear-gradient(to bottom, #FFFFFF 70%, #CBD5E1 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: '15px',
          color: '#CBD5E1',
          fontFamily: "'Outfit', sans-serif",
          margin: 0,
          wordBreak: 'break-all',
          lineHeight: '1.5',
        }}>
          {detail}
        </p>
      </div>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          fontWeight: 600,
          color: '#FFFFFF',
          textDecoration: 'none',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          transition: 'all 0.3s ease',
          padding: '8px 16px',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#FFFFFF';
          e.currentTarget.style.color = '#000000';
          e.currentTarget.style.gap = '12px';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.color = '#FFFFFF';
          e.currentTarget.style.gap = '8px';
        }}
      >
        {linkText} <ArrowRight size={16} />
      </a>

      {/* Styled radial glow in background */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      <style dangerouslySetInnerHTML={{
        __html: `
        .group:hover .contact-glare {
          left: 150%;
        }
      `}} />
    </div>
  );
};

const ContactSection: React.FC = () => {
  return (
    <div style={{
      width: '100%',
      maxWidth: '1100px',
      margin: '56px auto 0',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '28px',
      padding: '0 24px 12px',
    }}>
      <ContactCard
        icon={<Mail size={28} />}
        title="Email"
        detail="contact.mohakdevkota@gmail.com"
        link="mailto:contact.mohakdevkota@gmail.com"
        linkText="Send Email"
      />
      <ContactCard
        icon={<Linkedin size={28} />}
        title="LinkedIn"
        detail="linkedin.com/in/mohakdevkota"
        link="https://www.linkedin.com/in/mohakdevkota/"
        linkText="Connect"
      />
      <ContactCard
        icon={<Github size={28} />}
        title="GitHub"
        detail="github.com/Mohak-787"
        link="https://github.com/Mohak-787"
        linkText="Follow"
      />
    </div>
  );
};

export default ContactSection;
