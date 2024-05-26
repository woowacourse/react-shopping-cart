import { renderHook } from '@testing-library/react';
import { act } from 'react';

import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import {
  cartItemsState,
  couponsState,
  isCartItemSelectedState,
  isCountrysideSelectedState,
  isCouponSelectedState,
} from '../recoil/atoms';
import {
  applicableBOGOCartItemsSelector,
  bogoDiscountSelector,
  cartItemIdsSelector,
  cartItemsCountSelector,
  couponDiscountAmountSelector,
  couponDiscountPriceSelectorFamily,
  couponIdsSelector,
  finalShippingFeeSelector,
  finalTotalPaymentAmountSelector,
  fixedDiscountSelector,
  isAllCartItemSelectedSelectorFamily,
  isSomeCartItemSelectedSelector,
  miracleMorningDiscountSelector,
  selectedCartItemIdsSelector,
  selectedCartItemsCountSelector,
  selectedCartItemsSelector,
  selectedCouponsSelector,
  shippingFeeSelector,
  totalCartItemQuantitySelector,
  totalOrderAmountSelector,
  totalPaymentAmountSelector,
} from '../recoil/selectors';

import mockCartItems from '../mocks/cartItems';
import mockIsCartItemSelecteds from '../mocks/isCartItemSelecteds';
import { mockCoupons } from '../mocks/coupons';
import mockIsCouponSelecteds from '../mocks/isCouponSelecteds';

