'use client';

import React, { useState, useMemo } from 'react';
import { DEMO_PRODUCTS, CATEGORIES } from '@/data/products';
import { Product } from '@/types';
import ProductGrid from './ProductGrid';
import ProductModal from './ProductModal';
import { Search, ArrowDownUp, Sparkles, X, RotateCcw } from 'lucide-react';

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

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <section
      id="collection"
      style={{
        backgroundColor: '#050507',
        padding: 'clamp(4.5rem, 8vw, 7rem) 0 clamp(4rem, 6vw, 5.5rem) 0',
        position: 'relative',
        zIndex: 20,
      }}
    >
      {/* Background Ambience Glow */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(320px, 80vw, 1000px)',
          height: 'clamp(300px, 50vw, 600px)',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="luxury-container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.3rem 0.85rem',
              borderRadius: '9999px',
              background: 'rgba(212, 175, 55, 0.08)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              marginBottom: '0.85rem',
            }}
          >
            <Sparkles size={12} color="#d4af37" />
            <span
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.22em',
                color: '#f3e5ab',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Signature Showcase
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.85rem, 4.5vw, 3.5rem)',
              letterSpacing: '0.18em',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
            }}
          >
            THE COLLECTION
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)',
              color: '#9aa0b2',
              maxWidth: '520px',
              margin: '0 auto',
            }}
          >
            Explore our curated selection of 20 signature sunglasses engineered for everyday confidence and distinguished luxury.
          </p>
        </div>

        {/* Filter & Controls Bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
          }}
        >
          {/* Category Filter Pills (Horizontal scrollable with smooth touch scrolling) */}
          <div
            className="category-scroll-container"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              overflowX: 'auto',
              paddingBottom: '0.5rem',
              paddingTop: '0.25rem',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.55rem 1.15rem',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.25s ease',
                    minHeight: '38px',
                    border: isSelected
                      ? '1px solid #ffffff'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: isSelected
                      ? '#ffffff'
                      : 'rgba(255, 255, 255, 0.04)',
                    color: isSelected ? '#050507' : '#9ea3b5',
                    boxShadow: isSelected ? '0 0 16px rgba(255, 255, 255, 0.25)' : 'none',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Bar (Responsive flex) */}
          <div className="filter-controls-bar">
            {/* Search Input */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '0.65rem 0.9rem',
                flexGrow: 1,
                minWidth: '220px',
              }}
            >
              <Search size={16} color="#8e92a2" />
              <input
                type="text"
                placeholder="Search by name, silhouette, color..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  width: '100%',
                  fontFamily: 'var(--font-sans)',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#8e92a2',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '2px',
                  }}
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Results counter & Sort Dropdown */}
            <div className="sort-counter-row">
              <span
                style={{
                  fontSize: '0.75rem',
                  color: '#7e8395',
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                }}
              >
                Showing <strong style={{ color: '#ffffff' }}>{filteredProducts.length}</strong> of 20 Styles
              </span>

              {/* Sort Select */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  padding: '0.5rem 0.85rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
              >
                <ArrowDownUp size={13} color="#d4af37" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort products by"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
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
          onResetFilters={resetFilters}
        />
      </div>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <style jsx>{`
        .filter-controls-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.85rem 1.15rem;
          background-color: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
        }

        .sort-counter-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        @media (max-width: 640px) {
          .filter-controls-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
            padding: 0.75rem;
          }
          .sort-counter-row {
            justify-content: space-between;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
