'use client';

import React from 'react';
import { Product } from '@/types';
import { Sparkles, Eye, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <div
      onClick={() => onSelect(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(product);
        }
      }}
      style={{
        backgroundColor: 'rgba(13, 15, 22, 0.7)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      className="product-card"
    >
      {/* Badges Overlay */}
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          zIndex: 10,
          display: 'flex',
          gap: '0.4rem',
          flexWrap: 'wrap',
        }}
      >
        {product.isBestSeller && (
          <span
            style={{
              fontSize: '0.625rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              backgroundColor: 'rgba(212, 175, 55, 0.15)',
              color: '#f3e5ab',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              backdropFilter: 'blur(8px)',
            }}
          >
            Bestseller
          </span>
        )}
        {product.isNew && (
          <span
            style={{
              fontSize: '0.625rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              backdropFilter: 'blur(8px)',
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
          top: '1rem',
          right: '1rem',
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#8e92a2',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            padding: '0.25rem 0.65rem',
            borderRadius: '6px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
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
          paddingTop: '65%',
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
            width: '70%',
            height: '70%',
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
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="product-img"
        />

        {/* Hover Quick View Trigger */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(5, 5, 7, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          }}
          className="product-hover-overlay"
        >
          <div
            style={{
              padding: '0.55rem 1.25rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              color: '#050507',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
            }}
          >
            <Eye size={14} />
            <span>View Product</span>
          </div>
        </div>
      </div>

      {/* Product Content Details */}
      <div
        style={{
          padding: '1.4rem',
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
              fontSize: '0.6875rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#7e8395',
              fontWeight: 500,
              display: 'block',
              marginBottom: '0.35rem',
            }}
          >
            {product.brand}
          </span>

          {/* Product Name */}
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.15rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: '#ffffff',
              marginBottom: '0.5rem',
            }}
          >
            {product.name}
          </h3>

          {/* Short description */}
          <p
            style={{
              fontSize: '0.8125rem',
              color: '#8e92a2',
              lineHeight: 1.55,
              marginBottom: '1.25rem',
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#ffffff',
                }}
              >
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span
                  style={{
                    fontSize: '0.85rem',
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
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                color: '#a3b8cc',
                display: 'block',
              }}
            >
              Includes demo case & cloth
            </span>
          </div>

          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              transition: 'all 0.3s ease',
            }}
            className="arrow-circle"
          >
            <ArrowUpRight size={16} />
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
      `}</style>
    </div>
  );
}
