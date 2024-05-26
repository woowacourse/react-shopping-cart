import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  cartListState,
  couponListState,
  filteredCartItemState,
} from '@/store/atoms';

import { Coupon } from '@/types/coupon.type';
import MOCK_CART_LIST from '@/constants/_mock/mockCartList';
import { MOCK_COUPON_LIST } from '@/constants/_mock/mockCouponList';
import { orderRecipeState } from '@/store/selectors/orderRecipeSelector';
import { renderHook } from '@testing-library/react';
import useCouponDiscount from './useCouponDiscount';

describe('useCouponDiscount test', () => {
  it('[5000원 할인 쿠폰] 쿠폰으로 할인된 가격을 보여준다.', () => {
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

        const coupon: Coupon = {
          id: 1,
          code: 'FIXED5000',
          description: '5,000원 할인 쿠폰',
          expirationDate: '2024-11-30',
          discount: 5000,
          minimumAmount: 100000,
          discountType: 'fixed',
        };

        const discountedPrice = useCouponDiscount({
          coupon,
        });

        return { discountedPrice };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current.discountedPrice).toBe(5000);
  });

  it('[5만원 이상 구매시 무료 배송 할인 쿠폰] 쿠폰으로 할인된 가격을 보여준다.', () => {
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

        const coupon: Coupon = {
          id: 3,
          code: 'FREESHIPPING',
          description: '5만원 이상 구매 시 무료 배송 쿠폰',
          expirationDate: '2024-08-31',
          minimumAmount: 50000,
          discountType: 'freeShipping',
        };

        const discountedPrice = useCouponDiscount({
          coupon,
        });

        return { discountedPrice };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current.discountedPrice).toBe(3000);
  });

  it('[미라클 모닝 퍼센트 할인 쿠폰] 쿠폰으로 할인된 가격을 보여준다.', () => {
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

        const coupon: Coupon = {
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
        };

        const { orderPrice } = useRecoilValue(orderRecipeState);
        const discountedPrice = useCouponDiscount({
          coupon,
          orderPrice,
        });

        return { discountedPrice };
      },
      {
        wrapper: RecoilRoot,
      }
    );
    const discountAmount = 5 * 20000 * 0.3;
    expect(result.current.discountedPrice).toBe(discountAmount);
  });

  it('[2+1 할인 쿠폰] 쿠폰으로 할인된 가격을 보여준다.', () => {
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

        const coupon: Coupon = {
          id: 2,
          code: 'BOGO',
          description: '2개 구매 시 1개 무료 쿠폰',
          expirationDate: '2024-08-30',
          buyQuantity: 2,
          getQuantity: 1,
          discountType: 'buyXgetY',
        };

        const discountedPrice = useCouponDiscount({
          coupon,
        });

        return { discountedPrice };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current.discountedPrice).toBe(20000);
  });

  it('[2+1 할인 쿠폰] 3개 이상 있는 제품이 많다면 그 중 가장 값이 큰 제품에 적용한다.', () => {
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

        const setCouponList = useSetRecoilState(couponListState);
        setCouponList(MOCK_COUPON_LIST);

        const coupon: Coupon = {
          id: 2,
          code: 'BOGO',
          description: '2개 구매 시 1개 무료 쿠폰',
          expirationDate: '2024-08-30',
          buyQuantity: 2,
          getQuantity: 1,
          discountType: 'buyXgetY',
        };

        const discountedPrice = useCouponDiscount({
          coupon,
        });

        return { discountedPrice };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current.discountedPrice).toBe(20000);
  });
});
