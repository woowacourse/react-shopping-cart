import { act, renderHook } from '@testing-library/react';
import { useCouponSelection } from '../src/hooks/useCouponSelection';
import { calculateCouponPrice } from '../src/domain/calculateCouponPrice';
import coupons from '../src/mocks/coupon.json';
import { vi } from 'vitest';
import { Coupon } from '../src/types/coupon';

describe('useCouponSelection 훅 테스트', () => {
  it('여러 쿠폰을 선택하면 가장 할인금액이 큰 조합으로 정렬된다.', () => {
    const expected = ['4', '1'];
    const couponsData = [...coupons] as Coupon[];

    const onExceed = vi.fn();
    const { result } = renderHook(() =>
      useCouponSelection({
        coupons: couponsData,
        maxCoupons: 2,
        onExceed,
        calculatePrice: (couponSelectionCandidate) =>
          calculateCouponPrice({
            selectedCoupons: couponSelectionCandidate,
            selectedCartItems: [
              {
                id: 15992,
                quantity: 5,
                product: {
                  id: 28,
                  name: '아샷추',
                  price: 3800,
                  imageUrl:
                    'https://d2afncas1tel3t.cloudfront.net/wp-content/uploads/2023/12/%EC%95%84%EC%83%B7%EC%B6%94%EC%95%84%EC%9D%B4%EC%8A%A4%ED%8B%B0%EC%83%B7%EC%B6%94%EC%B9%B4%EB%94%94%EC%B9%B4%ED%8E%98%EC%9D%B8_1.png',
                },
              },
              {
                id: 15996,
                quantity: 2,
                product: {
                  id: 137,
                  name: '[빙그래] 요맘때 파인트 710mL 3종 (택1)',
                  price: 5000,
                  imageUrl:
                    'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/73061aab-a2e2-443a-b0f9-f19b7110045e.jpg',
                },
              },
              {
                id: 15997,
                quantity: 6,
                product: {
                  id: 152,
                  name: '[소반옥] 왕갈비탕 1kg',
                  price: 11900,
                  imageUrl:
                    'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/860123d3-be82-4c90-ae47-0b56e2869eca.jpg',
                },
              },
            ],
            deliveryFee: 0,
            nowDate: new Date('2025-06-09T04:00:00+09:00'),
          }),
      })
    );

    act(() => {
      result.current.toggleCouponId('1');
    });
    act(() => {
      result.current.toggleCouponId('4');
    });

    expect(result.current.selectedCouponIds).toEqual(expected);
  });

  it('최대 개수를 넘으면 onExceed 콜백을 호출하고 선택을 취소한다', () => {
    const onExceed = vi.fn();
    const couponsData = [...coupons] as Coupon[];
    const { result } = renderHook(() =>
      useCouponSelection({
        coupons: couponsData,
        maxCoupons: 2,
        onExceed,
        calculatePrice: (couponSelectionCandidate) =>
          calculateCouponPrice({
            selectedCoupons: couponSelectionCandidate,
            selectedCartItems: [
              {
                id: 15992,
                quantity: 5,
                product: {
                  id: 28,
                  name: '아샷추',
                  price: 3800,
                  imageUrl:
                    'https://d2afncas1tel3t.cloudfront.net/wp-content/uploads/2023/12/%EC%95%84%EC%83%B7%EC%B6%94%EC%95%84%EC%9D%B4%EC%8A%A4%ED%8B%B0%EC%83%B7%EC%B6%94%EC%B9%B4%EB%94%94%EC%B9%B4%ED%8E%98%EC%9D%B8_1.png',
                },
              },
              {
                id: 15996,
                quantity: 2,
                product: {
                  id: 137,
                  name: '[빙그래] 요맘때 파인트 710mL 3종 (택1)',
                  price: 5000,
                  imageUrl:
                    'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/73061aab-a2e2-443a-b0f9-f19b7110045e.jpg',
                },
              },
              {
                id: 15997,
                quantity: 6,
                product: {
                  id: 152,
                  name: '[소반옥] 왕갈비탕 1kg',
                  price: 11900,
                  imageUrl:
                    'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/860123d3-be82-4c90-ae47-0b56e2869eca.jpg',
                },
              },
            ],
            deliveryFee: 0,
            nowDate: new Date('2025-06-09T04:00:00+09:00'),
          }),
      })
    );

    act(() => {
      result.current.toggleCouponId('1');
    });
    act(() => {
      result.current.toggleCouponId('4');
    });
    act(() => {
      result.current.toggleCouponId('2');
    });
    expect(onExceed).toHaveBeenCalledTimes(1);
    expect(result.current.selectedCouponIds).toEqual(['4', '1']);
  });
});
