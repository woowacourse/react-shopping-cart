import { RecoilRoot } from 'recoil';

import { renderHook } from '@testing-library/react';

import useDiscount from './useDiscount';
import useCouponList from '../coupon/useCouponList';
import {
  couponListState,
  selectedCouponListState,
} from '../../recoil/coupon/atom';
import {
  cartItemListState,
  selectedCartItemIdListState,
} from '../../recoil/cartItem/atom';
import usePrice from './usePrice';

describe('useDiscount', () => {
  const MOCK_COUPONS: Coupon[] = [
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
      expirationDate: '2024-05-30',
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

  const MOCK_CART_ITEM_LIST = [
    {
      id: 2463,
      quantity: 3,
      name: '코카콜라',
      price: 10000,
      imageUrl:
        'https://godomall.speedycdn.net/1cd80571a779bf8f2c08a18dc0965949/goods/1000000027/image/detail/1000000027_detail_012.jpg',
    },
    {
      id: 2464,
      quantity: 3,
      name: '나이키',
      price: 20000,
      imageUrl:
        'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png',
    },
    {
      id: 2465,
      quantity: 1,
      name: '컨버스',
      price: 10000,
      imageUrl:
        'https://sitem.ssgcdn.com/65/73/69/item/1000163697365_i1_750.jpg',
    },
  ];
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('percentageDiscountAmount는 쿠폰의 discount를 퍼센트로 적용하여 할인 금액을 계산해야 한다.', () => {
    const useCustomHook = () => {
      return { ...useDiscount(), ...useCouponList() };
    };
    const { result } = renderHook(() => useCustomHook(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartItemListState, MOCK_CART_ITEM_LIST);
            set(couponListState, MOCK_COUPONS);
            set(selectedCouponListState, MOCK_COUPONS);
            set(
              selectedCartItemIdListState,
              MOCK_CART_ITEM_LIST.map(({ id }) => id),
            );
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    const percentageCoupon = result.current.couponList.find(
      ({ discountType }) => discountType === 'percentage',
    );

    expect(result.current.percentageDiscountAmount).toBe(
      (MOCK_CART_ITEM_LIST.reduce(
        (sum, { price, quantity }) => sum + price * quantity,
        0,
      ) *
        (percentageCoupon?.discount ?? 0)) /
        100,
    );
  });

  it('bogoDiscountAmount는 buyQuantity 이상의 상품 중 가장 비싼 금액에 getQuantity를 곱한 금액을 계산해야 한다.', () => {
    const useCustomHook = () => {
      return { ...useDiscount(), ...useCouponList() };
    };
    const { result } = renderHook(() => useCustomHook(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartItemListState, MOCK_CART_ITEM_LIST);
            set(couponListState, MOCK_COUPONS);
            set(selectedCouponListState, MOCK_COUPONS);
            set(
              selectedCartItemIdListState,
              MOCK_CART_ITEM_LIST.map(({ id }) => id),
            );
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    const bogoCoupon = result.current.couponList.find(
      ({ discountType }) => discountType === 'buyXgetY',
    );

    const maxPrice = MOCK_CART_ITEM_LIST.reduce((max, { price, quantity }) => {
      return quantity >= (bogoCoupon?.buyQuantity ?? 0)
        ? Math.max(max, price)
        : max;
    }, 0);

    expect(result.current.bogoDiscountAmount).toBe(
      maxPrice * (bogoCoupon?.getQuantity ?? 1),
    );
  });

  it('fixedDiscountAmount는 고정 금액 할인 쿠폰의 할인 금액을 계산해야 한다.', () => {
    const useCustomHook = () => {
      return { ...useDiscount(), ...useCouponList() };
    };
    const { result } = renderHook(() => useCustomHook(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartItemListState, MOCK_CART_ITEM_LIST);
            set(couponListState, MOCK_COUPONS);
            set(selectedCouponListState, MOCK_COUPONS);
            set(
              selectedCartItemIdListState,
              MOCK_CART_ITEM_LIST.map(({ id }) => id),
            );
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current.fixedDiscountAmount).toBe(
      MOCK_COUPONS.filter(
        (coupon) =>
          coupon.discountType === 'fixed' &&
          MOCK_CART_ITEM_LIST.reduce(
            (sum, { price, quantity }) => sum + price * quantity,
            0,
          ) >= (coupon.minimumAmount ?? 0),
      ).reduce((sum, { discount }) => sum + (discount ?? 0), 0),
    );
  });

  it('freeShippingDiscountAmount는 무료 배송 쿠폰의 할인 금액을 계산해야 한다.', () => {
    const useCustomHook = () => {
      return { ...useDiscount(), ...useCouponList(), ...usePrice() };
    };
    const { result } = renderHook(() => useCustomHook(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartItemListState, MOCK_CART_ITEM_LIST);
            set(couponListState, MOCK_COUPONS);
            set(selectedCouponListState, MOCK_COUPONS);
            set(
              selectedCartItemIdListState,
              MOCK_CART_ITEM_LIST.map(({ id }) => id),
            );
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current.freeShippingDiscountAmount).toBe(
      result.current.couponList.find(
        ({ discountType }) => discountType === 'freeShipping',
      )
        ? result.current.deliveryFee
        : 0,
    );
  });

  it('totalDiscountAmount는 모든 할인 금액의 합을 계산해야 한다.', () => {
    const useCustomHook = () => {
      return { ...useDiscount(), ...useCouponList() };
    };
    const { result } = renderHook(() => useCustomHook(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartItemListState, MOCK_CART_ITEM_LIST);
            set(couponListState, MOCK_COUPONS);
            set(selectedCouponListState, MOCK_COUPONS);
            set(
              selectedCartItemIdListState,
              MOCK_CART_ITEM_LIST.map(({ id }) => id),
            );
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current.totalDiscountAmount).toBe(
      result.current.percentageDiscountAmount +
        result.current.bogoDiscountAmount +
        result.current.fixedDiscountAmount +
        result.current.freeShippingDiscountAmount,
    );
  });
});
