import { act, renderHook } from '@testing-library/react';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import {
  allCartItemsCheckState,
  calculateOrderPrice,
  checkedCartItems,
} from '../recoil/selectors';
import { MOCK_CART_ITEM } from '../constants/mock';
import { cartData, cartItemCheckState, isIslandState } from '../recoil/atoms';

describe('allCartItemsCheckState', () => {
  it('모든 체크 박스를 활성화 시킨다.', () => {
    const { result } = renderHook(
      () => useRecoilState(allCartItemsCheckState),
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartData, MOCK_CART_ITEM);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      },
    );

    const [isAllCheck, setIsAllCheck] = result.current;

    act(() => {
      setIsAllCheck(!isAllCheck);
    });

    expect(result.current[0]).toEqual(true);
  });
});

describe('checkedCartItems', () => {
  it('선택된 상품들의 정보만 반환한다.', () => {
    const itemId = 222;

    const { result } = renderHook(() => useRecoilValue(checkedCartItems), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartData, MOCK_CART_ITEM);
            set(cartItemCheckState(itemId), true);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current.length).toBe(1);
    expect(result.current[0].id).toBe(itemId);
  });
});

describe('calculateOrderPrice', () => {
  describe('선택된 상품의 계산이 10만원 이상일 경우', () => {
    const checkedItemId = 111;
    const { result } = renderHook(() => useRecoilValue(calculateOrderPrice), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartData, MOCK_CART_ITEM);
            set(cartItemCheckState(checkedItemId), true);
            set(isIslandState, false);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    it('상품 금액 계산: 선택된 상품들의 가격 합계가 올바르게 계산한다.', () => {
      expect(result.current.totalOrderPrice).toBe(100000);
    });

    it('배송비 계산: 배송비는 0원이다.', () => {
      expect(result.current.deliveryFee).toBe(0);
    });
  });

  describe('선택된 상품의 계산이 10만원 미만일 경우', () => {
    const checkedItemId = 222;
    const { result } = renderHook(() => useRecoilValue(calculateOrderPrice), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartData, MOCK_CART_ITEM);
            set(cartItemCheckState(checkedItemId), true);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    it('상품 금액 계산: 선택된 상품들의 가격 합계가 올바르게 계산한다.', () => {
      expect(result.current.totalOrderPrice).toBe(40000);
    });

    it('배송비 계산: 배송비는 3,000원이다.', () => {
      expect(result.current.deliveryFee).toBe(3000);
    });

    it('총 결제 금액 계산: 상품 금액과 배송비를 합친 금액을 올바르게 계산한다..', () => {
      expect(result.current.totalPrice).toBe(43000);
    });
  });
});
