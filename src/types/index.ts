export interface Cart {
  id: CartId;
  quantity: number;
  product: Product;
}

export interface Product {
  id: ProductId;
  price: number;
  name: string;
  imageUrl: string;
}

export type CartId = number;
export type ProductId = number;
