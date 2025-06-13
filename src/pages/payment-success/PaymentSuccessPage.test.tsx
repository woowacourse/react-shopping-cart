import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PaymentSuccessPage from "./PaymentSuccessPage";
import { ROUTES } from "@/shared/config/routes";

const mockOrderList = [
  {
    id: 1,
    quantity: 2,
    product: {
      id: 1,
      name: "토마토",
      price: 10000,
      imageUrl: "1",
      quantity: 5,
    },
  },
  {
    id: 2,
    quantity: 3,
    product: {
      id: 2,
      name: "우비",
      price: 50000,
      imageUrl: "2",
      quantity: 5,
    },
  },
];

const mockOrderTotalPrice = 170_000;

const mockState = {
  orderList: mockOrderList,
  paymentPrice: mockOrderTotalPrice,
};

vi.mock("@/shared/hooks/useValidateLocationState", () => ({
  __esModule: true,
  default: () => ({
    state: mockState,
    isValidating: false,
  }),
}));

describe("OrderSuccessPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("orderList의 종류, 각 아이템의 개수, 총 주문 금액이 올바르게 렌더링된다", async () => {
    await act(async () => {
      render(
        <MemoryRouter
          initialEntries={[
            { pathname: ROUTES.PAYMENT_SUCCESS, state: mockState },
          ]}
        >
          <PaymentSuccessPage />
        </MemoryRouter>
      );
    });

    expect(screen.getByText(/총 2종류의 상품/)).toBeInTheDocument();
    expect(screen.getByText(/5개를 주문합니다/)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockOrderTotalPrice.toLocaleString()}원`)
    ).toBeInTheDocument();
  });
});
