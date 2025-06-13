import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, beforeEach, describe, it, expect } from 'vitest';

import * as cartApi from '@/features/Cart/api/cart';
import { CartPage } from '@/features/Cart/pages/CartPage';
import { mockCartItems } from './Cart.data';
import { CartProvider } from '@/features/Cart/context/CartProvider';
import { expensiveCartItems, twoQtyCartItems } from './Cart.data';

export const createTestCartItems = (): typeof mockCartItems => {
  return mockCartItems.map((item) => ({
    ...item,
    product: { ...item.product },
  }));
};

export const renderCartPage = () =>
  render(
    <CartProvider>
      <CartPage />
    </CartProvider>
  );

vi.mock('@/features/Cart/api/cart');
const mockCartApi = vi.mocked(cartApi);

describe('장바구니 테스트', () => {
  let user: ReturnType<typeof userEvent.setup>;
  let currentCartItems: typeof mockCartItems;

  beforeEach(() => {
    user = userEvent.setup();
    vi.clearAllMocks();
    localStorage.clear();
    currentCartItems = createTestCartItems();
  });

  describe('성공 케이스', () => {
    it('장바구니 상품이 존재하면 목록을 보여준다.', async () => {
      mockCartApi.getCartItemList.mockResolvedValue([...currentCartItems]);

      renderCartPage();

      const items = await screen.findAllByRole('cart-item');
      expect(items).toHaveLength(currentCartItems.length);
    });

    it('장바구니가 비어 있으면 안내 메시지를 보여준다.', async () => {
      mockCartApi.getCartItemList.mockResolvedValue([]);

      renderCartPage();

      const emptyText = await screen.findByText(/장바구니가 비어있습니다\.?$/);
      expect(emptyText).toBeInTheDocument();
    });

    it('금액이 10만원 이하이면 배송비 3000원을 보여준다.', async () => {
      mockCartApi.getCartItemList.mockResolvedValue([...currentCartItems]);
      renderCartPage();

      const fee = within(await screen.findByTestId('delivery-fee')).getByText('3,000원');
      expect(fee).toBeInTheDocument();
    });

    it('금액이 10만원 이상이면 배송비 0원을 보여준다.', async () => {
      mockCartApi.getCartItemList.mockResolvedValue(expensiveCartItems);
      renderCartPage();

      const deliveryFees = await screen.findAllByText('0원');
      expect(deliveryFees.length).toBeGreaterThan(0);
    });

    it('+ 버튼 클릭 시 수량이 증가한다.', async () => {
      mockCartApi.getCartItemList.mockResolvedValue([...currentCartItems]);

      mockCartApi.updateCartItem.mockImplementation(async ({ cartId, newQuantity }) => {
        currentCartItems = currentCartItems.map((item) =>
          item.id === cartId ? { ...item, quantity: newQuantity } : item
        );

        mockCartApi.getCartItemList.mockResolvedValue([...currentCartItems]);
        return Promise.resolve();
      });

      renderCartPage();

      const plusButtons = await screen.findAllByRole('plus-button');
      const initialQuantity = currentCartItems[0].quantity;

      await user.click(plusButtons[0]);

      expect(mockCartApi.updateCartItem).toHaveBeenCalledWith({
        cartId: currentCartItems[0].id,
        newQuantity: initialQuantity + 1,
      });

      expect(await screen.findByText((initialQuantity + 1).toString())).toBeInTheDocument();
    });

    it('- 버튼 클릭 시 수량이 감소한다.', async () => {
      mockCartApi.getCartItemList.mockResolvedValue(twoQtyCartItems);

      mockCartApi.updateCartItem.mockImplementation(async ({ cartId, newQuantity }) => {
        twoQtyCartItems[0].quantity = newQuantity;
        mockCartApi.getCartItemList.mockResolvedValue([...twoQtyCartItems]);
        return Promise.resolve();
      });

      renderCartPage();

      const minusButtons = await screen.findAllByRole('minus-button');

      await user.click(minusButtons[0]);

      expect(mockCartApi.updateCartItem).toHaveBeenCalledWith({
        cartId: twoQtyCartItems[0].id,
        newQuantity: 1,
      });

      expect(await screen.findByText('1')).toBeInTheDocument();
    });

    it('수량이 1일 때 - 버튼을 클릭해도 수량은 줄어들지 않는다.', async () => {
      currentCartItems = currentCartItems.map((item, index) => ({
        ...item,
        quantity: index === 0 ? 1 : item.quantity,
      }));

      mockCartApi.getCartItemList.mockResolvedValue([...currentCartItems]);
      mockCartApi.updateCartItem.mockClear();

      renderCartPage();

      const minusButtons = await screen.findAllByRole('minus-button');
      await user.click(minusButtons[0]);

      expect(mockCartApi.updateCartItem).not.toHaveBeenCalled();
    });

    it('전체 선택 해제 시 총 금액이 0원이 된다.', async () => {
      mockCartApi.getCartItemList.mockResolvedValue([...mockCartItems]);

      renderCartPage();

      const allCheck = await screen.findByRole('all-check');
      await user.click(allCheck);

      expect(screen.getByText('0원')).toBeInTheDocument();
    });

    it('개별 체크박스를 클릭하면 선택 상태가 변경된다.', async () => {
      mockCartApi.getCartItemList.mockResolvedValue([...currentCartItems]);
      renderCartPage();

      const cartItem = (await screen.findAllByRole('cart-item'))[0];
      const checkbox = within(cartItem).getByRole('checkbox');

      await user.click(checkbox);

      expect(checkbox).toBeDefined();
    });

    it('삭제 버튼 클릭 시 상품이 삭제된다.', async () => {
      mockCartApi.getCartItemList.mockResolvedValue([...currentCartItems]);

      mockCartApi.deleteCartItem.mockImplementation(async (cartId) => {
        currentCartItems = currentCartItems.filter((item) => item.id !== cartId);
        mockCartApi.getCartItemList.mockResolvedValue([...currentCartItems]);
        return Promise.resolve();
      });

      renderCartPage();

      const deleteButtons = await screen.findAllByRole('button', { name: /삭제$/ });
      const firstName = currentCartItems[0].product.name;

      await user.click(deleteButtons[0]);

      await screen.findByRole('cart-item');

      expect(screen.queryByText(firstName)).not.toBeInTheDocument();
    });
  });

  describe('실패 케이스', () => {
    it('삭제 API 실패 시 상품이 사라지지 않는다.', async () => {
      mockCartApi.getCartItemList.mockResolvedValue([...currentCartItems]);
      mockCartApi.deleteCartItem.mockRejectedValue(new Error('삭제 실패'));

      renderCartPage();

      const deleteButtons = await screen.findAllByRole('button', { name: /삭제$/ });
      await user.click(deleteButtons[0]);

      expect(await screen.findByText('상품1')).toBeInTheDocument();
    });

    it('수량 증가 API 실패 시 수량이 변하지 않는다.', async () => {
      mockCartApi.getCartItemList.mockResolvedValue([...currentCartItems]);
      mockCartApi.updateCartItem.mockRejectedValue(new Error('증가 실패'));

      renderCartPage();

      const plusButtons = await screen.findAllByRole('plus-button');
      const quantityEls = await screen.findAllByRole('cart-item-quantity');
      const initialQuantity = currentCartItems[0].quantity;

      await user.click(plusButtons[0]);

      expect(quantityEls[0]).toHaveTextContent(initialQuantity.toString());
    });

    it('수량 감소 API 실패 시 수량이 변하지 않는다.', async () => {
      mockCartApi.getCartItemList.mockResolvedValue([...currentCartItems]);
      mockCartApi.updateCartItem.mockRejectedValue(new Error('감소 실패'));

      renderCartPage();

      const minusButtons = await screen.findAllByRole('minus-button');
      const quantityEls = await screen.findAllByRole('cart-item-quantity');
      const initialQuantity = currentCartItems[0].quantity;

      await user.click(minusButtons[0]);

      expect(quantityEls[0]).toHaveTextContent(initialQuantity.toString());
    });

    it('전체 선택 해제 실패 시 상태가 유지된다.', async () => {
      mockCartApi.getCartItemList.mockResolvedValue([...currentCartItems]);

      renderCartPage();

      const allCheck = await screen.findByRole('all-check');
      await user.click(allCheck);

      const quantityEls = await screen.findAllByRole('cart-item-quantity');
      expect(quantityEls).not.toHaveLength(0);
    });
  });
});
