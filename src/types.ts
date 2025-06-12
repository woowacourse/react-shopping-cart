export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

export type CartItem = {
  id: number;
  quantity: number;
  product: Product;
};

export type Coupon = {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discount?: number; // 할인 금액 또는 비율
  minimumAmount?: number; // 최소 구매 금액
  buyQuantity?: number; // 구매해야 하는 수량 (buyXgetY)
  getQuantity?: number; // 무료로 받는 수량 (buyXgetY)
  availableTime?: {
    start: string; // HH:mm:ss 형식
    end: string; // HH:mm:ss 형식
  };
  discountType: 'fixed' | 'percentage' | 'buyXgetY' | 'freeShipping';
};
