import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import usePrice, {
  DELIVERY_FEE,
  DELIVERY_FEE_THRESHOLD,
  EXTRA_DELIVERY_FEE,
} from './usePrice';
import {
  cartItemListState,
  hasExtraDeliveryFeeState,
  selectedCartItemIdListState,
} from '../../recoil/cartItem/atom';
import useSelectedCartItemList from '../cartItem/useSelectedCartItemList';

describe('usePrice', () => {
  const MOCK_SELECTED_CART_ITEM_LIST = [
    {
      id: 2463,
      quantity: 2,
      name: '코카콜라',
      price: 10000,
      imageUrl:
        'https://godomall.speedycdn.net/1cd80571a779bf8f2c08a18dc0965949/goods/1000000027/image/detail/1000000027_detail_012.jpg',
    },
    {
      id: 2464,
      quantity: 1,
      name: '나이키',
      price: 30000,
      imageUrl:
        'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png',
    },
    {
      id: 2465,
      quantity: 1,
      name: '컨버스',
      price: 100000,
      imageUrl:
        'https://sitem.ssgcdn.com/65/73/69/item/1000163697365_i1_750.jpg',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('orderedPrice는 선택된 카트 아이템의 수량과 갯수를 모두 곱하여 더한 총 금액을 반환한다.', () => {
    const useCustomHook = () => {
      return { ...usePrice(), ...useSelectedCartItemList() };
    };
    const { result } = renderHook(() => useCustomHook(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartItemListState, MOCK_SELECTED_CART_ITEM_LIST);
            set(
              selectedCartItemIdListState,
              MOCK_SELECTED_CART_ITEM_LIST.map(({ id }) => id).slice(0, 2),
            );
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current.orderedPrice).toBe(
      result.current.selectedCartItemList.reduce(
        (acc, { price, quantity }) => acc + price * quantity,
        0,
      ),
    );
  });

  it(`deliveryFee는 orderedPrice가 ${DELIVERY_FEE_THRESHOLD}원 이하일 때, ${DELIVERY_FEE}원을 반환한다.`, () => {
    const useCustomHook = () => {
      return { ...usePrice(), ...useSelectedCartItemList() };
    };
    const { result } = renderHook(() => useCustomHook(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartItemListState, MOCK_SELECTED_CART_ITEM_LIST);
            set(
              selectedCartItemIdListState,
              MOCK_SELECTED_CART_ITEM_LIST.map(({ id }) => id).slice(0, 2),
            );
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current.deliveryFee).toBe(DELIVERY_FEE);
  });

  it(`deliveryFee는 orderedPrice가 ${DELIVERY_FEE_THRESHOLD}원 이상일 때, 0원을 반환한다.`, () => {
    const useCustomHook = () => {
      return { ...usePrice(), ...useSelectedCartItemList() };
    };
    const { result } = renderHook(() => useCustomHook(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartItemListState, MOCK_SELECTED_CART_ITEM_LIST);
            set(
              selectedCartItemIdListState,
              MOCK_SELECTED_CART_ITEM_LIST.map(({ id }) => id),
            );
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current.deliveryFee).toBe(0);
  });

  it(`deliveryFee는 extraDeliveryFee 상태가 true일 때, ${EXTRA_DELIVERY_FEE}만큼 더 증가한다.`, () => {
    const useCustomHook = () => {
      return { ...usePrice(), ...useSelectedCartItemList() };
    };
    const { result } = renderHook(() => useCustomHook(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(hasExtraDeliveryFeeState, true);
            set(cartItemListState, MOCK_SELECTED_CART_ITEM_LIST);
            set(
              selectedCartItemIdListState,
              MOCK_SELECTED_CART_ITEM_LIST.map(({ id }) => id).slice(0, 2),
            );
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current.deliveryFee).toBe(DELIVERY_FEE + EXTRA_DELIVERY_FEE);
  });

  it(`deliveryFee는 extraDeliveryFee 상태가 true일 때, ${EXTRA_DELIVERY_FEE}만큼 더 증가한다.`, () => {
    const useCustomHook = () => {
      return { ...usePrice(), ...useSelectedCartItemList() };
    };
    const { result } = renderHook(() => useCustomHook(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(hasExtraDeliveryFeeState, true);
            set(cartItemListState, MOCK_SELECTED_CART_ITEM_LIST);
            set(
              selectedCartItemIdListState,
              MOCK_SELECTED_CART_ITEM_LIST.map(({ id }) => id),
            );
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current.deliveryFee).toBe(EXTRA_DELIVERY_FEE);
  });

  it(`totalPrice는 orderedPrice와 DeliveryFee의 합을 반환한다.`, () => {
    const useCustomHook = () => {
      return { ...usePrice(), ...useSelectedCartItemList() };
    };
    const { result } = renderHook(() => useCustomHook(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartItemListState, MOCK_SELECTED_CART_ITEM_LIST);
            set(
              selectedCartItemIdListState,
              MOCK_SELECTED_CART_ITEM_LIST.map(({ id }) => id).slice(0, 2),
            );
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current.totalPrice).toBe(
      result.current.orderedPrice + result.current.deliveryFee,
    );
  });
});
