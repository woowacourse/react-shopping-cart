import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react';
import ItemCard from '../src/components/ItemCard';
import useCartItems from '../src/hooks/useCartItems';
import { CartItem, Product } from '../src/types';

describe('ItemCard 테스트', () => {
  let product: Product, quantity: number, cartItem: CartItem;

  it('받아온 아이템에 대한 정보를 렌더링 한다 ', async () => {
    const { result } = renderHook(() => useCartItems());

    await waitFor(() => {
      const cartItems = result.current.cartItems;
      cartItem = cartItems[0];
      product = cartItem.product;
      quantity = cartItem.quantity;
    });

    render(
      <ItemCard
        product={product}
        quantity={quantity}
        increaseCartItemQuantity={() =>
          result.current.increaseCartItemQuantity(cartItem.id)
        }
        decreaseCartItemQuantity={() =>
          result.current.decreaseCartItemQuantity(cartItem.id)
        }
      />
    );

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(
      screen.getByText(product.price.toLocaleString() + '원')
    ).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', product.imageUrl);
    expect(screen.getByText(quantity)).toBeInTheDocument();
  });

  it('+ 버튼 클릭 시 수량이 증가한다.', async () => {
    const { result } = renderHook(() => useCartItems());

    await waitFor(() => {
      expect(result.current.cartItems.length).toBeGreaterThan(0);
    });

    cartItem = result.current.cartItems[0];
    product = cartItem.product;

    const { rerender } = render(
      <ItemCard
        product={product}
        quantity={cartItem.quantity}
        increaseCartItemQuantity={() =>
          result.current.increaseCartItemQuantity(cartItem.id)
        }
        decreaseCartItemQuantity={() =>
          result.current.decreaseCartItemQuantity(cartItem.id)
        }
      />
    );

    const currentQuantity = cartItem.quantity;
    const plusButton = screen.getByText('+');

    fireEvent.click(plusButton);

    await waitFor(() => {
      const updatedItem = result.current.cartItems.find(
        (item) => item.id === cartItem.id
      )!;
      expect(updatedItem.quantity).toBe(currentQuantity + 1);

      rerender(
        <ItemCard
          product={product}
          quantity={updatedItem.quantity}
          increaseCartItemQuantity={() =>
            result.current.increaseCartItemQuantity(cartItem.id)
          }
          decreaseCartItemQuantity={() =>
            result.current.decreaseCartItemQuantity(cartItem.id)
          }
        />
      );
    });

    expect(screen.getByText(currentQuantity + 1)).toBeInTheDocument();
  });

  it('- 버튼 클릭 시 수량이 감소한다.', async () => {
    const { result } = renderHook(() => useCartItems());

    await waitFor(() => {
      expect(result.current.cartItems.length).toBeGreaterThan(0);
    });

    cartItem = result.current.cartItems[0];
    product = cartItem.product;

    const { rerender } = render(
      <ItemCard
        product={product}
        quantity={cartItem.quantity}
        increaseCartItemQuantity={() =>
          result.current.increaseCartItemQuantity(cartItem.id)
        }
        decreaseCartItemQuantity={() =>
          result.current.decreaseCartItemQuantity(cartItem.id)
        }
      />
    );

    const currentQuantity = cartItem.quantity;
    const minusButton = screen.getByText('-');

    fireEvent.click(minusButton);

    await waitFor(() => {
      const updatedItem = result.current.cartItems.find(
        (item) => item.id === cartItem.id
      )!;
      expect(updatedItem.quantity).toBe(currentQuantity - 1);

      rerender(
        <ItemCard
          product={product}
          quantity={updatedItem.quantity}
          increaseCartItemQuantity={() =>
            result.current.increaseCartItemQuantity(cartItem.id)
          }
          decreaseCartItemQuantity={() =>
            result.current.decreaseCartItemQuantity(cartItem.id)
          }
        />
      );
    });

    expect(screen.getByText(currentQuantity - 1)).toBeInTheDocument();
  });
});
