import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ShoppingCart } from "./shoppingCart";
import { MemoryRouter } from "react-router-dom";
import { server } from "../../mocks/server";
import { mockShoppingCartResponse } from "../../mocks/mockShoppingCartResponse";
import { getTotalPrice } from "../../utils/getTotalPrice/getTotalPrice";
import { CartItemTypes } from "../../types/cartItem";
import { resetCartItems } from "../../mocks/handlers";

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("장바구니 페이지 테스트", () => {
  beforeEach(() => {
    resetCartItems();
  });

  it("장바구니 삭제 버튼을 누르면 해당 제품이 삭제된다.", async () => {
    render(
      <MemoryRouter>
        <ShoppingCart />
      </MemoryRouter>
    );

    await waitFor(() => {
      const prevDeleteButtons = screen.getAllByText("삭제");
      expect(prevDeleteButtons.length).toBe(3);
      fireEvent.click(prevDeleteButtons[0]);
    });

    await waitFor(() => {
      const currentDeleteButtons = screen.getAllByText("삭제");
      expect(currentDeleteButtons.length).toBe(2);
    });
  });

  it("장바구니에 담긴 아이템의 수량을 감소시키면 주문 금액이 감소한다.", async () => {
    render(
      <MemoryRouter>
        <ShoppingCart />
      </MemoryRouter>
    );

    const selectedId = mockShoppingCartResponse.content.map((e) =>
      e.id.toString()
    );
    const prevTotalPrice = getTotalPrice({
      cartItems: mockShoppingCartResponse.content as CartItemTypes[],
      selectedCartId: selectedId,
    });

    const orderPrice = await screen.findByTestId("orderPrice");
    await waitFor(() => {
      expect(orderPrice.textContent).toBe(
        `${prevTotalPrice.toLocaleString("ko")}원`
      );
    });

    await waitFor(() => {
      const minusButtons = screen.getAllByTestId("quantity-minus-button");
      fireEvent.click(minusButtons[0]);

      const currentOrderPrice = screen.getByTestId("orderPrice");
      const currentTotalPrice =
        prevTotalPrice - mockShoppingCartResponse.content[0].product.price;

      expect(currentOrderPrice.textContent).toBe(
        `${currentTotalPrice.toLocaleString("ko")}원`
      );
    });
  });

  it("장바구니에 담긴 아이템의 수량을 증가시키면 주문 금액이 증가한다.", async () => {
    render(
      <MemoryRouter>
        <ShoppingCart />
      </MemoryRouter>
    );

    const selectedId = mockShoppingCartResponse.content.map((e) =>
      e.id.toString()
    );
    const prevTotalPrice = getTotalPrice({
      cartItems: mockShoppingCartResponse.content as CartItemTypes[],
      selectedCartId: selectedId,
    });

    const orderPrice = await screen.findByTestId("orderPrice");
    await waitFor(() => {
      expect(orderPrice.textContent).toBe(
        `${prevTotalPrice.toLocaleString("ko")}원`
      );
    });

    await waitFor(() => {
      const plusButtons = screen.getAllByTestId("quantity-plus-button");
      fireEvent.click(plusButtons[0]);

      const currentOrderPrice = screen.getByTestId("orderPrice");
      const currentTotalPrice =
        prevTotalPrice + mockShoppingCartResponse.content[0].product.price;

      expect(currentOrderPrice.textContent).toBe(
        `${currentTotalPrice.toLocaleString("ko")}원`
      );
    });
  });

  it("첫 렌더링시 전체 선택이 활성화 되어있고, 주문 금액이 모든 상품에 대한 주문금액이다.", async () => {
    render(
      <MemoryRouter>
        <ShoppingCart />
      </MemoryRouter>
    );

    await waitFor(() => {
      const allSelect = screen.getByTestId("select-all") as HTMLInputElement;
      expect(allSelect.checked).toEqual(true);
    });

    const selectedId = mockShoppingCartResponse.content.map((e) =>
      e.id.toString()
    );
    const prevTotalPrice = getTotalPrice({
      cartItems: mockShoppingCartResponse.content as CartItemTypes[],
      selectedCartId: selectedId,
    });

    const orderPrice = await screen.findByTestId("orderPrice");
    await waitFor(() => {
      expect(orderPrice.textContent).toBe(
        `${prevTotalPrice.toLocaleString("ko")}원`
      );
    });
  });

  it("체크박스 선택해제시, 주문 금액에서 해당 아이템의 금액이 차감된다.", async () => {
    render(
      <MemoryRouter>
        <ShoppingCart />
      </MemoryRouter>
    );

    const checkbox = (await screen.findByTestId(
      `select-all`
    )) as HTMLInputElement;
    screen.debug(checkbox);

    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });

    const item = mockShoppingCartResponse.content[0];
    const itemCheckbox = screen.getByTestId(
      `select-${item.id}`
    ) as HTMLInputElement;

    fireEvent.click(itemCheckbox);
    await waitFor(() => {
      expect(itemCheckbox).not.toBeChecked();
    });

    const selectedId = mockShoppingCartResponse.content
      .map((e) => e.id.toString())
      .filter((e) => e !== item.id.toString());

    const prevTotalPrice = getTotalPrice({
      cartItems: mockShoppingCartResponse.content as CartItemTypes[],
      selectedCartId: selectedId,
    });

    await waitFor(() => {
      const orderPrice = screen.getByTestId("orderPrice");
      expect(orderPrice.textContent).toBe(
        `${prevTotalPrice.toLocaleString("ko")}원`
      );
    });
  });
});
