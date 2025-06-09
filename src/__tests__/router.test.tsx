import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { getCartItems } from "../apis/cartItems/getCartItems";
import { CartProvider } from "../contexts/CartContext";
import { ToastProvider } from "../contexts/ToastContext";
import { CouponProvider } from "../contexts/CouponContext";
import CartPage from "../pages/CartPage/CartPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import { mockCoupons } from "../__mocks__/coupons.ts";
import { getCoupons } from "../apis/coupons/getCoupons.ts";

jest.mock("../apis/httpClient", () => ({
  API_KEY: "mock-api-key",
}));

jest.mock("../apis/cartItems/getCartItems");
jest.mock("../apis/cartItems/deleteCartItem");
jest.mock("../apis/cartItems/patchCartItem");
jest.mock("../apis/coupons/getCoupons");
jest.mock("../apis/config", () => ({
  CLIENT_BASE_PATH: "/",
}));

jest.mock("/Info.svg", () => "mocked-info-icon");
jest.mock("/left-arrow.svg", () => "mocked-left-arrow");
jest.mock("/planet-default-image.svg", () => "mocked-default-image");

const mockGetCartItems = getCartItems as jest.MockedFunction<
  typeof getCartItems
>;

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
    quantity: 1,
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

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToastProvider>
      <CartProvider>
        <CouponProvider>{children}</CouponProvider>
      </CartProvider>
    </ToastProvider>
  );
};

describe("router 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetCartItems.mockResolvedValue(mockCartItems);
    (getCoupons as jest.Mock).mockResolvedValue(mockCoupons);
  });

  test("장바구니 페이지에서 주문 확인 버튼을 누르면 주문 페이지로 이동하고, 주문 정보가 주문 페이지로 전달된다.", async () => {
    const expectedOrderItemCount = mockCartItems.length;

    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <CartPage />,
        },
        {
          path: "/order",
          element: <OrderPage />,
        },
      ],
      {
        initialEntries: ["/"],
      }
    );

    render(
      <TestWrapper>
        <RouterProvider router={router} />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText("장바구니")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("유기농 바나나")).toBeInTheDocument();
      expect(screen.getByText("신선한 사과 1kg")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          `현재 ${expectedOrderItemCount}종류의 상품이 담겨있습니다.`
        )
      ).toBeInTheDocument();
    });

    const checkbox = screen.getByTestId("all-select-checkbox");
    await act(async () => {
      fireEvent.click(checkbox);
    });

    const orderButton = await waitFor(() =>
      screen.getByRole("button", { name: "주문 확인" })
    );

    expect(orderButton).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(orderButton);
    });

    await waitFor(() => {
      expect(screen.getByText("주문 확인")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("유기농 바나나")).toBeInTheDocument();
      expect(screen.getByText("신선한 사과 1kg")).toBeInTheDocument();
    });

    const orderPrice = mockCartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const shippingFee = orderPrice >= 100000 ? 0 : 3000;
    const totalPrice = orderPrice + shippingFee;
    const formattedPrice = totalPrice.toLocaleString();

    await waitFor(() => {
      expect(screen.getByText(`${formattedPrice}원`)).toBeInTheDocument();
    });
  });

  test("주문 페이지에서 뒤로 가기 버튼을 누르면 장바구니 페이지로 이동하고, 기존 장바구니 정보가 유지된다.", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <CartPage />,
        },
        {
          path: "/order",
          element: <OrderPage />,
        },
      ],
      {
        initialEntries: ["/"],
      }
    );

    render(
      <TestWrapper>
        <RouterProvider router={router} />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText("장바구니")).toBeInTheDocument();
    });

    const checkbox = screen.getByTestId("all-select-checkbox");
    await act(async () => {
      fireEvent.click(checkbox);
    });

    const orderButton = await waitFor(() =>
      screen.getByRole("button", { name: "주문 확인" })
    );

    expect(orderButton).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(orderButton);
    });

    await waitFor(() => {
      expect(screen.getByText("주문 확인")).toBeInTheDocument();
    });

    const backButton = screen.getByAltText("back-icon");

    await act(async () => {
      fireEvent.click(backButton);
    });

    await waitFor(() => {
      expect(screen.getByText("장바구니")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          `현재 ${mockCartItems.length}종류의 상품이 담겨있습니다.`
        )
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("유기농 바나나")).toBeInTheDocument();
      expect(screen.getByText("신선한 사과 1kg")).toBeInTheDocument();
    });
  });
});
