import React from 'react';
import Cart from './';
import { render, fireEvent } from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';

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
    itemList: [],
    orderList: [],
  },
};

describe('<Cart />', () => {
  it('matches snapshot', () => {
    const utils = render(<Cart />, { initialState });

    expect(utils.container).toMatchSnapshot();
  });

  it('감소 버튼을 누르면 수가 1씩 감소하고, 해당 상품의 가격과 총 금액에 1개 만큼의 금액이 감소한다.', () => {
    const utils = render(<Cart />, { initialState });
    const number = utils.getByRole('spinbutton', {
      name: /\[든든\] 유부 슬라이스 500g 수량 변경 입력/i,
    });
    const subButton = utils.getByRole('button', {
      name: /\[든든\] 유부 슬라이스 500g 수량 변경 1개 감소/i,
    });
    const price = utils.getByLabelText('[든든] 유부 슬라이스 500g 합산 가격');

    fireEvent.click(subButton);
    expect(number.value).toBe('3');
    expect(price).toHaveTextContent('14,700 원');
  });

  it('증가 버튼을 누르면 수가 1씩 증가하고, 해당 상품의 가격과 총 금액에 1개 만큼의 금액이 증가한다.', () => {
    const utils = render(<Cart />, { initialState });
    const number = utils.getByRole('spinbutton', {
      name: /\[든든\] 유부 슬라이스 500g 수량 변경 입력/i,
    });
    const addButton = utils.getByRole('button', {
      name: /\[든든\] 유부 슬라이스 500g 수량 변경 1개 증가/i,
    });
    const price = utils.getByLabelText('[든든] 유부 슬라이스 500g 합산 가격');

    fireEvent.click(addButton);
    expect(number.value).toBe('5');
    expect(price).toHaveTextContent('24,500 원');
  });

  it('수량 입력 칸에 20을 입력할 시, 수량이 20이 되고, 해당 상품 가격과 총 금액이 변화한다.', () => {
    const utils = render(<Cart />, { initialState });
    const number = utils.getByRole('spinbutton', {
      name: /\[든든\] 유부 슬라이스 500g 수량 변경 입력/i,
    });
    const price = utils.getByLabelText('[든든] 유부 슬라이스 500g 합산 가격');

    fireEvent.change(number, { target: { value: 20 } });
    expect(number.value).toBe('20');
    expect(price).toHaveTextContent('98,000 원');
  });
});
