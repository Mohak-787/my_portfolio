import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      width: '100%',
      padding: '14px 24px',
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      borderTop: '1px solid rgba(255, 255, 255, 0.12)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}>
      <div style={{
        maxWidth: '1100px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        opacity: 0.8,
      }}>
        <p style={{
          fontSize: '15px',
          color: '#94A3B8',
          fontFamily: "'Outfit', sans-serif",
          margin: 0,
          letterSpacing: '0.02em',
          fontWeight: 500,
        }}>
          © {currentYear} Mohak Devkota. Engineering scalable software with precision.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
