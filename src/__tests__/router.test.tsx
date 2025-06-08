import { act, fireEvent, render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { CartProvider } from "../domains/cart/contexts/CartContext";
import { CouponProvider } from "../domains/coupon/contexts/CouponContext";
import { OrderProvider } from "../domains/order/contexts/OrderContext";
import { ModalProvider } from "../features/modal/ModalContext";
import { ToastProvider } from "../features/toast/ToastContext";
import CartPage from "../pages/CartPage/CartPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import { getCartItems } from "../domains/cart/apis/getCartItems";
import { getCoupons } from "../domains/coupon/apis/getCoupons";

jest.mock("../apis/httpClient", () => ({
  API_KEY: "mock-api-key",
}));
jest.mock("../apis/config", () => ({
  API_BASE_URL: "http://mock-api-url.com",
  CLIENT_BASE_PATH: "/react-shopping-cart",
}));
jest.mock("../domains/cart/apis/getCartItems");
jest.mock("../domains/cart/apis/deleteCartItem");
jest.mock("../domains/cart/apis/patchCartItem");
jest.mock("../domains/coupon/apis/getCoupons");

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

const mockCoupons = [
  {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    expirationDate: "2025-11-30",
    discount: 5000,
    minimumAmount: 100000,
    discountType: "fixed",
  },
  {
    id: 2,
    code: "BOGO",
    description: "2개 구매 시 1개 무료 쿠폰",
    expirationDate: "2025-06-30",
    buyQuantity: 2,
    getQuantity: 1,
    discountType: "buyXgetY",
  },
];

beforeEach(() => {
  (getCartItems as jest.Mock).mockResolvedValue(mockCartItems);
  (getCoupons as jest.Mock).mockResolvedValue(mockCoupons);
});

const createAppRouter = (initialPath: string, initialIndex = 0) => {
  const routes = [
    {
      path: ROUTES.CART,
      element: (
        <ToastProvider>
          <CartProvider>
            <CouponProvider>
              <OrderProvider>
                <ModalProvider>
                  <CartPage />
                </ModalProvider>
              </OrderProvider>
            </CouponProvider>
          </CartProvider>
        </ToastProvider>
      ),
    },
    {
      path: ROUTES.ORDER,
      element: (
        <ToastProvider>
          <CartProvider>
            <CouponProvider>
              <OrderProvider>
                <ModalProvider>
                  <OrderPage />
                </ModalProvider>
              </OrderProvider>
            </CouponProvider>
          </CartProvider>
        </ToastProvider>
      ),
    },
    {
      path: ROUTES.PAYMENT,
      element: (
        <ToastProvider>
          <CartProvider>
            <CouponProvider>
              <OrderProvider>
                <ModalProvider>
                  <PaymentPage />
                </ModalProvider>
              </OrderProvider>
            </CouponProvider>
          </CartProvider>
        </ToastProvider>
      ),
    },
  ];

  return createMemoryRouter(routes, {
    initialEntries: [initialPath],
    initialIndex,
  });
};

describe("router 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("장바구니 페이지에서 '주문 확인' 버튼을 누르면 주문 페이지로 이동한다.", async () => {
    const router = createAppRouter(ROUTES.CART);
    render(<RouterProvider router={router} />);

    await screen.findByText("장바구니");

    const orderButton = screen.getByRole("button", { name: "주문 확인" });
    orderButton.removeAttribute("disabled");

    expect(orderButton).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(orderButton);
    });

    expect(screen.getByText("주문 확인")).toBeInTheDocument();
  });

  it("주문 페이지에서 뒤로가기 버튼을 누르면 장바구니 페이지로 이동한다.", async () => {
    const router = createAppRouter(ROUTES.ORDER);
    render(<RouterProvider router={router} />);

    await screen.findByText("주문 확인");

    const backButton = screen.getByAltText("back-icon");

    await act(async () => {
      fireEvent.click(backButton);
    });

    expect(screen.getByText("장바구니")).toBeInTheDocument();
  });

  it("주문 페이지에서 '결제하기' 버튼을 누르면 결제 페이지로 이동한다.", async () => {
    const router = createAppRouter(ROUTES.ORDER);
    render(<RouterProvider router={router} />);

    await screen.findByText("주문 확인");

    const paymentButton = screen.getByRole("button", { name: "결제하기" });

    await act(async () => {
      fireEvent.click(paymentButton);
    });

    expect(await screen.findByText("총 결제 금액")).toBeInTheDocument();
  });

  it("결제 페이지에서 '장바구니로 돌아가기' 버튼을 누르면 장바구니 페이지로 이동한다.", async () => {
    const router = createAppRouter(ROUTES.PAYMENT);
    render(<RouterProvider router={router} />);

    await screen.findByText("결제 확인");

    const backToCartButton = screen.getByRole("button", {
      name: "장바구니로 돌아가기",
    });

    await act(async () => {
      fireEvent.click(backToCartButton);
    });

    expect(await screen.findByText("장바구니")).toBeInTheDocument();
  });
});
