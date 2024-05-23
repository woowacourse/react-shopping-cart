export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}
export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export interface Coupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discount: number;
  minimumAmount: number;
  discountType: string;
}
