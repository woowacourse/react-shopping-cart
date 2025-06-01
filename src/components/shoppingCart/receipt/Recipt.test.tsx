import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import TestProvider from "../../../utils/TestProvider";

import Receipt from "./Receipt";

describe("ReceiptTest", () => {
  it("주문 금액이 100,000원 미만인 경우 배송비는 3,000원으로 설정된다.", () => {
    const allProductPrice = 10000;
    const shippingFee = allProductPrice < 100000 ? 3000 : 0;

    render(
      <TestProvider>
        <Receipt allProductPrice={allProductPrice} shippingFee={shippingFee} />
      </TestProvider>
    );
    expect(screen.getByText("3,000원")).toBeInTheDocument();
  });

  it("주문 금액이 100,000원 이상인 경우 배송비는 0원으로 설정된다.", () => {
    const allProductPrice = 100000;
    const shippingFee = allProductPrice < 100000 ? 3000 : 0;

    render(
      <TestProvider>
        <Receipt allProductPrice={allProductPrice} shippingFee={shippingFee} />
      </TestProvider>
    );
    expect(screen.getByText("0원")).toBeInTheDocument();
  });
});
