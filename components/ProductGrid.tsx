'use client';

import React from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export default function ProductGrid({ products, onSelectProduct }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div
        style={{
          padding: '5rem 2rem',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          margin: '2rem 0',
        }}
      >
        <p style={{ color: '#8e92a2', fontSize: '1rem', marginBottom: '0.5rem' }}>
          No sunglasses found matching your selected criteria.
        </p>
        <span style={{ color: '#5b6070', fontSize: '0.8125rem' }}>
          Try clearing filters or search queries.
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2rem',
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
