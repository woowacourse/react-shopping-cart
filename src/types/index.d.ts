declare module '*.png';

declare global {
  interface Array<T> {
    toSpliced: (start: number, deleteCount: number, ...items: T[]) => Array<T>;
  }
}

export interface ProductType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItemType {
  id: number;
  quantity: number;
  product: ProductType;
}

export interface CartType extends Array<CartItemType> {}
