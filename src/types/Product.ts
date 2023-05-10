export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export interface ApiData extends Omit<Product, 'id'> {
  id: number;
}

export interface MyProduct extends Product {
  count: number;
}

export type MyCart = Record<string, MyProduct>;
