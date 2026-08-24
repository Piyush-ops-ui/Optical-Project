'use client';

import React, { useState, useEffect } from 'react';
import LenisProvider from '@/components/LenisProvider';
import Navbar from '@/components/Navbar';
import ScrollCanvasEngine from '@/components/ScrollCanvasEngine';
import Collection from '@/components/Collection';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

export default function HomePage() {
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Reveal website quickly once hero frame is rendered
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingProgress = React.useCallback((progress: number) => {
    setLoadProgress(progress);
    if (progress >= 30) {
      setIsLoaded(true);
    }
  }, []);

  const handleLoadingComplete = React.useCallback(() => {
    setLoadProgress(100);
    setIsLoaded(true);
  }, []);

  return (
    <LenisProvider>
      {/* Luxury Loading Screen */}
      <LoadingScreen progress={loadProgress} isLoaded={isLoaded} />

      {/* Main Luxury Experience */}
      <main style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#050507' }}>
        {/* Sticky Minimal Navbar */}
        <Navbar />

        {/* 3D Scroll-Controlled Cinematic Hero & Narrative (75 Frames) */}
        <ScrollCanvasEngine
          totalFrames={75}
          framePrefix="/frames/ezgif-frame-"
          onLoadingProgress={handleLoadingProgress}
          onLoadingComplete={handleLoadingComplete}
        />

        {/* The Curated 20 Products Collection Section */}
        <Collection />

        {/* About Section: CRAFTED FOR YOUR VIEW. */}
        <About />

        {/* Contact Section: Address, Hours, Maps Placeholder */}
        <Contact />

        {/* Minimal Luxury Footer */}
        <Footer />
      </main>
    </LenisProvider>
  );
}