describe('selectors', () => {
  describe('cartItemsCountSelector', () => {
    it('장바구니에 담긴 cartItem의 갯수를 반환한다.', () => {
      const { result } = renderHook(
        () => useRecoilValue(cartItemsCountSelector),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => set(cartItemsState, mockCartItems)}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toBe(5);
    });
  });

  describe('cartItemIdsSelector', () => {
    it('cartItem의 id들을 반환한다.', () => {
      const { result } = renderHook(() => useRecoilValue(cartItemIdsSelector), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => set(cartItemsState, mockCartItems)}
          >
            {children}
          </RecoilRoot>
        ),
      });
      expect(result.current).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('selectedCartItemsSelector', () => {
    it('선택된 cartItem들을 반환한다.', () => {
      const { result } = renderHook(
        () => useRecoilValue(selectedCartItemsSelector),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, mockCartItems);
                mockIsCartItemSelecteds.forEach((isCartItemSelected) =>
                  set(
                    isCartItemSelectedState(isCartItemSelected.id),
                    isCartItemSelected.boolean,
                  ),
                );
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toEqual(mockCartItems.slice(0, 4));
    });
  });

  describe('selectedCartItemsCountSelector', () => {
    it('선택된 cartItem들의 갯수를 반환한다.', () => {
      const { result } = renderHook(
        () => useRecoilValue(selectedCartItemsCountSelector),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, mockCartItems);
                mockIsCartItemSelecteds.forEach((isCartItemSelected) =>
                  set(
                    isCartItemSelectedState(isCartItemSelected.id),
                    isCartItemSelected.boolean,
                  ),
                );
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toBe(4);
    });
  });

  describe('selectedCartItemIdsSelector', () => {
    it('선택된 cartItem의 ID들을 반환한다.', () => {
      const { result } = renderHook(
        () => useRecoilValue(selectedCartItemIdsSelector),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, mockCartItems);
                mockIsCartItemSelecteds.forEach((isCartItemSelected) =>
                  set(
                    isCartItemSelectedState(isCartItemSelected.id),
                    isCartItemSelected.boolean,
                  ),
                );
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toEqual([1, 2, 3, 4]);
    });
  });

  describe('applicableBOGOCartItemsSelector', () => {
    it('BOGO 쿠폰이 적용 가능한 cartItem들을 반환한다.', () => {
      const { result } = renderHook(
        () => useRecoilValue(applicableBOGOCartItemsSelector),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, mockCartItems);
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toEqual(mockCartItems.slice(2));
    });
  });

  describe('isSomeCartItemSelectedSelector', () => {
    it('cartItem들이 1개라도 선택된 경우 true를 반환한다.', () => {
      const { result } = renderHook(
        () => useRecoilValue(isSomeCartItemSelectedSelector),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, mockCartItems);
                mockIsCartItemSelecteds.forEach((isCartItemSelected) =>
                  set(
                    isCartItemSelectedState(isCartItemSelected.id),
                    isCartItemSelected.boolean,
                  ),
                );
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toBe(true);
    });

    it('cartItem들이 1개도 선택되지 않은 경우 false를 반환한다.', () => {
      const NONE_SELECTED_TEST_CASE = [
        { id: 1, boolean: false },
        { id: 2, boolean: false },
        { id: 3, boolean: false },
        { id: 4, boolean: false },
        { id: 5, boolean: false },
      ];

      const { result } = renderHook(
        () => useRecoilValue(isSomeCartItemSelectedSelector),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, mockCartItems);
                NONE_SELECTED_TEST_CASE.forEach((isCartItemSelected) =>
                  set(
                    isCartItemSelectedState(isCartItemSelected.id),
                    isCartItemSelected.boolean,
                  ),
                );
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toBe(false);
    });
  });

  describe('totalOrderAmountSelector', () => {
    it('선택된 cartItem들의 총 주문금액을 반환한다.', () => {
      const { result } = renderHook(
        () => useRecoilValue(totalOrderAmountSelector),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, mockCartItems);
                mockIsCartItemSelecteds.forEach((isCartItemSelected) =>
                  set(
                    isCartItemSelectedState(isCartItemSelected.id),
                    isCartItemSelected.boolean,
                  ),
                );
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toBe(300000);
    });
  });

  describe('totalCartItemQuantitySelector', () => {
    it('선택된 cartItem들의 총 수량을 반환한다.', () => {
      const { result } = renderHook(
        () => useRecoilValue(totalCartItemQuantitySelector),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, mockCartItems);
                mockIsCartItemSelecteds.forEach((isCartItemSelected) =>
                  set(
                    isCartItemSelectedState(isCartItemSelected.id),
                    isCartItemSelected.boolean,
                  ),
                );
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toBe(10);
    });
  });

  describe('shippingFeeSelector', () => {
    it('총 주문 금액이 100000이 넘으면 0을 반환한다.', () => {
      const { result } = renderHook(() => useRecoilValue(shippingFeeSelector), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, mockCartItems);
              mockIsCartItemSelecteds.forEach((isCartItemSelected) =>
                set(
                  isCartItemSelectedState(isCartItemSelected.id),
                  isCartItemSelected.boolean,
                ),
              );
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });
      expect(result.current).toBe(0);
    });

    it('총 주문 금액이 100000이 넘지 않으면 3000을 반환한다.', () => {
      const SHIPPING_FEE_EXIST_TEST_CASE = [
        { id: 1, boolean: true },
        { id: 2, boolean: false },
        { id: 3, boolean: false },
        { id: 4, boolean: false },
        { id: 5, boolean: false },
      ];

      const { result } = renderHook(() => useRecoilValue(shippingFeeSelector), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, mockCartItems);
              SHIPPING_FEE_EXIST_TEST_CASE.forEach((isCartItemSelected) =>
                set(
                  isCartItemSelectedState(isCartItemSelected.id),
                  isCartItemSelected.boolean,
                ),
              );
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });
      expect(result.current).toBe(3000);
    });

    it('선택한 제품이 없어 총 주문 금액이 0인 경우 0을 반환한다.', () => {
      const NONE_SELECTED_TEST_CASE = [
        { id: 1, boolean: false },
        { id: 2, boolean: false },
        { id: 3, boolean: false },
        { id: 4, boolean: false },
        { id: 5, boolean: false },
      ];

      const { result } = renderHook(() => useRecoilValue(shippingFeeSelector), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, mockCartItems);
              NONE_SELECTED_TEST_CASE.forEach((isCartItemSelected) =>
                set(
                  isCartItemSelectedState(isCartItemSelected.id),
                  isCartItemSelected.boolean,
                ),
              );
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });
      expect(result.current).toBe(0);
    });
  });

  describe('finalShippingFeeSelector', () => {
    it('도서 산간 지역이라도 총 주문 금액이 100000이 넘으면 0을 반환한다.', () => {
      const { result } = renderHook(
        () => useRecoilValue(finalShippingFeeSelector),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, mockCartItems);
                mockIsCartItemSelecteds.forEach((isCartItemSelected) =>
                  set(
                    isCartItemSelectedState(isCartItemSelected.id),
                    isCartItemSelected.boolean,
                  ),
                );
                set(isCountrysideSelectedState, true);
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toBe(0);
    });

    it('도서 산간 지역의 경우, 총 주문 금액이 100000이 넘지 않으면 6000을 반환한다.', () => {
      const SHIPPING_FEE_EXIST_TEST_CASE = [
        { id: 1, boolean: true },
        { id: 2, boolean: false },
        { id: 3, boolean: false },
        { id: 4, boolean: false },
        { id: 5, boolean: false },
      ];

      const { result } = renderHook(
        () => useRecoilValue(finalShippingFeeSelector),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, mockCartItems);
                SHIPPING_FEE_EXIST_TEST_CASE.forEach((isCartItemSelected) =>
                  set(
                    isCartItemSelectedState(isCartItemSelected.id),
                    isCartItemSelected.boolean,
                  ),
                );
                set(isCountrysideSelectedState, true);
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toBe(6000);
    });
  });

  describe('totalPaymentAmountSelector', () => {
    it('총 주문 금액과 배송비를 합한 금액을 반환한다.', () => {
      const SHIPPING_FEE_EXIST_TEST_CASE = [
        { id: 1, boolean: true },
        { id: 2, boolean: false },
        { id: 3, boolean: false },
        { id: 4, boolean: false },
        { id: 5, boolean: false },
      ];

      const { result } = renderHook(
        () => useRecoilValue(totalPaymentAmountSelector),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, mockCartItems);
                SHIPPING_FEE_EXIST_TEST_CASE.forEach((isCartItemSelected) =>
                  set(
                    isCartItemSelectedState(isCartItemSelected.id),
                    isCartItemSelected.boolean,
                  ),
                );
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toBe(13000);
    });
  });

  describe('finalTotalPaymentAmountSelector', () => {
    it('총 주문 금액 - 할인 금액 + 최종 배송비를 계산한 값을 반환한다.', () => {
      const { result } = renderHook(
        () => useRecoilValue(finalTotalPaymentAmountSelector),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, mockCartItems);
                mockIsCartItemSelecteds.forEach((isCartItemSelected) =>
                  set(
                    isCartItemSelectedState(isCartItemSelected.id),
                    isCartItemSelected.boolean,
                  ),
                );
                set(couponsState, mockCoupons);
                mockIsCouponSelecteds.forEach((mockIsCouponSelected) =>
                  set(
                    isCouponSelectedState(mockIsCouponSelected.id),
                    mockIsCouponSelected.boolean,
                  ),
                );
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toBe(255000);
    });
  });

  describe('couponIdsSelector', () => {
    it('coupon의 id들을 반환한다.', () => {
      const { result } = renderHook(() => useRecoilValue(couponIdsSelector), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => set(couponsState, mockCoupons)}
          >
            {children}
          </RecoilRoot>
        ),
      });
      expect(result.current).toEqual([1, 2, 3, 4]);
    });
  });

  describe('selectedCouponsSelector', () => {
    it('선택된 coupon들을 반환한다.', () => {
      const { result } = renderHook(
        () => useRecoilValue(selectedCouponsSelector),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(couponsState, mockCoupons);
                mockIsCouponSelecteds.forEach((mockIsCouponSelected) =>
                  set(
                    isCouponSelectedState(mockIsCouponSelected.id),
                    mockIsCouponSelected.boolean,
                  ),
                );
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toEqual(mockCoupons.slice(0, 2));
    });
  });

  describe('fixedDiscountSelector', () => {
    it('5000을 반환한다.', () => {
      const { result } = renderHook(
        () => useRecoilValue(fixedDiscountSelector),
        {
          wrapper: RecoilRoot,
        },
      );
      expect(result.current).toBe(5000);
    });
  });

  describe('bogoDiscountSelector', () => {
    it('3개 이상의 수량을 가진 선택된 cartItem 중 개당 가격이 가장 큰 금액을 반환한다.', () => {
      const { result } = renderHook(
        () => useRecoilValue(bogoDiscountSelector),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, mockCartItems);
                mockIsCartItemSelecteds.forEach((isCartItemSelected) =>
                  set(
                    isCartItemSelectedState(isCartItemSelected.id),
                    isCartItemSelected.boolean,
                  ),
                );
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toBe(40000);
    });
  });

  describe('shippingFeeDiscountSelector', () => {
    it('finalShippingFee를 반환한다.', () => {
      const SHIPPING_FEE_EXIST_TEST_CASE = [
        { id: 1, boolean: true },
        { id: 2, boolean: false },
        { id: 3, boolean: false },
        { id: 4, boolean: false },
        { id: 5, boolean: false },
      ];

      const { result } = renderHook(
        () => useRecoilValue(finalShippingFeeSelector),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, mockCartItems);
                SHIPPING_FEE_EXIST_TEST_CASE.forEach((isCartItemSelected) =>
                  set(
                    isCartItemSelectedState(isCartItemSelected.id),
                    isCartItemSelected.boolean,
                  ),
                );
                set(isCountrysideSelectedState, true);
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toBe(6000);
    });
  });

  describe('miracleMorningDiscountSelector', () => {
    it('총 주문 금액의 30%를 반환한다.', () => {
      const { result } = renderHook(
        () => useRecoilValue(miracleMorningDiscountSelector),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, mockCartItems);
                mockIsCartItemSelecteds.forEach((isCartItemSelected) =>
                  set(
                    isCartItemSelectedState(isCartItemSelected.id),
                    isCartItemSelected.boolean,
                  ),
                );
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toBe(90000);
    });
  });

  describe('couponDiscountPriceSelectorFamily', () => {
    it('couponId가 1 즉, fixed 쿠폰인 경우 5000을 반환한다.', () => {
      const { result } = renderHook(
        () => useRecoilValue(couponDiscountPriceSelectorFamily(1)),
        {
          wrapper: RecoilRoot,
        },
      );
      expect(result.current).toBe(5000);
    });

    it('couponId가 2 즉, bogo 쿠폰인 경우 3개 이상의 수량을 가진 선택된 cartItem 중 개당 가격이 가장 큰 금액을 반환한다.', () => {
      const { result } = renderHook(
        () => useRecoilValue(couponDiscountPriceSelectorFamily(2)),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, mockCartItems);
                mockIsCartItemSelecteds.forEach((isCartItemSelected) =>
                  set(
                    isCartItemSelectedState(isCartItemSelected.id),
                    isCartItemSelected.boolean,
                  ),
                );
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toBe(40000);
    });

    it('couponId가 3 즉, freeShippingFee 쿠폰인 경우 finalShippingFee를 반환한다.', () => {
      const SHIPPING_FEE_EXIST_TEST_CASE = [
        { id: 1, boolean: true },
        { id: 2, boolean: false },
        { id: 3, boolean: false },
        { id: 4, boolean: false },
        { id: 5, boolean: false },
      ];

      const { result } = renderHook(
        () => useRecoilValue(couponDiscountPriceSelectorFamily(3)),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, mockCartItems);
                SHIPPING_FEE_EXIST_TEST_CASE.forEach((isCartItemSelected) =>
                  set(
                    isCartItemSelectedState(isCartItemSelected.id),
                    isCartItemSelected.boolean,
                  ),
                );
                set(isCountrysideSelectedState, true);
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toBe(6000);
    });

    it('couponId가 4 즉, miracleMorning 쿠폰인 경우 총 주문 금액의 30%를 반환한다.', () => {
      const { result } = renderHook(
        () => useRecoilValue(couponDiscountPriceSelectorFamily(4)),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, mockCartItems);
                mockIsCartItemSelecteds.forEach((isCartItemSelected) =>
                  set(
                    isCartItemSelectedState(isCartItemSelected.id),
                    isCartItemSelected.boolean,
                  ),
                );
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toBe(90000);
    });
  });

  describe('couponDiscountAmountSelector', () => {
    it('선택된 쿠폰들의 총 할인 금액을 반환한다.', () => {
      const { result } = renderHook(
        () => useRecoilValue(couponDiscountAmountSelector),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, mockCartItems);
                mockIsCartItemSelecteds.forEach((isCartItemSelected) =>
                  set(
                    isCartItemSelectedState(isCartItemSelected.id),
                    isCartItemSelected.boolean,
                  ),
                );
                set(couponsState, mockCoupons);
                mockIsCouponSelecteds.forEach((mockIsCouponSelected) =>
                  set(
                    isCouponSelectedState(mockIsCouponSelected.id),
                    mockIsCouponSelected.boolean,
                  ),
                );
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toBe(45000);
    });
  });

  describe('isAllCartItemSelectedSelectorFamily', () => {
    it('cartItem들이 모두 선택된 경우 true를 반환한다.', () => {
      const ALL_SELECTED_TEST_CASE = [
        { id: 1, boolean: true },
        { id: 2, boolean: true },
        { id: 3, boolean: true },
        { id: 4, boolean: true },
        { id: 5, boolean: true },
      ];
      const CART_ITEM_IDS = ALL_SELECTED_TEST_CASE.map(
        (cartItem) => cartItem.id,
      );

      const { result } = renderHook(
        () =>
          useRecoilValue(isAllCartItemSelectedSelectorFamily(CART_ITEM_IDS)),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, mockCartItems);
                ALL_SELECTED_TEST_CASE.forEach((isCartItemSelected) =>
                  set(
                    isCartItemSelectedState(isCartItemSelected.id),
                    isCartItemSelected.boolean,
                  ),
                );
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );

      expect(result.current).toBe(true);
    });

    it('cartItem들 중 하나라도 선택되지 않은 경우 false를 반환한다.', () => {
      const NOT_ALL_SELECTED_TEST_CASE = [
        { id: 1, boolean: false },
        { id: 2, boolean: true },
        { id: 3, boolean: true },
        { id: 4, boolean: true },
        { id: 5, boolean: true },
      ];
      const CART_ITEM_IDS = NOT_ALL_SELECTED_TEST_CASE.map(
        (cartItem) => cartItem.id,
      );

      const { result } = renderHook(
        () =>
          useRecoilValue(isAllCartItemSelectedSelectorFamily(CART_ITEM_IDS)),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, mockCartItems);
                NOT_ALL_SELECTED_TEST_CASE.forEach((isCartItemSelected) =>
                  set(
                    isCartItemSelectedState(isCartItemSelected.id),
                    isCartItemSelected.boolean,
                  ),
                );
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );

      expect(result.current).toBe(false);
    });

    it('전체 선택 할 수 있다.', () => {
      const NOT_ALL_SELECTED_TEST_CASE = [
        { id: 1, boolean: false },
        { id: 2, boolean: true },
        { id: 3, boolean: true },
        { id: 4, boolean: true },
        { id: 5, boolean: true },
      ];
      const CART_ITEM_IDS = NOT_ALL_SELECTED_TEST_CASE.map(
        (cartItem) => cartItem.id,
      );

      const { result } = renderHook(
        () =>
          useRecoilState(isAllCartItemSelectedSelectorFamily(CART_ITEM_IDS)),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, mockCartItems);
                NOT_ALL_SELECTED_TEST_CASE.forEach((isCartItemSelected) =>
                  set(
                    isCartItemSelectedState(isCartItemSelected.id),
                    isCartItemSelected.boolean,
                  ),
                );
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );

      act(() => {
        result.current[1](true);
      });

      expect(result.current[0]).toBe(true);
    });
  });
});
