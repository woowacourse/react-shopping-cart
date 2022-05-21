import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import store from 'store';
import ProductItem from 'components/ProductItem';
import CartProductItem from 'components/CartProductItem';
import noImage from 'assets/no_image.png';

const TestProvider = ({ children }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={children} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

describe('1 컴포넌트 렌더 테스트', () => {
  test('상품 컴포넌트는 썸네일, 상품 이름, 가격, 장바구니 버튼을 렌더해야 한다.', () => {
    // given
    const product = {
      id: 0,
      thumbnail: noImage,
      name: '테스트 상품',
      price: 30000,
    };

    // when
    render(
      <TestProvider>
        <ProductItem
          id={product.id}
          thumbnail={product.thumbnail}
          name={product.name}
          price={product.price}
        />
      </TestProvider>,
    );

    // then
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(`${product.price.toLocaleString('ko-KR')}원`)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', product.thumbnail);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('장바구니 상품 컴포넌트는 체크박스, 썸네일, 상품 이름, 가격, 카운터, 삭제 버튼을 렌더해야 한다.', () => {
    // given
    const product = {
      thumbnail: 'https://storybook.takealook.kr/image/potato.jpg',
      name: '감자',
      price: 50000,
      id: 0,
      isChecked: () => true,
      handleItemCount: () => {},
    };

    // when
    render(
      <TestProvider>
        <CartProductItem
          id={product.id}
          thumbnail={product.thumbnail}
          name={product.name}
          price={product.price}
          isChecked={product.isChecked}
          handleItemCount={product.handleItemCount}
        />
      </TestProvider>,
    );

    // then
    expect(screen.getByText('✔')).toBeInTheDocument();
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(`${product.price.toLocaleString('ko-KR')}원`)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', product.thumbnail);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });
});
