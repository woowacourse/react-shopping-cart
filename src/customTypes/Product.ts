export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export type Cart = Record<number, number>;
