import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, beforeEach } from 'vitest';

import * as cartApi from '@/api/cart';
import { CartPage } from '@/features/Cart/pages/CartPage';

import { cartItems } from './Cart.data';

export const createTestCartItems = (): ReadonlyArray<Readonly<(typeof cartItems)[0]>> => {
  return cartItems.map((item) => ({
    ...item,
    product: { ...item.product },
  })) as ReadonlyArray<Readonly<(typeof cartItems)[0]>>;
};

export const renderCartPage = () => render(<CartPage />);

vi.mock('@/api/cart');
const mockCartApi = vi.mocked(cartApi);

describe('장바구니 목록을 렌더링 한다.', () => {
  let user: ReturnType<typeof userEvent.setup>;
  let currentCartItems: typeof cartItems;

  beforeEach(() => {
    user = userEvent.setup();
    vi.clearAllMocks();
    currentCartItems = createTestCartItems();
  });
  it('장바구니 페이지에 진입했을 때, 상품이 존재한다면 목록을 보여준다.', async () => {
    // Given: 장바구니 페이지를 렌더링한다.
    // When: 장바구니 페이지에 삭제 버튼이 존재한다는 것은 상품이 존재한다는 것이다.
    mockCartApi.getCartItemList.mockImplementation(async () => {
      return Promise.resolve([...currentCartItems]);
    });

    renderCartPage();
    const cartButton = await screen.findAllByRole('cart-item');

    // Then: cartButton의 개수가 1개 이상이어야 한다.
    expect(cartButton.length).toBe(currentCartItems.length);
  });

  it('장바구니 페이지에 진입했을 때, 상품이 존재하지 않는다면 빈 장바구니 메시지를 보여준다.', async () => {
    mockCartApi.getCartItemList.mockResolvedValue([]);

    renderCartPage();

    const emptyText = await screen.findByText(/장바구니가 비어있습니다\.?$/);
    expect(emptyText).toBeInTheDocument();
  });

  it('장바구니 상품의 금액이 10만원 이하이라면, 배송비가 3000원임을 보여준다.', async () => {
    mockCartApi.getCartItemList.mockImplementation(async () => {
      return Promise.resolve([...currentCartItems]);
    });

    renderCartPage();

    const deliveryFee = await screen.findByText('3,000원');
    expect(deliveryFee).toBeInTheDocument();
  });

  it('장바구니 상품의 금액이 10만원 이상이라면, 배송비가 0원임을 보여준다.', async () => {
    const highPriceItems = currentCartItems.map((item) => ({
      ...item,
      isChecked: true,
      product: { ...item.product, price: 50000 },
    }));

    mockCartApi.getCartItemList.mockImplementation(async () => {
      return Promise.resolve([...highPriceItems]);
    });

    renderCartPage();

    const deliveryFee = await screen.findByText('0원');
    expect(deliveryFee).toBeInTheDocument();
  });

  it('장바구니 상품의 + 버튼을 통해 수량을 증가시킬 수 있다.', async () => {
    mockCartApi.getCartItemList.mockImplementation(async () => {
      return Promise.resolve([...currentCartItems]);
    });

    mockCartApi.updateCartItem.mockImplementation(async ({ cartId, newQuantity }) => {
      currentCartItems = currentCartItems.map((item) =>
        item.id === cartId ? Object.freeze({ ...item, quantity: newQuantity }) : item
      ) as ReadonlyArray<(typeof currentCartItems)[0]>;
      return Promise.resolve();
    });

    renderCartPage();

    const plusButton = await screen.findAllByRole('plus-button');
    const initialQuantity = currentCartItems[0].quantity;

    await user.click(plusButton[0]);

    // API가 올바르게 호출되었는지 확인
    expect(mockCartApi.updateCartItem).toHaveBeenCalledWith({
      cartId: currentCartItems[0].id,
      newQuantity: initialQuantity + 1,
    });

    // 업데이트된 수량이 화면에 표시되는지 확인
    expect(screen.getByText((initialQuantity + 1).toString())).toBeInTheDocument();
  });

  it('장바구니 상품의 - 버튼을 통해 수량을 감소시킬 수 있다.', async () => {
    mockCartApi.getCartItemList.mockImplementation(async () => {
      return Promise.resolve([...currentCartItems]);
    });

    mockCartApi.updateCartItem.mockImplementation(async ({ cartId, newQuantity }) => {
      currentCartItems = currentCartItems.map((item) =>
        item.id === cartId ? Object.freeze({ ...item, quantity: newQuantity }) : item
      ) as ReadonlyArray<(typeof currentCartItems)[0]>;
      return Promise.resolve();
    });

    renderCartPage();

    const checkButton = await screen.findAllByRole('minus-button');
    const cartItemQuantity = await screen.findAllByRole('cart-item-quantity');
    const initialQuantity = currentCartItems[0].quantity;

    expect(cartItemQuantity[0]).toBeInTheDocument();

    await user.click(checkButton[0]);

    expect(mockCartApi.updateCartItem).toHaveBeenCalledWith({
      cartId: currentCartItems[0].id,
      newQuantity: initialQuantity - 1,
    });

    expect(cartItemQuantity[0]).toHaveTextContent((initialQuantity - 1).toString());
  });

  it('페이지에 첫 렌더링 후 전체 선책 체크박스 클릭시 해당 상품이 모두 해제되며 구매 금액은 0원이 된다.', async () => {
    mockCartApi.getCartItemList.mockImplementation(async () => {
      return Promise.resolve([...cartItems]);
    });

    renderCartPage();

    const allButtons = await screen.findAllByRole('all-check');

    await user.click(allButtons[0]);

    expect(screen.getByText('0원')).toBeInTheDocument();
  });

  it('체크박스 클릭시 해당 상품의 선택 상태가 변경된다.', async () => {
    mockCartApi.getCartItemList.mockImplementation(async () => {
      return Promise.resolve([...currentCartItems]);
    });

    renderCartPage();

    // 첫 번째 cart-item 찾기
    const cartItems = await screen.findAllByRole('cart-item');
    const firstCartItem = cartItems[0];

    // 해당 cart-item 내의 체크박스 찾기
    const checkbox = within(firstCartItem).getByRole('checkbox');
    const initialCheckedState = currentCartItems[0].isChecked; // true

    await user.click(checkbox);

    expect(!initialCheckedState).toBeFalsy();
  });

  it('삭제 버튼 클릭 시 장바구니에서 해당 상품이 삭제된다.', async () => {
    mockCartApi.getCartItemList.mockImplementation(async () => {
      return Promise.resolve([...currentCartItems]);
    });

    mockCartApi.deleteCartItem.mockImplementation(async (cartId) => {
      currentCartItems = currentCartItems.filter((item) => item.id !== cartId);
      return Promise.resolve();
    });

    renderCartPage();

    const deleteButtons = await screen.findAllByRole('button', { name: /삭제$/ });
    const firstDeleteButton = deleteButtons[0];
    const firstItemId = currentCartItems[0].id;
    const firstItemName = currentCartItems[0].product.name;

    await user.click(firstDeleteButton);

    expect(mockCartApi.deleteCartItem).toHaveBeenCalledWith(firstItemId);

    // 삭제된 상품이 화면에서 사라졌는지 확인
    expect(screen.queryByText(firstItemName)).not.toBeInTheDocument();
  });

  it('주문 확인 버튼을 클릭했을 때, 정보를 집약해서 보여준다.', async () => {
    renderCartPage();
    mockCartApi.getCartItemList.mockImplementation(async () => {
      return Promise.resolve([...currentCartItems]);
    });

    const orderButton = await screen.findByRole('button', { name: /주문확인/ });
    const cartItemLength = currentCartItems.filter((item) => item.isChecked).length;

    const totalQuantity = currentCartItems.reduce(
      (acc, item) => acc + (item.isChecked ? item.quantity : 0),
      0
    );

    await user.click(orderButton);

    expect(screen.getByText('결제하기')).toBeInTheDocument();

    expect(
      screen.getByText(
        `총 ${cartItemLength}종류의 상품 ${totalQuantity}개를 주문합니다. 최종 결제 금액을 확인해 주세요.`
      )
    ).toBeInTheDocument();
    expect(screen.getByText(`총 결제 금액 50,000원`)).toBeInTheDocument();
  });
});
