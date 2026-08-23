'use client';

import React, { useEffect } from 'react';
import { Product } from '@/types';
import { X, ShieldCheck, Check, Info, Sparkles, MessageCircle, Ruler, Sparkle } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (product) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 900,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(5, 5, 7, 0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      />

      {/* Modal Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          backgroundColor: '#0c0e14',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '24px',
          maxWidth: '1000px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 255, 255, 0.05)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          animation: 'modalEntrance 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product details"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            zIndex: 20,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <X size={20} />
        </button>

        {/* Left Side: Product Visual Stage */}
        <div
          style={{
            backgroundColor: '#07080c',
            padding: '2.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            borderRight: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          {/* Subtle Spotlight */}
          <div
            style={{
              position: 'absolute',
              width: '80%',
              height: '80%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.07) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              width: '100%',
              aspectRatio: '16/10',
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Guarantee Badges */}
          <div
            style={{
              display: 'flex',
              gap: '1.5rem',
              marginTop: '2rem',
              fontSize: '0.75rem',
              color: '#8e92a2',
              textAlign: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={16} color="#d4af37" />
              <span>100% UV400 Polarized</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkle size={15} color="#e5e9f0" />
              <span>Bespoke Case Included</span>
            </div>
          </div>
        </div>

        {/* Right Side: Product Details & Specs */}
        <div
          style={{
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            {/* Brand & Category */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
              }}
            >
              <span
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#d4af37',
                  fontWeight: 600,
                }}
              >
                {product.brand}
              </span>
              <span
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.15em',
                  color: '#8e92a2',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  padding: '0.2rem 0.65rem',
                  borderRadius: '9999px',
                }}
              >
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <h2
              id="product-title"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.85rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: '#ffffff',
                marginBottom: '1rem',
              }}
            >
              {product.name}
            </h2>

            {/* Price section */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '0.75rem',
                marginBottom: '1.25rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.85rem',
                  fontWeight: 800,
                  color: '#ffffff',
                }}
              >
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span
                  style={{
                    fontSize: '1.1rem',
                    color: '#6e7485',
                    textDecoration: 'line-through',
                  }}
                >
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span
                style={{
                  fontSize: '0.75rem',
                  color: '#22c55e',
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.25)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '6px',
                  fontWeight: 600,
                }}
              >
                In Stock (Demo)
              </span>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: '0.9rem',
                lineHeight: 1.7,
                color: '#9aa0b2',
                marginBottom: '1.75rem',
              }}
            >
              {product.description}
            </p>

            {/* Specifications Grid */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.025)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '1.25rem',
                marginBottom: '2rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                fontSize: '0.8rem',
              }}
            >
              <div>
                <span style={{ color: '#6e7485', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Color & Finish
                </span>
                <span style={{ color: '#ffffff', fontWeight: 500 }}>{product.color}</span>
              </div>

              <div>
                <span style={{ color: '#6e7485', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Frame Material
                </span>
                <span style={{ color: '#ffffff', fontWeight: 500 }}>{product.frameMaterial}</span>
              </div>

              <div>
                <span style={{ color: '#6e7485', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Lens Technology
                </span>
                <span style={{ color: '#ffffff', fontWeight: 500 }}>{product.lensTechnology}</span>
              </div>

              <div>
                <span style={{ color: '#6e7485', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Dimensions
                </span>
                <span style={{ color: '#ffffff', fontWeight: 500 }}>Bridge {product.bridgeWidth} • Temple {product.templeLength}</span>
              </div>
            </div>
          </div>

          {/* Actions & WhatsApp Placeholder Notice */}
          <div>
            {/* Marked WhatsApp CTA button */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '1rem 2rem',
                  fontSize: '0.85rem',
                  letterSpacing: '0.18em',
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 25px rgba(37, 211, 102, 0.25)',
                }}
                onClick={() => {
                  alert('WhatsApp Ordering is coming in Phase 2! This frontend experience is currently in preview mode.');
                }}
              >
                <MessageCircle size={18} />
                <span>ORDER ON WHATSAPP</span>
              </button>
            </div>

            <p
              style={{
                fontSize: '0.7rem',
                textAlign: 'center',
                color: '#656a7a',
                marginTop: '0.75rem',
                letterSpacing: '0.05em',
              }}
            >
              Demo Preview • WhatsApp direct checkout will be activated in Phase 2.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes modalEntrance {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
