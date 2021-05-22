import {
  fireEvent,
  getAllByLabelText,
  getByTestId,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import ShoppingCartPage from '.';
import store from '../../states/store';

describe('ShoppingCartPage', () => {
  test('장바구니에 담긴 상품들을 불러온다.', async () => {
    render(
      <Provider store={store}>
        <ShoppingCartPage />
      </Provider>
    );

    await waitFor(() => screen.getByText('test cart item name'));
  });

  test('상품의 수량을 증가시킬 수 있다.', async () => {
    render(
      <Provider store={store}>
        <ShoppingCartPage />
      </Provider>
    );

    const [$quantityInput] = await waitFor(() => screen.getAllByTestId('quantity-input'));
    const oldQuantity = $quantityInput.valueAsNumber;
    const [$increaseButton] = await waitFor(() => screen.getAllByTestId('increase-button'));
    fireEvent.click($increaseButton);

    await waitFor(() => expect($quantityInput.valueAsNumber).toEqual(oldQuantity + 1));
  });

  test('상품의 수량을 감소시킬 수 있다.', async () => {
    render(
      <Provider store={store}>
        <ShoppingCartPage />
      </Provider>
    );

    const [$quantityInput] = await screen.findAllByTestId('quantity-input');
    const oldQuantity = $quantityInput.valueAsNumber;
    const [$decreaseButton] = await screen.findAllByTestId('decrease-button');
    fireEvent.click($decreaseButton);

    await waitFor(() => expect($quantityInput.valueAsNumber).toEqual(oldQuantity - 1));
  });

  test('상품의 수량을 수정할 수 있다.', async () => {
    render(
      <Provider store={store}>
        <ShoppingCartPage />
      </Provider>
    );

    const [$quantityInput] = await waitFor(() => screen.getAllByTestId('quantity-input'));
    const oldQuantity = $quantityInput.valueAsNumber;

    fireEvent.change($quantityInput, { target: { value: oldQuantity + 10 } });
    fireEvent.focusOut($quantityInput);

    await waitFor(() => expect($quantityInput.valueAsNumber).toEqual(oldQuantity + 10));
  });

  test('상품을 삭제할 수 있다.', async () => {
    render(
      <Provider store={store}>
        <ShoppingCartPage />
      </Provider>
    );

    const [$cartItem] = await waitFor(() => screen.getAllByTestId('cart-item'));

    const itemId = $cartItem.dataset.testItemId;

    const $deleteButton = getByTestId($cartItem, 'delete-button');

    fireEvent.click($deleteButton);

    await waitForElementToBeRemoved(document.querySelector(`[data-test-item-id="${itemId}"]`));
  });

  test('상품을 일괄 선택할 수 있다.', async () => {
    render(
      <Provider store={store}>
        <ShoppingCartPage />
      </Provider>
    );

    const $selectAllCheckbox = await waitFor(() => screen.getByLabelText('전체선택'));
    fireEvent.click($selectAllCheckbox);

    await waitFor(() =>
      getAllByLabelText(document, '상품선택').forEach((checkbox) =>
        expect(checkbox.checked).toEqual($selectAllCheckbox.checked)
      )
    );
  });

  test('상품을 선택해서 일괄 삭제할 수 있다.', async () => {
    render(
      <Provider store={store}>
        <ShoppingCartPage />
      </Provider>
    );

    const $selectAllCheckbox = await waitFor(() => screen.getByLabelText('전체선택'));
    fireEvent.click($selectAllCheckbox);

    const $deleteSelectedItemButton = screen.getByText('상품삭제');
    fireEvent.click($deleteSelectedItemButton);

    await waitFor(() => expect(screen.queryAllByTestId('cart-item')).toHaveLength(0));
  });

  // test('주문하기 버튼내 수량은 선택된 상품만큼 변한다.', async () => {
  //   render(
  //     <Provider store={store}>
  //       <ShoppingCartPage />
  //     </Provider>
  //   );

  //   const $orderButton = await waitFor(() => screen.getByText(/주문하기/));

  //   const oldQuantityTextInButton = Number($orderButton.textContent.replace(/[^0-9]/g, ''));

  //   const $$boxes = getAllByLabelText(document, '상품선택').filter(($el) => $el.checked);

  //   fireEvent.click($$boxes[0]);

  //   // await waitFor(
  //   //   () =>
  //   //     expect(getAllByLabelText(document, '상품선택').filter(($el) => $el.checked)).toHaveLength(
  //   //       oldLength - 1
  //   //     ),
  //   //   { timeout: 5000 }
  //   // );

  //   await waitFor(() => {
  //     return expect(screen.getByText(/주문하기/).textContent).toBe(oldQuantityTextInButton - 1);
  //   });
  // });
});
