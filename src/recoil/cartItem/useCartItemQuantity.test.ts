import { renderHook } from '@testing-library/react';
import { useCartItemQuantity } from './useCartItemQuantity';
import { RecoilRoot } from 'recoil';
import { act } from 'react';

jest.mock('../../apis/cartItemList/cartItemList', () => ({
  requestSetCartItemQuantity: jest.fn(),
}));

describe('useCartItemQuantity hook test', () => {
  test('초기 quantity는 초기값 0과 같아야 한다', () => {
    const { result } = renderHook(() => useCartItemQuantity(0), {
      wrapper: RecoilRoot,
    });

    expect(result.current.quantity).toEqual(0);
  });

  test('setQuantity를 통해 주어진 prop의 값으로 quantity 변경할 수 있어야 한다', async () => {
    const { result } = renderHook(() => useCartItemQuantity(0), {
      wrapper: RecoilRoot,
    });

    act(() => {
      result.current.setQuantity(33);
    });

    expect(result.current.quantity).toEqual(33);
  });

  test('increaseQuantity를 호출하면 quantity가 1 증가해야한다', async () => {
    const { result } = renderHook(() => useCartItemQuantity(0), {
      wrapper: RecoilRoot,
    });

    act(() => result.current.setQuantity(33));
    await act(async () => await result.current.increaseQuantity());

    expect(result.current.quantity).toEqual(34);
  });

  test('decreaseQuantity를 호출하면 quantity가 1 감소해야한다', async () => {
    const { result } = renderHook(() => useCartItemQuantity(0), {
      wrapper: RecoilRoot,
    });

    act(() => result.current.setQuantity(33));
    await act(async () => await result.current.decreaseQuantity());

    expect(result.current.quantity).toEqual(32);
  });
});
