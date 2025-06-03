import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from '../CartItem';

const mockCartData = {
  id: 1,
  product: {
    id: 1,
    name: '테스트 상품',
    price: 10000,
    imageUrl: 'https://example.com/image.jpg',
    category: '테스트 카테고리',
  },
  quantity: 1,
};

describe('CartItem', () => {
  const defaultProps = {
    cartData: mockCartData,
    updateCartItem: jest.fn(),
    increaseCartItem: jest.fn(),
    justifyIsChecked: jest.fn(),
    controlCheckBox: jest.fn(),
    removeCartItem: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    defaultProps.updateCartItem.mockResolvedValue(undefined);
    defaultProps.increaseCartItem.mockResolvedValue(undefined);
    defaultProps.removeCartItem.mockResolvedValue(undefined);
  });

  it('상품 정보가 올바르게 표시되어야 한다', () => {
    render(<CartItem {...defaultProps} />);

    expect(screen.getByText('테스트 상품')).toBeInTheDocument();

    expect(screen.getByText('10,000원')).toBeInTheDocument();

    const productImage = screen.getByRole('img', { name: '테스트 상품' });
    expect(productImage).toHaveAttribute(
      'src',
      'https://example.com/image.jpg'
    );
  });

  it('체크박스를 통해 상품을 선택할 수 있어야 한다', () => {
    defaultProps.justifyIsChecked.mockReturnValue(false);
    const { rerender } = render(<CartItem {...defaultProps} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(defaultProps.controlCheckBox).toHaveBeenCalledWith(mockCartData.id);

    defaultProps.justifyIsChecked.mockReturnValue(true);
    rerender(<CartItem {...defaultProps} />);

    expect(checkbox).toBeChecked();
  });

  it('체크박스가 체크된 상태에서 다시 클릭하면 체크가 해제되어야 한다', () => {
    defaultProps.justifyIsChecked.mockReturnValue(true);
    const { rerender } = render(<CartItem {...defaultProps} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);

    expect(defaultProps.controlCheckBox).toHaveBeenCalledWith(mockCartData.id);

    defaultProps.justifyIsChecked.mockReturnValue(false);
    rerender(<CartItem {...defaultProps} />);

    expect(checkbox).not.toBeChecked();
  });

  it('삭제 버튼을 통해 상품을 삭제할 수 있어야 한다', () => {
    render(<CartItem {...defaultProps} />);

    const deleteButton = screen.getByRole('button', { name: '삭제' });
    fireEvent.click(deleteButton);

    expect(defaultProps.removeCartItem).toHaveBeenCalledWith(mockCartData.id);
  });

  describe('수량 조절', () => {
    it('수량 증가 버튼을 클릭하면 수량이 1 증가해야 한다', () => {
      const { rerender } = render(<CartItem {...defaultProps} />);

      expect(screen.getByText('1')).toBeInTheDocument();

      const increaseButton = screen.getByRole('button', { name: '+' });
      fireEvent.click(increaseButton);

      expect(defaultProps.increaseCartItem).toHaveBeenCalledWith(
        mockCartData.id,
        2
      );

      const updatedCartData = { ...mockCartData, quantity: 2 };
      rerender(
        <CartItem {...{ ...defaultProps, cartData: updatedCartData }} />
      );

      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.queryByText('1')).not.toBeInTheDocument();
    });

    it('수량이 2 이상일 때 감소 버튼을 클릭하면 수량이 1 감소해야 한다', () => {
      const cartDataWithQuantity3 = { ...mockCartData, quantity: 3 };
      const { rerender } = render(
        <CartItem {...{ ...defaultProps, cartData: cartDataWithQuantity3 }} />
      );

      expect(screen.getByText('3')).toBeInTheDocument();

      const decreaseButton = screen.getByRole('button', { name: '-' });
      fireEvent.click(decreaseButton);

      expect(defaultProps.updateCartItem).toHaveBeenCalledWith(mockCartData.id);

      const updatedCartData = { ...mockCartData, quantity: 2 };
      rerender(
        <CartItem {...{ ...defaultProps, cartData: updatedCartData }} />
      );

      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.queryByText('3')).not.toBeInTheDocument();
    });

    it('수량이 1일 때 감소 버튼을 클릭하면 상품이 삭제되어야 한다', () => {
      render(<CartItem {...defaultProps} />);

      expect(screen.getByText('1')).toBeInTheDocument();

      const decreaseButton = screen.getByRole('button', { name: '-' });
      fireEvent.click(decreaseButton);

      expect(defaultProps.updateCartItem).toHaveBeenCalledWith(mockCartData.id);
    });

    it('수량 표시가 정확해야 한다', () => {
      const testCases = [
        { quantity: 1, expected: '1' },
        { quantity: 5, expected: '5' },
        { quantity: 10, expected: '10' },
      ];

      testCases.forEach(({ quantity, expected }) => {
        const cartDataWithQuantity = { ...mockCartData, quantity };
        const { unmount } = render(
          <CartItem {...{ ...defaultProps, cartData: cartDataWithQuantity }} />
        );

        expect(screen.getByText(expected)).toBeInTheDocument();

        unmount();
      });
    });
  });
});
