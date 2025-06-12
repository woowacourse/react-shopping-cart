import { screen, fireEvent } from "@testing-library/react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import OrderConfirmationPage from "../OrderConfirmationPage";
import type { CartItemType } from "../../../types/response";

const checkedCoupons = new Map();

const toggleCheckedCoupon = jest.fn((couponId) => {
  if (checkedCoupons.has(couponId)) {
    checkedCoupons.delete(couponId);
  } else {
    checkedCoupons.set(couponId, {
      id: couponId,
      code: "FIXED1000",
      description: "1000원 할인",
      discountType: "fixed",
      discount: 1000,
      minimumAmount: 10000,
      expirationDate: "2099-12-31",
    });
  }
});

jest.mock("../../../services/apiClient", () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

jest.mock("../../../hooks/features/useCoupon", () => () => ({
  couponList: [
    {
      id: 1,
      code: "FIXED1000",
      description: "1000원 할인",
      discountType: "fixed",
      discount: 1000,
      minimumAmount: 10000,
      expirationDate: "2099-12-31",
    },
  ],
  validCouponList: [
    {
      id: 1,
      code: "FIXED1000",
      description: "1000원 할인",
      discountType: "fixed",
      discount: 1000,
      minimumAmount: 10000,
      expirationDate: "2099-12-31",
    },
  ],
  loadingState: "success",
  checkedCoupons: new Map(),
  toggleCheckedCoupon: jest.fn(),
}));

jest.mock("../../../hooks/features/useCoupon", () => () => ({
  couponList: [],
  validCouponList: [],
  loadingState: "success",
  get checkedCoupons() {
    return checkedCoupons;
  },
  toggleCheckedCoupon,
}));

const mockOrderItems: CartItemType[] = [
  {
    id: 1,
    quantity: 2,
    product: {
      id: 1,
      name: "테스트 상품",
      price: 10000,
      imageUrl: "",
      category: "테스트",
    },
  },
];
const mockOrderPrice = 20000;
const mockDeliveryFee = 3000;

function renderWithLocationState() {
  return render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: "/order-confirmation",
          state: {
            orderItems: mockOrderItems,
            orderPrice: mockOrderPrice,
            deliveryFee: mockDeliveryFee,
          },
        },
      ]}
    >
      <Routes>
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
      </Routes>
    </MemoryRouter>
  );
}

beforeAll(() => {
  globalThis.IntersectionObserver = class implements IntersectionObserver {
    root: Element | null = null;
    rootMargin = "";
    thresholds: ReadonlyArray<number> = [];

    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  };

  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal-root");
  document.body.appendChild(modalRoot);
});

beforeEach(() => {
  checkedCoupons.clear();
});

describe("OrderConfirmationPage UI", () => {
  it("쿠폰 적용 버튼 클릭 시 모달이 열린다", () => {
    renderWithLocationState();
    const couponButton = screen.getByRole("button", { name: /쿠폰 적용/i });
    fireEvent.click(couponButton);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("할인 쿠폰에 체크할 수 있다", () => {
    renderWithLocationState();

    fireEvent.click(screen.getByRole("button", { name: /쿠폰 적용/i }));
    const checkboxes = screen.getAllByRole("checkbox");

    expect(checkboxes[0]).not.toBeChecked();
    fireEvent.click(checkboxes[0]);
    expect(checkboxes[0]).toBeChecked();
  });

  it("제주도 및 도서 산간 지역 체크박스를 토글할 수 있다", () => {
    renderWithLocationState();
    const checkbox = screen.getByTestId(
      "remote-area-checkbox"
    ) as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });
});
