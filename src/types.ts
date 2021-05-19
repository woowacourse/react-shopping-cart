export enum ButtonSize {
  LARGE = 'LARGE',
  REGULAR = 'REGULAR',
}

export type Product = {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type CartDetail = {
  cartId: number;
  quantity: number;
  checked: boolean;
};

export type CartItem = Product & CartDetail;

export type OrderItem = Product & { quantity: number };

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
