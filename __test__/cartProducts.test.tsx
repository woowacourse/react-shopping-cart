import { describe, it, vi, beforeEach, Mock } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import * as cartAPI from "../src/api/cart/getCartProduct";
import * as cartUpdateAPI from "../src/api/cart/updateCartProduct";
import { createMemoryRouter, MemoryRouter, RouterProvider } from "react-router";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import OrderConfirm from "../src/pages/OrderConfirm";
import NavBar from "../src/components/layout/NavBar";
import Main from "../src/pages/Main";
import { formatPrice } from "../src/utils/formatPrice";
import { getPrice } from "../src/components/feature/CartSection/PriceSection/utils";

vi.mock("../src/api/cart/getCartProduct", () => ({
  getCartProduct: vi.fn(),
}));

vi.mock("../src/api/cart/updateCartProduct", () => ({
  updateCartProduct: vi.fn(),
}));

const mockCartItems = {
  content: [
    {
      id: 1234,
      product: {
        category: "식료품",
        id: 1,
        name: "이름",
        price: 100_000,
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
    waitFor(() => {
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

    waitFor(() => {
      const allSelected = screen.getByTestId("all-selected");
      expect(allSelected).toBeChecked();
    });
  });
});

describe("장바구니 구매 상품 선택 테스트", () => {
  beforeEach(() => {
    (cartAPI.getCartProduct as Mock).mockResolvedValue(mockCartItems);
  });

  it("하나의 상품 선택 해제 시 전체 선택도 해제된다.", async () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );
    const checkboxes = await screen.findByTestId(
      `check-box${mockCartItems.content[0].id}`
    );
    await userEvent.click(checkboxes);

    waitFor(() => {
      const allSelected = screen.getByTestId("all-selected");
      expect(allSelected).not.toBeChecked();
    });
  });

  it("모든 상품 선택 시 전체 선택도 선택된다.", async () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    const allSelected = await screen.findByTestId("all-selected");
    await userEvent.click(allSelected);

    for (const item of mockCartItems.content) {
      const checkbox = await screen.findByTestId(`check-box${item.id}`);
      await userEvent.click(checkbox);
    }

    waitFor(() => {
      const allSelected = screen.getByTestId("all-selected");
      expect(allSelected).toBeChecked();
    });
  });

  it("주문 금액이 선택된 카트 아이템으로만 계산된다.", async () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    const allSelected = await screen.findByTestId("all-selected");
    await userEvent.click(allSelected);

    const checkbox = await screen.findByTestId(
      `check-box${mockCartItems.content[1].id}`
    );
    await userEvent.click(checkbox);

    const price = getPrice({
      items: mockCartItems.content,
      isRemoteArea: true,
      discount: 5000,
    });

    waitFor(() => {
      const totalPriceEl = screen.getByTestId("total-amount");
      expect(totalPriceEl?.textContent).toBe(
        `${price.totalPrice?.toLocaleString()}원`
      );
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
    waitFor(() => {
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
    const price = getPrice({
      items: mockCartItems.content,
      isRemoteArea: true,
      discount: 5000,
    });

    const routes = [
      {
        path: "/",
        element: <NavBar />,
        children: [
          { path: "", element: <Main /> },
          { path: "orderConfirm", element: <OrderConfirm /> },
        ],
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });
    render(<RouterProvider router={router} />);

    const orderConfirmBtn = await screen.findByTestId("order-confirm-button");
    await userEvent.click(orderConfirmBtn);

    waitFor(() => {
      const description = screen.getByTestId("order-confirm-description");
      expect(description).toHaveTextContent(
        `총 ${sort}종류의 상품 ${price.totalAmount}개를 주문합니다. 최종 결제 금액을 확인해 주세요.`
      );
      expect(description).toHaveTextContent(formatPrice(price.totalPrice));
    });
  });
});

describe("장바구니 상품 개수 빼기/더하기 테스트", () => {
  beforeEach(() => {
    (cartAPI.getCartProduct as Mock).mockResolvedValue(mockCartItems);
    (cartUpdateAPI.updateCartProduct as Mock).mockImplementation(
      async (cartId: number, quantity: number) => {
        const item = mockCartItems.content.find((c) => c.id === cartId);
        if (item) {
          item.quantity = quantity;
        }
        return {};
      }
    );
  });

  it("- 버튼 클릭 시 상품을 뺄 수 있다.", async () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    const item = mockCartItems.content[0];
    const minusButton = await screen.findByTestId(`minus-count${item.id}`);
    await userEvent.click(minusButton);

    waitFor(() => {
      const count = screen.getByTestId(`count${item.id}`);

      expect(count.textContent).toBe(`${item.quantity}`);
    });
  });

  it("+ 버튼 클릭 시 상품을 더할 수 있다.", async () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    const item = mockCartItems.content[0];
    const plusButton = await screen.findByTestId(`plus-count${item.id}`);
    await userEvent.click(plusButton);

    waitFor(() => {
      const count = screen.getByTestId(`count${item.id}`);
      expect(count.textContent).toBe(`${item.quantity}`);
    });
  });
});
