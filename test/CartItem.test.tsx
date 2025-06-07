import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import CartItem from '../src/components/Cart/CartItem';
import { CartProduct } from '../src/types/cart';
import * as cartApi from '../src/apis/cart';
import { DataProvider } from '../src/context/DataContext';

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

  const mockSetCheckedItems = vi.fn();

  const renderComponent = (cartItem = mockCartItem) => {
    return render(
      <DataProvider>
        <CartItem cartItem={cartItem} checkedItems={[1]} setCheckedItems={mockSetCheckedItems} />
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
});
