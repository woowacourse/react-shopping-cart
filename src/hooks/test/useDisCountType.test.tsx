import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { OrderConfirmation } from '../../components/pages/OrderConfirmationPage/style';
import 'jest-styled-components';
describe('useDiscountType', () => {
  it('2개 구매 시 1개 무료 쿠폰 클릭 시 ', () => {
    render(<OrderConfirmation />);
    const button = screen.getByLabelText('제주도 및 도서 산간 지역');

    fireEvent.click(button);
    const price = screen.getByTestId('price');

    expect(price).toHaveTextContent('6,000원');
  });

  // it('할인 타입이 fixed 인 경우', () => {
  //   //컴포넌ㅇ트 불러오는식으로 구현하기
  //   const { result } = renderHook(() => useDiscountType(), {
  //     wrapper: ({ children }) => (
  //       <RecoilRoot
  //         initializeState={({ set }) => {
  //           set(cartItemsState, mockCartItems);
  //           mockIsCartItemSelecteds.forEach((isCartItemSelected) =>
  //             set(
  //               selectedCartItemsState(isCartItemSelected.id),
  //               isCartItemSelected.boolean,
  //             ),
  //           );
  //           cartQuantity.forEach((isCartItemSelected) =>
  //             set(
  //               cartItemQuantityState(isCartItemSelected.id),
  //               isCartItemSelected.quantity,
  //             ),
  //           );
  //         }}
  //       >
  //         {children}
  //       </RecoilRoot>
  //     ),
  //   });
  //   expect(result.current.applyCoupon(mockCoupons)).toBe(false);
  // });
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
