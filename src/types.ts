export type ProductId = number;

export type CartId = number;

export interface Product {
  productId: ProductId;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItemOnServer {
  cartId: CartId;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItem extends CartItemOnServer {
  quantity: number;
  checked: boolean;
}

export interface OrderedItem extends Product {
  quantity: number;
}

export interface Order {
  orderId: number;
  orderDetails: OrderedItem[];
}
