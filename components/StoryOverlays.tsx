'use client';

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { ArrowRight, Sparkles, Shield, Eye, Compass } from 'lucide-react';

export interface StoryOverlaysHandle {
  updateProgress: (progress: number) => void;
}

const StoryOverlays = forwardRef<StoryOverlaysHandle, {}>((props, ref) => {
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);
  const phase4Ref = useRef<HTMLDivElement>(null);
  const phase5Ref = useRef<HTMLDivElement>(null);

  // Compute transform and opacity smoothly
  const getPhaseStyles = (progress: number, start: number, peakIn: number, peakOut: number, end: number) => {
    if (progress < start || progress > end) {
      return { opacity: '0', transform: 'translate3d(0, 14px, 0)', pointerEvents: 'none' };
    }
    let opacity = 0;
    let translateY = 0;

    if (progress >= start && progress < peakIn) {
      const t = (progress - start) / (peakIn - start);
      opacity = t;
      translateY = (1 - t) * 14;
    } else if (progress >= peakIn && progress <= peakOut) {
      opacity = 1;
      translateY = 0;
    } else if (progress > peakOut && progress <= end) {
      const t = (progress - peakOut) / (end - peakOut);
      opacity = 1 - t;
      translateY = -t * 14;
    }

    return {
      opacity: opacity.toFixed(3),
      transform: `translate3d(0, ${translateY.toFixed(1)}px, 0)`,
      pointerEvents: opacity > 0.25 ? 'auto' : 'none',
    };
  };

  useImperativeHandle(ref, () => ({
    updateProgress: (progress: number) => {
      // Phase 1: Hero (Progress 0 to 0.20)
      if (phase1Ref.current) {
        const s = getPhaseStyles(progress, -0.05, 0.0, 0.13, 0.21);
        phase1Ref.current.style.opacity = s.opacity;
        phase1Ref.current.style.transform = s.transform;
        phase1Ref.current.style.pointerEvents = s.pointerEvents;
      }

      // Phase 2: Through The Lens (Progress 0.23 to 0.45)
      if (phase2Ref.current) {
        const s = getPhaseStyles(progress, 0.23, 0.29, 0.38, 0.45);
        phase2Ref.current.style.opacity = s.opacity;
        phase2Ref.current.style.transform = s.transform;
        phase2Ref.current.style.pointerEvents = s.pointerEvents;
      }

      // Phase 3: Architectural Sanctuary (Progress 0.48 to 0.69)
      if (phase3Ref.current) {
        const s = getPhaseStyles(progress, 0.48, 0.54, 0.62, 0.69);
        phase3Ref.current.style.opacity = s.opacity;
        phase3Ref.current.style.transform = s.transform;
        phase3Ref.current.style.pointerEvents = s.pointerEvents;
      }

      // Phase 4: The Collection Emergence (Progress 0.71 to 0.86)
      if (phase4Ref.current) {
        const s = getPhaseStyles(progress, 0.71, 0.76, 0.82, 0.87);
        phase4Ref.current.style.opacity = s.opacity;
        phase4Ref.current.style.transform = s.transform;
        phase4Ref.current.style.pointerEvents = s.pointerEvents;
      }

      // Phase 5: Final Brand Climax (Progress 0.88 to 1.0)
      if (phase5Ref.current) {
        const s = getPhaseStyles(progress, 0.88, 0.93, 1.0, 1.05);
        phase5Ref.current.style.opacity = s.opacity;
        phase5Ref.current.style.transform = s.transform;
        phase5Ref.current.style.pointerEvents = s.pointerEvents;
      }
    },
  }));

  const scrollToCollection = (e: React.MouseEvent) => {
    e.preventDefault();
    const collectionEl = document.getElementById('collection');
    if (collectionEl) {
      collectionEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="story-overlays-root"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <div
        className="luxury-container"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        
        {/* =========================================================================
            PHASE 1: HERO OVERLAY (Dedicated mobile top header + bottom card)
           ========================================================================= */}
        <div
          ref={phase1Ref}
          className="hero-overlay-wrapper"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 1,
            transform: 'translate3d(0, 0, 0)',
            pointerEvents: 'auto',
            transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
            willChange: 'opacity, transform',
            display: 'flex',
          }}
        >
          {/* Mobile Top Brand Header (Visible only on mobile <= 768px) */}
          <div className="mobile-hero-top">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                background: 'rgba(10, 12, 18, 0.85)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                backdropFilter: 'blur(12px)',
                marginBottom: '0.35rem',
              }}
            >
              <Sparkles size={10} color="#d4af37" />
              <span
                style={{
                  fontSize: '0.62rem',
                  letterSpacing: '0.2em',
                  color: '#f3e5ab',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Haute Eyewear Atelier
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.4rem, 4.8vw, 2rem)',
                lineHeight: 1.15,
                letterSpacing: '0.18em',
                fontWeight: 800,
                color: '#ffffff',
                textTransform: 'uppercase',
                margin: 0,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
              }}
            >
              TIWARI OPTICAL
            </h1>
          </div>

          {/* Desktop Card & Mobile Lower Controls */}
          <div className="hero-overlay-card">
            {/* Desktop-only badge and title */}
            <div className="desktop-hero-header">
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '9999px',
                  background: 'rgba(10, 12, 18, 0.8)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  backdropFilter: 'blur(12px)',
                  marginBottom: '0.75rem',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
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

              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.85rem, 3.8vw, 3.25rem)',
                  lineHeight: 1.12,
                  letterSpacing: 'clamp(0.12em, 0.2vw, 0.2em)',
                  fontWeight: 800,
                  color: '#ffffff',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                }}
              >
                TIWARI <br />
                <span className="text-gradient-silver">OPTICAL</span>
              </h1>
            </div>

            {/* Tagline */}
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(0.82rem, 1.4vw, 1.1rem)',
                letterSpacing: 'clamp(0.12em, 0.2vw, 0.22em)',
                color: '#ffffff',
                textTransform: 'uppercase',
                marginBottom: '0.4rem',
                fontWeight: 600,
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
              }}
              className="hero-tagline"
            >
              SEE THE WORLD DIFFERENTLY.
            </p>

            {/* Brand Description */}
            <p
              style={{
                fontSize: 'clamp(0.76rem, 0.95vw, 0.88rem)',
                lineHeight: 1.55,
                color: '#c4c8d8',
                maxWidth: '460px',
                marginBottom: '0.9rem',
                fontWeight: 400,
                textShadow: '0 1px 6px rgba(0,0,0,0.9)',
              }}
              className="hero-description"
            >
              Discover premium sunglasses curated for distinctive style, everyday comfort, and timeless design.
            </p>

            {/* Call To Action Buttons */}
            <div className="hero-cta-group">
              <button
                onClick={scrollToCollection}
                className="btn-primary hero-btn"
                style={{
                  padding: '0.65rem 1.25rem',
                  fontSize: '0.72rem',
                  letterSpacing: '0.14em',
                }}
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight size={13} />
              </button>
              <a
                href="#about"
                className="btn-secondary hero-btn"
                style={{
                  padding: '0.65rem 1.15rem',
                  fontSize: '0.72rem',
                  letterSpacing: '0.14em',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>DISCOVER CRAFT</span>
              </a>
            </div>
          </div>
        </div>


        {/* =========================================================================
            PHASE 2: THROUGH THE LENS
           ========================================================================= */}
        <div
          ref={phase2Ref}
          className="story-phase-card phase-right"
          style={{
            position: 'absolute',
            opacity: 0,
            transform: 'translate3d(0, 14px, 0)',
            pointerEvents: 'none',
            transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
            willChange: 'opacity, transform',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.28rem 0.75rem',
              borderRadius: '9999px',
              background: 'rgba(10, 12, 18, 0.85)',
              border: '1px solid rgba(163, 184, 204, 0.35)',
              backdropFilter: 'blur(12px)',
              marginBottom: '0.5rem',
            }}
          >
            <Eye size={12} color="#a3b8cc" />
            <span
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.2em',
                color: '#a3b8cc',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Precision Optics
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.35rem, 3.2vw, 2.75rem)',
              lineHeight: 1.15,
              letterSpacing: '0.15em',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '0.45rem',
              textTransform: 'uppercase',
            }}
          >
            THROUGH <br className="desktop-break" />
            <span className="text-gradient-silver">THE LENS</span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.76rem, 0.95vw, 0.88rem)',
              lineHeight: 1.6,
              color: '#b0b5c6',
              fontWeight: 400,
            }}
          >
            Engineered with crystalline clarity and high-definition polarized optics. Anti-reflective coatings eliminate glare while revealing rich natural contrast.
          </p>
        </div>


        {/* =========================================================================
            PHASE 3: ARCHITECTURAL SHOWROOM / SANCTUARY
           ========================================================================= */}
        <div
          ref={phase3Ref}
          className="story-phase-card phase-center"
          style={{
            position: 'absolute',
            opacity: 0,
            transform: 'translate3d(0, 14px, 0)',
            pointerEvents: 'none',
            transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
            willChange: 'opacity, transform',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.28rem 0.75rem',
              borderRadius: '9999px',
              background: 'rgba(10, 12, 18, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(12px)',
              marginBottom: '0.5rem',
            }}
          >
            <Shield size={12} color="#ffffff" />
            <span
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.2em',
                color: '#ffffff',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              An Eyewear Sanctuary
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.35rem, 3.2vw, 2.75rem)',
              lineHeight: 1.15,
              letterSpacing: '0.16em',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '0.45rem',
              textTransform: 'uppercase',
            }}
          >
            ARCHITECTURAL <br className="desktop-break" />
            <span className="text-gradient-silver">SANCTUARY</span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.76rem, 0.95vw, 0.88rem)',
              lineHeight: 1.6,
              color: '#b0b5c6',
              maxWidth: '480px',
              margin: '0 auto',
              fontWeight: 400,
            }}
          >
            Where Italian bio-acetate meets aerospace-grade Japanese titanium in a masterclass of structural elegance and weightless comfort.
          </p>
        </div>


        {/* =========================================================================
            PHASE 4: THE COLLECTION EMERGENCE
           ========================================================================= */}
        <div
          ref={phase4Ref}
          className="story-phase-card phase-left"
          style={{
            position: 'absolute',
            opacity: 0,
            transform: 'translate3d(0, 14px, 0)',
            pointerEvents: 'none',
            transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
            willChange: 'opacity, transform',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.28rem 0.75rem',
              borderRadius: '9999px',
              background: 'rgba(10, 12, 18, 0.85)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              backdropFilter: 'blur(12px)',
              marginBottom: '0.5rem',
            }}
          >
            <Compass size={12} color="#d4af37" />
            <span
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.2em',
                color: '#f3e5ab',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Curated Eyewear
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.35rem, 3.2vw, 2.85rem)',
              lineHeight: 1.15,
              letterSpacing: '0.15em',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '0.35rem',
              textTransform: 'uppercase',
            }}
          >
            THE <br className="desktop-break" />
            <span className="text-gradient-silver">COLLECTION</span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(0.82rem, 1.2vw, 1rem)',
              letterSpacing: '0.12em',
              color: '#e2e4ea',
              marginBottom: '0.4rem',
              fontWeight: 500,
            }}
          >
            Find the frame that defines you.
          </p>

          <p
            style={{
              fontSize: 'clamp(0.76rem, 0.9vw, 0.85rem)',
              lineHeight: 1.55,
              color: '#9ea3b5',
              maxWidth: '420px',
              marginBottom: '0.85rem',
            }}
          >
            Explore our curated selection of 20 signature sunglasses engineered for everyday confidence and distinguished luxury.
          </p>

          <button
            onClick={scrollToCollection}
            className="btn-primary hero-btn"
            style={{
              padding: '0.6rem 1.25rem',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
            }}
          >
            <span>EXPLORE COLLECTION</span>
            <ArrowRight size={13} />
          </button>
        </div>


        {/* =========================================================================
            PHASE 5: HERO PRODUCT & FINAL TRANSITION
           ========================================================================= */}
        <div
          ref={phase5Ref}
          className="story-phase-card phase-center"
          style={{
            position: 'absolute',
            opacity: 0,
            transform: 'translate3d(0, 14px, 0)',
            pointerEvents: 'none',
            transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
            willChange: 'opacity, transform',
          }}
        >
          <span
            style={{
              fontSize: '0.62rem',
              letterSpacing: '0.25em',
              color: '#9ea3b5',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.35rem',
              fontWeight: 500,
            }}
          >
            Tiwari Signature Silhouette
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.4rem, 3.5vw, 3rem)',
              lineHeight: 1.12,
              letterSpacing: '0.18em',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '0.35rem',
              textTransform: 'uppercase',
            }}
          >
            TIWARI OPTICAL
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(0.82rem, 1.3vw, 1.05rem)',
              letterSpacing: '0.2em',
              color: '#f3e5ab',
              textTransform: 'uppercase',
              marginBottom: '0.85rem',
              fontWeight: 600,
            }}
          >
            SEE THE WORLD DIFFERENTLY.
          </p>

          <button
            onClick={scrollToCollection}
            className="btn-primary hero-btn"
            style={{
              padding: '0.65rem 1.45rem',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
            }}
          >
            <span>BROWSE ALL 20 FRAMES</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>

      <style jsx>{`
        /* =========================================================================
           DESKTOP COMPOSITION (min-width: 769px)
           ========================================================================= */
        .mobile-hero-top {
          display: none;
        }

        .desktop-hero-header {
          display: block;
        }

        .hero-overlay-wrapper {
          align-items: center;
        }

        .hero-overlay-card {
          max-width: 480px;
          text-align: left;
          position: absolute;
          left: clamp(2rem, 5vw, 4.5rem);
          top: 50%;
          transform: translate3d(0, -50%, 0);
          background: radial-gradient(circle at 20% 50%, rgba(5, 5, 7, 0.92) 0%, rgba(5, 5, 7, 0.6) 60%, transparent 100%);
          padding: 1.75rem 2rem;
          border-radius: 20px;
        }

        .phase-left {
          max-width: 460px;
          text-align: left;
          left: clamp(2rem, 5vw, 4.5rem);
          top: 50%;
          transform: translate3d(0, -50%, 0);
          background: radial-gradient(circle at 20% 50%, rgba(5, 5, 7, 0.92) 0%, rgba(5, 5, 7, 0.5) 60%, transparent 100%);
          padding: 1.75rem 2rem;
          border-radius: 20px;
        }

        .phase-right {
          max-width: 460px;
          text-align: right;
          right: clamp(2rem, 5vw, 4.5rem);
          top: 50%;
          transform: translate3d(0, -50%, 0);
          background: radial-gradient(circle at 80% 50%, rgba(5, 5, 7, 0.92) 0%, rgba(5, 5, 7, 0.5) 60%, transparent 100%);
          padding: 1.75rem 2rem;
          border-radius: 20px;
        }

        .phase-center {
          max-width: 600px;
          text-align: center;
          position: absolute;
          left: 50%;
          bottom: clamp(3rem, 9vh, 6.5rem);
          top: auto;
          transform: translate3d(-50%, 0, 0);
          background: rgba(8, 10, 15, 0.88);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 1.75rem 2.25rem;
          border-radius: 22px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.75);
        }

        .hero-cta-group {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        /* Small Desktop / Laptop Screen Heights (max-height: 740px) */
        @media (min-width: 769px) and (max-height: 740px) {
          .hero-overlay-card,
          .phase-left,
          .phase-right {
            padding: 1.25rem 1.5rem !important;
          }
          .phase-center {
            bottom: 2.25rem !important;
            padding: 1.25rem 1.75rem !important;
          }
        }

        /* =========================================================================
           MOBILE COMPOSITION (max-width: 768px)
           - Dedicated Top Header
           - 100% Unobstructed Central 3D Sunglasses Stage
           - Elevated Lower Cards placed directly below the glasses
           ========================================================================= */
        @media (max-width: 768px) {
          .desktop-hero-header {
            display: none !important;
          }

          .desktop-break {
            display: none !important;
          }

          /* Mobile Top Brand Header */
          .mobile-hero-top {
            display: flex !important;
            flex-direction: column;
            align-items: center;
            position: absolute;
            top: max(68px, 7.5vh);
            left: 0;
            right: 0;
            text-align: center;
            z-index: 15;
            padding: 0 1rem;
            pointer-events: none;
          }

          /* Elevated Mobile Cards Positioned Directly Below 3D Sunglasses */
          .hero-overlay-card,
          .phase-left,
          .phase-right,
          .phase-center {
            position: absolute !important;
            left: 1rem !important;
            right: 1rem !important;
            bottom: clamp(2.5rem, 8vh, 5.5rem) !important;
            top: auto !important;
            max-width: min(100% - 2rem, 440px) !important;
            margin: 0 auto !important;
            transform: none !important;
            text-align: center !important;
            padding: 1.1rem 1.25rem !important;
            background: rgba(8, 10, 15, 0.92) !important;
            border-radius: 18px !important;
            backdrop-filter: blur(24px) !important;
            -webkit-backdrop-filter: blur(24px) !important;
            border: 1px solid rgba(255, 255, 255, 0.14) !important;
            box-shadow: 0 14px 40px rgba(0, 0, 0, 0.85), 0 0 20px rgba(0, 0, 0, 0.5) !important;
            z-index: 15;
          }

          .hero-cta-group {
            display: flex !important;
            flex-direction: row !important;
            justify-content: center !important;
            gap: 0.5rem !important;
            width: 100% !important;
          }

          .hero-btn {
            flex: 1 !important;
            padding: 0.65rem 0.65rem !important;
            font-size: clamp(0.65rem, 2.2vw, 0.72rem) !important;
            letter-spacing: 0.1em !important;
            white-space: nowrap !important;
            min-height: 42px !important;
          }

          .hero-overlay-card p,
          .phase-left p,
          .phase-right p,
          .phase-center p {
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }

        /* Narrow mobile screens (< 360px) */
        @media (max-width: 360px) {
          .hero-cta-group {
            flex-direction: column !important;
          }
          .hero-btn {
            width: 100% !important;
          }
          .hero-overlay-card,
          .phase-left,
          .phase-right,
          .phase-center {
            bottom: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
});

StoryOverlays.displayName = 'StoryOverlays';

export default StoryOverlays;
