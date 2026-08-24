'use client';

import React from 'react';
import { ArrowUp, Instagram, Facebook, Twitter } from 'lucide-react';
import { SITE_CONFIG } from '@/data/products';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#030305',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: 'clamp(3.5rem, 6vw, 5rem) 0 2.5rem 0',
        position: 'relative',
        zIndex: 20,
      }}
    >
      <div className="luxury-container">
        {/* Main Footer Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          {/* Brand Col */}
          <div style={{ maxWidth: '360px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
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
                }}
              >
                TO
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                }}
              >
                TIWARI OPTICAL
              </span>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.82rem',
                letterSpacing: '0.18em',
                color: '#c4c7d5',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
                fontWeight: 600,
              }}
            >
              {SITE_CONFIG.tagline}
            </p>

            <p
              style={{
                fontSize: '0.8rem',
                lineHeight: 1.65,
                color: '#717585',
                marginBottom: '1.25rem',
              }}
            >
              {SITE_CONFIG.description}
            </p>

            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <a
                href="#"
                aria-label="Instagram"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9aa0b2',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <Instagram size={15} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9aa0b2',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <Facebook size={15} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9aa0b2',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <Twitter size={15} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.85rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#ffffff',
                marginBottom: '1.25rem',
                fontWeight: 600,
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Home', 'Collection', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    style={{
                      color: '#8e92a2',
                      textDecoration: 'none',
                      fontSize: '0.8rem',
                      letterSpacing: '0.08em',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#8e92a2';
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections by Category */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.85rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#ffffff',
                marginBottom: '1.25rem',
                fontWeight: 600,
              }}
            >
              Silhouettes
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Square & Geometric', 'Classic Aviator', 'Riviera Wayfarer', 'Rimless Titanium', 'Sport Active'].map((item) => (
                <li key={item}>
                  <a
                    href="#collection"
                    style={{
                      color: '#8e92a2',
                      textDecoration: 'none',
                      fontSize: '0.8rem',
                      letterSpacing: '0.08em',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#8e92a2';
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Back to Top & Experience Note */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.5rem' }}>
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  marginBottom: '1.25rem',
                  fontWeight: 600,
                }}
              >
                Experience
              </h4>
              <p style={{ fontSize: '0.78rem', color: '#717585', lineHeight: 1.6 }}>
                3D frame progression powered by GSAP Canvas rendering.
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="btn-secondary"
              style={{
                alignSelf: 'flex-start',
                padding: '0.55rem 1.15rem',
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
              }}
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div
          style={{
            paddingTop: '1.75rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.72rem',
            color: '#5b6070',
          }}
        >
          <p>
            © {new Date().getFullYear()} TIWARI OPTICAL. All rights reserved.
          </p>

          <p style={{ fontSize: '0.7rem' }}>
            Curated Eyewear Showcase • New Delhi
          </p>
        </div>
      </div>
    </footer>
  );
}

