import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import useCouponApplier from './useCouponApplier';
import { selectedCartItems } from '../../recoil/atoms';
import { Coupon } from '../../api/get/getCoupons';

const mockCoupons: Coupon[] = [
  {
    id: 1,
    code: 'FIXED5000',
    description: '5,000원 할인 쿠폰',
    discount: 5000,
    discountType: 'fixed',
    minimumAmount: 100000,
    expirationDate: '2024-11-30',
  },
  {
    id: 2,
    code: 'BOGO',
    description: '2개 구매 시 1개 무료 쿠폰',
    discountType: 'buyXgetY',
    buyQuantity: 2,
    getQuantity: 1,
    expirationDate: '2024-05-30',
  },
  {
    id: 3,
    code: 'FREESHIPPING',
    description: '5만원 이상 구매 시 무료 배송 쿠폰',
    discountType: 'freeShipping',
    minimumAmount: 50000,
    expirationDate: '2024-08-31',
  },
  {
    id: 4,
    code: 'MIRACLESALE',
    description: '미라클모닝 30% 할인 쿠폰',
    discount: 30,
    discountType: 'percentage',
    availableTime: {
      start: '04:00:00',
      end: '07:00:00',
    },
    expirationDate: '2024-07-31',
  },
];

describe('useCouponApplier', () => {
  it('쿠폰이 만료된 경우 false를 리턴한다.', () => {
    const { result } = renderHook(() => useCouponApplier(), {
      wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
    });

    const expiredCoupon = {
      ...mockCoupons[0],
      expirationDate: '2023-01-01',
    };

    expect(result.current.isCouponUsable(expiredCoupon, 100000, new Date('2024-05-26'))).toBe(
      false,
    );
  });

  it('주문 금액이 쿠폰 적용 가능 금액보다 작은 경우 false를 리턴한다.', () => {
    const { result } = renderHook(() => useCouponApplier(), {
      wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
    });

    expect(result.current.isCouponUsable(mockCoupons[0], 50000, new Date('2024-05-26'))).toBe(
      false,
    );
  });

  it('5000원 할인 쿠폰 테스트: 적용 가능 금액인 100,000원에 도달한 경우 true를 리턴한다.', () => {
    const { result } = renderHook(() => useCouponApplier(), {
      wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
    });

    expect(result.current.isCouponUsable(mockCoupons[0], 100000, new Date('2024-05-26'))).toBe(
      true,
    );
  });

  it('BOGO 쿠폰 테스트: 주문 목록에 수량이 2개 이상인 품목이 있는 경우 true를 리턴한다.', () => {
    const { result } = renderHook(() => useCouponApplier(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedCartItems, [
              { cartItemId: 1, name: 'Test Item', quantity: 2, price: 50000, imageUrl: '' },
            ]);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current.isCouponUsable(mockCoupons[1], 100000, new Date('2024-05-26'))).toBe(
      true,
    );
  });

  it('배송비 무료 쿠폰 테스트: 무료 배송 금액 이상을 만족한 경우 false를 리턴한다.', () => {
    const { result } = renderHook(() => useCouponApplier(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedCartItems, [
              { cartItemId: 1, name: 'Test Item', quantity: 2, price: 50000, imageUrl: '' },
            ]);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current.isCouponUsable(mockCoupons[2], 100000, new Date('2024-05-26'))).toBe(
      false,
    );
  });

  it('미라클 모닝 쿠폰 테스트: 오전 4시 ~ 7시 사이의 주문인 경우 true를 리턴한다.', () => {
    const { result } = renderHook(() => useCouponApplier(), {
      wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
    });

    const validTime = new Date('2024-05-26T05:00:00');

    expect(result.current.isCouponUsable(mockCoupons[3], 100000, validTime)).toBe(true);
  });

  it('미라클 모닝 쿠폰 테스트: 오전 4시 ~ 7시 사이의 주문이 아닌 경우 false를 리턴한다.', () => {
    const { result } = renderHook(() => useCouponApplier(), {
      wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
    });

    const invalidTime = new Date('2024-05-26T08:00:00');

    expect(result.current.isCouponUsable(mockCoupons[3], 100000, invalidTime)).toBe(false);
  });
});
