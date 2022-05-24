import { ThemeProvider } from 'styled-components';

import { render, screen } from '@testing-library/react';

import ProductListItem from 'components/ProductListItem/ProductListItem.component';
import ShoppingCartListItem from 'components/ShoppingCartListItem/ShoppingCartListItem.component';

import theme from 'styles/theme';

const mockDispatch = jest.fn();

const shoppingCart = [
  { id: 1, quantity: 3 },
  { id: 2, quantity: 5 },
];

const orderList = [1];

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: selector =>
    selector({
      shoppingCart: [...shoppingCart],
      orderList: [...orderList],
    }),
}));

function MockProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

const product = {
  id: 1,
  thumbnail: 'test1thumnail',
  name: 'testName1',
  price: 1000,
  quantity: 3,
};

describe('컴포넌트 렌더 테스트', () => {
  test('상품 컴포넌트는 썸네일, 상품 이름, 가격을 렌더해야 한다.', () => {
    render(
      <MockProvider>
        <ProductListItem {...product} />
      </MockProvider>
    );

    expect(screen.getByRole('img')).toHaveAttribute('src', product.thumbnailUrl);
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(`${product.price.toLocaleString()}원`)).toBeInTheDocument();
  });

  test('장바구니 상품 컴포넌트는 썸네일, 상품 이름, 가격, 수량을 렌더해야 한다.', () => {
    render(
      <MockProvider>
        <ShoppingCartListItem {...product} />
      </MockProvider>
    );

    expect(screen.getByRole('img')).toHaveAttribute('src', product.thumbnailUrl);
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(`${product.price.toLocaleString()}원`)).toBeInTheDocument();
    expect(screen.getByText(product.quantity)).toBeInTheDocument();
  });
});
