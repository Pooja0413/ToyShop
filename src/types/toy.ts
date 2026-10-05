export type ToyCategory = 
  | 'all'
  | 'wooden'
  | 'stem'
  | 'plush'
  | 'creative'
  | 'puzzles';

export type AgeGroup = '0-2' | '3-5' | '6-8' | '9+';

export interface ToyReview {
  id: string;
  author: string;
  relation: string; // e.g. "Parent of 3-year-old"
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface ToyProduct {
  id: string;
  name: string;
  subtitle: string;
  category: 'wooden' | 'stem' | 'plush' | 'creative' | 'puzzles';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  ageRange: string;
  ageGroup: AgeGroup;
  piecesCount?: number;
  materials: string;
  dimensions: string;
  safetyCertifications: string[];
  description: string;
  playBenefits: string[];
  imageUrl: string;
  secondaryImageUrl?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  engravable?: boolean;
  reviews: ToyReview[];
}

export interface CartItem {
  product: ToyProduct;
  quantity: number;
  engravingText?: string;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  giftNote?: string;
  shippingMethod: string;
  estimatedDelivery: string;
}
