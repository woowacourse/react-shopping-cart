import {describe, it, vi, beforeEach, Mock} from 'vitest';
import {screen, render, waitFor} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import '@testing-library/jest-dom';
import {ProductsResponse} from '../type/products';
import {CartProduct} from '../type/cart';
import * as cartAPI from '../api/cart/getCartProduct';
import CartList from '../pages/CartList';
import {CartItemsProvider} from '../provider/cartItemsProvider';
import {ErrorProvider} from '../provider/errorProvider';

vi.mock('../api/cart/getCartProduct', () => ({
  getCartProduct: vi.fn(),
}));

const mockCartItems: Pick<ProductsResponse<CartProduct>, 'content'> = {
  content: [
    {
      id: 1234,
      product: {
        category: '식료품',
        id: 1,
        name: '이름',
        price: 1000,
        quantity: 50,
        imageUrl: `/image.png`,
      },
      quantity: 3,
    },
    {
      id: 1235,
      product: {
        category: '패션 잡화',
        id: 2,
        name: '이름',
        price: 2000,
        quantity: 50,
        imageUrl: `/image-png`,
      },
      quantity: 5,
    },
  ],
};

const mockEmpty = {content: []};

describe('장바구니 페이지 로딩 테스트', () => {
  beforeEach(() => {
    (cartAPI.getCartProduct as Mock).mockResolvedValue(mockCartItems);
  });

  it('장바구니 데이터를 불러오면 장바구니 리스트를 보여준다.', async () => {
    render(
      <ErrorProvider>
        <CartItemsProvider>
          <MemoryRouter>
            <CartList />
          </MemoryRouter>
        </CartItemsProvider>
      </ErrorProvider>
    );
    await waitFor(() => {
      const cartList = screen.getByTestId('cart-list');
      expect(cartList.children.length).toBe(2);
    });
  });

  it('진입 시, 전체 선택이 되어 있다.', async () => {
    render(
      <ErrorProvider>
        <CartItemsProvider>
          <MemoryRouter>
            <CartList />
          </MemoryRouter>
        </CartItemsProvider>
      </ErrorProvider>
    );

    await waitFor(() => {
      const allSelected = screen.getByTestId('all-selected');
      expect(allSelected).toBeChecked();
    });
  });
});

describe('장바구니가 비었을 때 페이지 전환 테스트', () => {
  it('장바구니에 담긴 데이터가 없으면 상품 없음 페이지를 보여준다.', async () => {
    (cartAPI.getCartProduct as Mock).mockResolvedValue(mockEmpty);

    render(
      <ErrorProvider>
        <CartItemsProvider>
          <MemoryRouter>
            <CartList />
          </MemoryRouter>
        </CartItemsProvider>
      </ErrorProvider>
    );
    await waitFor(() => {
      const emptyPage = screen.getByTestId('empty-page');
      expect(emptyPage).toHaveTextContent('장바구니에 담은 상품이 없습니다.');
    });
  });
});
