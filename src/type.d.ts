declare interface ProductData {
  product_id: number;
  price: number;
  name: string;
  image_url: string;
}

declare interface CartItemData {
  cart_id: number;
  price: number;
  name: string;
  image_url: string;
}

declare interface OrderData {
  order_id: number;
  order_details: Array<ProductData & { quantity: number }>;
}

declare interface Product {
  id: string;
  name: string;
  thumbnail: string;
  price: string;
}

declare interface CartItem {
  id: string;
  name: string;
  thumbnail: string;
  price: string;
  quantity: string;
  isSelected: boolean;
}

declare interface Order {
  id: string;
  orderItems: CartItem[];
}
