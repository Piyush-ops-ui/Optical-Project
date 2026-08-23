import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://tiwarioptical.com'),
  title: 'Tiwari Optical | Premium Sunglasses',
  description: 'Discover premium sunglasses at Tiwari Optical. Explore our curated eyewear collection and find a frame that defines your style.',
  keywords: [
    'Tiwari Optical',
    'luxury sunglasses',
    'premium eyewear',
    'polarized sunglasses',
    'designer frames',
    'curated eyewear collection',
    'fashion eyewear',
    'titanium sunglasses',
    'acetate frames'
  ],
  authors: [{ name: 'Tiwari Optical' }],
  openGraph: {
    title: 'Tiwari Optical | Premium Sunglasses',
    description: 'Discover premium sunglasses at Tiwari Optical. Explore our curated eyewear collection and find a frame that defines your style.',
    url: 'https://tiwarioptical.com',
    siteName: 'Tiwari Optical',
    images: [
      {
        url: '/frames/ezgif-frame-075.jpg',
        width: 1920,
        height: 1080,
        alt: 'Tiwari Optical Premium Eyewear Showcase'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tiwari Optical | Premium Sunglasses',
    description: 'Discover premium sunglasses at Tiwari Optical. Explore our curated eyewear collection and find a frame that defines your style.',
    images: ['/frames/ezgif-frame-075.jpg']
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: '#050507',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050507] text-white antialiased selection:bg-white/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
