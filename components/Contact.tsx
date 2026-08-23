'use client';

import React from 'react';
import { MapPin, Phone, Clock, MessageSquare, Mail, Compass, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '@/data/products';

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        backgroundColor: '#050507',
        padding: '7rem 0 6rem 0',
        position: 'relative',
      }}
    >
      <div className="luxury-container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.25em',
              color: '#d4af37',
              textTransform: 'uppercase',
              fontWeight: 600,
              display: 'block',
              marginBottom: '0.75rem',
            }}
          >
            Visit Our Boutique
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              letterSpacing: '0.2em',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '1rem',
              textTransform: 'uppercase',
            }}
          >
            CONNECT WITH US
          </h2>

          <p
            style={{
              fontSize: '1rem',
              color: '#8e92a2',
              maxWidth: '520px',
              margin: '0 auto',
            }}
          >
            Experience our eyewear collections in person or reach our dedicated styling consultants.
          </p>
        </div>

        {/* Contact Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Contact Details Card */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            {/* Address */}
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: '#d4af37',
                }}
              >
                <MapPin size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6e7485', display: 'block', marginBottom: '0.25rem' }}>
                  Boutique Location (Placeholder)
                </span>
                <p style={{ color: '#ffffff', fontSize: '0.95rem', lineHeight: 1.5, fontWeight: 500 }}>
                  {SITE_CONFIG.storeInfo.address}
                </p>
              </div>
            </div>

            {/* Phone & WhatsApp */}
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: '#ffffff',
                }}
              >
                <Phone size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6e7485', display: 'block', marginBottom: '0.25rem' }}>
                  Phone & WhatsApp (Placeholder)
                </span>
                <p style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 500 }}>
                  {SITE_CONFIG.storeInfo.phone}
                </p>
                <span style={{ fontSize: '0.75rem', color: '#8e92a2' }}>
                  WhatsApp Concierge available daily
                </span>
              </div>
            </div>

            {/* Store Hours */}
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: '#a3b8cc',
                }}
              >
                <Clock size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6e7485', display: 'block', marginBottom: '0.25rem' }}>
                  Visiting Hours (Placeholder)
                </span>
                <p style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 500 }}>
                  {SITE_CONFIG.storeInfo.hours}
                </p>
                <span style={{ fontSize: '0.75rem', color: '#8e92a2' }}>
                  Complimentary lens testing & custom fitting
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual Placeholder */}
          <div
            style={{
              backgroundColor: '#0c0e14',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            {/* Map styling simulated container */}
            <div
              style={{
                flexGrow: 1,
                minHeight: '260px',
                position: 'relative',
                background: 'radial-gradient(circle at 60% 40%, #151924 0%, #08090d 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
              }}
            >
              {/* Grid graphic lines */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                  opacity: 0.6,
                }}
              />

              {/* Pin Indicator */}
              <div style={{ textAlign: 'center', position: 'relative', zIndex: 5 }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(212, 175, 55, 0.15)',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem auto',
                    boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)',
                    animation: 'floatSlow 4s ease-in-out infinite',
                  }}
                >
                  <MapPin size={26} color="#d4af37" />
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.1rem',
                    letterSpacing: '0.12em',
                    color: '#ffffff',
                    fontWeight: 600,
                    display: 'block',
                  }}
                >
                  TIWARI OPTICAL BOUTIQUE
                </span>
                <span style={{ fontSize: '0.75rem', color: '#8e92a2', letterSpacing: '0.05em' }}>
                  Interactive Google Maps Location (Placeholder)
                </span>
              </div>
            </div>

            {/* Map Action Bar */}
            <div
              style={{
                padding: '1.25rem 1.75rem',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: '0.75rem', color: '#787d8d' }}>
                Open in Google Maps
              </span>
              <a
                href={SITE_CONFIG.storeInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ fontSize: '0.7rem', padding: '0.45rem 1rem' }}
              >
                <span>GET DIRECTIONS</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
