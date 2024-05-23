import { RecoilRoot, useSetRecoilState } from 'recoil';
import {
  cartListState,
  couponListState,
  filteredCartItemState,
} from '@/store/atoms';

import { Coupon } from '@/types/coupon.type';
import MOCK_CART_LIST from '@/constants/_mock/mockCartList';
import { MOCK_COUPON_LIST } from '@/constants/_mock/mockCouponList';
import { renderHook } from '@testing-library/react';
import useTotalCouponDiscount from './useTotalCouponDiscount';

jest.mock('@/api/config', () => ({
  config: {
    apiUrl: 'http://localhost:mock',
  },
}));

describe('useTotalCouponDiscount 훅을 사용하여 적용된 모든 쿠폰들에 대한 최종 할인 가격을 가져올 수 있다.', () => {
  const date = new Date();
  it('쿠폰을 하나만 사용시 하나의 할인 금액만 보여준다.', () => {
    const { result } = renderHook(
      () => {
        const setCartList = useSetRecoilState(cartListState);
        setCartList(MOCK_CART_LIST);

        const MOCK_FILTERED_CART_LIST = [
          {
            id: 624,
            quantity: 5,
            isSelected: true,
            price: 20000,
          },
        ];

        MOCK_FILTERED_CART_LIST.forEach((item) => {
          const setFilteredCartList = useSetRecoilState(
            filteredCartItemState(item.id)
          );
          setFilteredCartList(item);
        });

        const setCouponList = useSetRecoilState(couponListState);
        setCouponList(MOCK_COUPON_LIST);

        const coupons: Coupon[] = [
          {
            id: 1,
            code: 'FIXED5000',
            description: '5,000원 할인 쿠폰',
            expirationDate: '2024-11-30',
            discount: 5000,
            minimumAmount: 100000,
            discountType: 'fixed',
          },
        ];

        const AM4 = new Date(2024, 4, 22, 4, 0, 0, 0);
        const totalDiscountedPrice = useTotalCouponDiscount({
          coupons,
          date: AM4,
        });

        return { totalDiscountedPrice };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    const totalAmount = 5000;
    expect(result.current.totalDiscountedPrice).toBe(totalAmount);
  });

  it('[5000원 할인 + 미라클 모닝 퍼센트 할인 쿠폰].', () => {
    const { result } = renderHook(
      () => {
        const setCartList = useSetRecoilState(cartListState);
        setCartList(MOCK_CART_LIST);

        const MOCK_FILTERED_CART_LIST = [
          {
            id: 624,
            quantity: 5,
            isSelected: true,
            price: 20000,
          },
        ];

        MOCK_FILTERED_CART_LIST.forEach((item) => {
          const setFilteredCartList = useSetRecoilState(
            filteredCartItemState(item.id)
          );
          setFilteredCartList(item);
        });

        const setCouponList = useSetRecoilState(couponListState);
        setCouponList(MOCK_COUPON_LIST);

        const coupons: Coupon[] = [
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

        const AM4 = new Date(2024, 4, 22, 4, 0, 0, 0);
        const totalDiscountedPrice = useTotalCouponDiscount({
          coupons,
          date: AM4,
        });

        return { totalDiscountedPrice };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    const totalAmount = 5 * 20000 * 0.3 + 5000;
    expect(result.current.totalDiscountedPrice).toBe(totalAmount);
  });

  it('[2+1 할인 쿠폰 + 미라클 모닝 퍼센트 할인 쿠폰]', () => {
    const { result } = renderHook(
      () => {
        const setCartList = useSetRecoilState(cartListState);
        setCartList(MOCK_CART_LIST);

        const MOCK_FILTERED_CART_LIST = [
          {
            id: 624,
            quantity: 5,
            isSelected: true,
            price: 20000,
          },
        ];

        MOCK_FILTERED_CART_LIST.forEach((item) => {
          const setFilteredCartList = useSetRecoilState(
            filteredCartItemState(item.id)
          );
          setFilteredCartList(item);
        });

        const setCouponList = useSetRecoilState(couponListState);
        setCouponList(MOCK_COUPON_LIST);

        const coupons: Coupon[] = [
          {
            id: 2,
            code: 'BOGO',
            description: '2개 구매 시 1개 무료 쿠폰',
            expirationDate: '2024-08-30',
            buyQuantity: 2,
            getQuantity: 1,
            discountType: 'buyXgetY',
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

        const AM4 = new Date(2024, 4, 22, 4, 0, 0, 0);
        const totalDiscountedPrice = useTotalCouponDiscount({
          coupons,
          date: AM4,
        });

        return { totalDiscountedPrice };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    const totalAmount = 5 * 20000 * 0.3 + 20000;
    expect(result.current.totalDiscountedPrice).toBe(totalAmount);
  });

  it('[무료 배송 할인 + 미라클 모닝 퍼센트 할인 쿠폰] 쿠폰으로 할인된 가격을 보여준다.', () => {
    const { result } = renderHook(
      () => {
        const setCartList = useSetRecoilState(cartListState);
        setCartList(MOCK_CART_LIST);

        const MOCK_FILTERED_CART_LIST = [
          {
            id: 624,
            quantity: 3,
            isSelected: true,
            price: 20000,
          },
        ];

        MOCK_FILTERED_CART_LIST.forEach((item) => {
          const setFilteredCartList = useSetRecoilState(
            filteredCartItemState(item.id)
          );
          setFilteredCartList(item);
        });

        const setCouponList = useSetRecoilState(couponListState);
        setCouponList(MOCK_COUPON_LIST);

        const coupons: Coupon[] = [
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

        const AM4 = new Date(2024, 4, 22, 4, 0, 0, 0);
        const totalDiscountedPrice = useTotalCouponDiscount({
          coupons,
          date: AM4,
        });

        return { totalDiscountedPrice };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    const totalAmount = 3 * 20000 * 0.3 + 3000;
    expect(result.current.totalDiscountedPrice).toBe(totalAmount);
  });

  it('[무료 배송 할인 + 5000원 할인 쿠폰] 쿠폰으로 할인된 가격을 보여준다.', () => {
    const { result } = renderHook(
      () => {
        const setCartList = useSetRecoilState(cartListState);
        setCartList(MOCK_CART_LIST);

        const MOCK_FILTERED_CART_LIST = [
          {
            id: 624,
            quantity: 5,
            isSelected: true,
            price: 20000,
          },
        ];

        MOCK_FILTERED_CART_LIST.forEach((item) => {
          const setFilteredCartList = useSetRecoilState(
            filteredCartItemState(item.id)
          );
          setFilteredCartList(item);
        });

        const setCouponList = useSetRecoilState(couponListState);
        setCouponList(MOCK_COUPON_LIST);

        const coupons: Coupon[] = [
          {
            id: 3,
            code: 'FREESHIPPING',
            description: '5만원 이상 구매 시 무료 배송 쿠폰',
            expirationDate: '2024-08-31',
            minimumAmount: 50000,
            discountType: 'freeShipping',
          },
          {
            id: 1,
            code: 'FIXED5000',
            description: '5,000원 할인 쿠폰',
            expirationDate: '2024-11-30',
            discount: 5000,
            minimumAmount: 100000,
            discountType: 'fixed',
          },
        ];

        const totalDiscountedPrice = useTotalCouponDiscount({
          coupons,
          date,
        });

        return { totalDiscountedPrice };
      },
      {
        wrapper: RecoilRoot,
      }
    );
    const totalAmount = 5000;
    expect(result.current.totalDiscountedPrice).toBe(totalAmount);
  });

  it('[무료 배송 할인 + 2+1 할인 쿠폰] 쿠폰으로 할인된 가격을 보여준다.', () => {
    const { result } = renderHook(
      () => {
        const setCartList = useSetRecoilState(cartListState);
        setCartList(MOCK_CART_LIST);

        const MOCK_FILTERED_CART_LIST = [
          {
            id: 624,
            quantity: 3,
            isSelected: true,
            price: 20000,
          },
        ];

        MOCK_FILTERED_CART_LIST.forEach((item) => {
          const setFilteredCartList = useSetRecoilState(
            filteredCartItemState(item.id)
          );
          setFilteredCartList(item);
        });

        const setCouponList = useSetRecoilState(couponListState);
        setCouponList(MOCK_COUPON_LIST);

        const coupons: Coupon[] = [
          {
            id: 3,
            code: 'FREESHIPPING',
            description: '5만원 이상 구매 시 무료 배송 쿠폰',
            expirationDate: '2024-08-31',
            minimumAmount: 50000,
            discountType: 'freeShipping',
          },
          {
            id: 2,
            code: 'BOGO',
            description: '2개 구매 시 1개 무료 쿠폰',
            expirationDate: '2024-08-30',
            buyQuantity: 2,
            getQuantity: 1,
            discountType: 'buyXgetY',
          },
        ];

        const totalDiscountedPrice = useTotalCouponDiscount({
          coupons,
          date,
        });

        return { totalDiscountedPrice };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    const totalAmount = 20000 + 3000;
    expect(result.current.totalDiscountedPrice).toBe(totalAmount);
  });

  it('[5000원 할인 + 2+1 할인 쿠폰] 쿠폰으로 할인된 가격을 보여준다.', () => {
    const { result } = renderHook(
      () => {
        const setCartList = useSetRecoilState(cartListState);
        setCartList(MOCK_CART_LIST);

        const MOCK_FILTERED_CART_LIST = [
          {
            id: 624,
            quantity: 5,
            isSelected: true,
            price: 20000,
          },
        ];

        MOCK_FILTERED_CART_LIST.forEach((item) => {
          const setFilteredCartList = useSetRecoilState(
            filteredCartItemState(item.id)
          );
          setFilteredCartList(item);
        });

        const setCouponList = useSetRecoilState(couponListState);
        setCouponList(MOCK_COUPON_LIST);

        const coupons: Coupon[] = [
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
            expirationDate: '2024-08-30',
            buyQuantity: 2,
            getQuantity: 1,
            discountType: 'buyXgetY',
          },
        ];

        const totalDiscountedPrice = useTotalCouponDiscount({
          coupons,
          date,
        });

        return { totalDiscountedPrice };
      },
      {
        wrapper: RecoilRoot,
      }
    );
    const discountAmount = 20000 + 5000;
    expect(result.current.totalDiscountedPrice).toBe(discountAmount);
  });
});
