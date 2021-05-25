export enum ButtonSize {
  SMALL = 'SMALL',
  REGULAR = 'REGULAR',
  LARGE = 'LARGE',
}

export type Product = {
  productId: number;
  name: string;
  imageUrl: string;
  price: number;
};

export type CartItem = {
  cartId: number;
  quantity: number;
  checked: boolean;
} & Product;

export type OrderItem = {
  quantity: CartItem['quantity'];
} & Product;

export type Order = {
  orderId: number;
  orderDetails: OrderItem[];
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
