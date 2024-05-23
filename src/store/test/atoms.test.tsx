import { act, renderHook } from '@testing-library/react';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { allCartItemStates, isFarShippingLocationState, allCouponStates } from '../atoms';
import MOCK_CART_ITEMS from '@/__mocks__/response/cartItems';
import {
  deliveryFeeSelector,
  individualCartItemQuantitySelector,
  isCheckedIndividualCartItemSelector,
  orderAmountSelector,
} from '../selectors';
import ORDER_CONDITION from '@/constants/order';
import MOCK_FORMATTED_COUPONS from '@/__mocks__/response/coupons';

const MOCK_ITEM_ID = MOCK_CART_ITEMS[0].id;

describe('장바구니 목록에 대한 테스트 코드를 작성한다.', () => {
  it('비동기 통신을 통해서 장바구니 데이터를 가져오고 이를 아톰에 저장한다.', async () => {
    const { result } = renderHook(() => useRecoilValue(allCartItemStates), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={({ set }) => set(allCartItemStates, MOCK_CART_ITEMS)}>
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current).toEqual(MOCK_CART_ITEMS);
  });

  it('개별 상품의 선택/해제 시 선택 여부가 정상적으로 변경된다.', async () => {
    const { result } = renderHook(
      () => {
        const setCheckedState = useSetRecoilState(isCheckedIndividualCartItemSelector(1));
        const isChecked = useRecoilValue(isCheckedIndividualCartItemSelector(1));
        return { setCheckedState, isChecked };
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={({ set }) => set(allCartItemStates, MOCK_CART_ITEMS)}>
            {children}
          </RecoilRoot>
        ),
      },
    );

    expect(result.current.isChecked).toBe(false);

    act(() => {
      result.current.setCheckedState(true);
    });

    expect(result.current.isChecked).toBe(false);
  });
});

describe('장바구니 결제 금액 계산 테스트', () => {
  it('선택된 상품들의 가격 합계가 결제 금액으로 정상 반영된다.', async () => {
    const { result } = renderHook(() => useRecoilValue(orderAmountSelector), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={({ set }) => set(allCartItemStates, MOCK_CART_ITEMS)}>
          {children}
        </RecoilRoot>
      ),
    });

    const expectedAmount = MOCK_CART_ITEMS.filter((item) => item.product.isChecked).reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    );

    expect(result.current).toBe(expectedAmount);
  });
});

describe('장바구니 배송비 계산 테스트', () => {
  const MOCK_CART_ITEMS_UPDATED = MOCK_CART_ITEMS.map((item) => ({
    ...item,
    product: {
      ...item.product,
      isChecked: true,
    },
  }));
  it('결제 금액에 따라 배송비가 정상적으로 계산된다.', async () => {
    const { result } = renderHook(() => useRecoilValue(deliveryFeeSelector), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(allCartItemStates, MOCK_CART_ITEMS_UPDATED);
            set(isFarShippingLocationState, { isAvailable: true, isChecked: false });
            set(allCouponStates, MOCK_FORMATTED_COUPONS);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    const orderAmount = MOCK_CART_ITEMS_UPDATED.filter((item) => item.product.isChecked).reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    );
    const expectedDeliveryFee =
      orderAmount >= ORDER_CONDITION.FREE_SHIPPING_PRICE ? 0 : ORDER_CONDITION.SHIPPING_FEE;

    expect(result.current).toBe(expectedDeliveryFee);
  });
});

describe('장바구니 수량 변경 기능 테스트', () => {
  it('상품의 수량을 변경할 때 올바르게 반영된다.', async () => {
    const { result, rerender } = renderHook(
      () => {
        const setQuantity = useSetRecoilState(individualCartItemQuantitySelector(MOCK_ITEM_ID));
        const quantity = useRecoilValue(individualCartItemQuantitySelector(MOCK_ITEM_ID));
        return { setQuantity, quantity };
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={({ set }) => set(allCartItemStates, MOCK_CART_ITEMS)}>
            {children}
          </RecoilRoot>
        ),
      },
    );

    expect(result.current.quantity).toBe(
      MOCK_CART_ITEMS?.find((item) => item.id === MOCK_ITEM_ID)?.quantity,
    );

    act(() => {
      result.current.setQuantity(5);
    });

    rerender();

    expect(result.current.quantity).toBe(5);
  });
});

describe('장바구니 상품 제거 기능 테스트', () => {
  it('장바구니에서 상품을 제거할 때 총 수량의 1이 줄어든다.', async () => {
    const { result } = renderHook(
      () => {
        const setCartItems = useSetRecoilState(allCartItemStates);
        const cartItems = useRecoilValue(allCartItemStates);
        return { setCartItems, cartItems };
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={({ set }) => set(allCartItemStates, MOCK_CART_ITEMS)}>
            {children}
          </RecoilRoot>
        ),
      },
    );

    expect(result.current.cartItems.length).toBe(MOCK_CART_ITEMS.length);

    act(() => {
      result.current.setCartItems(
        result.current.cartItems.filter((item) => item.id !== MOCK_ITEM_ID),
      );
    });

    expect(result.current.cartItems.length).toBe(MOCK_CART_ITEMS.length - 1);
  });
});
