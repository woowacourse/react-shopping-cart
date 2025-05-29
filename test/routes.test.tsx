import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "../src/App";
import OrderConfirmPage from "../src/pages/OrderConfirmPage";
import { CartItemProvider } from "../src/contexts/CartItemProvider";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, it, expect } from "vitest";

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

describe("라우팅 테스트", () => {
  it("라우팅 테스트 - '/'로 진입하면 장바구니가 보임", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(
      <CartItemProvider>
        <RouterProvider router={router} />
      </CartItemProvider>
    );

    expect(screen.getByText("장바구니")).toBeInTheDocument();
  });

  it("라우팅 테스트 - '/order-confirm'로 진입하면 장바구니가 보임", () => {
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
});
