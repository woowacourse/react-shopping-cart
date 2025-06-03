import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import Receipt from "./Receipt";

import TestProvider from "../../../utils/TestProvider";

import { MIN_PRICE_FOR_FREE_SHIPPING, DEFAULT_SHIPPING_FEE, FREE_SHIPPING_FEE } from "../../../constants/shipping";


describe("ReceiptTest", () => {
  it("주문 금액이 100,000원 미만인 경우 배송비는 3,000원으로 설정된다.", () => {
    const allProductPrice = 10000;
    const shippingFee = allProductPrice < MIN_PRICE_FOR_FREE_SHIPPING ? DEFAULT_SHIPPING_FEE : FREE_SHIPPING_FEE;

    render(
      <TestProvider>
        <Receipt allProductPrice={allProductPrice} shippingFee={shippingFee} />
      </TestProvider>
    );
    expect(screen.getByText("3,000원")).toBeInTheDocument();
  });

  it("주문 금액이 100,000원 이상인 경우 배송비는 0원으로 설정된다.", () => {
    const allProductPrice = MIN_PRICE_FOR_FREE_SHIPPING;
    const shippingFee = allProductPrice < MIN_PRICE_FOR_FREE_SHIPPING ? DEFAULT_SHIPPING_FEE : FREE_SHIPPING_FEE;

    render(
      <TestProvider>
        <Receipt allProductPrice={allProductPrice} shippingFee={shippingFee} />
      </TestProvider>
    );
    expect(screen.getByText("0원")).toBeInTheDocument();
  });
});

