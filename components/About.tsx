'use client';

import React from 'react';
import { Eye, Shield, Feather, Sparkles } from 'lucide-react';

export default function About() {
  const craftFeatures = [
    {
      icon: <Shield size={22} color="#d4af37" />,
      title: 'Optically Pure Polarized TAC',
      description: 'Engineered with 99.9% anti-glare filtering and full spectrum UV400 solar shielding for uncompromising clarity.',
    },
    {
      icon: <Feather size={22} color="#a3b8cc" />,
      title: 'Featherlight Ergonomics',
      description: 'Sculpted from aerospace-grade Japanese titanium and lightweight Italian bio-acetate for all-day weightless comfort.',
    },
    {
      icon: <Eye size={22} color="#ffffff" />,
      title: 'Bespoke Contour Fit',
      description: 'Precision-angled temples and hand-aligned 5-barrel hinges designed to contour naturally to every facial architecture.',
    },
  ];

  return (
    <section
      id="about"
      style={{
        backgroundColor: '#07080c',
        padding: 'clamp(4.5rem, 8vw, 7rem) 0 clamp(4rem, 6vw, 6rem) 0',
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
          width: 'clamp(300px, 50vw, 600px)',
          height: 'clamp(300px, 50vw, 600px)',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.03) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div className="luxury-container" style={{ position: 'relative', zIndex: 10 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(2.5rem, 5vw, 4.5rem)',
            alignItems: 'center',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
          }}
        >
          {/* Left: Editorial Headline */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.3rem 0.85rem',
                borderRadius: '9999px',
                background: 'rgba(212, 175, 55, 0.08)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                marginBottom: '1rem',
              }}
            >
              <Sparkles size={12} color="#d4af37" />
              <span
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.22em',
                  color: '#f3e5ab',
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
                fontSize: 'clamp(1.85rem, 4.2vw, 3.5rem)',
                lineHeight: 1.15,
                letterSpacing: '0.15em',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
              }}
            >
              CRAFTED FOR <br />
              <span className="text-gradient-silver">YOUR VIEW.</span>
            </h2>

            <p
              style={{
                fontSize: 'clamp(0.92rem, 1.3vw, 1.12rem)',
                lineHeight: 1.75,
                color: '#b0b5c5',
                marginBottom: '1.25rem',
                fontWeight: 400,
              }}
            >
              Tiwari Optical brings together premium eyewear styles for customers who value distinctive design, comfort, and everyday confidence. Explore our curated sunglasses collection and find a frame that feels unmistakably yours.
            </p>

            <p
              style={{
                fontSize: '0.85rem',
                lineHeight: 1.65,
                color: '#787d8e',
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
                height: 'clamp(240px, 45vw, 420px)',
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
                padding: 'clamp(1.25rem, 3vw, 2rem)',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.62rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#d4af37',
                    display: 'block',
                    marginBottom: '0.3rem',
                    fontWeight: 600,
                  }}
                >
                  Authentic Geometry
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(1.25rem, 2.5vw, 2rem)',
          }}
        >
          {craftFeatures.map((feature, idx) => (
            <div
              key={idx}
              style={{
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                backgroundColor: 'rgba(255, 255, 255, 0.025)',
                borderRadius: '18px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.025)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.15rem',
                }}
              >
                {feature.icon}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.1rem',
                  letterSpacing: '0.06em',
                  color: '#ffffff',
                  marginBottom: '0.6rem',
                  fontWeight: 600,
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: '0.82rem',
                  lineHeight: 1.6,
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

