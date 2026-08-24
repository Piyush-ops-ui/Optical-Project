'use client';

import React from 'react';
import { MapPin, Phone, Clock, MessageSquare, Mail, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '@/data/products';

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        backgroundColor: '#050507',
        padding: 'clamp(4.5rem, 8vw, 7rem) 0 clamp(4rem, 6vw, 6rem) 0',
        position: 'relative',
      }}
    >
      <div className="luxury-container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <span
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: '#d4af37',
              textTransform: 'uppercase',
              fontWeight: 600,
              display: 'block',
              marginBottom: '0.65rem',
            }}
          >
            Visit Our Boutique
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.85rem, 4.5vw, 3.5rem)',
              letterSpacing: '0.18em',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
            }}
          >
            CONNECT WITH US
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.88rem, 1.2vw, 1.05rem)',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}
        >
          {/* Contact Details Card */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.025)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: 'clamp(1.5rem, 3vw, 2.25rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem',
            }}
          >
            {/* Address */}
            <div style={{ display: 'flex', gap: '1.15rem' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(212, 175, 55, 0.08)',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: '#d4af37',
                }}
              >
                <MapPin size={18} />
              </div>
              <div>
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6e7485', display: 'block', marginBottom: '0.2rem' }}>
                  Boutique Location
                </span>
                <p style={{ color: '#ffffff', fontSize: '0.92rem', lineHeight: 1.5, fontWeight: 500 }}>
                  {SITE_CONFIG.storeInfo.address}
                </p>
              </div>
            </div>

            {/* Phone & WhatsApp */}
            <div style={{ display: 'flex', gap: '1.15rem' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
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
                <Phone size={18} />
              </div>
              <div>
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6e7485', display: 'block', marginBottom: '0.2rem' }}>
                  Phone & Concierge
                </span>
                <a
                  href={`tel:${SITE_CONFIG.storeInfo.phone.replace(/[^0-9+]/g, '')}`}
                  style={{
                    color: '#ffffff',
                    fontSize: '0.92rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    display: 'block',
                  }}
                >
                  {SITE_CONFIG.storeInfo.phone}
                </a>
                <span style={{ fontSize: '0.72rem', color: '#8e92a2', marginTop: '2px', display: 'block' }}>
                  WhatsApp Concierge available daily
                </span>
              </div>
            </div>

            {/* Store Hours */}
            <div style={{ display: 'flex', gap: '1.15rem' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
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
                <Clock size={18} />
              </div>
              <div>
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6e7485', display: 'block', marginBottom: '0.2rem' }}>
                  Visiting Hours
                </span>
                <p style={{ color: '#ffffff', fontSize: '0.92rem', fontWeight: 500 }}>
                  {SITE_CONFIG.storeInfo.hours}
                </p>
                <span style={{ fontSize: '0.72rem', color: '#8e92a2', marginTop: '2px', display: 'block' }}>
                  Complimentary lens testing & custom fitting
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual */}
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
            {/* Map styling container */}
            <div
              style={{
                flexGrow: 1,
                minHeight: '240px',
                position: 'relative',
                background: 'radial-gradient(circle at 60% 40%, #151924 0%, #08090d 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
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
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(212, 175, 55, 0.15)',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 0.85rem auto',
                    boxShadow: '0 0 30px rgba(212, 175, 55, 0.35)',
                    animation: 'floatSlow 4s ease-in-out infinite',
                  }}
                >
                  <MapPin size={24} color="#d4af37" />
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                    letterSpacing: '0.12em',
                    color: '#ffffff',
                    fontWeight: 600,
                    display: 'block',
                  }}
                >
                  TIWARI OPTICAL BOUTIQUE
                </span>
                <span style={{ fontSize: '0.72rem', color: '#8e92a2', letterSpacing: '0.04em' }}>
                  Heritage Eyewear Arcade • New Delhi
                </span>
              </div>
            </div>

            {/* Map Action Bar */}
            <div
              style={{
                padding: '1rem 1.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.025)',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              <span style={{ fontSize: '0.72rem', color: '#787d8d' }}>
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

