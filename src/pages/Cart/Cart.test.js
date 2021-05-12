import React from 'react';
import Cart from './';
import { render, fireEvent, waitFor, within } from '../../test-utils';
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
      {
        id: 2,
        name: '[든든] 진맛살 1kg',
        image: 'https://cdn-mart.baemin.com/goods/custom/20200525/11157-main-01.png',
        price: 7100,
        quantity: 1,
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

  it('감소 버튼을 누르면 수가 1씩 감소하고, 해당 상품의 가격과 총 금액에 1개 만큼의 금액이 감소하고, 총 금액이 변화한다.', () => {
    const utils = render(<Cart />, { initialState });
    const number = utils.getByRole('spinbutton', {
      name: /\[든든\] 유부 슬라이스 500g 수량 변경 입력/i,
    });
    const subButton = utils.getByRole('button', {
      name: /\[든든\] 유부 슬라이스 500g 수량 변경 1개 감소/i,
    });
    const price = utils.getByLabelText('[든든] 유부 슬라이스 500g 합산 가격');
    const totalPrice = utils.getByLabelText('결제예상금액');

    fireEvent.click(subButton);
    expect(number.value).toBe('3');
    expect(price).toHaveTextContent('14,700 원');
    expect(totalPrice).toHaveTextContent('21,800원');
  });

  it('증가 버튼을 누르면 수가 1씩 증가하고, 해당 상품의 가격과 총 금액에 1개 만큼의 금액이 증가하고, 총 금액이 변화한다.', () => {
    const utils = render(<Cart />, { initialState });
    const number = utils.getByRole('spinbutton', {
      name: /\[든든\] 유부 슬라이스 500g 수량 변경 입력/i,
    });
    const addButton = utils.getByRole('button', {
      name: /\[든든\] 유부 슬라이스 500g 수량 변경 1개 증가/i,
    });
    const price = utils.getByLabelText('[든든] 유부 슬라이스 500g 합산 가격');
    const totalPrice = utils.getByLabelText('결제예상금액');

    fireEvent.click(addButton);
    expect(number.value).toBe('5');
    expect(price).toHaveTextContent('24,500 원');
    expect(totalPrice).toHaveTextContent('31,600원');
  });

  it('수량 입력 칸에 20을 입력할 시, 수량이 20이 되고, 해당 상품 가격과 총 금액이 변화한다.', () => {
    const utils = render(<Cart />, { initialState });
    const number = utils.getByRole('spinbutton', {
      name: /\[든든\] 유부 슬라이스 500g 수량 변경 입력/i,
    });
    const price = utils.getByLabelText('[든든] 유부 슬라이스 500g 합산 가격');
    const totalPrice = utils.getByLabelText('결제예상금액');

    fireEvent.change(number, { target: { value: 20 } });
    expect(number.value).toBe('20');
    expect(price).toHaveTextContent('98,000 원');
    expect(totalPrice).toHaveTextContent('105,100원');
  });

  it('장바구니 삭제 버튼 클릭 시, 해당 아이템이 삭제된다.', async () => {
    const utils = render(<Cart />, { initialState });
    const deleteButton = utils.getByRole('button', {
      name: /\[든든\] 유부 슬라이스 500g 삭제/i,
    });
    const totalPrice = utils.getByLabelText('결제예상금액');
    const confirmSpy = jest.spyOn(window, 'confirm');
    confirmSpy.mockImplementation(jest.fn(() => true));

    expect(totalPrice).toHaveTextContent('26,700원');
    fireEvent.click(deleteButton);
    expect(confirmSpy).toBeCalled();

    await waitFor(() => expect(totalPrice).toHaveTextContent('7,100원'));
  });

  it('장바구니 상품에 있는 모든 상품의 checked 상태가 true일 때 선택 해제 라벨이 보여진다.', () => {
    const utils = render(<Cart />, { initialState });
    const listOptionMenu = utils.getByLabelText('상품선택 옵션 메뉴');
    const checkOptionLabel = within(listOptionMenu).getByRole('checkbox');

    expect(checkOptionLabel).toHaveTextContent('선택해제');
    expect(checkOptionLabel).toBeChecked();
  });
});
