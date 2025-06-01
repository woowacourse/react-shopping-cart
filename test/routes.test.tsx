import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router";
import App from "../src/App";
import OrderConfirmPage from "../src/pages/OrderConfirmPage";
import { CartItemProvider } from "../src/contexts/CartItemProvider";
import cartItemsApi from "../src/apis/cartItems";
const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/order-confirm",
    element: <OrderConfirmPage />,
  },
];

vi.mock("../src/apis/cartItems");

describe("라우팅 & 네비게이션 테스트", () => {
  it("’/’로 진입하면 장바구니가 보인다.", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    cartItemsApi.get = vi.fn();
    const mockCartItems = [
      {
        id: 1,
        product: {
          id: 1,
          category: "식료품" as const,
          imageUrl: "https://example.com/image1.jpg",
          name: "콜라",
          price: 1500,
        },
        quantity: 2,
      },
    ];
    (cartItemsApi.get as ReturnType<typeof vi.fn>).mockImplementation(
      async () => [...mockCartItems]
    );

    render(
      <CartItemProvider>
        <RouterProvider router={router} />
      </CartItemProvider>
    );

    expect(await screen.findByText("장바구니")).toBeInTheDocument();
  });

  it("’/order-confirm’로 진입하면 주문 확인이 보인다", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/order-confirm"],
    });

    render(
      <CartItemProvider>
        <RouterProvider router={router} />
      </CartItemProvider>
    );

    expect(screen.getByText("주문 확인")).toBeInTheDocument();
  });

  it("’/’로 진입하면 장바구니가 보이고, ‘주문하기’ 버튼 클릭 시 ‘/order-confirm’이 보이고, 다시 뒤로가기를 누르면 장바구니가 보인다.", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    cartItemsApi.get = vi.fn();
    const mockCartItems = [
      {
        id: 1,
        product: {
          id: 1,
          category: "식료품" as const,
          imageUrl: "https://example.com/image1.jpg",
          name: "콜라",
          price: 1500,
        },
        quantity: 2,
      },
    ];
    (cartItemsApi.get as ReturnType<typeof vi.fn>).mockImplementation(
      async () => [...mockCartItems]
    );

    render(
      <CartItemProvider>
        <RouterProvider router={router} />
      </CartItemProvider>
    );

    expect(await screen.findByText("장바구니")).toBeInTheDocument();

    const orderButton = screen.getByRole("button", { name: "주문하기" });
    expect(orderButton).toBeEnabled();

    fireEvent.click(orderButton);

    expect(await screen.findByText("주문 확인")).toBeInTheDocument();

    const backIcon = await screen.findByTestId("header-leading");
    fireEvent.click(backIcon);

    expect(await screen.findByText("장바구니")).toBeInTheDocument();
  });
});
