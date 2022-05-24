import { ThemeProvider } from 'styled-components';

import { fireEvent } from '@storybook/testing-library';
import { render, screen } from '@testing-library/react';

import ProductListItem from 'components/ProductListItem/ProductListItem.component';

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

const existProduct = {
  id: 1,
  thumbnail: 'test1thumnail',
  name: 'testName1',
  price: 1000,
  quantity: 3,
};

const newProduct = {
  id: 3,
  thumbnail: 'test3thumnail',
  name: 'testName3',
  price: 6000,
};

describe('장바구니 담기 기능 확인', () => {
  test('새로운 상품의 버튼을 눌렀을 때 장바구니 상품 추가 액션을 보내야한다.', () => {
    render(
      <MockProvider>
        <ProductListItem {...newProduct} />
      </MockProvider>
    );

    const cartButton = screen.getByRole('button');
    fireEvent.click(cartButton);

    expect(mockDispatch).toBeCalledWith({
      type: 'ADD_ITEM',
      payload: { id: newProduct.id },
    });
  });

  test('장바구니에 이미 존재하는 상품의 버튼을 눌렀을 때 장바구니 상품 삭제 액션을 보내야한다.', () => {
    render(
      <MockProvider>
        <ProductListItem {...existProduct} />
      </MockProvider>
    );

    const cartButton = screen.getByRole('button');
    fireEvent.click(cartButton);

    expect(mockDispatch).toBeCalledWith({
      type: 'DELETE_ITEM',
      payload: { id: existProduct.id },
    });
  });
});
