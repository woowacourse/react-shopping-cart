import { Coupon } from '../src/types';

export const mockCartItems = [
  {
    id: 1,
    quantity: 2,
    product: {
      id: 24,
      name: '부리부리 원형 테이블',
      price: 10000000,
      imageUrl:
        'https://cafe24.poxo.com/ec01/dmswo9075/HOvhRhvOk+Cp2KY4JuusAqBst4wtnsfbyXcejHyxMmXKvNELh5kEAFzUfK9ehG6ogDMwTwYJTLHHXeYVBq809g==/_/web/product/big/202408/19deee5e9d060d80a4180e2b2ecb6ce8.jpg',
      category: '패션잡화',
    },
  },
  {
    id: 2,
    quantity: 1,
    product: {
      id: 25,
      name: '모던 우드 체어',
      price: 2000,
      imageUrl: 'https://cafe24.poxo.com/ec01/dmswo9075/modern-wood-chair.jpg',
      category: '가구',
    },
  },
  {
    id: 3,
    quantity: 3,
    product: {
      id: 26,
      name: '심플 러그',
      price: 100,
      imageUrl: 'https://cafe24.poxo.com/ec01/dmswo9075/simple-rug.jpg',
      category: '홈데코',
    },
  },
  {
    id: 4,
    quantity: 1,
    product: {
      id: 27,
      name: '빈티지 스탠드 조명',
      price: 1200,
      imageUrl:
        'https://cafe24.poxo.com/ec01/dmswo9075/vintage-stand-light.jpg',
      category: '조명',
    },
  },
  {
    id: 5,
    quantity: 3,
    product: {
      id: 28,
      name: '아트 포스터',
      price: 1000,
      imageUrl: 'https://cafe24.poxo.com/ec01/dmswo9075/art-poster.jpg',
      category: '인테리어소품',
    },
  },
  {
    id: 6,
    quantity: 1,
    product: {
      id: 29,
      name: '모던 화병',
      price: 50000,
      imageUrl: 'https://cafe24.poxo.com/ec01/dmswo9075/modern-vase.jpg',
      category: '홈데코',
    },
  },
];

export let fetchedData = {
  content: [...mockCartItems],
};

export const initFetchedData = () => {
  fetchedData = {
    content: [...mockCartItems],
  };
};

export const mockCoupons: Coupon[] = [
  {
    id: 1,
    code: 'FIXED5000',
    description: '5,000원 할인 쿠폰',
    expirationDate: '2025-11-30',
    discount: 5000,
    minimumAmount: 100000,
    discountType: 'fixed',
  },
  {
    id: 2,
    code: 'BOGO',
    description: '2개 구매 시 1개 무료 쿠폰',
    expirationDate: '2025-06-30',
    buyQuantity: 2,
    getQuantity: 1,
    discountType: 'buyXgetY',
  },
  {
    id: 3,
    code: 'FREESHIPPING',
    description: '5만원 이상 구매 시 무료 배송 쿠폰',
    expirationDate: '2025-08-31',
    minimumAmount: 50000,
    discountType: 'freeShipping',
  },
  {
    id: 4,
    code: 'MIRACLESALE',
    description: '미라클모닝 30% 할인 쿠폰',
    expirationDate: '2025-07-31',
    discount: 30,
    availableTime: {
      start: '04:00:00',
      end: '07:00:00',
    },
    discountType: 'percentage',
  },
];
