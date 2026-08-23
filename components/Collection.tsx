'use client';

import React, { useState, useMemo } from 'react';
import { DEMO_PRODUCTS, CATEGORIES } from '@/data/products';
import { Product } from '@/types';
import ProductGrid from './ProductGrid';
import ProductModal from './ProductModal';
import { Search, SlidersHorizontal, ArrowDownUp, Sparkles } from 'lucide-react';

export default function Collection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    return DEMO_PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.color.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // 'featured'
      if (a.isBestSeller && !b.isBestSeller) return -1;
      if (!a.isBestSeller && b.isBestSeller) return 1;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section
      id="collection"
      style={{
        backgroundColor: '#050507',
        padding: '7rem 0 5rem 0',
        position: 'relative',
        zIndex: 20,
      }}
    >
      {/* Background Ambience */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1000px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="luxury-container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.9rem',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              marginBottom: '1rem',
            }}
          >
            <Sparkles size={13} color="#d4af37" />
            <span
              style={{
                fontSize: '0.68rem',
                letterSpacing: '0.25em',
                color: '#d4af37',
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
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              letterSpacing: '0.2em',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
            }}
          >
            THE COLLECTION
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
              color: '#9aa0b2',
              maxWidth: '550px',
              margin: '0 auto',
            }}
          >
            Explore our curated selection of premium sunglasses.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              overflowX: 'auto',
              paddingBottom: '0.5rem',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.55rem 1.25rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s ease',
                    border: isSelected
                      ? '1px solid #ffffff'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    backgroundColor: isSelected
                      ? '#ffffff'
                      : 'rgba(255, 255, 255, 0.03)',
                    color: isSelected ? '#050507' : '#9498a8',
                    boxShadow: isSelected ? '0 0 15px rgba(255, 255, 255, 0.2)' : 'none',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              padding: '1rem 1.25rem',
              backgroundColor: 'rgba(255, 255, 255, 0.025)',
              border: '1px solid rgba(255, 255, 255, 0.07)',
              borderRadius: '14px',
            }}
          >
            {/* Search input */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                flexGrow: 1,
                maxWidth: '400px',
                minWidth: '240px',
              }}
            >
              <Search size={16} color="#787d8d" />
              <input
                type="text"
                placeholder="Search styles, colors, materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  width: '100%',
                  fontFamily: 'var(--font-sans)',
                }}
              />
            </div>

            {/* Results counter & Sort Dropdown */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
              }}
            >
              <span
                style={{
                  fontSize: '0.75rem',
                  color: '#717585',
                  letterSpacing: '0.05em',
                }}
              >
                Showing <strong style={{ color: '#ffffff' }}>{filteredProducts.length}</strong> of 20 Styles
              </span>

              {/* Sort Select */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <ArrowDownUp size={14} color="#a0a6b8" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  <option value="featured" style={{ background: '#0c0e14', color: '#fff' }}>Featured & Bestsellers</option>
                  <option value="price-asc" style={{ background: '#0c0e14', color: '#fff' }}>Price: Low to High</option>
                  <option value="price-desc" style={{ background: '#0c0e14', color: '#fff' }}>Price: High to Low</option>
                  <option value="rating" style={{ background: '#0c0e14', color: '#fff' }}>Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 20 Products Grid */}
        <ProductGrid
          products={filteredProducts}
          onSelectProduct={(product) => setSelectedProduct(product)}
        />
      </div>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
