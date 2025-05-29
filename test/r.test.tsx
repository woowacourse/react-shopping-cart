import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../src/App";
import { CartProvider } from "../src/stores/CartContext";

describe("RTL Test", () => {
  it("should render", () => {
    render(<App />);
    expect(screen.getByText("react-shopping-cart")).toBeInTheDocument();
  });
});

describe("장바구니 기능 테스트", () => {
  beforeEach(() => {
    render(
      <CartProvider>
        <App />
      </CartProvider>
    );
  });

  it("장바구니 페이지가 정상적으로 렌더링된다", async () => {
    await waitFor(() => {
      expect(screen.getByText("장바구니")).toBeInTheDocument();
    });
  });

  it("상품 선택/해제 시 결제 금액이 동적으로 변경된다", async () => {
    const checkbox = await screen.findByRole("checkbox", {
      name: /상품 선택/i,
    });
    const totalPrice = screen.getByText(/총 결제금액/i);

    const initialPrice = totalPrice.textContent;
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(totalPrice.textContent).not.toBe(initialPrice);
    });
  });

  it("상품 수량 변경이 가능하다", async () => {
    const quantityInput = (await screen.findByRole("spinbutton", {
      name: /수량/i,
    })) as HTMLInputElement;

    fireEvent.change(quantityInput, { target: { value: "2" } });

    await waitFor(() => {
      expect(quantityInput.value).toBe("2");
    });
  });

  it("상품 삭제가 가능하다", async () => {
    const deleteButton = await screen.findByRole("button", { name: /삭제/i });
    const productCard = screen.getByTestId("product-card");

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(productCard).not.toBeInTheDocument();
    });
  });

  it("10만원 이상 구매 시 배송비가 무료가 된다", async () => {
    const quantityInput = (await screen.findByRole("spinbutton", {
      name: /수량/i,
    })) as HTMLInputElement;
    const shippingFee = screen.getByText(/배송비/i);

    fireEvent.change(quantityInput, { target: { value: "10" } });

    await waitFor(() => {
      expect(shippingFee).toHaveTextContent("0원");
    });
  });
});
