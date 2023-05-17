export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItem {
  id: Product['id'];
  quantity: number;
  product: Product;
}
