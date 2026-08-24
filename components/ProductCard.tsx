'use client';

import React from 'react';
import { Product } from '@/types';
import { Eye, ArrowUpRight, MessageCircle } from 'lucide-react';
import { getWhatsAppOrderUrl } from '@/config/whatsapp';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = getWhatsAppOrderUrl(product);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={() => onSelect(product)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.name}, priced at ₹${product.price}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(product);
        }
      }}
      style={{
        backgroundColor: 'rgba(13, 15, 22, 0.75)',
        borderRadius: '18px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
      className="product-card"
    >
      {/* Badges Overlay */}
      <div
        style={{
          position: 'absolute',
          top: '0.85rem',
          left: '0.85rem',
          zIndex: 10,
          display: 'flex',
          gap: '0.35rem',
          flexWrap: 'wrap',
        }}
      >
        {product.isBestSeller && (
          <span
            style={{
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              backgroundColor: 'rgba(212, 175, 55, 0.18)',
              color: '#f3e5ab',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              padding: '0.2rem 0.55rem',
              borderRadius: '9999px',
              backdropFilter: 'blur(10px)',
            }}
          >
            Bestseller
          </span>
        )}
        {product.isNew && (
          <span
            style={{
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              padding: '0.2rem 0.55rem',
              borderRadius: '9999px',
              backdropFilter: 'blur(10px)',
            }}
          >
            New Arrival
          </span>
        )}
      </div>

      {/* Category Pill on top right */}
      <div
        style={{
          position: 'absolute',
          top: '0.85rem',
          right: '0.85rem',
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontSize: '0.62rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#8e92a2',
            backgroundColor: 'rgba(0, 0, 0, 0.55)',
            padding: '0.22rem 0.6rem',
            borderRadius: '6px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {product.category}
        </span>
      </div>

      {/* Product Image Stage */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '62%',
          backgroundColor: '#07080c',
          overflow: 'hidden',
        }}
      >
        {/* Ambient glow behind sunglasses */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '75%',
            height: '75%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="product-img"
        />

        {/* Hover / Quick View Trigger (Desktop) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(5, 5, 7, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.25s ease',
          }}
          className="product-hover-overlay"
        >
          <div
            style={{
              padding: '0.5rem 1.15rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              color: '#050507',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
            }}
          >
            <Eye size={13} />
            <span>View Frame</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div
        style={{
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* Brand line */}
          <span
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#7e8395',
              fontWeight: 500,
              display: 'block',
              marginBottom: '0.3rem',
            }}
          >
            {product.brand}
          </span>

          {/* Product Name */}
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: '#ffffff',
              marginBottom: '0.45rem',
            }}
          >
            {product.name}
          </h3>

          {/* Short description */}
          <p
            style={{
              fontSize: '0.78rem',
              color: '#8e92a2',
              lineHeight: 1.5,
              marginBottom: '1rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '0.85rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.45rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#ffffff',
                  }}
                >
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span
                    style={{
                      fontSize: '0.8rem',
                      color: '#656a7a',
                      textDecoration: 'line-through',
                    }}
                  >
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <span
                style={{
                  fontSize: '0.62rem',
                  letterSpacing: '0.08em',
                  color: '#a3b8cc',
                  display: 'block',
                }}
              >
                Includes bespoke case & cloth
              </span>
            </div>

            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                transition: 'all 0.3s ease',
                flexShrink: 0,
              }}
              className="arrow-circle"
              title="View full specs"
            >
              <ArrowUpRight size={15} />
            </div>
          </div>

          {/* Dedicated ORDER ON WHATSAPP Button */}
          <div style={{ marginTop: '0.85rem' }}>
            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="whatsapp-card-btn"
              style={{
                width: '100%',
                padding: '0.65rem 1rem',
                borderRadius: '10px',
                backgroundColor: 'rgba(37, 211, 102, 0.12)',
                border: '1px solid rgba(37, 211, 102, 0.35)',
                color: '#25D366',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              <MessageCircle size={14} />
              <span>ORDER ON WHATSAPP</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-card:hover {
          border-color: rgba(255, 255, 255, 0.28);
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 255, 255, 0.03);
          background-color: rgba(18, 21, 30, 0.85);
        }
        .product-card:active {
          transform: scale(0.98);
        }
        .product-card:hover .product-img {
          transform: scale(1.05);
        }
        .product-card:hover .product-hover-overlay {
          opacity: 1;
        }
        .product-card:hover .arrow-circle {
          background-color: #ffffff;
          color: #000000;
          transform: rotate(45deg);
        }
        .whatsapp-card-btn:hover {
          background-color: #25D366 !important;
          color: #ffffff !important;
          border-color: #25D366 !important;
          box-shadow: 0 4px 15px rgba(37, 211, 102, 0.35);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}
