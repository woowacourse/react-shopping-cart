export interface ProductItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItem {
  id: number;
  quantity: number;
}

export interface CartItemWithProduct extends CartItem {
  product: ProductItem;
}

export interface NewCartItem {
  id: number;
  quantity: 1;
}
