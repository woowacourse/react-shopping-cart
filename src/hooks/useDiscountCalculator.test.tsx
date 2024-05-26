import { renderHook } from '@testing-library/react';
import { MutableSnapshot, RecoilRoot } from 'recoil';
import { useDiscountCalculator } from './useDiscountCalculator';
import { couponsState, itemDetailsState, itemsState } from '../recoil/atoms';
import { mockCoupons } from '../mocks/coupons';
import { mockOrderItems } from '../mocks/orderItems';
import { mockItemDetails } from '../mocks/itemDetails';

describe('useDiscountCalculator', () => {
  const initializeRecoilState = ({ set }: MutableSnapshot) => {
    set(couponsState, mockCoupons);
    set(itemsState, mockOrderItems);
    mockItemDetails.forEach((itemDetail) => {
      set(itemDetailsState(itemDetail.id), {
        quantity: itemDetail.quantity,
        price: itemDetail.price,
        isChecked: itemDetail.isChecked,
      });
    });
  };

  describe('고정 금액 할인', () => {
    it('고정 금액 할인 쿠폰의 할인 금액을 계산할 수 있다.', () => {
      const { result } = renderHook(() => useDiscountCalculator(), {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={initializeRecoilState}>
            {children}
          </RecoilRoot>
        ),
      });
      expect(
        result.current.calculateDiscountAmount(mockCoupons[0], 100000),
      ).toBe(mockCoupons[0].discount);
    });

    describe('퍼센트 할인', () => {
      it('퍼센트 할인 쿠폰의 할인 금액을 계산할 수 있다.', () => {
        const { result } = renderHook(() => useDiscountCalculator(), {
          wrapper: ({ children }) => (
            <RecoilRoot initializeState={initializeRecoilState}>
              {children}
            </RecoilRoot>
          ),
        });

        const testTime = new Date(Date.UTC(2024, 4, 25, 19, 0, 0));

        expect(
          result.current.calculateDiscountAmount(
            mockCoupons[3],
            100000,
            testTime,
          ),
        ).toBe(30000);
      });
    });

    describe('Buy X Get Y 할인', () => {
      it('Buy X Get Y 할인을 적용할 수 있다.', () => {
        const { result } = renderHook(() => useDiscountCalculator(), {
          wrapper: ({ children }) => (
            <RecoilRoot initializeState={initializeRecoilState}>
              {children}
            </RecoilRoot>
          ),
        });

        const totalAmount = mockOrderItems.reduce(
          (acc, item) => acc + item.quantity * item.product.price,
          0,
        );
        const maxPrice = Math.max(
          ...mockOrderItems.map((item) => item.product.price),
        );
        const maxAmount = mockOrderItems.find(
          (item) => item.product.price === maxPrice,
        )?.product.price;

        expect(
          result.current.calculateDiscountAmount(mockCoupons[1], totalAmount),
        ).toBe(maxAmount);
      });
    });

    describe('무료 배송 할인', () => {
      it('무료 배송 할인을 적용할 수 있다.', () => {
        const { result } = renderHook(() => useDiscountCalculator(), {
          wrapper: ({ children }) => (
            <RecoilRoot initializeState={initializeRecoilState}>
              {children}
            </RecoilRoot>
          ),
        });
        const totalAmount = mockCoupons[2].minimumAmount ?? 0;

        expect(
          result.current.calculateDiscountAmount(mockCoupons[2], totalAmount),
        ).toBe(3000);
      });
    });
  });
});
