export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface Cart {
  id: number;
  quantity: number;
  product: Product;
}

export interface Price {
  totalOrderPrice: number;
  deliveryFee: number;
  totalPrice: number;
}
