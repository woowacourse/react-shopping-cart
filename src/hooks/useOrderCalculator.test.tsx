import { MutableSnapshot, RecoilRoot, useSetRecoilState } from 'recoil';
import {
  couponsState,
  itemDetailsState,
  itemsState,
  remoteAreaState,
} from '../recoil/atoms';
import {
  mockOrderItemsWithDeliveryFee,
  mockOrderItemsWithOutDeliveryFee,
} from '../mocks/orderItems';
import {
  mockItemDetailsWithDeliveryFee,
  mockItemDetailsWithOutDeliveryFee,
} from '../mocks/itemDetails';
import { renderHook } from '@testing-library/react';
import { useOrderCalculator } from './useOrderCalculator';
import { mockCoupons } from '../mocks/coupons';
import { act } from 'react';
import { couponCheckedSelector } from '../recoil/selectors';
import { DELIVERY } from '../constants/Delivery';

describe('useOrderCalculator', () => {
  const initializeRecoilState = ({ set }: MutableSnapshot) => {
    set(couponsState, mockCoupons);
    set(itemsState, mockOrderItemsWithDeliveryFee);
    mockItemDetailsWithDeliveryFee.forEach((itemDetail) => {
      set(itemDetailsState(itemDetail.id), {
        quantity: itemDetail.quantity,
        price: itemDetail.price,
        isChecked: itemDetail.isChecked,
      });
    });
  };

  describe('총 주문 금액 계산', () => {
    it('주문할 상품의 쿠폰 할인 전 총 주문 금액을 계산할 수 있다.', () => {
      const { result } = renderHook(() => useOrderCalculator(), {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={initializeRecoilState}>
            {children}
          </RecoilRoot>
        ),
      });

      const expectedTotalAmount = mockOrderItemsWithDeliveryFee.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0,
      );

      expect(result.current.calculateOrderTotal()).toBe(expectedTotalAmount);
    });
  });

  describe('쿠폰 할인 금액 계산', () => {
    it('Buy X get Y 쿠폰을 사용했을 때 할인되는 금액이 반환되어야 한다.', () => {
      const { result } = renderHook(
        () => {
          const { calculateDiscountWithCoupon } = useOrderCalculator();
          const couponCheck = useSetRecoilState(couponCheckedSelector);
          return { calculateDiscountWithCoupon, couponCheck };
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot initializeState={initializeRecoilState}>
              {children}
            </RecoilRoot>
          ),
        },
      );

      act(() => {
        result.current.couponCheck(2);
      });

      const maxPrice = Math.max(
        ...mockOrderItemsWithDeliveryFee.map((item) =>
          item.quantity > 1 ? item.product.price : 0,
        ),
      );

      expect(result.current.calculateDiscountWithCoupon('modal')).toBe(
        maxPrice,
      );
    });
  });

  describe('총 결제 금액 계산', () => {
    it('주문 금액에서 쿠폰으로 할인된 금액을 빼고, 배송비를 더한 금액이 반환되어야 한다.', () => {
      const { result } = renderHook(
        () => {
          const { calculateTotalWithCoupon } = useOrderCalculator();
          const couponCheck = useSetRecoilState(couponCheckedSelector);
          return { calculateTotalWithCoupon, couponCheck };
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot initializeState={initializeRecoilState}>
              {children}
            </RecoilRoot>
          ),
        },
      );

      act(() => {
        result.current.couponCheck(2);
      });

      const totalAmount = mockOrderItemsWithDeliveryFee.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0,
      );
      const maxPrice = Math.max(
        ...mockOrderItemsWithDeliveryFee.map((item) =>
          item.quantity > 1 ? item.product.price : 0,
        ),
      );
      const deliveryFee =
        totalAmount >= DELIVERY.noDeliveryFeeStandard
          ? 0
          : DELIVERY.deliveryFee;
      const expectedTotalAmount = totalAmount + deliveryFee - maxPrice;

      expect(result.current.calculateTotalWithCoupon('modal')).toBe(
        expectedTotalAmount,
      );
    });
  });

  describe('배송비 계산', () => {
    const initializeRecoilStateWithRemoteArea = (
      { set }: MutableSnapshot,
      isRemoteArea: boolean,
      isDeliveryFee: boolean,
    ) => {
      set(couponsState, mockCoupons);
      set(
        itemsState,
        isDeliveryFee
          ? mockOrderItemsWithDeliveryFee
          : mockOrderItemsWithOutDeliveryFee,
      );
      isDeliveryFee
        ? mockItemDetailsWithDeliveryFee
        : mockItemDetailsWithOutDeliveryFee.forEach((itemDetail) => {
            set(itemDetailsState(itemDetail.id), {
              quantity: itemDetail.quantity,
              price: itemDetail.price,
              isChecked: itemDetail.isChecked,
            });
          });
      set(remoteAreaState, isRemoteArea);
    };

    it('주문 금액이 무료 배송 기준 이상일 경우 배송비가 없어야 한다.', () => {
      const { result } = renderHook(() => useOrderCalculator(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={(snapshot) =>
              initializeRecoilStateWithRemoteArea(snapshot, false, false)
            }
          >
            {children}
          </RecoilRoot>
        ),
      });

      expect(result.current.calculateDeliveryFee()).toBe(
        DELIVERY.noDeliveryFee,
      );
    });

    it('주문 금액이 무료 배송 기준 미만이면서 도서 산간 지역이면 배송비가 추가되어야 한다.', () => {
      const { result } = renderHook(() => useOrderCalculator(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={(snapshot) =>
              initializeRecoilStateWithRemoteArea(snapshot, true, true)
            }
          >
            {children}
          </RecoilRoot>
        ),
      });

      expect(result.current.calculateDeliveryFee()).toBe(
        DELIVERY.deliveryFee + DELIVERY.remoteArea,
      );
    });

    it('주문 금액이 무료 배송 기준 미만이면서 도서 산간 지역이 아니면 배송비 금액이 기본 배송비여야 한다.', () => {
      const { result } = renderHook(() => useOrderCalculator(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={(snapshot) =>
              initializeRecoilStateWithRemoteArea(snapshot, false, true)
            }
          >
            {children}
          </RecoilRoot>
        ),
      });

      expect(result.current.calculateDeliveryFee()).toBe(DELIVERY.deliveryFee);
    });
  });
});
