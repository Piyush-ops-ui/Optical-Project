'use client';

import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  progress: number;
  isLoaded: boolean;
}

export default function LoadingScreen({ progress, isLoaded }: LoadingScreenProps) {
  const [displayProgress, setDisplayProgress] = useState<number>(0);
  const [shouldRender, setShouldRender] = useState<boolean>(true);

  // Smoothly increment progress
  useEffect(() => {
    const target = isLoaded ? 100 : Math.max(progress, 15);

    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev >= target) {
          if (isLoaded) return 100;
          return prev;
        }
        const step = Math.max(1, Math.ceil((target - prev) / 4));
        return Math.min(target, prev + step);
      });
    }, 30);

    return () => clearInterval(interval);
  }, [progress, isLoaded]);

  // Dismiss after load completes
  useEffect(() => {
    if (isLoaded && displayProgress >= 95) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, displayProgress]);

  if (!shouldRender) return null;

  const currentPercent = isLoaded ? 100 : displayProgress;

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
        opacity: isLoaded && displayProgress >= 95 ? 0 : 1,
        pointerEvents: isLoaded && displayProgress >= 95 ? 'none' : 'auto',
        visibility: isLoaded && displayProgress >= 95 ? 'hidden' : 'visible',
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, rgba(0, 0, 0, 0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 10, maxWidth: '480px', width: '100%' }}>
        {/* Brand Monogram */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f3e5ab',
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              fontWeight: 700,
              boxShadow: '0 0 25px rgba(212, 175, 55, 0.15)',
              background: 'rgba(212, 175, 55, 0.05)',
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
              width: `${currentPercent}%`,
              background: 'linear-gradient(90deg, #d4af37 0%, #ffffff 100%)',
              boxShadow: '0 0 15px rgba(212, 175, 55, 0.8)',
              transition: 'width 0.15s ease-out',
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
          <span style={{ color: '#ffffff', fontWeight: 600 }}>{currentPercent}%</span>
        </div>
      </div>
    </div>
  );
}

