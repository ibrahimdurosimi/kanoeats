export type Screen = 'landing' | 'how-it-works' | 'dashboard' | 'owner-dashboard' | 'restaurant-details' | 'checkout' | 'register';

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number; // in NGN (Naira)
  image: string;
  category: 'Starters' | 'Mains' | 'Drinks' | 'Snacks';
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: number; // minutes
  tags: string[]; // ['Halal', 'Vegan', etc.]
  image: string;
  logoText: string;
  address: string;
  opens: string;
  closes: string;
  dishes: Dish[];
}

export interface CartItem {
  dish: Dish;
  restaurantId: string;
  restaurantName: string;
  quantity: number;
}

export interface User {
  fullName: string;
  email: string;
  phone: string;
  isLoggedIn: boolean;
  address?: string;
  role?: 'customer' | 'owner';
}
