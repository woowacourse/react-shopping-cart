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
  cartDeliveryPrice: number;
  orderDeliveryPrice: number;
  cartTotalPrice: number;
  orderTotalPrice: number;
  uniqueItemCount: number;
  totalItemCount: number;
}
export interface Coupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discount?: number;
  discountType: "fixed" | "percentage" | "buyXgetY" | "freeShipping";
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
}
