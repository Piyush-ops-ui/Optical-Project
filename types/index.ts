export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  category: 'Aviator' | 'Wayfarer' | 'Square' | 'Round' | 'Geometric' | 'Rimless' | 'Sport';
  color: string;
  frameMaterial: string;
  lensTechnology: string;
  uvProtection: string;
  bridgeWidth: string;
  templeLength: string;
  gender: 'Unisex' | 'Men' | 'Women';
  available: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewsCount: number;
  tags: string[];
}

export interface FrameSequenceConfig {
  totalFrames: number;
  framePrefix: string;
  frameSuffix: string;
  framePadLength: number;
  basePath: string;
  fps: number;
}
