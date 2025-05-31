import React, { ReactNode } from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";

import { ErrorToastContextProvider } from "../src/contexts/ErrorToastContext";
import { testStateStore } from "../src/mock/handlers";

import { BrowserRouter } from "react-router";
import App from "../src/App";

import "@testing-library/jest-dom";

// 테스트용 래퍼 컴포넌트
function TestWrapper({ children }: { children: ReactNode }) {
  return (
    <ErrorToastContextProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </ErrorToastContextProvider>
  );
}

// 가격 계산 헬퍼 함수
const calculateSubtotal = (cartItems: typeof testStateStore.mockCartData) => {
  return cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
};

const calculateTotal = (subtotal: number) => {
  const shippingFee = subtotal >= 100000 ? 0 : 3000;
  return subtotal + shippingFee;
};

const formatPrice = (price: number) => `${price.toLocaleString()}원`;

describe("app은", () => {
  beforeEach(() => {
    testStateStore.reset();
  });

  it("초기 상태가 올바르게 설정되어야 한다", async () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          `현재 ${testStateStore.mockCartData.length}종류의 상품이 담겨있습니다.`
        )
      ).toBeInTheDocument();
    });

    // 초기 mock 데이터 기반 계산
    const initialSubtotal = calculateSubtotal(testStateStore.mockCartData);
    const initialTotal = calculateTotal(initialSubtotal);

    expect(screen.getAllByText("앵그리버드")[0]).toBeInTheDocument();
    expect(screen.getAllByText("50,000원")[0]).toBeInTheDocument();
    expect(screen.getAllByText("달 무드등")[0]).toBeInTheDocument();
    expect(screen.getAllByText("28,000원")[0]).toBeInTheDocument();
    expect(screen.getAllByText("동물 양말")[0]).toBeInTheDocument();
    expect(screen.getAllByText("20,000원")[0]).toBeInTheDocument();
    expect(screen.getByText("주문 금액")).toBeInTheDocument();
    expect(screen.getByTestId("subtotal-price")).toHaveTextContent(
      formatPrice(initialSubtotal)
    );
    expect(
      screen.getByText("🎉 무료배송 혜택을 받았어요! 🎉")
    ).toBeInTheDocument();
    expect(screen.getByText("총 결제 금액")).toBeInTheDocument();
    expect(screen.getByTestId("total-price")).toHaveTextContent(
      formatPrice(initialTotal)
    );
  });

  it("카트 아이템을 선택하면 총 주문 금액이 갱신되어야 한다.", async () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          `현재 ${testStateStore.mockCartData.length}종류의 상품이 담겨있습니다.`
        )
      ).toBeInTheDocument();
    });

    // 앵그리버드 제외 계산 (달 무드등 + 동물 양말)
    const cartWithoutAngryBird = testStateStore.mockCartData.filter(
      (item) => item.product.name !== "앵그리버드"
    );
    const subtotalWithoutAngryBird = calculateSubtotal(cartWithoutAngryBird);
    const totalWithoutAngryBird = calculateTotal(subtotalWithoutAngryBird);

    // 앵그리버드 체크박스 클릭 (선택 해제)
    const angryBirdCheckbox = document.getElementById(
      "select-checkbox-앵그리버드-1"
    );
    fireEvent.click(angryBirdCheckbox!);
    await waitFor(() => {
      expect(screen.getByTestId("subtotal-price")).toHaveTextContent(
        formatPrice(subtotalWithoutAngryBird)
      );
      expect(screen.getByTestId("total-price")).toHaveTextContent(
        formatPrice(totalWithoutAngryBird)
      );
    });

    // 달 무드등도 제외 계산 (동물 양말만)
    const cartOnlyAnimalSocks = testStateStore.mockCartData.filter(
      (item) => item.product.name === "동물 양말"
    );
    const subtotalOnlyAnimalSocks = calculateSubtotal(cartOnlyAnimalSocks);
    const totalOnlyAnimalSocks = calculateTotal(subtotalOnlyAnimalSocks);

    // 달 무드등 체크박스 클릭 (선택 해제)
    const moonLampCheckbox = document.getElementById(
      "select-checkbox-달 무드등-2"
    );
    fireEvent.click(moonLampCheckbox!);
    await waitFor(() => {
      expect(screen.getByTestId("subtotal-price")).toHaveTextContent(
        formatPrice(subtotalOnlyAnimalSocks)
      );
      expect(screen.getByTestId("total-price")).toHaveTextContent(
        formatPrice(totalOnlyAnimalSocks)
      );
    });

    // 동물 양말 체크박스 클릭 (선택 해제) - 아무것도 선택되지 않음
    const animalSocksCheckbox = document.getElementById(
      "select-checkbox-동물 양말-3"
    );
    fireEvent.click(animalSocksCheckbox!);
    await waitFor(() => {
      expect(screen.getByText("물건을 선택해 주세용!")).toBeInTheDocument();
    });

    // 전체선택 클릭 - 초기 상태로 복원
    const initialSubtotal = calculateSubtotal(testStateStore.mockCartData);
    const initialTotal = calculateTotal(initialSubtotal);

    const selectAllCheckbox = screen.getByRole("checkbox", {
      name: /전체선택/,
    });
    fireEvent.click(selectAllCheckbox);
    await waitFor(() => {
      expect(screen.getByTestId("subtotal-price")).toHaveTextContent(
        formatPrice(initialSubtotal)
      );
      expect(screen.getByTestId("total-price")).toHaveTextContent(
        formatPrice(initialTotal)
      );
    });
  });

  it("모든 카트 아이템이 선택되지 않으면, 결제 버튼은 비활성화 되어야 한다.", async () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          `현재 ${testStateStore.mockCartData.length}종류의 상품이 담겨있습니다.`
        )
      ).toBeInTheDocument();
    });

    const orderButton = screen.getByRole("button", { name: "주문 확인" });
    expect(orderButton).toBeEnabled();

    // 전체선택 해제
    const selectAllCheckbox = screen.getByRole("checkbox", {
      name: /전체선택/,
    });
    fireEvent.click(selectAllCheckbox);
    await waitFor(() => {
      expect(orderButton).toBeDisabled();
    });
  });

  it("카트 아이템이 갱신되어도, 기존에 선택한 아이템은 선택 상태를 유지해야 한다.", async () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          `현재 ${testStateStore.mockCartData.length}종류의 상품이 담겨있습니다.`
        )
      ).toBeInTheDocument();
    });

    // 달 무드등 제외 계산 (앵그리버드 + 동물 양말)
    const cartWithoutMoonLamp = testStateStore.mockCartData.filter(
      (item) => item.product.name !== "달 무드등"
    );
    const subtotalWithoutMoonLamp = calculateSubtotal(cartWithoutMoonLamp);
    const totalWithoutMoonLamp = calculateTotal(subtotalWithoutMoonLamp);

    // 달 무드등만 선택 해제 (앵그리버드와 동물 양말은 선택된 상태 유지)
    const moonLampCheckbox = document.getElementById(
      "select-checkbox-달 무드등-2"
    );
    fireEvent.click(moonLampCheckbox!);
    await waitFor(() => {
      expect(screen.getByTestId("subtotal-price")).toHaveTextContent(
        formatPrice(subtotalWithoutMoonLamp)
      );
      expect(screen.getByTestId("total-price")).toHaveTextContent(
        formatPrice(totalWithoutMoonLamp)
      );
    });

    // 앵그리버드 삭제 후 동물 양말만 남음
    const cartOnlyAnimalSocks = testStateStore.mockCartData.filter(
      (item) => item.product.name === "동물 양말"
    );
    const subtotalOnlyAnimalSocks = calculateSubtotal(cartOnlyAnimalSocks);
    const totalOnlyAnimalSocks = calculateTotal(subtotalOnlyAnimalSocks);

    // 앵그리버드 삭제
    fireEvent.click(screen.getByTestId("delete-button-1"));
    await waitFor(() => {
      expect(screen.getByTestId("subtotal-price")).toHaveTextContent(
        formatPrice(subtotalOnlyAnimalSocks)
      );
      expect(screen.getByTestId("total-price")).toHaveTextContent(
        formatPrice(totalOnlyAnimalSocks)
      );
    });

    // 남은 아이템들의 선택 상태 확인
    const remainingMoonLampCheckbox = document.getElementById(
      "select-checkbox-달 무드등-2"
    ) as HTMLInputElement;
    const remainingAnimalSocksCheckbox = document.getElementById(
      "select-checkbox-동물 양말-3"
    ) as HTMLInputElement;

    expect(remainingMoonLampCheckbox?.checked).toBe(false);
    expect(remainingAnimalSocksCheckbox?.checked).toBe(true);
  });
});
