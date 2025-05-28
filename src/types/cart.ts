export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity: number;
}

export interface CartProduct {
  id: number;
  quantity: number;
  product: Product;
}

export interface CartInfo {
  id: number;
  quantity: number;
}
