export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export interface CartItemCounts {
  quantity: number;
}

export interface CartSummary {
  orderPrice: number;
  deliveryPrice: number;
  totalPrice: number;
  uniqueItemCount: number;
  totalItemCount: number;
}
