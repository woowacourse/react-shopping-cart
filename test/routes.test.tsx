import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../src/App";
import OrderConfirmPage from "../src/pages/OrderConfirmPage";
import { CartItemProvider } from "../src/contexts/CartItemProvider";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, it, expect, vi, beforeEach } from "vitest";
import cartItemsApi from "../src/apis/cartItems";

vi.mock("../src/apis/cartItems");

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
  beforeEach(() => {
    vi.resetAllMocks();
    (cartItemsApi.get as ReturnType<typeof vi.fn>).mockResolvedValue([]);
  });

  it("라우팅 테스트 - '/'로 진입하면 장바구니가 보임", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(
      <CartItemProvider>
        <RouterProvider router={router} />
      </CartItemProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("장바구니")).toBeInTheDocument();
    });
  });
});
