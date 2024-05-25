import { atom, selector } from 'recoil';
import { fetchCartItems } from '../api';

export const productsState = atom({
  key: 'productsState',
  default: selector({
    key: 'productsState/Default',
    get: async () => {
      const products = await fetchCartItems();
      return products;
    },
  }),
});

export const isCheckedState = atom<Record<number, boolean>>({
  key: 'isCheckedState',
  default: {},
  effects: [
    ({ onSet }) => {
      onSet((state: Record<number, boolean>) => {
        window.localStorage.setItem('isChecked', JSON.stringify(state));
      });
    },
  ],
});

type HasShippingFeeType = {
  hasBasicFee: boolean;
  hasAdditionalFee: boolean;
};

const initialShippingFee: HasShippingFeeType = { hasBasicFee: false, hasAdditionalFee: false };

export const shippingFeeState = atom<HasShippingFeeType>({
  key: 'shippingFeeState',
  default: initialShippingFee,
});

export const mockCoupons = [
  {
    id: 1,
    code: 'FIXED5000',
    description: '5,000원 할인 쿠폰',
    expirationDate: '2024-11-30',
    discount: 5000,
    minimumAmount: 100000,
    discountType: 'fixed',
  },
  {
    id: 2,
    code: 'BOGO',
    description: '2개 구매 시 1개 무료 쿠폰',
    expirationDate: '2024-04-30',
    buyQuantity: 2,
    getQuantity: 1,
    discountType: 'buyXgetY',
  },
  {
    id: 3,
    code: 'FREESHIPPING',
    description: '5만원 이상 구매 시 무료 배송 쿠폰',
    expirationDate: '2024-08-31',
    minimumAmount: 50000,
    discountType: 'freeShipping',
  },
  {
    id: 4,
    code: 'MIRACLESALE',
    description: '미라클모닝 30% 할인 쿠폰',
    expirationDate: '2024-07-31',
    discount: 30,
    availableTime: {
      start: '04:00:00',
      end: '07:00:00',
    },
    discountType: 'percentage',
  },
];

type CouponStateType = {
  checked: boolean;
  isAvailable: boolean;
};

const initialCoupon = mockCoupons.reduce<Record<string, CouponStateType>>((acc, coupon) => {
  acc[coupon.code] = {
    checked: false,
    isAvailable: true,
  };
  return acc;
}, {});

export const couponStatusState = atom({
  key: 'couponStatusState',
  default: initialCoupon,
});
