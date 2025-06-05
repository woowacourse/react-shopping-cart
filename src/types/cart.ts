export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CartProduct {
  id: number;
  quantity: number;
  product: Product;
}
