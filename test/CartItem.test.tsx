import CartItem from '../src/components/Cart/CartItem';
import * as cartApi from '../src/apis/cart';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { CartProduct } from '../src/types/cart';
import { DataProvider } from '../src/context/DataContext';

vi.mock('../src/apis/cart', () => ({
  getCartItems: vi.fn(),
  patchIncreaseQuantity: vi.fn(),
  patchDecreaseQuantity: vi.fn(),
  removeCartItem: vi.fn(),
}));

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

  const mockOnCheckChange = vi.fn();

  const renderComponent = (cartItem = mockCartItem, checked = true) => {
    return render(
      <DataProvider>
        <CartItem data={cartItem} checked={checked} onCheckChange={mockOnCheckChange} />
      </DataProvider>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (cartApi.getCartItems as jest.Mock).mockResolvedValue({ content: [] });
  });

  it('상품 정보가 올바르게 표시되어야 한다', () => {
    renderComponent();

    expect(screen.getByText('테스트 상품')).toBeInTheDocument();
    expect(screen.getByText('10,000원')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('수량 증가 버튼 클릭 시 API가 호출되어야 한다', async () => {
    renderComponent();

    const increaseButton = screen.getByText('＋');

    await act(async () => {
      fireEvent.click(increaseButton);
    });

    expect(cartApi.patchIncreaseQuantity).toHaveBeenCalledWith(mockCartItem);
  });

  it('수량 감소 버튼 클릭 시 API가 호출되어야 한다', async () => {
    renderComponent();

    const decreaseButton = screen.getByText('−');

    await act(async () => {
      fireEvent.click(decreaseButton);
    });

    expect(cartApi.patchDecreaseQuantity).toHaveBeenCalledWith(mockCartItem);
  });

  it('수량이 1일 때 감소 버튼 클릭 시 삭제 API가 호출되어야 한다', async () => {
    const oneQuantityItem = { ...mockCartItem, quantity: 1 };
    renderComponent(oneQuantityItem);

    const decreaseButton = screen.getByText('−');

    await act(async () => {
      fireEvent.click(decreaseButton);
    });

    expect(cartApi.removeCartItem).toHaveBeenCalledWith(oneQuantityItem);
  });

  it('삭제 버튼 클릭 시 삭제 API가 호출되어야 한다', async () => {
    renderComponent();

    const deleteButton = screen.getByText('삭제');

    await act(async () => {
      fireEvent.click(deleteButton);
    });

    expect(cartApi.removeCartItem).toHaveBeenCalledWith(mockCartItem);
  });

  it('체크박스 클릭 시 onCheckChange가 호출되어야 한다', async () => {
    renderComponent();

    // data-id로 체크박스 찾기
    const checkbox = screen.getByRole('checkbox', { hidden: true });

    await act(async () => {
      fireEvent.click(checkbox);
    });

    expect(mockOnCheckChange).toHaveBeenCalled();
  });
});
