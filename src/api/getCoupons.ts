import { VITE_BASE_URL } from '../constants/evt';

type Coupon = {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discount: number;
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
  discountType: 'fixed' | 'buyXgetY' | 'freeShipping' | 'percentage';
};

const getCoupons = async (): Promise<Coupon[]> => {
  const response = await fetch(`${VITE_BASE_URL}/coupons`);

  if (!response.ok) {
    throw new Error('Failed to fetch coupons');
  }

  const raw = await response.json();
  const data: Coupon[] = raw.content;

  return data;
};

export default getCoupons;
