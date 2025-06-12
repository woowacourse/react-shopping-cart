import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import Modal from "../components/OrderList/Modal/Modal";
import {
  CouponListContext,
  CouponListProvider,
} from "../contexts/CouponContext";
import { ProductCategory } from "../types/Product";
import { CouponResponse } from "../types/Coupon";
import { ErrorProvider } from "../contexts/ErrorContext";

const productCatrgory: ProductCategory = "전체";
const mockSelectedCartItemList = [
  {
    id: 1,
    quantity: 3,
    isChecked: true,
    product: {
      id: 999,
      name: "주렁",
      price: 99999999999999999,
      imageUrl: "",
      category: productCatrgory,
      quantity: 999,
    },
  },
];

vi.mock("../../hooks/useReceipt", () => ({
  useReceipt: (list: any) => ({
    calculateDiscounts: (ids: number[]) => ids.length * 10,
    selectedItems: list ?? [],
    shippingFee: 0,
    allProductPrice: 1000,
  }),
}));

vi.mock("../api/fetchCouponList", () => ({ fetchCouponList: vi.fn() }));

describe("modalTest", () => {
  const mockSetCouponList = vi.fn();
  const mockSetCheckedCoupons = vi.fn();
  const onClose = vi.fn();

  const coupons = [
    {
      id: 1,
      code: "FIX100",
      description: "Fixed 100",
      discountType: "fixed",
      discount: 100,
      minimumAmount: 500,
      expirationDate: "2025-12-31",
    },
    {
      id: 2,
      code: "FREE5",
      description: "FreeShip",
      discountType: "freeShipping",
      minimumAmount: 0,
      expirationDate: "2025-12-31",
    },
  ] as CouponResponse[];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("isModalOpen이 false일 때 아무것도 렌더링되지 않는다", () => {
    const { container } = render(
      <ErrorProvider>
        <CouponListProvider>
          <Modal
            isModalOpen={false}
            onClose={onClose}
            selectedCartItemList={mockSelectedCartItemList}
            shippingFee={0}
          />
        </CouponListProvider>
      </ErrorProvider>
    );

    expect(container).toBeEmptyDOMElement();
  });
});
