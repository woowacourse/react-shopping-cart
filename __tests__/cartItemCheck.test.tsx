import { useCheckCartItem } from '@hooks/shoppingCart';
import { waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { INITIAL_ITEMS } from './constants/cartItems';
import { renderHookWithRecoilRoot } from './utils/recoilTestUtils';

const renderUseCheckCartItem = () => renderHookWithRecoilRoot(() => useCheckCartItem());

describe('상품 선택 테스트', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('초기 상품들은 모두 선택되지 않은 상태이다.', async () => {
    const { result } = renderUseCheckCartItem();

    await waitFor(() => {
      expect(result.current).toBeDefined();
    });

    const isNotAllProductsSelected = INITIAL_ITEMS.every((item) => !result.current.isChecked(item.id));

    expect(isNotAllProductsSelected).toBeTruthy();
    expect(result.current.isAllChecked).toBeFalsy();
  });

  it('장바구니 목록 속 특정 상품의 체크 박스를 선택하면 해당 상품은 주문 목록에 추가된다.', async () => {
    const ID = INITIAL_ITEMS[0].id;

    const { result } = renderUseCheckCartItem();

    await waitFor(() => {
      expect(result.current).toBeDefined();
    });

    await waitFor(() => {
      result.current.onCheckCartItem(true, ID);
    });

    expect(result.current.isChecked(ID)).toBeTruthy();
  });

  it('상품을 전체 선택 할 경우, 모든 상품들이 선택 된다.', async () => {
    const { result } = renderUseCheckCartItem();

    await waitFor(() => {
      expect(result.current).toBeDefined();
    });

    await waitFor(() => {
      result.current.onCheckAllCartItems(true);
    });

    expect(result.current.isAllChecked).toBeTruthy();
  });

  it('전체 선택을 해제하면, 장바구니 모든 상품의 선택이 해제된다.', async () => {
    const { result } = renderUseCheckCartItem();

    await waitFor(() => {
      expect(result.current).toBeDefined();
    });

    await waitFor(() => {
      result.current.onCheckAllCartItems(true);
    });

    await waitFor(() => {
      result.current.onCheckAllCartItems(false);
    });

    expect(result.current.isAllChecked).toBeFalsy();
  });

  it('전체 선택된 상태에서 특정 상품의 선택을 해제하면, 전체 선택이 해제된다.', async () => {
    const { result } = renderUseCheckCartItem();

    await waitFor(() => {
      expect(result.current).toBeDefined();
    });

    await waitFor(() => {
      result.current.onCheckAllCartItems(true);
    });

    await waitFor(() => {
      result.current.onCheckCartItem(false, INITIAL_ITEMS[0].id);
    });

    expect(result.current.isAllChecked).toBeFalsy();
  });
});
