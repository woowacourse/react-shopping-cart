export interface ProductData {
  product_id: number;
  price: number;
  name: string;
  image_url: string;
}

export interface CartItemData {
  cart_id: number;
  price: number;
  name: string;
  image_url: string;
}

export interface OrderData {
  order_id: number;
  order_details: Array<ProductData & { quantity: number }>;
}

export interface Product {
  id: string;
  name: string;
  thumbnail: string;
  price: string;
}

export interface CartItem {
  id: string;
  name: string;
  thumbnail: string;
  price: string;
  quantity: string;
  isSelected: boolean;
}

export interface Order {
  id: string;
  orderItems: CartItem[];
}
