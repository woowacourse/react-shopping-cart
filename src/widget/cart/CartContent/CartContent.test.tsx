import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CartContent from './CartContent';
import { CartProvider } from '@entities/cart';

let { mockCartItems } = vi.hoisted(() => {
  return {
    mockCartItems: [
      {
        id: 1,
        quantity: 2,
        product: {
          id: 2,
          name: '토마토',
          price: 10000,
          imageUrl: '2',
          category: '식료품',
          quantity: 5,
        },
      },
      {
        id: 2,
        quantity: 2,
        product: {
          id: 3,
          name: '우비',
          price: 100000,
          imageUrl: '1',
          category: '패션잡화',
          quantity: 5,
        },
      },
      {
        id: 3,
        quantity: 1,
        product: {
          id: 4,
          name: '써밋',
          price: 100000,
          imageUrl: '15',
          category: '패션잡화',
          quantity: 1,
        },
      },
    ],
  };
});

vi.mock('@entities/cart', () => ({
  getCartItems: vi.fn().mockImplementation(() => Promise.resolve([...mockCartItems])),
}));

vi.mock('@entities/cart', () => ({
  deleteCartItem: vi.fn().mockImplementation(({ id: cartItemId }) => {
    const cartItemIndex = mockCartItems.findIndex(({ id }) => id === Number(cartItemId));

    mockCartItems.splice(cartItemIndex, 1);
    return Promise.resolve();
  }),
}));

vi.mock('@entities/cart', () => ({
  updateCartItemQuantity: vi.fn().mockImplementation(({ id: cartItemId, quantity }) => {
    const cartItemIndex = mockCartItems.findIndex(({ id }) => id === Number(cartItemId));

    mockCartItems[cartItemIndex].quantity = quantity;
    return Promise.resolve();
  }),
}));

const originalCartItems = [...mockCartItems];

const expectAllItemsCheckedAfterAllCheck = (expectedState: 'checked' | 'unchecked') => {
  const list = screen.getByRole('list');
  expect(list).toBeInTheDocument();

  const items = within(list).getAllByRole('listitem');
  items.forEach((item) => {
    const checkBox = within(item).getByRole('button', { name: '상품 선택' });
    expect(checkBox).toBeInTheDocument();
    expect(checkBox).toHaveAttribute('name', expectedState);
  });
};

interface ExpectCartItemQuantityChangeParams {
  productIndex: number;
  buttonName: '추가' | '빼기';
  beforeExpected: string;
  afterExpected: string;
}

export const expectCartItemQuantityChange = async ({
  productIndex,
  buttonName,
  beforeExpected,
  afterExpected,
}: ExpectCartItemQuantityChangeParams) => {
  const list = screen.getByRole('list');
  expect(list).toBeInTheDocument();

  const product = within(list).getAllByRole('listitem')[productIndex];
  const button = within(product).getByRole('button', { name: `수량 1개 ${buttonName}` });
  const currentQuantity = within(product).getByTestId('current-cart-item-quantity');

  expect(currentQuantity.textContent).toBe(beforeExpected);

  fireEvent.click(button);

  await waitFor(() => {
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    const product = within(list).getAllByRole('listitem')[productIndex];
    const currentQuantity = within(product).getByTestId('current-cart-item-quantity');
    expect(currentQuantity.textContent).toBe(afterExpected);
  });
};

