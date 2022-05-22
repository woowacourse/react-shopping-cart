import { render, screen } from '@testing-library/react';
import ProductListItem from 'components/ProductListItem/ProductListItem.component';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';

describe('컴포넌트 렌더 테스트', () => {
  test('상품 컴포넌트는 썸네일, 상품 이름, 가격, 장바구니 담기 버튼을 렌더해야 한다.', () => {
    // given
    const product = {
      id: 1,
      thumbnail: 'https://cdn-mart.baemin.com/sellergoods/bulk/20220502-173334/12619-main-01.jpg',
      name: '[든든] 전지베이컨 500g',
      price: 6390,
    };
    const handleToggleShoppingCart = jest.fn();

    // when
    render(
      <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <ProductListItem
            {...product}
            isContained="false"
            handleToggleShoppingCart={handleToggleShoppingCart}
          />
        </ThemeProvider>
      </>
    );

    // then
    expect(screen.getByRole('img')).toHaveAttribute('src', product.thumbnailUrl);
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(`${product.price.toLocaleString()}원`)).toBeInTheDocument();
  });
});
