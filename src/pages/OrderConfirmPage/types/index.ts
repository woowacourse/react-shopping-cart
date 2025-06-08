export interface OrderItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    quantity?: number;
  };
}

export interface CouponData {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discount?: number;
  minimumAmount?: number;
  discountType: "fixed" | "percentage" | "buyXgetY" | "freeShipping";
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
}

export interface OrderPageState {
  orderItems: OrderItem[];
  isLoading: boolean;
  availableCoupons: CouponData[];
  isIsolatedAreaSelected: boolean;
  toggleIsolatedArea: () => void;
  selectedCouponIds: number[];
  isOptimized: boolean;
  canSelectMore: boolean;
  toggleCoupon: (couponId: number) => void;
}
