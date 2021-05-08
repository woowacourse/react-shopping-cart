export interface Product {
  name: string;
  price: number;
  imgSrc: string;
}

export interface OrderItem extends Product {
  amount: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
}
