import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ThemeProvider } from 'styled-components';

import { render, screen } from '@testing-library/react';

import ProductListItem from 'components/ProductListItem/ProductListItem.component';
import ShoppingCartListItem from 'components/ShoppingCartListItem/ShoppingCartListItem.component';

import rootReducer from 'redux/reducers';

import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';

const store = createStore(rootReducer);

function MockProvider({ children }) {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
}

const product = {
  id: 1,
  thumbnail: 'https://cdn-mart.baemin.com/sellergoods/bulk/20220502-173334/12619-main-01.jpg',
  name: '[든든] 전지베이컨 500g',
  price: 6390,
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
