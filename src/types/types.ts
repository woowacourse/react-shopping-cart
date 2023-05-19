export interface ProductItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface Cart {
  id: number;
  quantity: number;
  product: ProductItem;
}

export interface NewCartItem extends Cart {
  quantity: 1;
}
