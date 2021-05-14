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

declare type Cart = CartItem[];

declare interface Order {
  id: number;
  orderItems: CartItem[];
}
