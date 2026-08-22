import { create } from 'zustand';
import type { Product, CartItem, FilterState, ToastNotification, Order, Category } from '../types/product';
import { LUMERA_PRODUCTS } from '../data/products';

interface StoreState {
  // Navigation & View Mode
  enteredStore: boolean;
  activeCategory: Category;
  setEnteredStore: (entered: boolean) => void;
  setActiveCategory: (category: Category) => void;

  // Selected Product & Inspector Modal
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  // Drawers & Modals State
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isSearchOpen: boolean;
  isCheckoutOpen: boolean;
  isOrderConfirmationOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setWishlistOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setCheckoutOpen: (open: boolean) => void;
  setOrderConfirmationOpen: (open: boolean) => void;

  // E-Commerce Data State
  cart: CartItem[];
  wishlist: Product[];
  recentlyViewed: Product[];
  completedOrder: Order | null;

  // Cart Actions
  addToCart: (product: Product, quantity?: number, selectedSize?: string) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;

  // Wishlist Actions
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // Recently Viewed
  addRecentlyViewed: (product: Product) => void;

  // Toast Notifications
  toasts: ToastNotification[];
  addToast: (title: string, message: string, type?: 'cart' | 'wishlist' | 'info') => void;
  removeToast: (id: string) => void;

  // Filters State & Actions
  filters: FilterState;
  setFilter: (newFilters: Partial<FilterState>) => void;
  resetFilters: () => void;

  // Checkout Flow
  placeOrder: (shippingDetails: Order['shippingDetails']) => void;
}

const initialFilters: FilterState = {
  category: 'all',
  skinType: 'all',
  skinConcern: 'all',
  maxPrice: 5000,
  searchKeyword: '',
  sortBy: 'featured',
  minRating: 0
};

export const useStore = create<StoreState>((set, get) => ({
  enteredStore: false,
  activeCategory: 'all',
  setEnteredStore: (entered) => set({ enteredStore: entered }),
  setActiveCategory: (category) => set({ activeCategory: category }),

  selectedProduct: null,
  setSelectedProduct: (product) => {
    set({ selectedProduct: product });
    if (product) {
      get().addRecentlyViewed(product);
    }
  },

  isCartOpen: false,
  isWishlistOpen: false,
  isSearchOpen: false,
  isCheckoutOpen: false,
  isOrderConfirmationOpen: false,

  setCartOpen: (open) => set({ isCartOpen: open }),
  setWishlistOpen: (open) => set({ isWishlistOpen: open }),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setCheckoutOpen: (open) => set({ isCheckoutOpen: open }),
  setOrderConfirmationOpen: (open) => set({ isOrderConfirmationOpen: open }),

  cart: [
    // Pre-populate 1 popular item for an impressive immediate cart experience
    { product: LUMERA_PRODUCTS[0], quantity: 1, selectedSize: '50ml' }
  ],
  wishlist: [],
  recentlyViewed: [],
  completedOrder: null,

  addToCart: (product, quantity = 1, selectedSize) => {
    const size = selectedSize || (product.sizes ? product.sizes[0] : 'Standard');
    const existingIndex = get().cart.findIndex(
      (item) => item.product.id === product.id && item.selectedSize === size
    );

    let updatedCart: CartItem[];
    if (existingIndex > -1) {
      updatedCart = [...get().cart];
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart = [...get().cart, { product, quantity, selectedSize: size }];
    }

    set({ cart: updatedCart, isCartOpen: true });
    get().addToast('Added to Beauty Bag', `${product.name} (${size})`, 'cart');
  },

  removeFromCart: (productId, size) => {
    const updatedCart = get().cart.filter(
      (item) => !(item.product.id === productId && (size ? item.selectedSize === size : true))
    );
    set({ cart: updatedCart });
  },

  updateCartQuantity: (productId, quantity, size) => {
    if (quantity <= 0) {
      get().removeFromCart(productId, size);
      return;
    }
    const updatedCart = get().cart.map((item) => {
      if (item.product.id === productId && (size ? item.selectedSize === size : true)) {
        return { ...item, quantity };
      }
      return item;
    });
    set({ cart: updatedCart });
  },

  clearCart: () => set({ cart: [] }),

  toggleWishlist: (product) => {
    const exists = get().wishlist.some((item) => item.id === product.id);
    let updatedWishlist: Product[];
    if (exists) {
      updatedWishlist = get().wishlist.filter((item) => item.id !== product.id);
      get().addToast('Removed from Wishlist', product.name, 'wishlist');
    } else {
      updatedWishlist = [...get().wishlist, product];
      get().addToast('Saved to Wishlist', product.name, 'wishlist');
    }
    set({ wishlist: updatedWishlist });
  },

  isInWishlist: (productId) => {
    return get().wishlist.some((item) => item.id === productId);
  },

  addRecentlyViewed: (product) => {
    const filtered = get().recentlyViewed.filter((item) => item.id !== product.id);
    set({ recentlyViewed: [product, ...filtered].slice(0, 8) });
  },

  toasts: [],
  addToast: (title, message, type = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastNotification = { id, title, message, type };
    set({ toasts: [...get().toasts, newToast] });

    // Auto dismiss toast after 3.5s
    setTimeout(() => {
      get().removeToast(id);
    }, 3500);
  },

  removeToast: (id) => {
    set({ toasts: get().toasts.filter((t) => t.id !== id) });
  },

  filters: initialFilters,
  setFilter: (newFilters) => {
    set({ filters: { ...get().filters, ...newFilters } });
  },
  resetFilters: () => set({ filters: initialFilters }),

  placeOrder: (shippingDetails) => {
    const cartItems = get().cart;
    if (cartItems.length === 0) return;

    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const tax = Math.round(subtotal * 0.18); // 18% GST mock
    const shipping = subtotal > 2000 ? 0 : 250;
    const total = subtotal + tax + shipping;

    const newOrder: Order = {
      id: `LUM-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...cartItems],
      subtotal,
      tax,
      shipping,
      total,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      shippingDetails
    };

    set({
      completedOrder: newOrder,
      cart: [],
      isCheckoutOpen: false,
      isOrderConfirmationOpen: true
    });
  }
}));
