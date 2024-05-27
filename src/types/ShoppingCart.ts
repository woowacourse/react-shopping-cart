export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CartItemResponse {
  id: number;
  product: Product;
  quantity: number;
}

export interface CartItemQuantityAndPrice {
  id: number;
  quantity: number;
  price: number;
}
