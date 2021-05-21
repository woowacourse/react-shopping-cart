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

export enum AsyncStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

export enum ApiMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}
