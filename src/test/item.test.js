import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {ThemeProvider} from 'styled-components';

import Item from 'components/Item';
import theme from 'theme/theme';

const mockNavigate = jest.fn();
const mockDispatch = jest.fn();
const mockSelector = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  Link: 'Link',
}));

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector,
}));

describe('Item 컴포넌트 렌더 테스트', () => {
  test('상품 컴포넌트는 상품명, 가격, 이미지를 렌더한다.', () => {
    const product = {
      itemImgURL: 'https://cdn-mart.baemin.com/sellergoods/bulk/20200730-181623/14254-main-01.jpg',
      itemName: '방울토마토',
      itemPrice: 3000,
      id: 1,
      disabled: true,
    };

    render(
      <ThemeProvider theme={theme}>
        <Item {...product} />
      </ThemeProvider>,
    );

    expect(screen.getByText(product.itemName)).toBeInTheDocument();
    expect(screen.getByText(`${product.itemPrice.toLocaleString()}원`)).toBeInTheDocument();
  });
});
