import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router";
import "@testing-library/jest-dom";

import OrderConfirmation from "../src/page/OrderConfirmation";
import type { OrderConfirmationLocationState } from "../src/type/OrderConfirmation";

const mockNavigate = vi.fn();
const mockLocation = {
  state: null as unknown,
  pathname: "/order-confirmation",
  search: "",
  hash: "",
  key: "default",
};

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
  };
});

vi.mock("../src/page/ErrorPage", () => ({
  default: () => <div data-testid="error-page">Error Page</div>,
}));

vi.mock(
  "../src/components/OrderConfirmation/OrderConfirmationHeader/OrderConfirmationHeader",
  () => ({
    default: ({
      handleGoBackToHomeButton,
    }: {
      handleGoBackToHomeButton: () => void;
    }) => (
      <button
        data-testid="go-back-home-button"
        onClick={handleGoBackToHomeButton}
      >
        홈으로 돌아가기
      </button>
    ),
  })
);

function TestWrapper({ children }: { children: React.ReactNode }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

describe("OrderConfirmation 컴포넌트는", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocation.state = null;
  });

  it("location.state가 없으면 ErrorPage를 렌더링해야 한다", () => {
    mockLocation.state = null;

    render(
      <TestWrapper>
        <OrderConfirmation />
      </TestWrapper>
    );

    expect(screen.getByTestId("error-page")).toBeInTheDocument();
  });

  it("location.state가 유효하지 않으면 ErrorPage를 렌더링해야 한다", () => {
    mockLocation.state = {
      selectedCartItemsLength: "invalid",
      selectedCartItemsCount: 5,
      finalPrice: 100000,
    };

    render(
      <TestWrapper>
        <OrderConfirmation />
      </TestWrapper>
    );

    expect(screen.getByTestId("error-page")).toBeInTheDocument();
  });

  it("selectedCartItemsLength가 정수가 아니면 ErrorPage를 렌더링해야 한다", () => {
    mockLocation.state = {
      selectedCartItemsLength: 3.5,
      selectedCartItemsCount: 5,
      finalPrice: 100000,
    };

    render(
      <TestWrapper>
        <OrderConfirmation />
      </TestWrapper>
    );

    expect(screen.getByTestId("error-page")).toBeInTheDocument();
  });

  describe("유효한 state가 있을 때", () => {
    const validState: OrderConfirmationLocationState = {
      selectedCartItemsLength: 3,
      selectedCartItemsCount: 8,
      finalPrice: 125000,
    };

    beforeEach(() => {
      mockLocation.state = validState;
    });

    it("주문 확인 페이지를 정상적으로 렌더링해야 한다", () => {
      render(
        <TestWrapper>
          <OrderConfirmation />
        </TestWrapper>
      );

      expect(screen.getByText("주문 확인")).toBeInTheDocument();
      expect(
        screen.getByText("총 3종류의 상품 8개를 주문합니다.")
      ).toBeInTheDocument();
      expect(
        screen.getByText("최종 결제 금액을 확인해 주세요.")
      ).toBeInTheDocument();
      expect(screen.getByText("총 결제 금액")).toBeInTheDocument();
      expect(screen.getByText("125,000원")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "결제하기" })
      ).toBeInTheDocument();
    });

    it("결제하기 버튼이 비활성화되어 있어야 한다", () => {
      render(
        <TestWrapper>
          <OrderConfirmation />
        </TestWrapper>
      );

      const orderButton = screen.getByRole("button", { name: "결제하기" });
      expect(orderButton).toBeDisabled();
    });

    it("홈으로 돌아가기 버튼 클릭 시 홈 페이지로 이동해야 한다", () => {
      render(
        <TestWrapper>
          <OrderConfirmation />
        </TestWrapper>
      );

      const goBackButton = screen.getByTestId("go-back-home-button");
      fireEvent.click(goBackButton);

      expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it("가격이 올바르게 포맷되어 표시되어야 한다", () => {
      mockLocation.state = {
        selectedCartItemsLength: 2,
        selectedCartItemsCount: 5,
        finalPrice: 1234567,
      };

      render(
        <TestWrapper>
          <OrderConfirmation />
        </TestWrapper>
      );

      expect(screen.getByText("1,234,567원")).toBeInTheDocument();
    });
  });
});
