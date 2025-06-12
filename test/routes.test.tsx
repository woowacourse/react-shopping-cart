import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { CartItemProvider } from "../src/contexts/CartItemContext";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, it, expect, vi, beforeEach } from "vitest";
import cartItemsApi from "../src/apis/cartItems";
import PaymentConfirmPage from "../src/pages/PaymentConfirmPage";
import { CouponProvider } from "../src/contexts/CouponContext";
import CartItemPage from "../src/pages/CartItemPage";

vi.mock("../src/apis/cartItems");

const routes = [
  {
    path: "/",
    element: <CartItemPage />,
  },
  {
    path: "/order-confirm",
    element: <PaymentConfirmPage />,
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
        <CouponProvider>
          <RouterProvider router={router} />
        </CouponProvider>
      </CartItemProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("page-title")).toBeInTheDocument();
    });
  });
});
