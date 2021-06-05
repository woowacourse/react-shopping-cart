import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductList from '.';
import * as hooks from '../../hooks/useFetch';
import API from '../../request/api';

const itemList = [
  {
    product_id: 1,
    name: '[든든] 유부 슬라이스 500g',
    image_url: 'https://cdn-mart.baemin.com/goods/custom/20200525/11153-main-01.png',
    price: 4900,
  },
  {
    product_id: 2,
    name: '[든든] 진맛살 1kg',
    image_url: 'https://cdn-mart.baemin.com/goods/custom/20200525/11157-main-01.png',
    price: 7100,
  },
  {
    product_id: 3,
    name: '[든든] 신-키리모찌 1kg',
    image_url: 'https://cdn-mart.baemin.com/goods/custom/20200525/11161-main-01.png',
    price: 12000,
  },
  {
    product_id: 4,
    name: '[든든] 흑곤약 250g',
    image_url: 'https://cdn-mart.baemin.com/goods/custom/20200525/11263-main-01.png',
    price: 1300,
  },
  {
    product_id: 5,
    name: '[든든] 흑곤약 1.2kg',
    image_url: 'https://cdn-mart.baemin.com/goods/custom/20200525/11277-main-01.png',
    price: 4000,
  },
  {
    product_id: 6,
    name: '[든든] 곤약말이 시라타끼 200g',
    image_url: 'https://cdn-mart.baemin.com/goods/custom/20200525/11280-main-01.png',
    price: 1100,
  },
  {
    product_id: 7,
    name: '[든든] 기분 시로가마보코 160g',
    image_url: 'https://cdn-mart.baemin.com/goods/custom/20200525/11315-main-01.png',
    price: 2800,
  },
  {
    product_id: 8,
    name: '[든든] 냉동조미유부삼각 (60장) 1kg',
    image_url: 'https://cdn-mart.baemin.com/goods/custom/20200525/11323-main-01.png',
    price: 8400,
  },
  {
    product_id: 9,
    name: '[든든] 시노다마끼 유부야채말이 (15g*40입) 600g',
    image_url: 'https://cdn-mart.baemin.com/goods/custom/20200525/11328-main-01.png',
    price: 9000,
  },
  {
    product_id: 10,
    name: '[든든] 기분 오뎅세트 433g',
    image_url: 'https://cdn-mart.baemin.com/goods/custom/20200525/11331-main-01.png',
    price: 8900,
  },
];

const addCartAPIReturnValue = {
  cart_id: 1,
  product_id: 2,
  name: '[든든] 진맛살 1kg',
  image_url: 'https://cdn-mart.baemin.com/goods/custom/20200525/11157-main-01.png',
  price: 7100,
};

describe('상품목록 페이지', () => {
  beforeEach(() => {
    hooks.default = jest.fn().mockReturnValue([itemList, null]);
    API.addItemToCart = jest.fn().mockReturnValue(addCartAPIReturnValue);

    render(
      <Router>
        <ProductList />
      </Router>,
    );
  });

  it('장바구니 버튼 클릭시, 장바구니에 상품이 추가되었습니다. 가 뜬다.', async () => {
    const cartButton = screen.getByRole('button', {
      name: /\[든든\] 진맛살 1kg을 장바구니에 담기/i,
    });

    fireEvent.click(cartButton);

    const alertSpy = jest.spyOn(window, 'alert');
    alertSpy.mockImplementation(jest.fn(() => true));
    await waitFor(() => expect(alertSpy).toBeCalled());
  });

  it('아이템 이미지 클릭 시, "/goods/detail/${id}"로 이동한다.', () => {
    const itemImage = screen.getByRole('img', {
      name: /\[든든\] 유부 슬라이스 500g/i,
    });

    fireEvent.click(itemImage);
    expect(window.location.href).toBe('http://localhost/goods/detail/1');
  });
});
