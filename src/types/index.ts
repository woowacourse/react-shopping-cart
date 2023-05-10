export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export interface Product {
  id: number;
  price: number;
  name: string;
  imageUrl: string;
}
