import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react';
import ItemCard from '../src/components/ItemCard';
import useCartItems from '../src/hooks/useCartItems';
import { Product } from '../src/types';

describe('ItemCard 테스트', () => {
  let product: Product, quantity: number;

  beforeEach(async () => {
    const { result } = renderHook(() => useCartItems());

    await waitFor(() => {
      const cartItems = result.current.cartItems;
      product = cartItems[0].product;
      quantity = cartItems[0].quantity;
    });

    render(<ItemCard product={product} quantity={quantity} />);
  });

  it('받아온 아이템에 대한 정보를 렌더링 한다 ', () => {
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(
      screen.getByText(product.price.toLocaleString() + '원')
    ).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', product.imageUrl);
    expect(screen.getByText(quantity)).toBeInTheDocument();
  });

  it('+ 버튼을 누르면 상품 수량이 증가한다.', () => {
    const currentQuantity = quantity;
    const incrementButton = screen.getByText('+');
    fireEvent.click(incrementButton);
    expect(screen.getByText(currentQuantity + 1)).toBeInTheDocument();
  });

  it('- 버튼을 누르면 상품 수량이 감소한다.', () => {
    const currentQuantity = quantity;
    const decreaseButton = screen.getByText('-');
    fireEvent.click(decreaseButton);
    expect(screen.getByText(currentQuantity - 1)).toBeInTheDocument();
  });
});
