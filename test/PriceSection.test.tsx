import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import CartItemsProvider from '../src/contexts/CartItemsProvider';
import CartPage from '../src/pages/CartPage';
import { mockCartItems } from './mocks';
import getOrderPrice from '../src/utils/getOrderPrice';
import getIdsFromCartItems from '../src/utils/getIdsFromCartItems';

describe('PriceSection 컴포넌트 테스트', () => {
  beforeEach(async () => {
    render(
      <CartItemsProvider>
        <CartPage />
      </CartItemsProvider>
    );
  });

  describe('OrderPrice 컴포넌트', () => {
    it('현재 장바구니 목록을 바탕으로 주문금액을 표시한다', async () => {
      const totalPrice = getOrderPrice(
        mockCartItems,
        getIdsFromCartItems(mockCartItems)
      );
      const orderPriceElement = screen.getByTestId('주문 금액');
      await waitFor(() => {
        expect(orderPriceElement).toHaveTextContent(
          totalPrice.toLocaleString() + '원'
        );
      });
    });

    it('선택된 상품이 없을 때, 주문 금액은 0원이다', async () => {
      const allCheckSection = screen.getByTestId('allCheckSection');
      const allCheckBox = within(allCheckSection).getByTestId('checkBox');
      fireEvent.click(allCheckBox);

      const orderPriceElement = screen.getByTestId('주문 금액');

      await waitFor(() => {
        expect(orderPriceElement).toHaveTextContent('0원');
      });
    });
  });

  describe('DeliveryPrice 컴포넌트', () => {
    it('주문 금액이 100,000 이상일 경우 0원이다', async () => {
      const deliveryPriceElement = screen.getByTestId('배송비');

      await waitFor(() => {
        expect(deliveryPriceElement).toHaveTextContent('0원');
      });
    });

    it('주문 금액이 100,000 미만일 경우 3,000원이다', async () => {
      const deliveryPriceElement = screen.getByTestId('배송비');
      const itemCards = await screen.findAllByTestId('item-card');
      const firstItemCheckBox = within(itemCards[0]).getByTestId('checkBox');
      fireEvent.click(firstItemCheckBox);

      await waitFor(() => {
        expect(deliveryPriceElement).toHaveTextContent('3,000원');
      });
    });

    it('주문 금액이 0원이면 0원이다', async () => {
      const allCheckSection = screen.getByTestId('allCheckSection');
      const allCheckBox = within(allCheckSection).getByTestId('checkBox');
      fireEvent.click(allCheckBox);

      const deliveryPriceElement = screen.getByTestId('배송비');
      await waitFor(() => {
        expect(deliveryPriceElement).toHaveTextContent('0원');
      });
    });
  });

  describe('TotalPrice 컴포넌트', () => {
    it('주문 금액과 배송비를 합산하여 총 금액을 표시한다', async () => {
      const orderPriceElement = screen.getByTestId('주문 금액');
      const deliveryPriceElement = screen.getByTestId('배송비');

      const orderPrice = parseInt(
        orderPriceElement.textContent?.replace(/[^0-9]/g, '') ?? '0'
      );
      const deliveryPrice = parseInt(
        deliveryPriceElement.textContent?.replace(/[^0-9]/g, '') ?? '0'
      );
      const totalPriceElement = screen.getByTestId('총 결제 금액');

      await waitFor(() => {
        expect(totalPriceElement).toHaveTextContent(
          (orderPrice + deliveryPrice).toLocaleString() + '원'
        );
      });
    });
  });
});
