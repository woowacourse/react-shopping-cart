import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CartItem from '../src/components/Cart/CartItem';
import { CartProduct } from '../src/types/cart';
import * as cartApi from '../src/apis/cart';
import { DataProvider, useData } from '../src/context/DataContext';

vi.mock('../src/apis/cart', () => ({
  getCartItems: vi.fn(),
  patchIncreaseQuantity: vi.fn(),
  patchDecreaseQuantity: vi.fn(),
  removeCartItem: vi.fn(),
}));

vi.mock('../src/components/SelectBox/SelectBox', () => ({
  default: function MockSelectBox({ onRemove }: { onRemove: () => void }) {
    return (
      <div data-testid="select-box">
        <button onClick={onRemove} data-testid="remove-button">
          Remove
        </button>
      </div>
    );
  },
}));

vi.mock('../src/context/DataContext', () => {
  const mockRefetch = vi.fn();
  return {
    DataProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useData: vi.fn().mockImplementation(({ fetcher, name }) => {
      if (fetcher === cartApi.getCartItems && name === 'cartItems') {
        return {
          data: undefined,
          isLoading: false,
          error: null,
          refetch: mockRefetch,
        };
      }
      return {
        data: undefined,
        isLoading: false,
        error: null,
        refetch: vi.fn(),
      };
    }),
  };
});

describe('CartItem', () => {
  const mockCartItem: CartProduct = {
    id: 1,
    quantity: 2,
    product: {
      id: 101,
      name: '테스트 상품',
      price: 10000,
      imageUrl: 'https://example.com/image.jpg',
      category: 'test',
    },
  };

  const mockRefetch = vi.fn();

  const renderComponent = (cartItem = mockCartItem, isLoading: boolean) => {
    vi.mocked(useData).mockImplementation(({ fetcher, name }) => {
      if (fetcher === cartApi.getCartItems && name === 'cartItems') {
        return {
          data: undefined,
          isLoading: isLoading,
          error: null,
          refetch: mockRefetch,
        };
      }
      return {
        data: undefined,
        isLoading: false,
        error: null,
        refetch: vi.fn(),
      };
    });

    return render(
      <DataProvider>
        <CartItem cartItem={cartItem} />
      </DataProvider>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (cartApi.getCartItems as Mock).mockResolvedValue({
      content: [],
    });
    mockRefetch.mockClear();
  });

  it('상품 정보가 올바르게 표시되어야 한다', () => {
    renderComponent(mockCartItem, false);

    expect(screen.getByText('테스트 상품')).toBeInTheDocument();
    expect(screen.getByText('10,000원')).toBeInTheDocument();
    expect(screen.getByTestId('item-quantity')).toHaveTextContent('2');
  });

  it('수량 증가 버튼 클릭 시 API가 호출되고 refetch가 실행되어야 한다', async () => {
    renderComponent(mockCartItem, false);

    const increaseButton = screen.getByTestId('increase-quantity-button');
    fireEvent.click(increaseButton);

    await waitFor(() => {
      expect(cartApi.patchIncreaseQuantity).toHaveBeenCalledWith(mockCartItem);
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  it('수량 감소 버튼 클릭 시 API가 호출되고 refetch가 실행되어야 한다', async () => {
    renderComponent(mockCartItem, false);

    const decreaseButton = screen.getByTestId('decrease-quantity-button');
    fireEvent.click(decreaseButton);

    await waitFor(() => {
      expect(cartApi.patchDecreaseQuantity).toHaveBeenCalledWith(mockCartItem);
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  it('수량이 1일 때 감소 버튼 클릭 시 삭제 API가 호출되고 refetch가 실행되어야 한다', async () => {
    const oneQuantityItem = { ...mockCartItem, quantity: 1 };
    renderComponent(oneQuantityItem, false);

    const decreaseButton = screen.getByTestId('decrease-quantity-button');
    fireEvent.click(decreaseButton);

    await waitFor(() => {
      expect(cartApi.removeCartItem).toHaveBeenCalledWith(oneQuantityItem);
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  it('isLoading이 true일 때 버튼들이 비활성화되어야 한다', () => {
    vi.mocked(useData).mockImplementation(({ fetcher, name }) => {
      if (fetcher === cartApi.getCartItems && name === 'cartItems') {
        return {
          data: undefined,
          isLoading: true,
          error: null,
          refetch: mockRefetch,
        };
      }
      return {
        data: undefined,
        isLoading: false,
        error: null,
        refetch: vi.fn(),
      };
    });

    renderComponent(mockCartItem, true);

    const increaseButton = screen.getByTestId('increase-quantity-button');
    const decreaseButton = screen.getByTestId('decrease-quantity-button');

    expect(increaseButton).toBeDisabled();
    expect(decreaseButton).toBeDisabled();
  });
});
