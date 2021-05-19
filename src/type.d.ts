declare interface Product {
  productId: string;
  name: string;
  thumbnail: string;
  price: string;
  stock: number;
}

declare interface CartItem {
  cartId: string;
  productId: string;
  name: string;
  thumbnail: string;
  price: string;
  quantity: string;
  isSelected: boolean;
}

declare interface OrderItem {
  cartId: string;
  quantity: string;
}

interface Order {
  orderId: number;
  orderDetails: CartItem[];
}

declare type Orders = Order[];
