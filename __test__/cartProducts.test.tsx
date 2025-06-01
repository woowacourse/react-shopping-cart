import { describe, it, vi, beforeEach, Mock } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import * as cartAPI from "../src/api/cart/getCartProduct";
import { createMemoryRouter, MemoryRouter, RouterProvider } from "react-router";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Confirm from "../src/pages/Confirm";
import NavBar from "../src/components/layout/NavBar";
import Main from "../src/pages/Main";
import { formatPrice } from "../src/utils/formatPrice";
import { CartProduct } from "../src/type/cart";

vi.mock("../src/api/cart/getCartProduct", () => ({
  getCartProduct: vi.fn(),
}));
const mockCartItems = {
  content: [
    {
      id: 1234,
      product: {
        category: "식료품",
        id: 1,
        name: "이름",
        price: 1000,
        quantity: 50,
        imageUrl: `/image.png`,
      },
      quantity: 3,
    },
    {
      id: 1235,
      product: {
        category: "패션 잡화",
        id: 2,
        name: "이름",
        price: 2000,
        quantity: 50,
        imageUrl: `/image-png`,
      },
      quantity: 5,
    },
  ],
};

const mockEmpty = { content: [] };

describe("장바구니 페이지 로딩 테스트", () => {
  beforeEach(() => {
    (cartAPI.getCartProduct as Mock).mockResolvedValue(mockCartItems);
  });

  it("장바구니 데이터를 불러오면 장바구니 리스트를 보여준다.", async () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );
    await waitFor(() => {
      const cartList = screen.getByTestId("cart-list");
      expect(cartList.children.length).toBe(2);
    });
  });

  it("진입 시, 전체 선택이 되어 있다.", async () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    await waitFor(() => {
      const allSelected = screen.getByTestId("all-selected");
      expect(allSelected).toBeChecked();
    });
  });
});

describe("장바구니가 비었을 때 페이지 전환 테스트", () => {
  it("장바구니에 담긴 데이터가 없으면 상품 없음 페이지를 보여준다.", async () => {
    (cartAPI.getCartProduct as Mock).mockResolvedValue(mockEmpty);

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );
    await waitFor(() => {
      const emptyPage = screen.getByTestId("empty-page");
      expect(emptyPage).toHaveTextContent("장바구니에 담은 상품이 없습니다.");
    });
  });
});

describe("주문확인 페이지 로딩 테스트", () => {
  beforeEach(() => {
    (cartAPI.getCartProduct as Mock).mockResolvedValue(mockCartItems);
  });

  it("주문 확인 버튼 클릭 후 설명 문구 표시", async () => {
    const sort = mockCartItems.content.length;
    const getOrderPrice = () => {
      return (
        mockCartItems.content?.reduce(
          (total: number, current: CartProduct) =>
            current.product.price * current.quantity + total,
          0
        ) ?? 0
      );
    };
    const orderPrice = getOrderPrice();
    const deliveryPrice = orderPrice >= 100_000 ? 0 : 3000;
    const totalPrice = orderPrice + deliveryPrice;
    const totalAmount = mockCartItems.content.reduce(
      (total: number, current: CartProduct) => total + current.quantity,
      0
    );

    const routes = [
      {
        path: "/",
        element: <NavBar />,
        children: [
          { path: "", element: <Main /> },
          { path: "confirm", element: <Confirm /> },
        ],
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });
    render(<RouterProvider router={router} />);

    const orderConfirmBtn = await screen.findByTestId("order-confirm-button");
    await userEvent.click(orderConfirmBtn);

    await waitFor(() => {
      const description = screen.getByTestId("order-confirm-description");
      expect(description).toHaveTextContent(
        `총 ${sort}종류의 상품 ${totalAmount}개를 주문합니다. 최종 결제 금액을 확인해 주세요.`
      );
      expect(description).toHaveTextContent(formatPrice(totalPrice));
    });
  });
});
