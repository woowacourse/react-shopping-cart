export enum ButtonSize {
  LARGE = 'LARGE',
  REGULAR = 'REGULAR',
}

export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
};

export type CartItem = {
  id: string;
  productId: Product['id'];
  quantity: number;
};
