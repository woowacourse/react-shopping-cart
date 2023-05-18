export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItem {
  quantity: number;
  product: Product;
}
