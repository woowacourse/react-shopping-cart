import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CartProvider, useCartContext } from '../CartContext';
import { CartItemProps } from '../../types/cartItem';

// Mock useCartList hook
vi.mock('../../hooks/useCartList', () => ({
  default: (): {
    data: CartItemProps[];
    error: string;
    isLoading: boolean;
    increaseCartItem: () => Promise<void>;
    decreaseCartItem: () => Promise<void>;
    deleteCartItem: () => Promise<void>;
  } => ({
    data: [
      {
        id: 1,
        quantity: 2,
        product: {
          id: 1,
          name: '테스트 상품',
          price: 100,
          imageUrl: '',
          category: '',
        },
      },
    ],
    error: '',
    isLoading: false,
    increaseCartItem: vi.fn().mockResolvedValue(undefined),
    decreaseCartItem: vi.fn().mockResolvedValue(undefined),
    deleteCartItem: vi.fn().mockResolvedValue(undefined),
  }),
}));

// Mock useSelect hook
vi.mock('../../hooks/useSelect', () => ({
  default: (cartList: CartItemProps[]) => ({
    selectedItems: cartList.map((item) => item.id),
    isAllSelected: false,
    selectItem: vi.fn(),
    selectAllItems: vi.fn(),
  }),
}));

function TestConsumer() {
  const {
    data,
    error,
    isLoading,
    selectedItems,
    isAllSelected,
    subTotal,
    deliveryFee,
    totalCount,
    typeCount,
    totalBeforeDiscount,
    selectedCartItems,
  } = useCartContext();

  return (
    <div>
      <span data-testid="data-length">{data.length}</span>
      <span data-testid="error">{error}</span>
      <span data-testid="loading">{String(isLoading)}</span>
      <span data-testid="selected-length">{selectedItems.length}</span>
      <span data-testid="all-selected">{String(isAllSelected)}</span>
      <span data-testid="subTotal">{subTotal}</span>
      <span data-testid="deliveryFee">{deliveryFee}</span>
      <span data-testid="totalCount">{totalCount}</span>
      <span data-testid="typeCount">{typeCount}</span>
      <span data-testid="totalBeforeDiscount">{totalBeforeDiscount}</span>
      <span data-testid="selectedItems-length">{selectedCartItems.length}</span>
    </div>
  );
}

describe('CartContext Provider', () => {
  it('provides expected context values', () => {
    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );
    // useCartList에서 data 길이는 1개
    expect(screen.getByTestId('data-length').textContent).toBe('1');
    // error/isLoading은 스텁 그대로
    expect(screen.getByTestId('error').textContent).toBe('');
    expect(screen.getByTestId('loading').textContent).toBe('false');
    // useSelect에서 selectedItems도 [1]로 스텁, length=1
    expect(screen.getByTestId('selected-length').textContent).toBe('1');
    expect(screen.getByTestId('all-selected').textContent).toBe('false');
    // subTotal = 100 * 2 = 200
    expect(screen.getByTestId('subTotal').textContent).toBe('200');
    // deliveryFee (threshold 100000) 이하는 기본 3000
    expect(screen.getByTestId('deliveryFee').textContent).toBe('3000');
    // totalCount = quantity 합 (2)
    expect(screen.getByTestId('totalCount').textContent).toBe('2');
    // typeCount = 선택된 아이템 개수 (1)
    expect(screen.getByTestId('typeCount').textContent).toBe('1');
    // totalBeforeDiscount = subTotal + deliveryFee = 200 + 3000 = 3200
    expect(screen.getByTestId('totalBeforeDiscount').textContent).toBe('3200');
    // selectedCartItems length = 1
    expect(screen.getByTestId('selectedItems-length').textContent).toBe('1');
  });
});
