export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface Cart {
  id: number;
  quantity: number;
  product: Product;
}
