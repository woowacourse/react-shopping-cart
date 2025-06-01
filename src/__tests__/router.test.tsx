import { act, fireEvent, render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { getCartItems } from "../apis/cartItems/getCartItems";
import { ROUTES } from "../constants/routes";
import { CartProvider } from "../contexts/CartContext";
import { ToastProvider } from "../contexts/ToastContext";
import CartPage from "../pages/CartPage/CartPage";
import OrderPage from "../pages/OrderPage/OrderPage";

jest.mock("../apis/httpClient", () => ({
  API_KEY: "mock-api-key",
}));
jest.mock("../apis/config", () => ({
  API_BASE_URL: "http://mock-api-url.com",
  CLIENT_BASE_PATH: "/react-shopping-cart",
}));
jest.mock("../apis/cartItems/getCartItems");
jest.mock("../apis/cartItems/deleteCartItem");
jest.mock("../apis/cartItems/patchCartItem");

const mockCartItems = [
  {
    id: 101,
    quantity: 1,
    product: {
      id: 1,
      name: "유기농 바나나",
      price: 4500,
      imageUrl: "https://banana.jpg",
      category: "식료품",
      stock: 3,
    },
  },
  {
    id: 102,
    quantity: 2,
    product: {
      id: 2,
      name: "신선한 사과 1kg",
      price: 7900,
      imageUrl: "https://apple.jpg",
      category: "식료품",
      stock: 5,
    },
  },
];

describe("router 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getCartItems as jest.Mock).mockResolvedValue(mockCartItems);
  });

  it("장바구니 페이지에서 주문 확인 버튼을 누르면 주문 페이지로 이동하고, 주문 정보가 주문 페이지로 전달된다.", async () => {
    const expectedOrderItemCount = mockCartItems.length;
    const expectedOrderQuantity =
      mockCartItems[0].quantity + mockCartItems[1].quantity;

    const routes = [
      {
        path: ROUTES.HOME,
        element: (
          <ToastProvider>
            <CartProvider>
              <CartPage />
            </CartProvider>
          </ToastProvider>
        ),
      },
      {
        path: ROUTES.ORDER,
        element: (
          <ToastProvider>
            <CartProvider>
              <OrderPage />
            </CartProvider>
          </ToastProvider>
        ),
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.HOME],
    });

    render(<RouterProvider router={router} />);

    await screen.findByText("장바구니");

    expect(
      screen.getByText(
        `현재 ${expectedOrderItemCount}종류의 상품이 담겨있습니다.`
      )
    ).toBeInTheDocument();

    const orderButton = await screen.findByRole("button", {
      name: "주문 확인",
      hidden: false,
    });

    expect(orderButton).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(orderButton);
    });

    expect(screen.getByText("주문 확인")).toBeInTheDocument();

    const orderPrice = 4500 * 1 + 7900 * 2;
    const shippingFee = orderPrice >= 100000 ? 0 : 3000;
    const totalPrice = orderPrice + shippingFee;
    const formattedPrice = totalPrice.toLocaleString();

    expect(
      screen.getByText(
        `총 ${expectedOrderItemCount}종류의 상품 ${expectedOrderQuantity}개를 주문합니다.`
      )
    ).toBeInTheDocument();
    expect(screen.getByText(`${formattedPrice}원`)).toBeInTheDocument();
  });

  it("주문 페이지에서 뒤로 가기 버튼을 누르면 장바구니 페이지로 이동하고, 기존 장바구니 정보가 유지된다.", async () => {
    const routes = [
      {
        path: ROUTES.HOME,
        element: (
          <ToastProvider>
            <CartProvider>
              <CartPage />
            </CartProvider>
          </ToastProvider>
        ),
      },
      {
        path: ROUTES.ORDER,
        element: (
          <ToastProvider>
            <CartProvider>
              <OrderPage />
            </CartProvider>
          </ToastProvider>
        ),
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.HOME, ROUTES.ORDER],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await screen.findByText("주문 확인");

    const backButton = screen.getByAltText("back-icon");

    await act(async () => {
      fireEvent.click(backButton);
    });

    expect(screen.getByText("장바구니")).toBeInTheDocument();

    expect(
      screen.getByText(
        `현재 ${mockCartItems.length}종류의 상품이 담겨있습니다.`
      )
    ).toBeInTheDocument();

    expect(screen.getByText("유기농 바나나")).toBeInTheDocument();
    expect(screen.getByText("신선한 사과 1kg")).toBeInTheDocument();
  });
});
