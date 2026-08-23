# TIWARI OPTICAL — Luxury 3D Scrolling Website

A production-quality, premium 3D scroll-driven web experience for **TIWARI OPTICAL**, an haute-couture luxury optical atelier specializing in curated sunglasses.

> **"SEE THE WORLD DIFFERENTLY."**  
> Discover premium sunglasses curated for distinctive style, everyday comfort, and timeless design.

---

## ✨ Features

- **Cinematic 3D Scroll Engine**: HTML5 Canvas + GSAP ScrollTrigger + Lenis smooth scrolling orchestrating a 75-frame high-resolution (1920×1080) cinematic sequence.
- **5-Phase Narrative Storytelling**:
  1. *Hero*: Atmospheric studio lighting on luxury obsidian frames with laser-etched branding.
  2. *Through the Lens*: High-index polarized optics calibration.
  3. *Architectural Sanctuary*: 3D glass shatter explosion and floating metallic **TIWARI OPTICAL** emblem.
  4. *The Collection Emergence*: Crystalline prisms framing the central hero model.
  5. *Hero Product & Transition*: Seamless gateway into the product catalog.
- **Flicker-Free Persistent Frame Renderer**: Zero canvas blanking, asynchronous off-thread image pre-decoding (`img.decode()`), sliding-window memory caching, and race-condition immunity.
- **20 Curated Demo Sunglasses**: Centralized in `data/products.ts` with categories (*Square, Aviator, Wayfarer, Round, Geometric, Rimless, Sport*), demo prices (₹999 – ₹2,499), lens specs, materials, and search/sort filters.
- **Interactive Product Modal**: Detailed frame dimensions, materials, polarized lens ratings, and marked WhatsApp CTA placeholder.
- **Responsive & Accessible**: Custom responsive `clamp()` typography, mobile stack layouts, and `prefers-reduced-motion` compliance.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS with luxury design tokens (`globals.css`)
- **Animation & Scroll Control**: GSAP, GSAP ScrollTrigger, Lenis
- **Icons**: Lucide React

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production
```bash
npm run build
npm run start
```

---

## 📄 License
Private & Confidential — TIWARI OPTICAL.
