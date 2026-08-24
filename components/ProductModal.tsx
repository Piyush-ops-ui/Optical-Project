'use client';

import React, { useEffect, useState } from 'react';
import { Product } from '@/types';
import { X, ShieldCheck, Sparkle, MessageCircle, CheckCircle2 } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  const handleWhatsAppClick = () => {
    // Generate prefilled WhatsApp message
    const message = encodeURIComponent(
      `Hello Tiwari Optical! I am interested in ordering "${product.name}" (${product.brand}, ₹${product.price}). Please share availability and delivery details.`
    );
    const whatsappUrl = `https://wa.me/919876543210?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

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
        padding: 'clamp(0.75rem, 3vw, 1.5rem)',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(5, 5, 7, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      />

      {/* Modal Card */}
      <div
        className="modal-card"
        style={{
          position: 'relative',
          zIndex: 10,
          backgroundColor: '#0c0e14',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '24px',
          maxWidth: '960px',
          width: '100%',
          maxHeight: '90dvh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 40px rgba(255, 255, 255, 0.05)',
          animation: 'modalEntrance 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product details"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 30,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
            e.currentTarget.style.transform = 'scale(1.06)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <X size={18} />
        </button>

        <div className="modal-content-grid">
          {/* Left Side: Product Visual Stage */}
          <div
            className="modal-image-stage"
            style={{
              backgroundColor: '#07080c',
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
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
                maxHeight: '300px',
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
                gap: '1rem',
                marginTop: '1.25rem',
                fontSize: '0.72rem',
                color: '#8e92a2',
                textAlign: 'center',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ShieldCheck size={15} color="#d4af37" />
                <span>100% UV400 Polarized</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Sparkle size={14} color="#e5e9f0" />
                <span>Bespoke Case Included</span>
              </div>
            </div>
          </div>

          {/* Right Side: Product Details & Specs */}
          <div
            style={{
              padding: 'clamp(1.25rem, 3vw, 2.25rem)',
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
                  marginBottom: '0.4rem',
                }}
              >
                <span
                  style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#d4af37',
                    fontWeight: 600,
                  }}
                >
                  {product.brand}
                </span>
                <span
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.14em',
                    color: '#8e92a2',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    padding: '0.2rem 0.6rem',
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
                  fontSize: 'clamp(1.35rem, 3vw, 1.85rem)',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: '#ffffff',
                  marginBottom: '0.75rem',
                }}
              >
                {product.name}
              </h2>

              {/* Price section */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.65rem',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.65rem',
                    fontWeight: 800,
                    color: '#ffffff',
                  }}
                >
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span
                    style={{
                      fontSize: '1rem',
                      color: '#6e7485',
                      textDecoration: 'line-through',
                    }}
                  >
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span
                  style={{
                    fontSize: '0.72rem',
                    color: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.12)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '6px',
                    fontWeight: 600,
                  }}
                >
                  In Stock • Ready to Dispatch
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.85rem',
                  lineHeight: 1.6,
                  color: '#9aa0b2',
                  marginBottom: '1.25rem',
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
                  padding: '1rem 1.15rem',
                  marginBottom: '1.5rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '0.85rem',
                  fontSize: '0.78rem',
                }}
              >
                <div>
                  <span style={{ color: '#6e7485', display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Color & Finish
                  </span>
                  <span style={{ color: '#ffffff', fontWeight: 500 }}>{product.color}</span>
                </div>

                <div>
                  <span style={{ color: '#6e7485', display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Frame Material
                  </span>
                  <span style={{ color: '#ffffff', fontWeight: 500 }}>{product.frameMaterial}</span>
                </div>

                <div>
                  <span style={{ color: '#6e7485', display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Lens Technology
                  </span>
                  <span style={{ color: '#ffffff', fontWeight: 500 }}>{product.lensTechnology}</span>
                </div>

                <div>
                  <span style={{ color: '#6e7485', display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Dimensions
                  </span>
                  <span style={{ color: '#ffffff', fontWeight: 500 }}>Bridge {product.bridgeWidth} • Temple {product.templeLength}</span>
                </div>
              </div>
            </div>

            {/* Actions & WhatsApp Order Button */}
            <div>
              <button
                type="button"
                className="btn-primary whatsapp-cta-btn"
                style={{
                  width: '100%',
                  padding: '0.9rem 1.75rem',
                  fontSize: '0.82rem',
                  letterSpacing: '0.16em',
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  boxShadow: '0 8px 25px rgba(37, 211, 102, 0.28)',
                }}
                onClick={handleWhatsAppClick}
              >
                <MessageCircle size={17} />
                <span>ORDER ON WHATSAPP</span>
              </button>

              <p
                style={{
                  fontSize: '0.68rem',
                  textAlign: 'center',
                  color: '#656a7a',
                  marginTop: '0.6rem',
                  letterSpacing: '0.04em',
                }}
              >
                Direct concierge checkout • Free insured delivery across India
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-content-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
        }

        @keyframes modalEntrance {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(16px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @media (max-width: 768px) {
          .modal-content-grid {
            grid-template-columns: 1fr;
          }
          .modal-image-stage {
            border-right: none !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
            padding: 1.25rem 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}

