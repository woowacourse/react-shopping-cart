export type ProductId = number;

export type CartId = number;

export interface Product {
  product_id: ProductId;
  name: string;
  price: number;
  image_url: string;
}

export interface CartItem {
  cart_id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  checked: boolean;
}

export type CartItemOnServer = Omit<CartItem, 'quantity' | 'checked'>;

export interface OrderedItem extends Product {
  quantity: number;
}

export interface Order {
  order_id: number;
  order_details: OrderedItem[];
}
