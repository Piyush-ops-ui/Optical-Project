'use client';

import React from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import { RotateCcw } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onResetFilters?: () => void;
}

export default function ProductGrid({ products, onSelectProduct, onResetFilters }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div
        style={{
          padding: '4rem 1.5rem',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '18px',
          border: '1px solid rgba(255, 255, 255, 0.07)',
          margin: '2rem 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <p style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 600, fontFamily: 'var(--font-serif)' }}>
          No sunglasses found matching your criteria
        </p>
        <p style={{ color: '#7e8395', fontSize: '0.82rem', maxWidth: '400px' }}>
          We couldn&apos;t find any frames matching your active category or search query.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="btn-secondary"
            style={{
              marginTop: '0.75rem',
              padding: '0.6rem 1.3rem',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
            }}
          >
            <RotateCcw size={14} />
            <span>RESET ALL FILTERS</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
        gap: 'clamp(1.25rem, 2.5vw, 2rem)',
        width: '100%',
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onSelectProduct}
        />
      ))}
    </div>
  );
}

