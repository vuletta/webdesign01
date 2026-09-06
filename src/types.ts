export type Category = "espresso" | "filter" | "decaf";
export type Weight = "250g" | "1kg";
export type Brew = "espresso" | "v60" | "french" | "cold" | "moka";

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  origin: string;
  process: string;
  altitude: string;
  category: Category;
  roast: 1 | 2 | 3 | 4 | 5;
  notes: string[];
  price250: number;
  price1kg: number;
  image: string;
  badge?: string;
  accent: string;
  description: string;
  brew: Brew[];
}

export interface CartItem {
  key: string;
  productId: string;
  weight: Weight;
  qty: number;
}

export interface ResolvedCartItem extends CartItem {
  product: Product;
  unitPrice: number;
  lineTotal: number;
}

export interface ToastMsg {
  id: number;
  text: string;
}
