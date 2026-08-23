'use client';

import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  progress: number;
  isLoaded: boolean;
}

export default function LoadingScreen({ progress, isLoaded }: LoadingScreenProps) {
  const [shouldRender, setShouldRender] = useState<boolean>(true);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  if (!shouldRender) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#050507',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s',
        opacity: isLoaded ? 0 : 1,
        pointerEvents: isLoaded ? 'none' : 'auto',
        visibility: isLoaded ? 'hidden' : 'visible',
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(0, 0, 0, 0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 10, maxWidth: '480px', width: '100%' }}>
        {/* Brand Monogram / Icon */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              fontWeight: 600,
              boxShadow: '0 0 25px rgba(255, 255, 255, 0.1)',
            }}
          >
            TO
          </div>
        </div>

        {/* Brand Title */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
            letterSpacing: '0.3em',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
          }}
        >
          TIWARI OPTICAL
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.3em',
            color: '#8e92a0',
            textTransform: 'uppercase',
            marginBottom: '3rem',
            fontWeight: 400,
          }}
        >
          SEE THE WORLD DIFFERENTLY.
        </p>

        {/* Progress bar container */}
        <div
          style={{
            width: '100%',
            height: '2px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '2px',
            marginBottom: '1.25rem',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: `${Math.max(progress, isLoaded ? 100 : 0)}%`,
              background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, #ffffff 100%)',
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.8)',
              transition: 'width 0.25s ease-out',
            }}
          />
        </div>

        {/* Progress Text */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            color: '#656a79',
            textTransform: 'uppercase',
          }}
        >
          <span>Curating Experience</span>
          <span style={{ color: '#ffffff', fontWeight: 600 }}>{Math.max(progress, isLoaded ? 100 : 0)}%</span>
        </div>
      </div>
    </div>
  );
}
