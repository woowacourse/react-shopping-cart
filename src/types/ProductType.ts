export interface ProductItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItem {
  id: number;
  quantity: number;
  checked?: boolean;
  product: ProductItem;
}
export interface NewCartItem extends CartItem {
  quantity: 1;
}
