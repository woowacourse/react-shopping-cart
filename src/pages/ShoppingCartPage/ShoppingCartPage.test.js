import {
  fireEvent,
  getAllByLabelText,
  getByLabelText,
  getByTestId,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { nextTick } from 'process';
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

    const [$quantityInput] = await waitFor(() => screen.getAllByTestId('quantity-input'));
    const oldQuantity = $quantityInput.valueAsNumber;
    const [$decreaseButton] = await waitFor(() => screen.getAllByTestId('decrease-button'));
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

    const $selectAllCheckbox = await waitFor(() => screen.getByLabelText('선택해제'));
    fireEvent.click($selectAllCheckbox);

    const $$checkboxes = await waitFor(() => getAllByLabelText(document, '상품선택'));

    $$checkboxes.forEach(($checkbox) => {
      expect($checkbox.checked).toEqual($selectAllCheckbox.checked);
    });
  });
});
