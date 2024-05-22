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

export interface Coupon {
  id: string;
  description: string;
  expirationDate: string;
  discountType: string;
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
}
