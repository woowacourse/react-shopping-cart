import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Product from 'templates/Product';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('컴포넌트 렌더 테스트', () => {
  const product = {
    imgSrc: 'https://cdn-mart.baemin.com/sellergoods/main/52afbaa7-809e-4e55-8080-3c357a94ba3a.gif',
    title: '배달이친구들 케이블타이',
    price: 4000,
  };
  test('상품 컴포넌트는 썸네일, 상품 이름, 가격, 장바구니 담기 버튼이 렌더해야 한다.', () => {
    render(<Product imgSrc={product.imgSrc} title={product.title} price={product.price} />);

    const productImg = screen.getAllByRole('img')[0];
    const addCartImg = screen.getAllByRole('img')[1];

    expect(screen.getByText(product.title));
    expect(screen.getByText(`${product.price.toLocaleString()}원`));
    expect(productImg.src).toContain(product.imgSrc);
    expect(addCartImg.src).toContain('/img/shopping-cart-black.png');
  });

  test('장바구니 담기 버튼을 클릭하면 상품이 장바구니에 추가되었는다는 모달을 보여줘야 한다.', () => {
    render(<Product imgSrc={product.imgSrc} title={product.title} price={product.price} />);

    const addCartImg = screen.getAllByRole('img')[1];
    fireEvent.click(addCartImg);

    expect(screen.getByText('장바구니에 상품이 담겼습니다.'));
  });

  test('장바구니 담기 버튼을 클릭혀면 상품 추가 요청을 보내야 한다.', () => {
    render(<Product imgSrc={product.imgSrc} title={product.title} price={product.price} />);

    const addCartImg = screen.getAllByRole('img')[1];
    fireEvent.click(addCartImg);

    expect(mockDispatch).toBeCalledWith({
      type: 'ADD_CART',
      payload: product,
    })
  });
});
