export interface CartItemContent {
  id: number;
  quantity: number;
  product: Product;
}

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}
export interface Coupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discount: number;
  availableTime: { start: string; end: string };
  minimumAmount: number;
  discountType: string;
}
