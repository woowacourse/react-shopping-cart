export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export type MyCart = Record<number, number>;
