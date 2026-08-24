'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, MapPin, Phone } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 30);

      // Active link tracker
      const collectionEl = document.getElementById('collection');
      const aboutEl = document.getElementById('about');
      const contactEl = document.getElementById('contact');

      if (contactEl && scrollY >= contactEl.offsetTop - 300) {
        setActiveSection('contact');
      } else if (aboutEl && scrollY >= aboutEl.offsetTop - 300) {
        setActiveSection('about');
      } else if (collectionEl && scrollY >= collectionEl.offsetTop - 300) {
        setActiveSection('collection');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'home' },
    { name: 'Collection', href: '#collection', id: 'collection' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`main-navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className="luxury-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              minWidth: 0,
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f3e5ab',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                background: 'rgba(212, 175, 55, 0.08)',
                flexShrink: 0,
              }}
            >
              TO
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                TIWARI OPTICAL
              </span>
              <span
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.28em',
                  color: '#8e92a2',
                  textTransform: 'uppercase',
                  marginTop: '-2px',
                  whiteSpace: 'nowrap',
                }}
              >
                Haute Eyewear
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            <ul
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2.5rem',
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      style={{
                        textDecoration: 'none',
                        color: isActive ? '#ffffff' : '#8e92a2',
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        padding: '0.35rem 0',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.color = '#8e92a2';
                      }}
                    >
                      {link.name}
                      {isActive && (
                        <span
                          style={{
                            position: 'absolute',
                            bottom: '-2px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            backgroundColor: '#d4af37',
                            boxShadow: '0 0 8px #d4af37',
                          }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right CTA & Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a
              href="#collection"
              onClick={(e) => handleNavClick(e, '#collection')}
              className="btn-secondary desktop-explore-btn"
              style={{
                padding: '0.55rem 1.3rem',
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
              }}
            >
              <span>EXPLORE</span>
              <ArrowUpRight size={13} />
            </a>

            {/* Mobile Menu Toggle Button (Min 44x44px touch target) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              style={{
                width: '42px',
                height: '42px',
                background: mobileMenuOpen ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              className="mobile-nav-toggle"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Fullscreen Drawer */}
      <div
        className={`mobile-drawer ${mobileMenuOpen ? 'drawer-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Top bar in drawer with brand & close */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f3e5ab',
                fontSize: '0.65rem',
                fontWeight: 700,
                background: 'rgba(212, 175, 55, 0.08)',
              }}
            >
              TO
            </div>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.95rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                color: '#ffffff',
                textTransform: 'uppercase',
              }}
            >
              TIWARI OPTICAL
            </span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Center Content */}
        <div
          style={{
            textAlign: 'center',
            width: '100%',
            maxWidth: '340px',
            paddingTop: '2rem',
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.3rem 0.8rem',
              borderRadius: '9999px',
              background: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              marginBottom: '1.75rem',
            }}
          >
            <Sparkles size={11} color="#d4af37" />
            <span
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: '#f3e5ab',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Haute Eyewear Atelier
            </span>
          </div>

          {/* Nav List */}
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 2.25rem 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    style={{
                      textDecoration: 'none',
                      color: isActive ? '#d4af37' : '#ffffff',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.35rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      display: 'inline-block',
                      padding: '0.35rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: isActive ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
                      border: isActive ? '1px solid rgba(212, 175, 55, 0.25)' : '1px solid transparent',
                      transition: 'all 0.2s ease',
                      fontWeight: isActive ? 700 : 500,
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Explore Button */}
          <a
            href="#collection"
            onClick={(e) => handleNavClick(e, '#collection')}
            className="btn-primary"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              marginBottom: '2rem',
              padding: '0.9rem 1.5rem',
            }}
          >
            <span>EXPLORE 20 FRAMES</span>
            <ArrowUpRight size={15} />
          </a>

          {/* Boutique Footer Info */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              fontSize: '0.72rem',
              color: '#787d8e',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <MapPin size={13} color="#d4af37" />
              <span>Heritage Arcade, New Delhi</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <Phone size={13} color="#a3b8cc" />
              <span>+91 98765 43210</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .main-navbar {
          height: var(--header-height);
          padding: 0;
          display: flex;
          align-items: center;
          background-color: transparent;
          border-bottom: 1px solid transparent;
        }

        .navbar-scrolled {
          background-color: rgba(5, 5, 7, 0.88) !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
        }

        .desktop-nav {
          display: none;
        }

        .desktop-explore-btn {
          display: none !important;
        }

        .mobile-nav-toggle {
          display: flex;
        }

        .mobile-drawer {
          position: fixed;
          inset: 0;
          z-index: 150;
          background-color: rgba(5, 5, 7, 0.97);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          display: flex;
          flex-direction: column;
          justifyContent: center;
          alignItems: center;
          padding: 2rem 1.5rem;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transform: translateY(-8px);
        }

        .drawer-open {
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
          transform: translateY(0) !important;
        }

        @media (max-width: 899px) {
          .main-navbar {
            height: var(--header-height-mobile);
          }
        }

        @media (min-width: 900px) {
          .desktop-nav {
            display: block !important;
          }
          .desktop-explore-btn {
            display: inline-flex !important;
          }
          .mobile-nav-toggle {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
