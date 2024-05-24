import {
  MOCK_FILTERED_CART_LIST_LESS_100000,
  MOCK_FILTERED_CART_LIST_OVER_100000,
} from '@/constants/_mock/mockFilteredCartList';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { cartListState, filteredCartItemState } from '@/store/atoms';

import { Coupon } from '@/types/coupon.type';
import MOCK_CART_LIST from '@/constants/_mock/mockCartList';
import { renderHook } from '@testing-library/react';
import useCouponAvailable from './useCouponAvailable';

describe('useCouponAvailable test', () => {
  const today = new Date();
  it('[최소 주문 금액 이상] 쿠폰 적용 가능 조건을 확인한 후 사용 가능 여부를 알려준다. (최소 주문 금액)', () => {
    const { result } = renderHook(
      () => {
        const setCartList = useSetRecoilState(cartListState);
        setCartList(MOCK_CART_LIST);

        MOCK_FILTERED_CART_LIST_OVER_100000.forEach((item) => {
          const setFilteredCartList = useSetRecoilState(
            filteredCartItemState(item.id)
          );
          setFilteredCartList(item);
        });

        const minimumAmountCoupon: Coupon = {
          id: 2,
          code: 'MINIMUM_AMOUNT_COUPON',
          description: '최소 금액(만원) 쿠폰',
          expirationDate: '2024-08-31',
          discountType: 'fixed',
          minimumAmount: 10000,
        };

        const availableCouponList = useCouponAvailable({
          coupon: minimumAmountCoupon,
          date: today,
        });

        return availableCouponList;
      },
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current).toBe(true);
  });

  it('[최소 주문 금액 미만] 쿠폰 적용 가능 조건을 확인한 후 사용 가능 여부를 알려준다. (최소 주문 금액)', () => {
    const { result } = renderHook(
      () => {
        const setCartList = useSetRecoilState(cartListState);
        setCartList(MOCK_CART_LIST);

        MOCK_FILTERED_CART_LIST_LESS_100000.forEach((item) => {
          const setFilteredCartList = useSetRecoilState(
            filteredCartItemState(item.id)
          );
          setFilteredCartList(item);
        });

        const minimumAmountCoupon: Coupon = {
          id: 2,
          code: 'MINIMUM_AMOUNT_COUPON',
          description: '최소 금액(만원) 쿠폰',
          expirationDate: '2024-08-31',
          discountType: 'fixed',
          minimumAmount: 10000,
        };

        const availableCouponList = useCouponAvailable({
          coupon: minimumAmountCoupon,
          date: today,
        });

        return availableCouponList;
      },
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current).toBe(false);
  });

  it('[사용 가능 시간] 쿠폰 적용 가능 조건을 확인한 후 사용 가능 여부를 알려준다. (사용 가능 시간)', () => {
    const { result } = renderHook(
      () => {
        const setCartList = useSetRecoilState(cartListState);
        setCartList(MOCK_CART_LIST);

        const MOCK_FILTERED_CART_LIST = [
          {
            id: 675,
            quantity: 7,
            isSelected: true,
            price: 1000,
          },
        ];

        MOCK_FILTERED_CART_LIST.forEach((item) => {
          const setFilteredCartList = useSetRecoilState(
            filteredCartItemState(item.id)
          );
          setFilteredCartList(item);
        });

        const availableTimeCoupon: Coupon = {
          id: 2,
          code: 'AVAILABLE_TIME_COUPON',
          description: '얼리버드(AM 4:00 - 7:00) 쿠폰',
          expirationDate: '2024-08-31',
          discountType: 'fixed',
          availableTime: {
            start: '04:00:00',
            end: '07:00:00',
          },
        };

        const AM4 = new Date(2024, 4, 22, 4, 0, 0, 0);

        const availableCouponList = useCouponAvailable({
          coupon: availableTimeCoupon,
          date: AM4,
        });

        return availableCouponList;
      },
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current).toBe(true);
  });

  it('[사용 불가능 시간] 쿠폰 적용 가능 조건을 확인한 후 사용 가능 여부를 알려준다. (사용 가능 시간)', () => {
    const { result } = renderHook(
      () => {
        const setCartList = useSetRecoilState(cartListState);
        setCartList(MOCK_CART_LIST);

        const MOCK_FILTERED_CART_LIST = [
          {
            id: 675,
            quantity: 7,
            isSelected: true,
            price: 1000,
          },
        ];

        MOCK_FILTERED_CART_LIST.forEach((item) => {
          const setFilteredCartList = useSetRecoilState(
            filteredCartItemState(item.id)
          );
          setFilteredCartList(item);
        });

        const availableTimeCoupon: Coupon = {
          id: 2,
          code: 'AVAILABLE_TIME_COUPON',
          description: '얼리버드(AM 4:00 - 7:00) 쿠폰',
          expirationDate: '2024-08-31',
          discountType: 'fixed',
          availableTime: {
            start: '04:00:00',
            end: '07:00:00',
          },
        };

        const AM7_MIN10 = new Date(2024, 4, 22, 7, 10, 0, 0);

        const availableCouponList = useCouponAvailable({
          coupon: availableTimeCoupon,
          date: AM7_MIN10,
        });

        return availableCouponList;
      },
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current).toBe(false);
  });

  it('[최소 주문 수량(2+1) 이상] 쿠폰 적용 가능 조건을 확인한 후 사용 가능 여부를 알려준다. (최소 주문 수량)', () => {
    const { result } = renderHook(
      () => {
        const setCartList = useSetRecoilState(cartListState);
        setCartList(MOCK_CART_LIST);

        const MOCK_FILTERED_CART_LIST = [
          {
            id: 675,
            quantity: 7,
            isSelected: true,
            price: 1000,
          },
        ];

        MOCK_FILTERED_CART_LIST.forEach((item) => {
          const setFilteredCartList = useSetRecoilState(
            filteredCartItemState(item.id)
          );
          setFilteredCartList(item);
        });

        const buy2get1Coupon: Coupon = {
          id: 2,
          code: 'BOGO',
          description: '2개 구매 시 1개 무료 쿠폰',
          expirationDate: '2024-04-30',
          buyQuantity: 2,
          getQuantity: 1,
          discountType: 'buyXgetY',
        };

        const availableCouponList = useCouponAvailable({
          coupon: buy2get1Coupon,
          date: today,
        });

        return availableCouponList;
      },
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current).toBe(true);
  });

  it('[최소 주문 수량(2+1) 미만] 쿠폰 적용 가능 조건을 확인한 후 사용 가능 여부를 알려준다. (최소 주문 수량)', () => {
    const { result } = renderHook(
      () => {
        const setCartList = useSetRecoilState(cartListState);
        setCartList(MOCK_CART_LIST);

        const MOCK_FILTERED_CART_LIST = [
          {
            id: 675,
            quantity: 2,
            isSelected: true,
            price: 1000,
          },
        ];

        MOCK_FILTERED_CART_LIST.forEach((item) => {
          const setFilteredCartList = useSetRecoilState(
            filteredCartItemState(item.id)
          );
          setFilteredCartList(item);
        });

        const buy2get1Coupon: Coupon = {
          id: 2,
          code: 'BOGO',
          description: '2개 구매 시 1개 무료 쿠폰',
          expirationDate: '2024-04-30',
          buyQuantity: 2,
          getQuantity: 1,
          discountType: 'buyXgetY',
        };

        const availableCouponList = useCouponAvailable({
          coupon: buy2get1Coupon,
          date: today,
        });

        return availableCouponList;
      },
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current).toBe(false);
  });
});
