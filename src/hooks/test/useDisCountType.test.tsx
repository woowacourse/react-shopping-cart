import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import useCouponAvailable from '../useCouponAvailable';
import { mockCoupons } from './coupons.testData';
import { cartItemsState } from '../../recoil/cartItems';
import { fetchedCouponsSelector } from '../../recoil/fetch';
import useDiscountType from '../useDiscountType';

describe('useDiscountType', () => {
  it('할인 타입이 fixed 인 경우', () => {
    const { result } = renderHook(() => useDiscountType(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) =>
            set(fetchedCouponsSelector, mockCoupons)
          }
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.isCouponAvailable(mockCoupons[0])).toBe(false);
  });

  //   it('주문 금액이 최소 주문 금액 이상이면 쿠폰 적용 가능', () => {
  //     const { result } = renderHook(() => useCouponApplicabilityChecker(), {
  //       wrapper: ({ children }) => (
  //         <RecoilRoot
  //           initializeState={({ set }) => set(couponsState, mockCoupons)}
  //         >
  //           {children}
  //         </RecoilRoot>
  //       ),
  //     });
  //     expect(result.current.isCouponApplicable(mockCoupons[2], 60000)).toBe(true);
  //   });
});

// describe('쿠폰 사용 가능 시간 확인', () => {
//   it('사용 가능 시간 외에는 쿠폰 적용 불가', () => {
//     const testTime = new Date('2023-05-01T08:00:00');

//     const { result } = renderHook(() => useCouponApplicabilityChecker(), {
//       wrapper: ({ children }) => (
//         <RecoilRoot
//           initializeState={({ set }) => set(couponsState, mockCoupons)}
//         >
//           {children}
//         </RecoilRoot>
//       ),
//     });
//     expect(
//       result.current.isCouponApplicable(mockCoupons[3], 100000, testTime),
//     ).toBe(false);
//   });

//   it('사용 가능 시간 내에는 쿠폰 적용 가능', () => {
//     const testTime = new Date('2023-05-01T07:00:00');
//     const { result } = renderHook(() => useCouponApplicabilityChecker(), {
//       wrapper: ({ children }) => (
//         <RecoilRoot
//           initializeState={({ set }) => set(couponsState, mockCoupons)}
//         >
//           {children}
//         </RecoilRoot>
//       ),
//     });
//     expect(
//       result.current.isCouponApplicable(mockCoupons[3], 100000, testTime),
//     ).toBe(true);
//   });
// });
