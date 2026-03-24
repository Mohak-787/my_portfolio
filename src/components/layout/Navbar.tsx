import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(prev => prev === scrolled ? prev : scrolled);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize if switching to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
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
          backgroundColor: isScrolled || isMenuOpen ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
          backdropFilter: isScrolled || isMenuOpen ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: isScrolled || isMenuOpen ? 'blur(12px)' : 'none',
          borderBottom: isScrolled || isMenuOpen ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        }}
      >
        {/* Logo */}
        <a href="#home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', zIndex: 1001 }}>
          <img
            src="images/icon.png"
            alt="Logo"
            style={{ height: '42px', width: 'auto' }}
          />
        </a>

        {/* Desktop Navigation Links */}
        <div
          className="desktop-menu"
          style={{
            display: 'flex',
            gap: '32px',
          }}
        >
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

        {/* Hamburger Menu Toggle (Mobile) */}
        <button
          className="mobile-toggle"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            zIndex: 1001,
            color: '#FFFFFF',
            position: 'relative',
            width: '32px',
            height: '32px'
          }}
        >
          <div style={{
            position: 'absolute',
            width: '24px',
            height: '2px',
            backgroundColor: 'currentColor',
            transition: 'all 0.3s ease',
            top: '50%',
            left: '50%',
            transform: isMenuOpen ? 'translate(-50%, -50%) rotate(45deg)' : 'translate(-50%, -10px)',
          }} />
          <div style={{
            position: 'absolute',
            width: isMenuOpen ? '0' : '24px',
            height: '2px',
            backgroundColor: 'currentColor',
            transition: 'all 0.2s ease',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: isMenuOpen ? 0 : 1
          }} />
          <div style={{
            position: 'absolute',
            width: '24px',
            height: '2px',
            backgroundColor: 'currentColor',
            transition: 'all 0.3s ease',
            top: '50%',
            left: '50%',
            transform: isMenuOpen ? 'translate(-50%, -50%) rotate(-45deg)' : 'translate(-50%, 6px)',
          }} />
        </button>
      </nav>

      {/* Mobile Menu Drawer Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100dvh',
          backgroundColor: 'rgba(0, 0, 0, 0.98)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? 'all' : 'none',
          visibility: isMenuOpen ? 'visible' : 'hidden',
          paddingTop: '80px',
        }}
      >
        {navLinks.map((link, idx) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsMenuOpen(false)}
            style={{
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: '28px',
              fontWeight: 700,
              fontFamily: 'Outfit, sans-serif',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.4s ease ${idx * 0.1}s`,
              opacity: isMenuOpen ? 1 : 0,
            }}
          >
            {link.name}
          </a>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}} />
    </>
  );
};

export default Navbar;