describe('CartPage의 CartContent', () => {
  beforeEach(() => {
    mockCartItems = [...originalCartItems];
  });

  it('장바구니에 담긴 상품(cartItems)이 없는 경우 장바구니에 담은 상품이 없습니다라는 텍스트가 렌더링된다.', async () => {
    mockCartItems = [];
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <CartProvider>
            <CartContent />
          </CartProvider>
        </MemoryRouter>,
      );
    });

    expect(screen.getByText('장바구니에 담은 상품이 없습니다.')).toBeInTheDocument();
  });

  it('장바구니에 상품이 3개 담겨 "현재 3종류의 상품이 담겨있습니다." 라는 안내 텍스트가 나온다.', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <CartProvider>
            <CartContent />
          </CartProvider>
        </MemoryRouter>,
      );
    });

    expect(screen.getByText('현재 3종류의 상품이 담겨있습니다.')).toBeInTheDocument();
  });

  it('첫 렌더링 시 전체 선택이 되어있어 모든 상품의 체크 박스가 체크되어 있다. ', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <CartProvider>
            <CartContent />
          </CartProvider>
        </MemoryRouter>,
      );
    });

    expectAllItemsCheckedAfterAllCheck('checked');
  });

  it('첫 렌더링 시 전체 선택이 되어있어 전체 선택 체크 박스를 클릭하면 모든 상품 선택 체크 해제된다.', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <CartProvider>
            <CartContent />
          </CartProvider>
        </MemoryRouter>,
      );
    });
    const allCheckBox = screen.getByRole('button', { name: '전체 선택' });
    fireEvent.click(allCheckBox);

    expectAllItemsCheckedAfterAllCheck('unchecked');
  });

  it('장바구니에 담긴 상품 목록이 렌더링된다.', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <CartProvider>
            <CartContent />
          </CartProvider>
        </MemoryRouter>,
      );
    });
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const items = within(list).getAllByRole('listitem');
    items.forEach((_, idx) => {
      expect(screen.getByText(mockCartItems[idx].product.name)).toBeInTheDocument();
    });
  });

  it('상품의 체크박스를 클릭하면 "checked" 상태에서 "unchecked"로 토글된다.', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <CartProvider>
            <CartContent />
          </CartProvider>
        </MemoryRouter>,
      );
    });
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const item = within(list).getAllByRole('listitem')[0];
    const checkBox = within(item).getByRole('button', { name: '상품 선택' });
    expect(checkBox).toHaveAttribute('name', 'checked');
    fireEvent.click(checkBox);
    expect(checkBox).toHaveAttribute('name', 'unchecked');
  });

  it('상품의 삭제 버튼을 누르면 장바구니(cartItems)에서 제거된다.', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <CartProvider>
            <CartContent />
          </CartProvider>
        </MemoryRouter>,
      );
    });
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(3);

    const firstItem = items[0];
    const removeButton = within(firstItem).getByRole('button', { name: '삭제' });
    fireEvent.click(removeButton);

    await waitFor(() => {
      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      const items = within(list).getAllByRole('listitem');
      expect(items).toHaveLength(2);
    });
  });

  it('장바구니에 "토마토" 상품이 2개가 담겨 있는데 증가 버튼을 클릭하면 3개가 된다.', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <CartProvider>
            <CartContent />
          </CartProvider>
        </MemoryRouter>,
      );
    });

    expectCartItemQuantityChange({
      productIndex: 0,
      buttonName: '추가',
      beforeExpected: '2',
      afterExpected: '3',
    });
  });

  it('장바구니에 "우비" 상품이 2개가 담겨 있는데 빼기 버튼을 클릭하면 1개가 된다.', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <CartProvider>
            <CartContent />
          </CartProvider>
        </MemoryRouter>,
      );
    });

    expectCartItemQuantityChange({
      productIndex: 1,
      buttonName: '빼기',
      beforeExpected: '2',
      afterExpected: '1',
    });
  });

  it('장바구니에 "써밋" 상품이 1개가 담겨 있는데 빼기 버튼을 클릭하면 장바구니에서 제거된다.', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <CartProvider>
            <CartContent />
          </CartProvider>
        </MemoryRouter>,
      );
    });

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const initialItems = within(list).getAllByRole('listitem');
    expect(initialItems).toHaveLength(3);
    expect(screen.getByText('써밋')).toBeInTheDocument();

    const product = within(list).getAllByRole('listitem')[2];
    const button = within(product).getByRole('button', { name: '장바구니에서 제거' });
    fireEvent.click(button);

    await waitFor(() => {
      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();

      const remainingItems = within(list).getAllByRole('listitem');
      expect(remainingItems).toHaveLength(2);

      expect(screen.queryByText('써밋')).not.toBeInTheDocument();
    });
  });

  it('주문 목록(orderList)이 비어있다면 주문 확인 버튼이 disabled 된다.', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <CartProvider>
            <CartContent />
          </CartProvider>
        </MemoryRouter>,
      );
    });

    const allCheckBox = screen.getByRole('button', { name: '전체 선택' });
    fireEvent.click(allCheckBox);

    await waitFor(() => {
      const orderConfirmButton = screen.getByRole('button', { name: '주문 확인' });
      expect(orderConfirmButton).toBeInTheDocument();
      expect(orderConfirmButton).toBeDisabled();
    });
  });
});
