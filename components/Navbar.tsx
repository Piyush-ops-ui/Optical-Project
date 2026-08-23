'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Simple active link tracker
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
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          backgroundColor: isScrolled ? 'rgba(5, 5, 7, 0.85)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
          padding: isScrolled ? '1rem 0' : '1.5rem 0',
        }}
      >
        <div
          className="luxury-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
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
              gap: '0.75rem',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                background: 'rgba(255, 255, 255, 0.03)',
              }}
            >
              TO
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                }}
              >
                TIWARI OPTICAL
              </span>
              <span
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.3em',
                  color: '#838898',
                  textTransform: 'uppercase',
                  marginTop: '-2px',
                }}
              >
                Haute Eyewear
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'none',
            }}
            className="desktop-nav"
          >
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
                        padding: '0.25rem 0',
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
                            bottom: '-4px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            backgroundColor: '#ffffff',
                            boxShadow: '0 0 8px #ffffff',
                          }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right CTA / Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a
              href="#collection"
              onClick={(e) => handleNavClick(e, '#collection')}
              className="btn-secondary"
              style={{
                display: 'none',
                padding: '0.6rem 1.4rem',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
              }}
              id="desktop-explore-btn"
            >
              <span>EXPLORE</span>
              <ArrowUpRight size={14} />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                padding: '0.5rem',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="mobile-nav-toggle"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 90,
          backgroundColor: 'rgba(5, 5, 7, 0.96)',
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: mobileMenuOpen ? 1 : 0,
          visibility: mobileMenuOpen ? 'visible' : 'hidden',
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
        }}
      >
        <div style={{ textAlign: 'center', width: '100%', maxWidth: '320px' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                letterSpacing: '0.25em',
                color: '#ffffff',
                textTransform: 'uppercase',
                display: 'block',
              }}
            >
              TIWARI OPTICAL
            </span>
            <span
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                color: '#717585',
                textTransform: 'uppercase',
              }}
            >
              SEE THE WORLD DIFFERENTLY.
            </span>
          </div>

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 3rem 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem',
            }}
          >
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    textDecoration: 'none',
                    color: '#ffffff',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.4rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    display: 'block',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#collection"
            onClick={(e) => handleNavClick(e, '#collection')}
            className="btn-primary"
            style={{ width: '100%', boxSizing: 'border-box' }}
          >
            <span>EXPLORE COLLECTION</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      <style jsx global>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: block !important;
          }
          #desktop-explore-btn {
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
