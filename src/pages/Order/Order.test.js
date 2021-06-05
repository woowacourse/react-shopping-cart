import React from 'react';
import ItemList from '.';
import { render, fireEvent, waitFor, screen } from '../../test-utils';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import API from '../../request/api';

const initialState = {
  cartReducer: {
    cart: [
      {
        id: 1,
        cartIdList: [2, 3, 4],
        name: '[든든] 유부 슬라이스 500g',
        image: 'https://cdn-mart.baemin.com/goods/custom/20200525/11153-main-01.png',
        price: 4900,
        quantity: 4,
        checked: true,
      },
    ],
  },
};

describe('상품목록 페이지', () => {
  beforeEach(() => {
    API.purchase = jest.fn().mockReturnValue(true);
    API.deleteCartItem = jest.fn().mockReturnValue(true);

    render(
      <Router>
        <ItemList />
      </Router>,
      { initialState },
    );
  });

  it('결제 버튼 클릭 시 주문하시겠습니까? 창이 나타나고, 확인을 누를시 주문 정보 페이지로 이동한다.', async () => {
    const purchaseButton = screen.getByRole('button', {
      name: /19,600원 주문하기/i,
    });
    const alertSpy = jest.spyOn(window, 'alert');
    alertSpy.mockImplementation(jest.fn(() => true));

    fireEvent.click(purchaseButton);

    await waitFor(() => expect(window.location.pathname).toBe('/mymart/order'));
  });
});
