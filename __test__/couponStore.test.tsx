import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { mockCoupons, mockProductAmount160_000, mockProductAmount10_000 } from './mock';
import { couponsState } from '@store/couponStore';

import { CART_POLICY } from '@constants/policy';

import {
  renderHook_disCountAmount_orderAmount,
  renderHook_discountAmountState,
} from './renderHook.util';

describe('couponStore Recoil 테스트', () => {
  describe('couponsState atom 테스트', () => {
    it('couponsState 초기화 시, 쿠폰 목록을 fetch 해온다.', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockCoupons));

      const { result } = renderHook(() => useRecoilState(couponsState), {
        wrapper: RecoilRoot,
      });

      await waitFor(() => {
        expect(result.current[0]).toEqual(mockCoupons);
      });
    });
  });

  describe('discountAmountState selector 테스트', () => {
    describe('개별 쿠폰 적용 테스트', () => {
      it('FIXED5000 쿠폰이 active 상태라면, discountAmountState는 5000이다', async () => {
        const { result } = renderHook_discountAmountState({
          products: mockProductAmount160_000,
          hasAdditionalShippingFee: true,
          activeCoupons: ['FIXED5000'],
        });

        await waitFor(() => {
          expect(result.current).toEqual(5000);
        });
      });

      it('BOGO 쿠폰이 active 상태라면, 상품 하나의 값을 할인한다.', async () => {
        const { result } = renderHook_discountAmountState({
          products: mockProductAmount160_000,
          hasAdditionalShippingFee: true,
          activeCoupons: ['BOGO'],
        });

        const discountAmount = mockProductAmount160_000[0].product.price;

        await waitFor(() => {
          expect(result.current).toEqual(discountAmount);
        });
      });

      it('FREESHIPPING 쿠폰이 active 상태라면, 기본 배송비와 추가 배송비 모두 할인한다.', async () => {
        const { result } = renderHook_discountAmountState({
          products: mockProductAmount10_000,
          hasAdditionalShippingFee: true,
          activeCoupons: ['FREESHIPPING'],
        });

        const discountAmount = CART_POLICY.shipping_basic_fee + CART_POLICY.shipping_additional_fee;

        await waitFor(() => {
          expect(result.current).toEqual(discountAmount);
        });
      });

      it('FREESHIPPING 쿠폰이 active 상태이고 추가 배송비가 없다면, 기본 배송비를 할인한다.', async () => {
        const { result } = renderHook_discountAmountState({
          products: mockProductAmount10_000,
          hasAdditionalShippingFee: false,
          activeCoupons: ['FREESHIPPING'],
        });

        const discountAmount = CART_POLICY.shipping_basic_fee;

        await waitFor(() => {
          expect(result.current).toEqual(discountAmount);
        });
      });

      it('FREESHIPPING 쿠폰이 active 상태이고 100_000원 이상 구매로 기본 배송비가 없고 추가 배송비가 있다면, 추가 배송비를 할인한다.', async () => {
        const { result } = renderHook_discountAmountState({
          products: mockProductAmount160_000,
          hasAdditionalShippingFee: true,
          activeCoupons: ['FREESHIPPING'],
        });

        const discountAmount = CART_POLICY.shipping_additional_fee;

        await waitFor(() => {
          expect(result.current).toEqual(discountAmount);
        });
      });

      it('MIRACLESALE 쿠폰이 active 상태라면, 전체 주문금액의 30%를 할인한다.', async () => {
        const { result } = renderHook_disCountAmount_orderAmount({
          products: mockProductAmount160_000,
          hasAdditionalShippingFee: true,
          activeCoupons: ['MIRACLESALE'],
        });

        const discountAmount = result.current.orderAmount * 0.3;

        await waitFor(() => {
          expect(result.current.discountAmount).toEqual(discountAmount);
        });
      });

      describe('두개 쿠폰 적용 테스트', () => {
        it('MIRACLESALE 쿠폰과 FIXED5000 쿠폰이 active라면, 두가지 쿠폰 적용 경우의 수 중 최대 할인액이 적용된다.', async () => {
          const { result } = renderHook_disCountAmount_orderAmount({
            products: mockProductAmount160_000,
            hasAdditionalShippingFee: true,
            activeCoupons: ['MIRACLESALE', 'FIXED5000'],
          });

          const discountAmount_A = result.current.orderAmount * 0.3 + 5000;
          const discountAmount_B = (result.current.orderAmount + 5000) * 0.3;
          const maxDiscountAmount = Math.max(discountAmount_A, discountAmount_B);

          await waitFor(() => {
            expect(result.current.discountAmount).toEqual(maxDiscountAmount);
          });
        });

        it('MIRACLESALE 쿠폰과 FREESHIPPING 쿠폰이 active라면, 전체 주문 금액의 30%와 모든 배송비가 할인된다.', async () => {
          const { result } = renderHook_disCountAmount_orderAmount({
            products: mockProductAmount10_000,
            hasAdditionalShippingFee: true,
            activeCoupons: ['MIRACLESALE', 'FREESHIPPING'],
          });

          const discountAmount =
            result.current.orderAmount * 0.3 +
            CART_POLICY.shipping_basic_fee +
            CART_POLICY.shipping_additional_fee;

          await waitFor(() => {
            expect(result.current.discountAmount).toEqual(discountAmount);
          });
        });

        it('MIRACLESALE 쿠폰과 BOGO 쿠폰이 active라면, 전체 주문 금액의 30%와 상품 1개 값을 할인한다.', async () => {
          const { result } = renderHook_disCountAmount_orderAmount({
            products: mockProductAmount160_000,
            hasAdditionalShippingFee: true,
            activeCoupons: ['MIRACLESALE', 'BOGO'],
          });

          const discountAmount =
            result.current.orderAmount * 0.3 + mockProductAmount160_000[0].product.price;

          await waitFor(() => {
            expect(result.current.discountAmount).toEqual(discountAmount);
          });
        });

        it('BOGO 쿠폰과 FIXED5000 쿠폰이 active라면, 상품 1개 값과 5000원을 할인한다.', async () => {
          const { result } = renderHook_disCountAmount_orderAmount({
            products: mockProductAmount160_000,
            hasAdditionalShippingFee: true,
            activeCoupons: ['FIXED5000', 'BOGO'],
          });

          const discountAmount = mockProductAmount160_000[0].product.price + 5000;

          await waitFor(() => {
            expect(result.current.discountAmount).toEqual(discountAmount);
          });
        });

        it('FREESHIPPING 쿠폰과 FIXED5000 쿠폰이 active라면, 전체 배송비와 5000원을 할인한다.', async () => {
          const { result } = renderHook_disCountAmount_orderAmount({
            products: mockProductAmount160_000,
            hasAdditionalShippingFee: true,
            activeCoupons: ['FIXED5000', 'FREESHIPPING'],
          });

          const discountAmount = CART_POLICY.shipping_additional_fee + 5000;

          await waitFor(() => {
            expect(result.current.discountAmount).toEqual(discountAmount);
          });
        });
      });
    });
  });
});
