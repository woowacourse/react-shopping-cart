import { act } from 'react';

import { RecoilRoot } from 'recoil';

import { renderHook } from '@testing-library/react';

import useCartItemList from './useCartItemList';
import useApiErrorState from '../error/useApiErrorState';
import { cartItemListState } from '../../recoil/cartItem/atom';
import {
  FailedDeleteCartItemError,
  FailedFetchCartItemListError,
} from '../../error/customError';
import { useSelectedCartItemIdList } from './useSelectedCartItemIdList';
import { useSelectedCartItemId } from './useSelectedCartItemId';

jest.mock('../../apis/cartItemList', () => ({
  requestCartItemList: jest.fn(),
  requestDeleteCartItem: jest.fn(),
}));

describe('useCartItemList', () => {
  const MOCK_DEFAULT_VALUE = [
    {
      id: 2463,
      quantity: 1,

      name: '코카콜라',
      price: 10000,
      imageUrl:
        'https://godomall.speedycdn.net/1cd80571a779bf8f2c08a18dc0965949/goods/1000000027/image/detail/1000000027_detail_012.jpg',
    },
    {
      id: 2464,
      quantity: 1,
      name: '나이키',
      price: 20000,
      imageUrl:
        'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png',
    },
    {
      id: 2465,
      quantity: 1,
      name: '컨버스',
      price: 20000,
      imageUrl:
        'https://sitem.ssgcdn.com/65/73/69/item/1000163697365_i1_750.jpg',
    },
  ];

  const MOCK_SET_NEW_VALUE = [
    {
      id: 1234,
      quantity: 1,

      name: '펩시',
      price: 10000,
      imageUrl:
        'https://godomall.speedycdn.net/1cd80571a779bf8f2c08a18dc0965949/goods/1000000027/image/detail/1000000027_detail_012.jpg',
    },
    {
      id: 2345,
      quantity: 1,
      name: '퓨마',
      price: 20000,
      imageUrl:
        'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png',
    },
    {
      id: 111,
      quantity: 1,
      name: '스니커즈',
      price: 20000,
      imageUrl:
        'https://sitem.ssgcdn.com/65/73/69/item/1000163697365_i1_750.jpg',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetchCartItemList는 requestCartItemList를 통하여 API를 호출해야 한다.', async () => {
    const { result } = renderHook(() => useCartItemList(), {
      wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
    });
    await act(async () => await result.current.fetchCartItemList());
    const { requestCartItemList } = require('../../apis/cartItemList');
    expect(requestCartItemList).toHaveBeenCalled();
  });

  it('fetchCartItemList이 실행되고 나서, cartItem에 없는 id가 selectedIdList에 있다면, 그 값을 제거해야 한다.', async () => {
    const useCustomHook = () => {
      return {
        ...useCartItemList(),
        ...useSelectedCartItemId(),
        ...useSelectedCartItemIdList(),
      };
    };
    const { result } = renderHook(() => useCustomHook(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) =>
            set(cartItemListState, [
              ...MOCK_DEFAULT_VALUE,
              {
                id: 999,
                quantity: 9,
                price: 9999,
                name: '구구',
                imageUrl: '999',
              },
            ])
          }
        >
          {children}
        </RecoilRoot>
      ),
    });

    await act(() => result.current.selectCartItem(999));
    await act(() => result.current.selectCartItem(MOCK_DEFAULT_VALUE[0].id));

    const { requestCartItemList } = require('../../apis/cartItemList');
    requestCartItemList.mockResolvedValue([{ id: MOCK_DEFAULT_VALUE[0].id }]);

    await act(async () => await result.current.fetchCartItemList());
    expect(result.current.selectedIdList).toStrictEqual([
      MOCK_DEFAULT_VALUE[0].id,
    ]);
  });

  it('fetchCartItemList가 실패할 경우 apiError 상태를 FailedFetchCartItemListError로 설정해야 한다.', async () => {
    const useCustomHook = () => {
      return { ...useCartItemList(), ...useApiErrorState() };
    };
    const { result } = renderHook(() => useCustomHook(), {
      wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
    });

    const { requestCartItemList } = require('../../apis/cartItemList');
    requestCartItemList.mockRejectedValueOnce(new Error('API Error'));

    await act(async () => {
      await result.current.fetchCartItemList();
    });

    expect(result.current.apiError).toBeInstanceOf(
      FailedFetchCartItemListError,
    );
  });

  it('fetchCartItemList가 성공할 경우 apiError 상태는 null로 유지되어야 한다.', async () => {
    const useCustomHook = () => {
      return { ...useCartItemList(), ...useApiErrorState() };
    };
    const { result } = renderHook(() => useCustomHook(), {
      wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
    });

    await act(async () => {
      await result.current.fetchCartItemList();
    });

    expect(result.current.apiError).toBe(null);
  });

  it('cartItemList는 저장된 "카트 아이템 목록" 상태와 같은 값을 불러와야 한다.', () => {
    const { result } = renderHook(() => useCartItemList(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) =>
            set(cartItemListState, MOCK_DEFAULT_VALUE)
          }
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.cartItemList).toEqual(MOCK_DEFAULT_VALUE);
  });

  it('setCartItemList는 cartItemList상태를 전달해 준 새로운 상태로 변경해야 한다.', () => {
    const { result } = renderHook(() => useCartItemList(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) =>
            set(cartItemListState, MOCK_DEFAULT_VALUE)
          }
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.cartItemList).toEqual(MOCK_DEFAULT_VALUE);
    act(() => result.current.setCartItemList(MOCK_SET_NEW_VALUE));
    expect(result.current.cartItemList).toEqual(MOCK_SET_NEW_VALUE);
  });

  it('deleteCartItem은 선택한 카트 아이템 id를 cartItemList상태에서 제거해야 한다.', async () => {
    const { result } = renderHook(() => useCartItemList(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) =>
            set(cartItemListState, MOCK_DEFAULT_VALUE)
          }
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.cartItemList).toEqual(MOCK_DEFAULT_VALUE);
    await act(
      async () => await result.current.deleteCartItem(MOCK_DEFAULT_VALUE[0].id),
    );
    expect(result.current.cartItemList).toEqual(
      MOCK_DEFAULT_VALUE.filter(({ id }) => id !== MOCK_DEFAULT_VALUE[0].id),
    );
  });

  it('deleteCartItem은 requestDeleteCartItem를 통하여 API를 호출해야 한다.', async () => {
    const { result } = renderHook(() => useCartItemList(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) =>
            set(cartItemListState, MOCK_DEFAULT_VALUE)
          }
        >
          {children}
        </RecoilRoot>
      ),
    });
    const { requestDeleteCartItem } = require('../../apis/cartItemList');
    await act(
      async () => await result.current.deleteCartItem(MOCK_DEFAULT_VALUE[0].id),
    );
    expect(requestDeleteCartItem).toHaveBeenCalledWith(
      MOCK_DEFAULT_VALUE[0].id,
    );
  });

  it('deleteCartItem이 실패할 경우 apiError 상태를 FailedDeleteCartItemError 설정해야 한다.', async () => {
    const useCustomHook = () => {
      return { ...useCartItemList(), ...useApiErrorState() };
    };
    const { result } = renderHook(() => useCustomHook(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) =>
            set(cartItemListState, MOCK_DEFAULT_VALUE)
          }
        >
          {children}
        </RecoilRoot>
      ),
    });

    const { requestDeleteCartItem } = require('../../apis/cartItemList');
    requestDeleteCartItem.mockRejectedValueOnce(new Error('API Error'));

    await act(async () => {
      await result.current.deleteCartItem(MOCK_DEFAULT_VALUE[0].id);
    });

    expect(result.current.apiError).toBeInstanceOf(FailedDeleteCartItemError);
  });

  it('deleteCartItem가 성공할 경우 apiError 상태는 null로 유지되어야 한다.', async () => {
    const useCustomHook = () => {
      return { ...useCartItemList(), ...useApiErrorState() };
    };
    const { result } = renderHook(() => useCustomHook(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) =>
            set(cartItemListState, MOCK_DEFAULT_VALUE)
          }
        >
          {children}
        </RecoilRoot>
      ),
    });

    await act(async () => {
      await result.current.deleteCartItem(MOCK_DEFAULT_VALUE[0].id);
    });

    expect(result.current.apiError).toBe(null);
  });
});
