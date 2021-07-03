export enum ButtonSize {
  SMALL = 'SMALL',
  REGULAR = 'REGULAR',
  LARGE = 'LARGE',
}

export type ProductId = number;

export type Product = {
  productId: ProductId;
  name: string;
  imageUrl: string;
  price: number;
};

export type CartId = number;

export type CartItem = {
  cartId: CartId;
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
