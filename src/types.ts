export enum ButtonSize {
  LARGE = 'LARGE',
  REGULAR = 'REGULAR',
}

export type Product = {
  product_id: number;
  name: string;
  price: number;
  image_url: string;
};

export type CartDetail = {
  cart_id: number;
  quantity: number;
  checked: boolean;
};

export type CartItem = Product & CartDetail;

export type OrderItem = Product & { quantity: number };

export type Order = {
  order_id: number;
  order_details: OrderItem[];
};

export enum AsyncStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}
