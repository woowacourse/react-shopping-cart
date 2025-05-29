import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { cartMockData } from "../__mocks__/cartData";
import { productListMockData } from "../__mocks__/productListMockData";
import App from "../App";

let currentCart = [...cartMockData];

jest.mock("../utils/getBrowserBaseUrl", () => {
  return {
    getBrowserBaseUrl: jest.fn(() => "/"),
  };
});

jest.mock("../api/cart", () => ({
  getShoppingCartData: jest.fn(() => Promise.resolve(currentCart)),
  addCartItem: jest.fn((productId: string) => {
    const foundProduct = productListMockData.find((p) => p.id === productId);
    if (!foundProduct) {
      throw new Error(`${productId} id를 가진 Product가 존재하지 않습니다.`);
    }
    currentCart.push({
      id: String(currentCart.length + 1),
      quantity: 1,
      product: foundProduct,
    });
    return Promise.resolve();
  }),
  deleteCartItem: jest.fn((cartId: string) => {
    currentCart = currentCart.filter((item) => item.id.toString() !== cartId);
    return Promise.resolve();
  }),
  patchCartItem: jest.fn((cartId: string, quantity: number) => {
    const cartItem = currentCart.find((item) => item.id === cartId);
    if (!cartItem) {
      throw new Error(`${cartId} id를 가진 Cart가 존재하지 않습니다.`);
    }
    cartItem.quantity = quantity;
    return Promise.resolve();
  }),
}));

jest.mock("../api/baseAPI", () => ({
  baseAPI: jest.fn(() => Promise.resolve(productListMockData)),
}));

const PRODUCT_NAME_1 = "프린세스 미용놀이";
const PRODUCT_NAME_2 = "코카콜라 제로 1.5L";

function expectChecked(button: HTMLElement, checked: boolean) {
  expect(button).toHaveAttribute("aria-checked", checked ? "true" : "false");
}

