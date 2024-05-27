import { RecoilRoot } from 'recoil';
import { act, renderHook } from '@testing-library/react';
import useOrders from './useOrders';
import { selectedCartItemIdListState } from '../../recoil/cartItem/atom';
import { requestOrders } from '../../apis/orders';
import { FailedOrderError } from '../../error/customError';
import useApiErrorState from '../error/useApiErrorState';

jest.mock('../../apis/orders', () => ({
  requestOrders: jest.fn(),
}));

describe('useOrders', () => {
  const MOCK_CART_ITEM_IDS = [1, 2, 3];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('orderSelectedCartItems는 requestOrders를 통해 API를 호출해야 한다.', async () => {
    const { result } = renderHook(() => useOrders(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedCartItemIdListState, MOCK_CART_ITEM_IDS);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });
    await act(async () => await result.current.orderSelectedCartItems());
    expect(requestOrders).toHaveBeenCalledWith(MOCK_CART_ITEM_IDS);
  });

  it('orderSelectedCartItems가 실패할 경우 apiError 상태를 FailedOrderError로 설정해야 한다.', async () => {
    const useCustomError = () => {
      return { ...useOrders(), ...useApiErrorState() };
    };
    const { result } = renderHook(() => useCustomError(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedCartItemIdListState, MOCK_CART_ITEM_IDS);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });
    (requestOrders as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
    await act(async () => await result.current.orderSelectedCartItems());
    expect(result.current.apiError).toBeInstanceOf(FailedOrderError);
  });

  it('orderSelectedCartItems가 성공할 경우 apiError 상태는 null로 유지되어야 한다.', async () => {
    const useCustomError = () => {
      return { ...useOrders(), ...useApiErrorState() };
    };
    const { result } = renderHook(() => useCustomError(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedCartItemIdListState, MOCK_CART_ITEM_IDS);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });
    await act(async () => await result.current.orderSelectedCartItems());
    expect(result.current.apiError).toBe(null);
  });
});
