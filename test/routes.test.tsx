import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router";
import App from "../src/App";
import OrderConfirmPage from "../src/pages/OrderConfirmPage";
import { CartItemProvider } from "../src/contexts/carItem/CartItemProvider";
import cartItemsApi from "../src/apis/cartItemsApi";
import { SelectedCartItemProvider } from "../src/contexts/selectedCartItem/SelectedCartItemProvider";
import PaymentConfirmPage from "../src/pages/PaymentConfirmPage";
const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/order-confirm",
    element: <OrderConfirmPage />,
  },
  {
    path: "/payment-confirm",
    element: <PaymentConfirmPage />,
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
        <SelectedCartItemProvider>
          <RouterProvider router={router} />
        </SelectedCartItemProvider>
      </CartItemProvider>
    );

    expect(await screen.findByText("장바구니")).toBeInTheDocument();
  });

  it("’/order-confirm’로 진입하면 주문 확인이 보인다", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [
        {
          pathname: "/order-confirm",
          state: { orderPrice: 3000 },
        },
      ],
    });

    render(
      <CartItemProvider>
        <SelectedCartItemProvider>
          <RouterProvider router={router} />
        </SelectedCartItemProvider>
      </CartItemProvider>
    );

    expect(screen.getByText("주문 확인")).toBeInTheDocument();
  });

  it("’/payment-confirm’로 진입하면 결제 확인이 보인다", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [
        {
          pathname: "/payment-confirm",
          state: { totalPrice: 3000 },
        },
      ],
    });

    render(
      <CartItemProvider>
        <SelectedCartItemProvider>
          <RouterProvider router={router} />
        </SelectedCartItemProvider>
      </CartItemProvider>
    );

    expect(screen.getByText("결제 확인")).toBeInTheDocument();
  });

  it("’/’로 진입하면 장바구니가 보이고, ‘주문하기’ 버튼 클릭 시 ‘/order-confirm’이 보이고, '결제하기' 버튼 클릭 시 '/payment-confirm'이 보인다.", async () => {
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
        <SelectedCartItemProvider>
          <RouterProvider router={router} />
        </SelectedCartItemProvider>
      </CartItemProvider>
    );

    expect(await screen.findByText("장바구니")).toBeInTheDocument();

    const orderButton = screen.getByRole("button", { name: "주문하기" });

    expect(orderButton).toBeEnabled();

    fireEvent.click(orderButton);

    expect(await screen.findByText("주문 확인")).toBeInTheDocument();

    const paymentButton = screen.getByRole("button", { name: "결제하기" });
    fireEvent.click(paymentButton);

    expect(await screen.findByText("결제 확인")).toBeInTheDocument();
  });
});
