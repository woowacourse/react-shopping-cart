export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface AvailableTime {
  start: string;
  end: string;
}

export interface Coupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: "fixed" | "percentage" | "buyXgetY" | "freeShipping";
  discount?: number;
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: AvailableTime;
}

export type SelectedCartItemQuantity = Pick<CartItem, "id" | "quantity">;
