export type Category = 'all' | 'skincare' | 'makeup' | 'fragrance' | 'haircare' | 'tools';

export type SkinType = 'all' | 'dry' | 'oily' | 'combination' | 'sensitive';

export type SkinConcern = 'hydration' | 'glow' | 'brightening' | 'anti-aging' | 'texture' | 'firmness' | 'calming' | 'protection';

export type ModelType3D = 'serum' | 'cream' | 'perfume' | 'lipstick' | 'roller';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number; // In ₹
  rating: number;
  reviewsCount: number;
  description: string;
  shortDescription: string;
  ingredients: string[];
  benefits: string[];
  skinType: SkinType[];
  skinConcern: SkinConcern[];
  modelType: ModelType3D;
  sizes?: string[];
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  colorHex?: string;
  accentColor?: string;
  volume?: string;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'cart' | 'wishlist' | 'info';
}

export interface FilterState {
  category: Category;
  skinType: SkinType;
  skinConcern: SkinConcern | 'all';
  maxPrice: number;
  searchKeyword: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating';
  minRating: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  location?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  date: string;
  shippingDetails: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    pincode: string;
  };
}