describe("장바구니 주요 통합 기능 (커스텀 체크박스)", () => {
  beforeEach(() => {
    currentCart = [
      ...cartMockData.map((item) => ({
        ...item,
        product: { ...item.product },
      })),
    ];
  });

  afterEach(() => {
    currentCart = [...cartMockData];
    jest.resetModules();
  });

  it("1. 장바구니 데이터를 불러오고 화면에 렌더링한다", async () => {
    render(<App />);
    expect(await screen.findByText(PRODUCT_NAME_1)).toBeInTheDocument();
    expect(screen.getByText(PRODUCT_NAME_2)).toBeInTheDocument();

    const checkboxes = screen.getAllByRole("cart-item-checkbox");
    checkboxes.forEach((cb) => expectChecked(cb, true));

    expect(screen.getByText(/총 결제 금액/)).toBeInTheDocument();
    expect(screen.getByText(/배송비/)).toBeInTheDocument();
  });

  it("2. 상품 선택을 해제하면 결제 금액이 감소한다", async () => {
    render(<App />);
    const checkboxes = await screen.findAllByRole("cart-item-checkbox");
    fireEvent.click(checkboxes[0]);

    expectChecked(checkboxes[0], false);
    await waitFor(() => {
      expect(screen.getByText(/총 결제 금액/)).not.toHaveTextContent("3,110원");
    });
  });
  it("3. 총 금액이 10만원 이상이면 배송비가 무료가 된다", async () => {
    render(<App />);
    const plusButton = (await screen.findAllByLabelText("수량 증가"))[0];
    for (let i = 1; i < 10; i++) {
      fireEvent.click(plusButton);
    }

    await waitFor(() => {
      const shippingLabel = screen.getByLabelText("shipping-fee");
      expect(shippingLabel).toHaveTextContent("0원");
    });
  });

  it("4. 총 금액이 10만원 미만이면 배송비가 3,000원이다", async () => {
    render(<App />);

    await waitFor(() => {
      const shippingLabel = screen.getByLabelText("shipping-fee");
      expect(shippingLabel).toHaveTextContent("3,000원");
    });
  });

  it("5. 상품 수량을 증가시키면 금액이 반영된다", async () => {
    render(<App />);
    const plusButton = (await screen.findAllByLabelText("수량 증가"))[0];
    fireEvent.click(plusButton);

    await waitFor(() => {
      expect(screen.getByText(/총 결제 금액/)).not.toHaveTextContent("3,110원");
    });
  });

  it("6. 상품을 삭제하면 장바구니에서 사라진다", async () => {
    render(<App />);
    const deleteButtons = await screen.findAllByRole("button", {
      name: /삭제/i,
    });
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.queryByText(PRODUCT_NAME_1)).not.toBeInTheDocument();
    });
  });

  it("7. 장바구니가 비어 있으면 안내 메시지가 보인다", async () => {
    render(<App />);
    let deleteButtons = await screen.findAllByRole("button", { name: /삭제/i });
    fireEvent.click(deleteButtons[0]);
    await waitFor(async () => {
      const items = await screen.findAllByRole("cart-item-checkbox");
      expect(items.length).toBe(1);
    });

    deleteButtons = await screen.findAllByRole("button", { name: /삭제/i });
    fireEvent.click(deleteButtons[0]);
    await waitFor(() => {
      expect(screen.getByText(/장바구니.*없/)).toBeInTheDocument();
    });
  });

  it("8. 전체 선택 버튼을 누르면 모두 해제되고, 주문금액/배송비 0, 주문확인 비활성화", async () => {
    render(<App />);
    const allCheckbox = await screen.findByRole("cart-item-all-checkbox");
    fireEvent.click(allCheckbox);

    const checkboxes = await screen.findAllByRole("cart-item-checkbox");
    checkboxes.forEach((cb) =>
      expect(cb).toHaveAttribute("aria-checked", "false")
    );

    await waitFor(() => {
      expect(screen.getByText("주문 금액").nextSibling).toHaveTextContent(
        "0원"
      );
      expect(screen.getByLabelText("shipping-fee")).toHaveTextContent("0원");
      expect(screen.getByText("총 결제 금액").nextSibling).toHaveTextContent(
        "0원"
      );
    });

    const orderConfirmButton = screen.getByRole("order-button");
    expect(orderConfirmButton).toBeDisabled();
  });

  it("9. 개별 체크 해제하면 전체 선택도 해제된다", async () => {
    render(<App />);
    const checkboxes = await screen.findAllByRole("cart-item-checkbox");
    fireEvent.click(checkboxes[0]);
    const allCheckbox = await screen.findByRole("cart-item-all-checkbox");
    expect(allCheckbox).toHaveAttribute("aria-checked", "false");
  });

  it("10. 개별 체크 해제 상태에서 전체 선택 버튼 누르면 모두 다시 선택된다", async () => {
    render(<App />);
    const checkboxes = await screen.findAllByRole("cart-item-checkbox");
    fireEvent.click(checkboxes[0]);
    expect(checkboxes[0]).toHaveAttribute("aria-checked", "false");
    const allCheckbox = await screen.findByRole("cart-item-all-checkbox");
    fireEvent.click(allCheckbox);
    expect(allCheckbox).toHaveAttribute("aria-checked", "true");
  });

  it('11. "주문하기" 버튼은 선택된 상품이 없으면 비활성화된다', async () => {
    render(<App />);
    const orderConfirmButton = screen.getByRole("order-button");
    expect(orderConfirmButton).toBeDisabled();

    const checkboxes = await screen.findAllByRole("cart-item-checkbox");
    fireEvent.click(checkboxes[0]);
    expect(orderConfirmButton).toBeEnabled();
  });
  it('12. "주문하기" 버튼을 누르면 주문 확인 페이지로 이동하고, 주문 정보가 올바르게 표시된다', async () => {
    render(<App />);
    await screen.findByText(PRODUCT_NAME_1);

    const orderConfirmButton = screen.getByRole("order-button");
    expect(orderConfirmButton).not.toBeDisabled();

    fireEvent.click(orderConfirmButton);

    await waitFor(() => {
      expect(screen.getByText("주문 확인")).toBeInTheDocument();

      expect(
        screen.getByText(/총\s*2\s*종류의 상품\s*2\s*개를 주문합니다\./)
      ).toBeInTheDocument();

      expect(
        screen.getByText(/최종 결제 금액을 확인해 확인해 주세요\./)
      ).toBeInTheDocument();

      expect(screen.getByText("총 결제 금액")).toBeInTheDocument();

      const totalPrice = 10000 + 2100 + 3000;
      const totalPriceText = `${totalPrice.toLocaleString()}원`;

      expect(
        screen.getByLabelText(`총 결제 금액은 ${totalPriceText} 입니다.`)
      ).toHaveTextContent(totalPriceText);

      expect(screen.getByText(totalPriceText)).toBeInTheDocument();

      expect(screen.getByRole("button", { name: "결제하기" })).toBeDisabled();
    });
  });
});
