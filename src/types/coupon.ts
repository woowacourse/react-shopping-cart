export interface Coupon {
  id: number;
  code: string;
  description?: string;
  expirationDate: string;
  discountType?: string;
  discount?: number; // 할인 금액 or 할인율
  minimumAmount?: number; // 최소 구매 금액
  applicableProducts?: string[];
  applicableCategories?: string[];
  maxDiscountAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
}
