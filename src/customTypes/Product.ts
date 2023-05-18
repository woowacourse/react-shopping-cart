export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItem {
  cartItemId: number;
  productId: number;
  quantity: number;
}

export type CartItems = Record<string, CartItem>;
