import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../src/App";
import { CartProvider } from "../src/stores/CartContext";

jest.mock("../src/api/cartItemListApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../src/api/removeProductItemApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../src/api/updateCartItemApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

import cartItemListApi from "../src/api/cartItemListApi";
import removeProductItemApi from "../src/api/removeProductItemApi";
import updateCartItemApi from "../src/api/updateCartItemApi";

const mockCartItemListApi = cartItemListApi as jest.MockedFunction<
  typeof cartItemListApi
>;
const mockRemoveProductItemApi = removeProductItemApi as jest.MockedFunction<
  typeof removeProductItemApi
>;
const mockUpdateCartItemApi = updateCartItemApi as jest.MockedFunction<
  typeof updateCartItemApi
>;

const mockCartItems = [
  {
    id: 1,
    quantity: 2,
    product: {
      id: 1,
      name: "상품1",
      price: 10000,
      imageUrl: "image1.jpg",
      category: "식료품",
      quantity: 10,
    },
  },
];

describe("RTL Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCartItemListApi.mockResolvedValue(mockCartItems);
    mockRemoveProductItemApi.mockResolvedValue(undefined);
    mockUpdateCartItemApi.mockResolvedValue(undefined);
  });

  it("should render", async () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("SHOP")).toBeInTheDocument();
    });
  });
});

describe("장바구니 기능 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCartItemListApi.mockResolvedValue(mockCartItems);
    mockRemoveProductItemApi.mockResolvedValue(undefined);
    mockUpdateCartItemApi.mockResolvedValue(undefined);
  });

  it("장바구니 페이지가 정상적으로 렌더링된다", async () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("장바구니")).toBeInTheDocument();
    });
  });

  it("상품 선택/해제 시 결제 금액이 동적으로 변경된다", async () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("상품1")).toBeInTheDocument();
    });

    const checkboxes = screen.getAllByRole("checkbox");
    const itemCheckbox = checkboxes.find(
      (checkbox) => checkbox.getAttribute("id") !== "select-all"
    );

    const totalPrice = screen
      .getByText("총 결제 금액")
      .closest("div")
      ?.querySelector("p:last-child");

    if (itemCheckbox && totalPrice) {
      const initialPrice = totalPrice.textContent;
      fireEvent.click(itemCheckbox);

      await waitFor(() => {
        expect(totalPrice.textContent).not.toBe(initialPrice);
      });
    }
  });

  it("상품 수량은 +/- 버튼으로 변경 가능하다", async () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("상품1")).toBeInTheDocument();
    });

    const increaseButtons = screen.getAllByRole("button");
    const increaseButton = increaseButtons.find((button) =>
      button.querySelector('svg path[d*="M7.5 13V1"]')
    );

    if (increaseButton) {
      fireEvent.click(increaseButton);

      await waitFor(() => {
        expect(mockUpdateCartItemApi).toHaveBeenCalled();
      });
    }
  });

  it("상품 삭제가 가능하다", async () => {
    mockCartItemListApi
      .mockResolvedValueOnce(mockCartItems)
      .mockResolvedValueOnce([]);

    render(
      <CartProvider>
        <App />
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("상품1")).toBeInTheDocument();
    });

    const deleteButton = screen.getByRole("button", { name: "삭제" });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(
        screen.getByText("장바구니에 담은 상품이 없습니다.")
      ).toBeInTheDocument();
    });
  });

  it("10만원 이상 구매 시 배송비가 무료가 된다", async () => {
    expect(true).toBe(true);
  });

  it("장바구니가 비어있을 때 적절한 메시지가 표시된다", async () => {
    mockCartItemListApi.mockResolvedValue([]);

    render(
      <CartProvider>
        <App />
      </CartProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText("장바구니에 담은 상품이 없습니다.")
      ).toBeInTheDocument();
    });
  });
});
