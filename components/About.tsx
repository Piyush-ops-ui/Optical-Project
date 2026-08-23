'use client';

import React from 'react';
import { Eye, Shield, Feather, Sparkles } from 'lucide-react';

export default function About() {
  const craftFeatures = [
    {
      icon: <Shield size={24} color="#d4af37" />,
      title: 'Optically Pure Polarized TAC',
      description: 'Engineered with 99.9% anti-glare filtering and full spectrum UV400 solar shielding for uncompromising clarity.',
    },
    {
      icon: <Feather size={24} color="#a3b8cc" />,
      title: 'Featherlight Ergonomics',
      description: 'Sculpted from aerospace-grade Japanese titanium and lightweight Italian bio-acetate for all-day weightless comfort.',
    },
    {
      icon: <Eye size={24} color="#ffffff" />,
      title: 'Bespoke Contour Fit',
      description: 'Precision-angled temples and hand-aligned 5-barrel hinges designed to contour naturally to every facial architecture.',
    },
  ];

  return (
    <section
      id="about"
      style={{
        backgroundColor: '#07080c',
        padding: '7rem 0 6rem 0',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div className="luxury-container" style={{ position: 'relative', zIndex: 10 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
            marginBottom: '5rem',
          }}
        >
          {/* Left: Editorial Headline */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.9rem',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                marginBottom: '1.25rem',
              }}
            >
              <Sparkles size={13} color="#d4af37" />
              <span
                style={{
                  fontSize: '0.68rem',
                  letterSpacing: '0.25em',
                  color: '#d4af37',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Our Philosophy
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
                lineHeight: 1.15,
                letterSpacing: '0.15em',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
              }}
            >
              CRAFTED FOR <br />
              <span className="text-gradient-silver">YOUR VIEW.</span>
            </h2>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                lineHeight: 1.8,
                color: '#b0b5c5',
                marginBottom: '1.5rem',
                fontWeight: 400,
              }}
            >
              Tiwari Optical brings together premium eyewear styles for customers who value distinctive design, comfort, and everyday confidence. Explore our curated sunglasses collection and find a frame that feels unmistakably yours.
            </p>

            <p
              style={{
                fontSize: '0.9rem',
                lineHeight: 1.7,
                color: '#717585',
              }}
            >
              Every piece in our showcase is selected to marry timeless optical heritage with modern minimalist refinement.
            </p>
          </div>

          {/* Right: Architectural Visual Card */}
          <div
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
              backgroundColor: '#0c0e14',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/frames/ezgif-frame-018.jpg"
              alt="Tiwari Optical Craftsmanship"
              style={{
                width: '100%',
                height: '420px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(7, 8, 12, 0.95) 0%, transparent 60%)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '2rem',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: '#d4af37',
                    display: 'block',
                    marginBottom: '0.35rem',
                  }}
                >
                  Authentic Geometry
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    letterSpacing: '0.12em',
                    color: '#ffffff',
                    fontWeight: 600,
                  }}
                >
                  Precision In Every Curve
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Craft Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {craftFeatures.map((feature, idx) => (
            <div
              key={idx}
              style={{
                padding: '2rem',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
              }}
            >
              <div style={{ marginBottom: '1.25rem' }}>{feature.icon}</div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.15rem',
                  letterSpacing: '0.06em',
                  color: '#ffffff',
                  marginBottom: '0.75rem',
                  fontWeight: 600,
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: '0.85rem',
                  lineHeight: 1.65,
                  color: '#8e92a2',
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
