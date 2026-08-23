'use client';

import React from 'react';
import { ArrowUp, Instagram, Facebook, Twitter, Shield, Heart } from 'lucide-react';
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
        padding: '5rem 0 2.5rem 0',
        position: 'relative',
        zIndex: 20,
      }}
    >
      <div className="luxury-container">
        {/* Main Footer Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3.5rem',
            marginBottom: '4rem',
          }}
        >
          {/* Brand Col */}
          <div style={{ maxWidth: '360px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
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
                }}
              >
                TO
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
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
                fontSize: '0.85rem',
                letterSpacing: '0.2em',
                color: '#c4c7d5',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              {SITE_CONFIG.tagline}
            </p>

            <p
              style={{
                fontSize: '0.8125rem',
                lineHeight: 1.7,
                color: '#717585',
                marginBottom: '1.5rem',
              }}
            >
              {SITE_CONFIG.description}
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <span
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9aa0b2',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Instagram size={15} />
              </span>
              <span
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9aa0b2',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Facebook size={15} />
              </span>
              <span
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9aa0b2',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Twitter size={15} />
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.875rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#ffffff',
                marginBottom: '1.5rem',
                fontWeight: 600,
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {['Home', 'Collection', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    style={{
                      color: '#8e92a2',
                      textDecoration: 'none',
                      fontSize: '0.8125rem',
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
                fontSize: '0.875rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#ffffff',
                marginBottom: '1.5rem',
                fontWeight: 600,
              }}
            >
              Silhouettes
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {['Square & Geometric', 'Classic Aviator', 'Riviera Wayfarer', 'Rimless Titanium', 'Active Performance'].map((item) => (
                <li key={item}>
                  <a
                    href="#collection"
                    style={{
                      color: '#8e92a2',
                      textDecoration: 'none',
                      fontSize: '0.8125rem',
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
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.875rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  marginBottom: '1.5rem',
                  fontWeight: 600,
                }}
              >
                Experience
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#717585', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Controlled 3D frame progression powered by GSAP Canvas rendering.
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="btn-secondary"
              style={{
                alignSelf: 'flex-start',
                padding: '0.6rem 1.25rem',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
              }}
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.75rem',
            color: '#5b6070',
          }}
        >
          <p>
            © {new Date().getFullYear()} TIWARI OPTICAL. All rights reserved. Version 1.0 (Frontend Showcase).
          </p>

          <p style={{ fontSize: '0.7rem' }}>
            Curated Demo Sunglasses Collection • WhatsApp checkout in Phase 2
          </p>
        </div>
      </div>
    </footer>
  );
}
