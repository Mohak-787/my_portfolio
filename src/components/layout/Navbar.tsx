import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(prev => prev === scrolled ? prev : scrolled);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5%',
        transition: 'all 0.3s ease',
        backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.7)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
      }}
    >
      {/* Logo */}
      <a href="#home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img
          src="images/icon.png"
          alt="Logo"
          style={{ height: '42px', width: 'auto' }}
        />
      </a>

      {/* Navigation Links */}
      <div style={{ display: 'flex', gap: '32px' }}>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            style={{
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: '17px',
              fontWeight: 600,
              fontFamily: 'Outfit, sans-serif',
              letterSpacing: '0.02em',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#94A3B8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
            }}
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
