'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StoryOverlays, { StoryOverlaysHandle } from './StoryOverlays';

gsap.registerPlugin(ScrollTrigger);

interface ScrollCanvasEngineProps {
  totalFrames?: number;
  framePrefix?: string;
  onLoadingProgress?: (progress: number) => void;
  onLoadingComplete?: () => void;
}

export default function ScrollCanvasEngine({
  totalFrames = 75,
  framePrefix = '/frames/ezgif-frame-',
  onLoadingProgress,
  onLoadingComplete,
}: ScrollCanvasEngineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlaysRef = useRef<StoryOverlaysHandle>(null);

  // Dedicated in-memory cache for all 75 frames
  const framesCacheRef = useRef<(HTMLImageElement | null)[]>(new Array(totalFrames).fill(null));
  const frameLoadedSetRef = useRef<Set<number>>(new Set());

  // Animation and rendering state refs (zero React re-renders on scroll)
  const targetFrameIndexRef = useRef<number>(0);
  const renderedFrameIndexRef = useRef<number>(-1);
  const lastSuccessfullyDrawnImgRef = useRef<HTMLImageElement | null>(null);
  const isRenderingRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);

  // React state for initial canvas mount
  const [isCanvasReady, setIsCanvasReady] = useState<boolean>(false);

  // Format frame URL
  const getFrameUrl = useCallback((index: number) => {
    const frameNum = String(index + 1).padStart(3, '0');
    return `${framePrefix}${frameNum}.jpg`;
  }, [framePrefix]);

  // Helper to check if an image is completely loaded and ready to draw
  const isImageReady = useCallback((img: HTMLImageElement | null | undefined): img is HTMLImageElement => {
    return !!img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0;
  }, []);

  // Persistent Canvas Draw Function — NEVER clears canvas unless immediately drawing over it
  const drawImageToCanvas = useCallback((img: HTMLImageElement, frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);
    const rect = canvas.getBoundingClientRect();
    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    if (!imgWidth || !imgHeight) return;

    const imgAspect = imgWidth / imgHeight;
    const canvasAspect = canvasWidth / canvasHeight;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX = 0;
    let offsetY = 0;

    // Detect mobile portrait viewport (< 768px or portrait aspect ratio)
    const isMobile = rect.width <= 768 || canvasAspect < 1.05;

    if (isMobile) {
      // Mobile: Intelligently fit full subject width (no cropping of sunglasses)
      drawWidth = canvasWidth * 0.98;
      drawHeight = drawWidth / imgAspect;
      offsetX = (canvasWidth - drawWidth) / 2;
      
      // Position in the upper-middle visual focal zone (centered around ~39% viewport height)
      offsetY = (canvasHeight * 0.39) - (drawHeight / 2);
    } else {
      // Desktop / Landscape: Cover math
      if (canvasAspect > imgAspect) {
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgAspect;
        offsetY = (canvasHeight - drawHeight) / 2;
      } else {
        drawWidth = canvasHeight * imgAspect;
        drawHeight = canvasHeight;
        offsetX = (canvasWidth - drawWidth) / 2;
      }
    }

    // Fill background with seamless obsidian dark
    ctx.fillStyle = '#050507';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw directly over the canvas without clearing first (no blank flicker)
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    
    renderedFrameIndexRef.current = frameIndex;
    lastSuccessfullyDrawnImgRef.current = img;
  }, []);

  // Request to draw target frame on RAF
  const requestFrameRender = useCallback((targetIndex: number, progress: number) => {
    targetFrameIndexRef.current = targetIndex;

    // Directly update StoryOverlays DOM without triggering React re-renders
    if (overlaysRef.current) {
      overlaysRef.current.updateProgress(progress);
    }

    if (!isRenderingRef.current) {
      isRenderingRef.current = true;
      rafIdRef.current = requestAnimationFrame(() => {
        const target = targetFrameIndexRef.current;
        const candidateImg = framesCacheRef.current[target];

        // 1. If target frame is 100% ready, render it immediately
        if (isImageReady(candidateImg)) {
          if (renderedFrameIndexRef.current !== target) {
            drawImageToCanvas(candidateImg, target);
          }
        }
        // 2. If target frame is NOT ready, DO NOTHING to canvas.
        // The last successfully drawn frame remains visible without flicker.

        isRenderingRef.current = false;
      });
    }
  }, [drawImageToCanvas, isImageReady]);

  // Progressive Preloader with strict race condition prevention
  useEffect(() => {
    let isCancelled = false;
    let totalLoaded = 0;

    const loadFrame = (index: number): Promise<HTMLImageElement | null> => {
      return new Promise((resolve) => {
        if (framesCacheRef.current[index] && isImageReady(framesCacheRef.current[index])) {
          resolve(framesCacheRef.current[index]);
          return;
        }

        const img = new Image();
        img.src = getFrameUrl(index);

        img.onload = () => {
          if (isCancelled) return;
          framesCacheRef.current[index] = img;
          frameLoadedSetRef.current.add(index);
          totalLoaded++;

          // Asynchronously decode off-thread
          if (typeof img.decode === 'function') {
            img.decode().catch(() => {});
          }

          // If this newly loaded frame is the current target frame, render it immediately on RAF
          if (targetFrameIndexRef.current === index) {
            requestAnimationFrame(() => {
              if (targetFrameIndexRef.current === index) {
                drawImageToCanvas(img, index);
              }
            });
          }

          const pct = Math.min(100, Math.round((totalLoaded / totalFrames) * 100));
          onLoadingProgress?.(pct);
          if (totalLoaded >= totalFrames) {
            onLoadingComplete?.();
          }

          resolve(img);
        };

        img.onerror = () => {
          totalLoaded++;
          resolve(null);
        };
      });
    };

    // 1. Load initial frame 0 immediately and draw it
    loadFrame(0).then((img0) => {
      if (isCancelled || !img0) return;
      setIsCanvasReady(true);
      drawImageToCanvas(img0, 0);
      onLoadingProgress?.(30);

      // 2. Preload keyframes 1 to 20 immediately
      const preloadInitialBatch = async () => {
        const batch = [];
        for (let i = 1; i < Math.min(25, totalFrames); i++) {
          batch.push(loadFrame(i));
        }
        await Promise.all(batch);

        onLoadingProgress?.(60);

        // 3. Preload all remaining frames progressively
        for (let i = 25; i < totalFrames; i += 10) {
          if (isCancelled) break;
          const chunk = [];
          for (let j = i; j < Math.min(i + 10, totalFrames); j++) {
            chunk.push(loadFrame(j));
          }
          await Promise.all(chunk);
          await new Promise((r) => setTimeout(r, 15));
        }

        if (totalLoaded >= totalFrames) {
          onLoadingComplete?.();
        }
      };

      preloadInitialBatch();
    });

    return () => {
      isCancelled = true;
    };
  }, [drawImageToCanvas, getFrameUrl, isImageReady, onLoadingComplete, onLoadingProgress, totalFrames]);

  // Setup GSAP ScrollTrigger
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (framesCacheRef.current[0] && isImageReady(framesCacheRef.current[0])) {
        drawImageToCanvas(framesCacheRef.current[0], 0);
      }
      return;
    }

    const container = containerRef.current;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=4000',
      pin: true,
      anticipatePin: 1,
      scrub: 0.2, // Snappy 60fps tracking
      onUpdate: (self) => {
        const p = self.progress;
        const targetIndex = Math.min(totalFrames - 1, Math.max(0, Math.floor(p * totalFrames)));
        requestFrameRender(targetIndex, p);
      },
    });

    // Resize Handler: Redraws the last successfully rendered image cleanly without blank flash
    const handleResize = () => {
      if (lastSuccessfullyDrawnImgRef.current && isImageReady(lastSuccessfullyDrawnImgRef.current)) {
        drawImageToCanvas(lastSuccessfullyDrawnImgRef.current, renderedFrameIndexRef.current);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      trigger.kill();
      window.removeEventListener('resize', handleResize);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [drawImageToCanvas, isImageReady, requestFrameRender, totalFrames]);

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#050507',
        overflow: 'hidden',
      }}
    >
      {/* Persistent 3D Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: 'cover',
          zIndex: 1,
          opacity: isCanvasReady ? 1 : 0,
          transition: 'opacity 0.4s ease-in',
        }}
      />

      {/* Vignette Overlay */}
      <div
        className="vignette-overlay"
        style={{
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Top & Bottom Gradient Fades */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: 'linear-gradient(to bottom, #050507 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(to top, #050507 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Synchronized Editorial Story Overlays */}
      <StoryOverlays ref={overlaysRef} />

      {/* Scroll indicator widget (Hidden on mobile via CSS) */}
      <div
        id="desktop-scroll-indicator"
        style={{
          position: 'absolute',
          bottom: '1.75rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontSize: '0.625rem',
            letterSpacing: '0.28em',
            color: '#8e92a2',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          Scroll to explore
        </span>
        <div
          style={{
            width: '18px',
            height: '28px',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: '12px',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '2px',
              height: '5px',
              backgroundColor: '#ffffff',
              borderRadius: '2px',
              marginTop: '5px',
              animation: 'scrollPulse 2s cubic-bezier(0.65, 0, 0.35, 1) infinite',
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollPulse {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          60% {
            transform: translateY(10px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 0;
          }
        }

        @media (max-width: 899px) {
          #desktop-scroll-indicator {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
