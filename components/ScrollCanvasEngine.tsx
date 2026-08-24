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

  // In-memory cache for all 75 frames
  const framesCacheRef = useRef<(HTMLImageElement | null)[]>(new Array(totalFrames).fill(null));

  // State refs for animation
  const targetFrameIndexRef = useRef<number>(0);
  const renderedFrameIndexRef = useRef<number>(-1);
  const isRenderingRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);

  const [isCanvasReady, setIsCanvasReady] = useState<boolean>(false);

  // Frame URL helper
  const getFrameUrl = useCallback(
    (index: number) => {
      const frameNum = String(index + 1).padStart(3, '0');
      return `${framePrefix}${frameNum}.jpg`;
    },
    [framePrefix]
  );

  // Check if image is ready to draw
  const isImageReady = useCallback((img: HTMLImageElement | null | undefined): img is HTMLImageElement => {
    return !!img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0;
  }, []);

  // Find exact frame or the nearest loaded frame
  const getBestAvailableImage = useCallback(
    (targetIndex: number): { img: HTMLImageElement; index: number } | null => {
      // 1. Exact match
      const exact = framesCacheRef.current[targetIndex];
      if (isImageReady(exact)) return { img: exact, index: targetIndex };

      // 2. Search outwards for closest loaded frame
      for (let offset = 1; offset < totalFrames; offset++) {
        const prev = targetIndex - offset;
        if (prev >= 0) {
          const imgPrev = framesCacheRef.current[prev];
          if (isImageReady(imgPrev)) return { img: imgPrev, index: prev };
        }
        const next = targetIndex + offset;
        if (next < totalFrames) {
          const imgNext = framesCacheRef.current[next];
          if (isImageReady(imgNext)) return { img: imgNext, index: next };
        }
      }

      return null;
    },
    [isImageReady, totalFrames]
  );

  // Draw image to canvas with responsive framing
  const drawImageToCanvas = useCallback(
    (img: HTMLImageElement, frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);
      const rect = canvas.getBoundingClientRect();
      const targetW = Math.round((rect.width > 0 ? rect.width : window.innerWidth) * dpr);
      const targetH = Math.round((rect.height > 0 ? rect.height : window.innerHeight) * dpr);

      if (targetW <= 0 || targetH <= 0) return;

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.naturalWidth || 1920;
      const imgHeight = img.naturalHeight || 1080;

      const imgAspect = imgWidth / imgHeight;
      const canvasAspect = canvasWidth / canvasHeight;

      // True Aspect-Ratio Preserving Cover Mode (100% proportional, zero stretching/distortion)
      let drawWidth: number;
      let drawHeight: number;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasAspect > imgAspect) {
        // Viewport is wider than 16:9 -> Fit width, center-crop vertical overflow
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgAspect;
        offsetX = 0;
        offsetY = (canvasHeight - drawHeight) / 2;
      } else {
        // Viewport is taller than 16:9 (e.g. mobile portrait) -> Fit height, center-crop horizontal overflow
        drawWidth = canvasHeight * imgAspect;
        drawHeight = canvasHeight;
        offsetX = (canvasWidth - drawWidth) / 2;
        offsetY = 0;
      }

      // Fill background and draw proportional cover frame
      ctx.fillStyle = '#050507';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      renderedFrameIndexRef.current = frameIndex;
    },
    []
  );

  // Render current target frame on RAF
  const renderCurrentTarget = useCallback(() => {
    if (isRenderingRef.current) return;
    isRenderingRef.current = true;

    rafIdRef.current = requestAnimationFrame(() => {
      const target = targetFrameIndexRef.current;
      const best = getBestAvailableImage(target);

      if (best && renderedFrameIndexRef.current !== best.index) {
        drawImageToCanvas(best.img, best.index);
      }

      isRenderingRef.current = false;
    });
  }, [drawImageToCanvas, getBestAvailableImage]);

  // Stable refs for callbacks to prevent useEffect cancellation
  const onLoadingProgressRef = useRef(onLoadingProgress);
  const onLoadingCompleteRef = useRef(onLoadingComplete);
  useEffect(() => {
    onLoadingProgressRef.current = onLoadingProgress;
    onLoadingCompleteRef.current = onLoadingComplete;
  }, [onLoadingProgress, onLoadingComplete]);

  // Preload all 75 frames concurrently once on mount
  useEffect(() => {
    let isCancelled = false;
    let totalLoaded = 0;

    // Load initial frame 0 immediately
    const img0 = new Image();
    img0.src = getFrameUrl(0);
    img0.onload = () => {
      if (isCancelled) return;
      framesCacheRef.current[0] = img0;
      totalLoaded++;
      setIsCanvasReady(true);
      drawImageToCanvas(img0, 0);

      // Extra paint passes for smooth layout sync
      requestAnimationFrame(() => {
        if (!isCancelled) drawImageToCanvas(img0, 0);
      });
      setTimeout(() => {
        if (!isCancelled) drawImageToCanvas(img0, 0);
      }, 80);

      onLoadingProgressRef.current?.(35);
    };

    // Concurrently preload all remaining frames
    for (let i = 1; i < totalFrames; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (isCancelled) return;
        framesCacheRef.current[i] = img;
        totalLoaded++;

        const pct = Math.min(100, Math.round((totalLoaded / totalFrames) * 100));
        onLoadingProgressRef.current?.(pct);

        // If newly loaded frame is near our target, render it
        if (Math.abs(targetFrameIndexRef.current - i) <= 1) {
          renderCurrentTarget();
        }

        if (totalLoaded >= totalFrames) {
          onLoadingCompleteRef.current?.();
        }
      };

      img.onerror = () => {
        totalLoaded++;
        if (totalLoaded >= totalFrames) {
          onLoadingCompleteRef.current?.();
        }
      };
    }

    return () => {
      isCancelled = true;
    };
  }, [drawImageToCanvas, getFrameUrl, renderCurrentTarget, totalFrames]);

  // GSAP ScrollTrigger Setup
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;

    ScrollTrigger.config({ ignoreMobileResize: true });

    const isMobileViewport = window.innerWidth <= 768;
    const scrollDistance = isMobileViewport ? '+=2800' : '+=3800';

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: scrollDistance,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 0.3, // Continuous smooth tracking
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        const targetIndex = Math.min(totalFrames - 1, Math.max(0, Math.round(p * (totalFrames - 1))));
        targetFrameIndexRef.current = targetIndex;

        // Update story text overlays directly
        if (overlaysRef.current) {
          overlaysRef.current.updateProgress(p);
        }

        renderCurrentTarget();
      },
    });

    ScrollTrigger.refresh();

    // Resize handler
    let resizeTimer: NodeJS.Timeout | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        renderCurrentTarget();
      }, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      trigger.kill();
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [renderCurrentTarget, totalFrames]);

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '100dvh',
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
          height: '90px',
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
          height: '110px',
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

