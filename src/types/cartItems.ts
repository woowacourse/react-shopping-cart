interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export type CartItemId = number;

export interface RawCartItem {
  id: CartItemId;
  quantity: number;
  product: Product;
}

export interface CartItem extends RawCartItem {
  isSelected: boolean;
}
