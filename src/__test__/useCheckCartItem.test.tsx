import { renderHook, act } from '@testing-library/react';
import { DefaultValue, RecoilRoot, RecoilState } from 'recoil';
import { cartItemsState, checkedCartItemIdsState } from '../recoil/atoms';

import useCheckCartItem from '../hooks/useCheckCartItem';
import mockCartItems from './data/mockCartItems';

type RecoilStateSetType = <T>(atom: RecoilState<T>, value: T | DefaultValue) => void;

describe('useCheckCartItem', () => {
  const initializeState = ({ set }: { set: RecoilStateSetType }) => {
    set(cartItemsState, mockCartItems);
    set(checkedCartItemIdsState, []);
  };

  it('만약 장바구니에 처음 진입한 상태이며 localStorage에 어떠한 정보도 남아있지 않다면, 장바구니의 모든 상품들은 체크가 해제된 상태여야 한다.', () => {
    const { result } = renderHook(() => useCheckCartItem(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    const isAllUnchecked = mockCartItems.every((item) => !result.current.isChecked(item.id));
    expect(isAllUnchecked).toBe(true);
  });

  it('만약 장바구니에서 체크 해제 상태인 특정 상품의 체크박스를 클릭하면, 해당 박스는 체크 상태로 변화해야 한다.', () => {
    const { result } = renderHook(() => useCheckCartItem(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    expect(result.current.isChecked(1)).toBe(false);

    act(() => {
      result.current.onCheckCartItem(1, true);
    });

    expect(result.current.isChecked(1)).toBe(true);
  });

  it('여러 상품이 포함된 장바구니에서 일부분만 체크박스가 체크된 상태라면, "전체선택" 체크박스는 체크 해제되어 있어야 한다.', () => {
    const { result } = renderHook(() => useCheckCartItem(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    expect(result.current.isChecked(2)).toBe(false);

    act(() => {
      result.current.onCheckCartItem(2, true);
    });

    expect(result.current.isChecked(2)).toBe(true);
    expect(result.current.isAllChecked).toBe(false);
  });

  it('모든 상품의 체크박스가 체크된 상태라면, "전체선택" 체크박스는 체크가 되어 있어야 한다.', () => {
    const { result } = renderHook(() => useCheckCartItem(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    expect(result.current.isChecked(3)).toBe(false);

    act(() => {
      result.current.onCheckCartItem(3, true);
    });

    expect(result.current.isChecked(3)).toBe(true);
    expect(result.current.isAllChecked).toBe(true);
  });

  it('"전체선택" 체크박스를 클릭하면, 장바구니의 모든 상품의 체크 상태가 ON 또는 OFF로 변화해야 한다.', () => {
    const { result } = renderHook(() => useCheckCartItem(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    act(() => {
      result.current.onCheckAllCartItem(false);
    });

    expect(result.current.isAllChecked).toBe(false);

    act(() => {
      result.current.onCheckAllCartItem(true);
    });

    expect(result.current.isAllChecked).toBe(true);
  });

  it('모든 상품의 체크박스가 체크된 상태에서 특정 상품의 체크를 해제하면, "전체선택" 체크박스도 체크가 해제되어야 한다.', () => {
    const { result } = renderHook(() => useCheckCartItem(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    act(() => {
      result.current.onCheckAllCartItem(true);
    });

    expect(result.current.isAllChecked).toBe(true);

    act(() => {
      result.current.onCheckCartItem(3, false);
    });

    expect(result.current.isChecked(3)).toBe(false);
    expect(result.current.isAllChecked).toBe(false);
  });
});
