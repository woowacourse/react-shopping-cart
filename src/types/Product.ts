export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}
export interface MyProduct extends Product {
  count: number;
}

export type MyCart = Record<number, MyProduct>;
