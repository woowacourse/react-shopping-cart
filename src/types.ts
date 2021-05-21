export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface ItemInCart extends Product {
  quantity: number;
  checked: boolean;
}

export interface OrderedItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderedItem[];
}
