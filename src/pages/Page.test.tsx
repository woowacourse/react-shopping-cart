import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, it, expect } from "vitest";

import { DEFAULT_URL, routes } from "../router";

describe("라우터 테스트", () => {
  it("/order-check 경로로 state를 넘기면 결제 정보가 보인다", () => {
    const state = {
      checkedProductsLength: 3,
      cartItemCheckListTotalQuantity: 7,
      totalPrice: 93000,
    };

    const testRouter = createMemoryRouter(routes, {
      initialEntries: [
        {
          pathname: `${DEFAULT_URL}/payment-amount-check`,
          state,
        },
      ],
    });

    render(<RouterProvider router={testRouter} />);
    expect(screen.getByText("결제하기")).not.toBeNull();
  });
});
