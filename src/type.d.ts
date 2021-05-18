declare interface Product {
  id: string;
  name: string;
  thumbnail: string;
  price: string;
  stock: number;
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
  id: number;
  orderItems: CartItem[];
}
