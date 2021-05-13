export enum ButtonSize {
  LARGE = 'LARGE',
  REGULAR = 'REGULAR',
}

export type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

export type CartItem = {
  id: number;
  product: Product;
  quantity: number;
  checked: boolean;
};

export type Order = {
  id: number;
  items: CartItem[];
};
