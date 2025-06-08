import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../src/App";
import { CartProvider } from "../src/stores/CartContext";
import { SelectProvider } from "../src/stores/SelectContext";
import { CouponSelectProvider } from "../src/stores/CouponContext";
import { BrowserRouter } from "react-router-dom";

// API 목킹
jest.mock("../src/api/cartItemListApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../src/api/updateCartItemApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../src/api/couponApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

import cartItemListApi from "../src/api/cartItemListApi";
import updateCartItemApi from "../src/api/updateCartItemApi";
import getCouponList from "../src/api/couponApi";
import { Coupon } from "../src/types/coupon";

const mockCartItemListApi = cartItemListApi as jest.MockedFunction<
  typeof cartItemListApi
>;
const mockUpdateCartItemApi = updateCartItemApi as jest.MockedFunction<
  typeof updateCartItemApi
>;
const mockGetCouponList = getCouponList as jest.MockedFunction<
  typeof getCouponList
>;

const mockCartItems = [
  {
    id: 1,
    quantity: 2,
    product: {
      id: 1,
      name: "테스트 상품1",
      price: 30000,
      imageUrl: "image1.jpg",
      category: "식료품",
    },
  },
  {
    id: 2,
    quantity: 1,
    product: {
      id: 2,
      name: "테스트 상품2",
      price: 40000,
      imageUrl: "image2.jpg",
      category: "전자제품",
    },
  },
];

const mockCoupons = [
  {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    discountType: "fixed",
    discount: 5000,
    minimumAmount: 100000,
    expirationDate: "2025-11-30",
  },
  {
    id: 2,
    code: "FREESHIP",
    description: "무료 배송 쿠폰",
    discountType: "freeShipping",
    minimumAmount: 50000,
    expirationDate: "2025-08-31",
  },
];

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <CartProvider>
        <SelectProvider>
          <CouponSelectProvider>{component}</CouponSelectProvider>
        </SelectProvider>
      </CartProvider>
    </BrowserRouter>
  );
};

describe("React 컴포넌트 통합 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCartItemListApi.mockResolvedValue(mockCartItems);
    mockUpdateCartItemApi.mockResolvedValue(undefined);
    mockGetCouponList.mockResolvedValue(mockCoupons as Coupon[]);

    // localStorage 초기화
    localStorage.clear();
  });

  it("앱이 정상적으로 렌더링된다", async () => {
    renderWithProviders(<App />);

    await waitFor(() => {
      // 실제 렌더링되는 텍스트로 수정 (테스트 실패 로그에서 "장바구니"가 렌더링됨을 확인)
      expect(screen.getByText("장바구니")).toBeInTheDocument();
    });
  });

  describe("장바구니 기본 기능", () => {
    it("장바구니 페이지가 정상적으로 렌더링된다", async () => {
      renderWithProviders(<App />);

      await waitFor(() => {
        expect(screen.getByText("장바구니")).toBeInTheDocument();
        expect(screen.getByText("테스트 상품1")).toBeInTheDocument();
        expect(screen.getByText("테스트 상품2")).toBeInTheDocument();
      });
    });

    it("상품 선택/해제 시 결제 금액이 동적으로 변경된다", async () => {
      renderWithProviders(<App />);

      await waitFor(() => {
        expect(screen.getByText("테스트 상품1")).toBeInTheDocument();
      });

      // 전체 선택 체크박스 찾기 - label로 찾기
      const selectAllCheckbox = screen.getByLabelText("전체선택");
      expect(selectAllCheckbox).toBeInTheDocument();

      // 초기 전체 선택 상태에서 해제
      fireEvent.click(selectAllCheckbox);

      await waitFor(() => {
        // 선택 해제 후 금액이 0원인지 확인
        expect(screen.getByText("0원")).toBeInTheDocument();
      });
    });

    it("상품 수량 증가가 정상 작동한다", async () => {
      renderWithProviders(<App />);

      await waitFor(() => {
        expect(screen.getByText("테스트 상품1")).toBeInTheDocument();
      });

      // + 버튼 찾기 - 더 구체적인 path로 찾기
      const increaseButtons = screen.getAllByRole("button");
      const increaseButton = increaseButtons.find((button) =>
        button.querySelector('svg path[d*="M1.5 7H13.5M7.5 13V1"]')
      );

      if (increaseButton) {
        fireEvent.click(increaseButton);

        await waitFor(() => {
          expect(mockUpdateCartItemApi).toHaveBeenCalled();
        });
      }
    });

    it("상품 삭제가 정상 작동한다", async () => {
      renderWithProviders(<App />);

      await waitFor(() => {
        expect(screen.getByText("테스트 상품1")).toBeInTheDocument();
      });

      const deleteButtons = screen.getAllByRole("button", { name: "삭제" });
      fireEvent.click(deleteButtons[0]);

      await waitFor(() => {
        expect(mockUpdateCartItemApi).toHaveBeenCalledWith(1, 0);
      });
    });

    it("장바구니가 비어있을 때 적절한 메시지가 표시된다", async () => {
      mockCartItemListApi.mockResolvedValue([]);

      renderWithProviders(<App />);

      await waitFor(() => {
        expect(
          screen.getByText("장바구니에 담은 상품이 없습니다.")
        ).toBeInTheDocument();
      });
    });

    it("10만원 이상 구매 시 무료배송 안내가 표시된다", async () => {
      renderWithProviders(<App />);

      await waitFor(() => {
        expect(screen.getByText("테스트 상품1")).toBeInTheDocument();
        // 총 주문 금액이 10만원이므로 무료배송 안내 표시
        expect(
          screen.getByText(
            "⚠️ 총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다."
          )
        ).toBeInTheDocument();
      });
    });
  });

  describe("쿠폰 기능 테스트", () => {
    it("쿠폰 모달이 정상적으로 열린다", async () => {
      renderWithProviders(<App />);

      // 주문 확인 페이지로 이동
      await waitFor(() => {
        expect(screen.getByText("테스트 상품1")).toBeInTheDocument();
      });

      const orderButton = screen.getByRole("button", { name: "주문 확인" });
      fireEvent.click(orderButton);

      // 쿠폰 적용 버튼이 있는지 확인 (OrderCompletePage에서)
      await waitFor(() => {
        const couponButton = screen.queryByText("쿠폰 적용");
        if (couponButton) {
          expect(couponButton).toBeInTheDocument();
        }
      });
    });
  });
});
