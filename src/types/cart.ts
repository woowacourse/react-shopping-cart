export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface Coupon {
  id: number;
  code: string;
  description: string;
  discount?: number;
  discountType: "fixed" | "percentage" | "buyXgetY" | "freeShipping";
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
  expirationDate: string;
}
