import { RecoilRoot } from 'recoil';

import { act, renderHook } from '@testing-library/react';

import { selectedCartItemListState } from '../recoil/CartItem/atoms/selectedCartItemListState';
import { selectedCartItemListTotalPriceSelector } from '../recoil/CartItem/selectors/selectedCartItemListTotalPriceSelector';
import { selectedCouponListState } from '../recoil/Coupon/atoms/selectedCouponListState';
import { deliveryFeeState } from '../recoil/DeliveryFee/atoms/deliveryFeeState';
import { useCalculateCouponDiscount, useCalculateTotalCouponDiscount } from './useCalculateCouponDiscount';

// 쿠폰 목업 데이터
const mockCoupons = [
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
  {
    id: 5,
    code: 'UNKNOWNCOUPON',
    description: '알 수 없는 종류의 쿠폰',
    expirationDate: '2024-07-31',
    discount: 10000,
    discountType: 'unknown',
  },
];

const mockCartItems = [
  {
    id: 1578,
    quantity: 5,
    product: {
      id: 12,
      name: '컨버스',
      price: 20000,
      imageUrl: 'https://sitem.ssgcdn.com/65/73/69/item/1000163697365_i1_750.jpg',
      category: 'fashion',
    },
  },
  {
    id: 1597,
    quantity: 3,
    product: {
      id: 2,
      name: '나이키',
      price: 1000,
      imageUrl:
        'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png',
      category: 'fashion',
    },
  },
  {
    id: 1598,
    quantity: 1,
    product: {
      id: 3,
      name: '아디다스',
      price: 2000,
      imageUrl: 'https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg',
      category: 'fashion',
    },
  },
  {
    id: 1599,
    quantity: 1,
    product: {
      id: 10,
      name: '퓨마',
      price: 10000,
      imageUrl: 'https://sitem.ssgcdn.com/47/78/22/item/1000031227847_i1_750.jpg',
      category: 'fashion',
    },
  },
  {
    id: 1600,
    quantity: 1,
    product: {
      id: 11,
      name: '리복',
      price: 20000,
      imageUrl: 'https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg',
      category: 'fashion',
    },
  },
  {
    id: 1601,
    quantity: 1,
    product: {
      id: 12,
      name: '컨버스',
      price: 20000,
      imageUrl: 'https://sitem.ssgcdn.com/65/73/69/item/1000163697365_i1_750.jpg',
      category: 'fashion',
    },
  },
  {
    id: 1602,
    quantity: 1,
    product: {
      id: 21,
      name: '나이키',
      price: 20000,
      imageUrl:
        'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png',
      category: 'fashion',
    },
  },
  {
    id: 1603,
    quantity: 1,
    product: {
      id: 34,
      name: '코카콜라',
      price: 10000,
      imageUrl:
        'https://godomall.speedycdn.net/1cd80571a779bf8f2c08a18dc0965949/goods/1000000027/image/detail/1000000027_detail_012.jpg',
      category: 'beverage',
    },
  },
];

describe('useCalculateCouponDiscount', () => {
  it('discountType가 fixed인 쿠폰은 discount만큼 할인해야 한다.', () => {
    const { result } = renderHook(() => useCalculateCouponDiscount(), {
      wrapper: RecoilRoot,
    });
    const calculateCouponDiscount = result.current.calculateCouponDiscount;
    const currentTotalPrice = 10000;

    expect(calculateCouponDiscount(currentTotalPrice, mockCoupons[0])).toEqual(5000);
  });

  it('discountType가 buyXgetY인 쿠폰은 가장 비싼 물건 1개의 가격만큼 할인해야 한다.', () => {
    const { result } = renderHook(() => useCalculateCouponDiscount(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedCartItemListState, mockCartItems);
            set(selectedCouponListState, mockCoupons);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });
    const calculateCouponDiscount = result.current.calculateCouponDiscount;
    const currentTotalPrice = 103000;

    expect(calculateCouponDiscount(currentTotalPrice, mockCoupons[1])).toEqual(20000);
  });

  it('discountType가 freeShipping인 쿠폰은 배송비만큼 할인해야 한다.', () => {
    const { result } = renderHook(() => useCalculateCouponDiscount(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(deliveryFeeState, 3000);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });
    const calculateCouponDiscount = result.current.calculateCouponDiscount;
    const currentTotalPrice = 200;

    expect(calculateCouponDiscount(currentTotalPrice, mockCoupons[2])).toEqual(3000);
  });

  it('discountType가 percentage인 쿠폰은 전체 금액의 discount% 만큼 할인해야 한다.', () => {
    const { result } = renderHook(() => useCalculateCouponDiscount(), {
      wrapper: RecoilRoot,
    });
    const calculateCouponDiscount = result.current.calculateCouponDiscount;
    const currentTotalPrice = 10000;

    expect(calculateCouponDiscount(currentTotalPrice, mockCoupons[3])).toEqual(3000);
  });

  it('discountType가 존재하지 않는 타입인 경우 할인이 적용되지 않아야 한다.', () => {
    const { result } = renderHook(() => useCalculateCouponDiscount(), {
      wrapper: RecoilRoot,
    });
    const calculateCouponDiscount = result.current.calculateCouponDiscount;
    const currentTotalPrice = 100;

    expect(calculateCouponDiscount(currentTotalPrice, mockCoupons[4])).toEqual(0);
  });
});

describe('useCalculateTotalCouponDiscount', () => {
  it('만약 모든 4개의 쿠폰이 적용될 수 있다고 가정했을 때, 가장 할인률이 높은 순으로 할인이 적용되어야 한다.', () => {
    const { result } = renderHook(() => useCalculateTotalCouponDiscount(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedCartItemListState, mockCartItems);
            set(selectedCouponListState, mockCoupons);
            set(deliveryFeeState, 3000);
            set(selectedCartItemListTotalPriceSelector, 90000);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    act(() => {
      result.current.calculateTotalCouponDiscount();
    });

    expect(result.current.selectedCouponTotalDiscount).toEqual(77500);
  });
});
