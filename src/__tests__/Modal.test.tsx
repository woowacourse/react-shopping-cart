import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import Modal from "../components/OrderList/Modal/Modal";
import { CouponListContext } from "../contexts/CouponContext";

vi.mock("../api/fetchCouponList", () => ({ fetchCouponList: vi.fn() }));

vi.mock("../../hooks/useReceipt", () => ({
  useReceipt: () => ({
    calculateDiscounts: (ids: number[]) => ids.length * 10,
    selectedItems: [{ quantity: 3 }],
    shippingFee: 0,
    allProductPrice: 1000,
  }),
}));

describe("Modal component", () => {
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
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("isModalOpen이 false일 때 아무것도 렌더링되지 않는다", () => {
    const { container } = render(
      <CouponListContext.Provider
        value={{
          couponList: coupons,
          setCouponList: mockSetCouponList,
          setCheckedCoupons: mockSetCheckedCoupons,
        }}
      >
        <Modal isModalOpen={false} onClose={onClose} />
      </CouponListContext.Provider>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("모달이 열렸을 때, 쿠폰과 체크 박스를 보여준다. ", () => {
    render(
      <CouponListContext.Provider
        value={{
          couponList: coupons,
          setCouponList: mockSetCouponList,
          setCheckedCoupons: mockSetCheckedCoupons,
        }}
      >
        <Modal isModalOpen={true} onClose={onClose} />
      </CouponListContext.Provider>
    );

    expect(screen.getByText("쿠폰을 선택해 주세요")).toBeInTheDocument();

    expect(screen.getByText("Fixed 100")).toBeInTheDocument();
    expect(screen.getByText("FreeShip")).toBeInTheDocument();

    expect(screen.getByText(/총 0원 할인 쿠폰 사용하기/)).toBeInTheDocument();
  });

  it("쿠폰 선택 후 setCheckedCoupons와 onClose가 호출되는지 확인한다", () => {
    render(
      <CouponListContext.Provider
        value={{
          couponList: coupons,
          setCouponList: mockSetCouponList,
          setCheckedCoupons: mockSetCheckedCoupons,
        }}
      >
        <Modal isModalOpen={true} onClose={onClose} />
      </CouponListContext.Provider>
    );

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);

    fireEvent.click(screen.getByText(/쿠폰 사용하기/));

    expect(mockSetCheckedCoupons).toHaveBeenCalledWith([1]);
    expect(onClose).toHaveBeenCalled();
  });
});
