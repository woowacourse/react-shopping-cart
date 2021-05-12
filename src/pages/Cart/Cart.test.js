import React from 'react';
import Cart from './';
import { render, fireEvent, waitFor, within } from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';
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

const initialStateWithNotChecked = {
  cartReducer: {
    cart: [
      {
        id: 1,
        name: '[든든] 유부 슬라이스 500g',
        image: 'https://cdn-mart.baemin.com/goods/custom/20200525/11153-main-01.png',
        price: 4900,
        quantity: 4,
        checked: false,
      },
      {
        id: 2,
        name: '[든든] 진맛살 1kg',
        image: 'https://cdn-mart.baemin.com/goods/custom/20200525/11157-main-01.png',
        price: 7100,
        quantity: 1,
        checked: false,
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
    expect(price.textContent).toBe('14,700원');
    expect(totalPrice.textContent).toBe('21,800원');
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
    expect(price.textContent).toBe('24,500원');
    expect(totalPrice.textContent).toBe('31,600원');
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
    expect(price.textContent).toBe('98,000원');
    expect(totalPrice.textContent).toBe('105,100원');
  });

  // it('장바구니 삭제 버튼 클릭 시, 해당 아이템이 삭제된다.', async () => {
  //   const utils = render(<Cart />, { initialState });
  //   const deleteButton = utils.getByRole('button', {
  //     name: /\[든든\] 유부 슬라이스 500g 삭제/i,
  //   });
  //   const totalPrice = utils.getByLabelText('결제예상금액');
  //   const confirmSpy = jest.spyOn(window, 'confirm');
  //   confirmSpy.mockImplementation(jest.fn(() => true));

  //   expect(totalPrice.textContent).toBe('26,700원');
  //   fireEvent.click(deleteButton);
  //   expect(confirmSpy).toBeCalled();

  //   await waitFor(() => expect(totalPrice.textContent).toBe('7,100원'));
  // });

  it('장바구니 상품에 있는 모든 상품의 checked 상태가 true일 때 선택 해제 라벨이 보여진다.', () => {
    const utils = render(<Cart />, { initialState });
    const listOptionMenu = utils.getByLabelText('상품선택 옵션 메뉴');
    const checkOptionLabel = within(listOptionMenu).getByRole('checkbox');

    expect(checkOptionLabel.textContent).toBe('선택해제');
    expect(checkOptionLabel).toBeChecked();
  });

  it('선택 해제 라벨을 클릭 시, 라벨 이름 전체선택으로 변경, 모든 상품 checked 해제, 결제 예상금액 0원으로 변경된다.', () => {
    const utils = render(<Cart />, { initialState });
    const listOptionMenu = utils.getByLabelText('상품선택 옵션 메뉴');
    const checkOptionLabel = within(listOptionMenu).getByRole('checkbox');
    const totalPrice = utils.getByLabelText('결제예상금액');
    const productList = utils.getByLabelText('장바구니 상품 목록');
    const checkBoxes = within(productList).getAllByRole('checkbox');

    fireEvent.click(checkOptionLabel);

    expect(checkOptionLabel.textContent).toBe('전체선택');
    expect(checkOptionLabel).not.toBeChecked();
    checkBoxes.forEach(checkbox => expect(checkbox).not.toBeChecked());
    expect(totalPrice.textContent).toBe('0원');
  });

  it('전체 선택 라벨을 클릭 시, 라벨 이름 선택해제로 변경, 모든 상품 checked 설정, 결제 예상금액이 알맞게 변경된다.', () => {
    const utils = render(<Cart />, { initialState: initialStateWithNotChecked });
    const listOptionMenu = utils.getByLabelText('상품선택 옵션 메뉴');
    const checkOptionLabel = within(listOptionMenu).getByRole('checkbox');
    const totalPrice = utils.getByLabelText('결제예상금액');
    const productList = utils.getByLabelText('장바구니 상품 목록');
    const checkBoxes = within(productList).getAllByRole('checkbox');

    fireEvent.click(checkOptionLabel);

    expect(checkOptionLabel.textContent).toBe('선택해제');
    expect(checkOptionLabel).toBeChecked();
    checkBoxes.forEach(checkbox => expect(checkbox).toBeChecked());
    expect(totalPrice.textContent).toBe('26,700원');
  });

  it('모든 상품이 선택해제되어 있을 때 상품삭제버튼과, 결제버튼이 비활성화 된다.', () => {
    const utils = render(<Cart />, { initialState: initialStateWithNotChecked });
    const deleteButton = utils.getByRole('button', { name: /상품 삭제/i });
    const purchaseButton = utils.getByRole('button', { name: /주문하기\(0개\)/i });

    expect(deleteButton).toBeDisabled();
    expect(purchaseButton).toBeDisabled();
  });

  it('상품이 2개이상일 때 1개만 선택 되어 있으면 1개 선택 라벨이 보여진다.', () => {
    const utils = render(<Cart />, { initialState: initialStateWithNotChecked });
    const listOptionMenu = utils.getByLabelText('상품선택 옵션 메뉴');
    const checkOptionLabel = within(listOptionMenu).getByRole('checkbox');
    const productList = utils.getByLabelText('장바구니 상품 목록');
    const checkBoxes = within(productList).getAllByRole('checkbox');

    fireEvent.click(checkBoxes[0]);

    expect(checkOptionLabel.textContent).toBe('1개 선택');
    expect(checkOptionLabel).not.toBeChecked();
  });

  it('상품이 2개일 때, 1개가 선택되어있을 시 1개 선택 라벨을 누르면 모든 상품의 checked 상태가 true가 된다.', () => {
    const utils = render(<Cart />, { initialState: initialStateWithNotChecked });
    const listOptionMenu = utils.getByLabelText('상품선택 옵션 메뉴');
    const checkOptionLabel = within(listOptionMenu).getByRole('checkbox');
    const productList = utils.getByLabelText('장바구니 상품 목록');
    const checkBoxes = within(productList).getAllByRole('checkbox');

    fireEvent.click(checkBoxes[0]);

    expect(checkOptionLabel.textContent).toBe('1개 선택');
    expect(checkOptionLabel).not.toBeChecked();

    fireEvent.click(checkOptionLabel);

    expect(checkOptionLabel.textContent).toBe('선택해제');
    expect(checkOptionLabel).toBeChecked();
    checkBoxes.forEach(checkbox => expect(checkbox).toBeChecked());
  });

  // it('상품 삭제 버튼 클릭 시, 선택되어 있는 아이템이 삭제된다.', async () => {
  //   const utils = render(<Cart />, { initialState: initialStateWithNotChecked });
  //   const deleteButton = utils.getByRole('button', { name: /상품 삭제/i });

  //   const productList = utils.getByLabelText('장바구니 상품 목록');
  //   const [targetItemCheckbox] = within(productList).getAllByRole('checkbox');
  //   const productNames = within(productList)
  //     .getAllByRole('heading')
  //     .map(heading => heading.textContent);
  //   const [productListHeading, targetProductName] = productNames;
  //   const confirmSpy = jest.spyOn(window, 'confirm');
  //   confirmSpy.mockImplementation(jest.fn(() => true));

  //   fireEvent.click(targetItemCheckbox);
  //   fireEvent.click(deleteButton);
  //   expect(confirmSpy).toBeCalled();

  //   await waitFor(() => {
  //     const names = within(productList)
  //       .getAllByRole('heading')
  //       .map(heading => heading.textContent);
  //     expect(names[0]).toBe('배송상품 (1개)');
  //     expect(names.includes(targetProductName)).toBe(false);
  //   });
  // });

  it('결제 버튼 클릭 시 주문/결제 페이지로 이동한다.', () => {
    const utils = render(
      <Router>
        <Cart />
      </Router>,
      { initialState },
    );
    const purchaseButton = utils.getByRole('button', { name: /주문하기\(2개\)/i });

    fireEvent.click(purchaseButton);

    expect(window.location.href).toBe('http://localhost/order');
  });
});
