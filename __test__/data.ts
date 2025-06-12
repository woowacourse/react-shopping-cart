import { CartItem } from '../src/features/cart/api/types/cart';
import { Coupon } from '../src/features/coupon/types/coupon';

export const mockCartItem_1: CartItem[] = [
  {
    id: 1551,
    quantity: 3,
    product: {
      id: 36,
      name: '패셔니스타 유담이',
      price: 30000,
      imageUrl: 'https://image.yes24.com/goods/84933797/XL',
      category: '패션잡화',
    },
  },
];

export const mockCartItem_2: CartItem[] = [
  {
    id: 1552,
    quantity: 1,
    product: {
      id: 36,
      name: '패셔니스타 유담이',
      price: 30000,
      imageUrl: 'https://image.yes24.com/goods/84933797/XL',
      category: '패션잡화',
    },
  },
  {
    id: 1553,
    quantity: 3,
    product: {
      id: 23,
      name: '리바이 아커만',
      price: 100000,
      imageUrl:
        'https://image.zeta-ai.io/profile-image/793bf4d3-03de-4ac3-afe1-95be8a9bc62c/29cd5c72-f872-4dba-8be1-21ba51e4487f.jpeg?w=1080&q=90&f=webp',
      category: '패션잡화',
    },
  },
];

export const coupons: Coupon[] = [
  {
    id: 1,
    code: 'FIXED5000',
    description: '5,000원 할인 쿠폰',
    discountType: 'fixed',
    discount: 5000,
    minimumAmount: 100000,
    expirationDate: '2025-11-30',
  },
  {
    id: 2,
    code: 'BOGO',
    description: '2개 구매 시 1개 무료 쿠폰',
    discountType: 'buyXgetY',
    buyQuantity: 2,
    getQuantity: 1,
    expirationDate: '2025-06-30',
  },
  {
    id: 3,
    code: 'FREESHIPPING',
    description: '5만원 이상 구매 시 무료 배송 쿠폰',
    discountType: 'freeShipping',
    minimumAmount: 50000,
    expirationDate: '2025-08-31',
  },
  {
    id: 4,
    code: 'MIRACLESALE',
    description: '미라클모닝 30% 할인 쿠폰',
    discountType: 'percentage',
    discount: 30,
    availableTime: {
      start: '04:00:00',
      end: '07:00:00',
    },
    expirationDate: '2025-07-31',
  },
];
