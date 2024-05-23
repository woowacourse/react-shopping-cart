export type Coupon = {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discount?: number;
  minimumAmount?: number;
  discountType: string;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: AvailableTime;
};

export type AvailableTime = {
  start: string;
  end: string;
};
