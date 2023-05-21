export interface ProductItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface ReceivedCartItem {
  id: number;
  quantity: number;
  product: ProductItem;
}

export interface CartItem extends ReceivedCartItem {
  checked: boolean;
}

export interface NewCartItem extends CartItem {
  quantity: 1;
  checked: true;
}
