import React from 'react';
import ItemList from '.';
import { render, fireEvent, waitFor } from '../../test-utils';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

const initialState = {
  cartReducer: {
    cart: [
      {
        id: 1,
        name: '[든든] 유부 슬라이스 500g',
        image: 'https://cdn-mart.baemin.com/goods/custom/20200525/11153-main-01.png',
        price: 4900,
        quantity: 4,
        checked: true,
      },
    ],
  },
  reducer: {
    itemList: [
      {
        id: 1,
        name: '[든든] 유부 슬라이스 500g',
        image: 'https://cdn-mart.baemin.com/goods/custom/20200525/11153-main-01.png',
        price: 4900,
      },
      {
        id: 2,
        name: '[든든] 진맛살 1kg',
        image: 'https://cdn-mart.baemin.com/goods/custom/20200525/11157-main-01.png',
        price: 7100,
      },
      {
        id: 3,
        name: '[든든] 신-키리모찌 1kg',
        image: 'https://cdn-mart.baemin.com/goods/custom/20200525/11161-main-01.png',
        price: 12000,
      },
      {
        id: 4,
        name: '[든든] 흑곤약 250g',
        image: 'https://cdn-mart.baemin.com/goods/custom/20200525/11263-main-01.png',
        price: 1300,
      },
      {
        id: 5,
        name: '[든든] 흑곤약 1.2kg',
        image: 'https://cdn-mart.baemin.com/goods/custom/20200525/11277-main-01.png',
        price: 4000,
      },
      {
        id: 6,
        name: '[든든] 곤약말이 시라타끼 200g',
        image: 'https://cdn-mart.baemin.com/goods/custom/20200525/11280-main-01.png',
        price: 1100,
      },
      {
        id: 7,
        name: '[든든] 기분 시로가마보코 160g',
        image: 'https://cdn-mart.baemin.com/goods/custom/20200525/11315-main-01.png',
        price: 2800,
      },
      {
        id: 8,
        name: '[든든] 냉동조미유부삼각 (60장) 1kg',
        image: 'https://cdn-mart.baemin.com/goods/custom/20200525/11323-main-01.png',
        price: 8400,
      },
      {
        id: 9,
        name: '[든든] 시노다마끼 유부야채말이 (15g*40입) 600g',
        image: 'https://cdn-mart.baemin.com/goods/custom/20200525/11328-main-01.png',
        price: 9000,
      },
      {
        id: 10,
        name: '[든든] 기분 오뎅세트 433g',
        image: 'https://cdn-mart.baemin.com/goods/custom/20200525/11331-main-01.png',
        price: 8900,
      },
    ],
    orderList: [],
  },
};

describe('상품목록 페이지', () => {
  it('store에 있는 products가 제대로 렌더링 되는지 확인한다.', () => {
    const utils = render(<ItemList />, { initialState });

    expect(utils.container).toMatchSnapshot();
  });

  // it('장바구니 버튼 클릭시, 장바구니에 상품이 추가되었습니다. 가 뜬다.', async () => {
  //   const utils = render(<ItemList />, { initialState });
  //   const cartButton = utils.getByRole('button', {
  //     name: /\[든든\] 진맛살 1kg을 장바구니에 담기/i,
  //   });

  //   fireEvent.click(cartButton);

  //   const alertSpy = jest.spyOn(window, 'alert');
  //   alertSpy.mockImplementation(jest.fn(() => true));
  //   await waitFor(() => expect(alertSpy).toBeCalled());
  // });

  it('아이템 이미지 클릭 시, "/goods/detail/?id=${id}"로 이동한다.', () => {
    const utils = render(
      <Router>
        <ItemList />
      </Router>,
      { initialState },
    );
    const itemImage = utils.getByRole('img', {
      name: /\[든든\] 유부 슬라이스 500g/i,
    });

    fireEvent.click(itemImage);
    expect(window.location.href).toBe('http://localhost/goods/detail/?id=1');
  });
});
