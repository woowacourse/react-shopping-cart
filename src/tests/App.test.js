import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Product from 'templates/Product';

import { products } from 'mocks/product';
import { cartProducts } from 'mocks/cart';
import { getProductList } from 'apis/product';
import { getCartList } from 'apis/cart';

const mockNavigate = jest.fn();
const mockSelector = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('react-redux', () => ({
  useSelector: () => mockSelector,
  useDispatch: () => mockDispatch,
}));

const productsServer = setupServer(
  rest.get('/mocking/products', (req, res, ctx) => {
    return res(ctx.json(products));
  }),
);

const cartServer = setupServer(
  rest.get('/mocking/cart', (req, res, ctx) => {
    return res(ctx.json(cartProducts));
  }),
);

describe('상품 페이지 테스트', () => {
  beforeAll(() => {
    productsServer.listen();
  });

  afterEach(() => {
    productsServer.resetHandlers();
  });

  afterAll(() => {
    productsServer.close();
  });

  const product = {
    product_img_src:
      'https://cdn-mart.baemin.com/sellergoods/main/52afbaa7-809e-4e55-8080-3c357a94ba3a.gif',
    product_title: '배달이친구들 케이블타이',
    product_price: 4000,
  };

  test('상품 컴포넌트는 썸네일, 상품 이름, 가격, 장바구니 담기 버튼이 렌더해야 한다.', async () => {
    render(
      <Product
        product_img_src={product.product_img_src}
        product_title={product.product_title}
        product_price={product.product_price}
      />,
    );

    const productImg = screen.getAllByRole('img')[0];
    const addCartImg = screen.getAllByRole('img')[1];

    expect(screen.getByText(product.product_title));
    expect(screen.getByText(`${product.product_price.toLocaleString()}원`));
    expect(productImg.src).toContain(product.product_img_src);
    expect(addCartImg.src).toContain('/img/shopping-cart-black.png');
  });

  test('상품 정보를 불러올 떄 상품 정보 요청을 보내야 한다.', async () => {
    await getProductList()(mockDispatch);

    expect(mockDispatch).toBeCalledWith({
      type: 'GET_PRODUCT_SUCCESS',
      products,
    });
  });
});

describe('장바구니 페이지 테스트', () => {
  beforeAll(() => {
    cartServer.listen();
  });

  afterEach(() => {
    cartServer.resetHandlers();
  });

  afterAll(() => {
    cartServer.close();
  });

  test('장바구니 페이지에 들어가면 장바구니 목록에 대한 요청을 보내야 한다.', async () => {
    await getCartList()(mockDispatch);

    expect(mockDispatch).toBeCalledWith({
      type: 'GET_PRODUCT_CART_SUCCESS',
      cartProducts,
    });
  });
});
