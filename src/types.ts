//request schema
export interface addItemInCartRequest {
  product_id: string;
}

export interface OrderItemRequest {
  cart_id: string;
  quantity: number;
}

//response schema
export interface ProductResponse {
  product_id: string;
  price: number;
  name: string;
  image_url: string;
}

export interface CartItemResponse extends Pick<ProductResponse, 'price' | 'name' | 'image_url'> {
  cart_id: string;
}

interface OrderItemResponse extends ProductResponse {
  quantity: number;
}

export interface OrderResponse {
  order_id: string;
  order_details: OrderItemResponse[];
}

//app schema
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
  checked: boolean;
}

export interface OrderItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
}
