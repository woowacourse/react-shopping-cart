import { render, screen, fireEvent } from "@testing-library/react";
import CartItem from "../CartItem";

const mockCartData = {
  id: 1,
  product: {
    id: 1,
    name: "테스트 상품",
    price: 10000,
    imageUrl: "https://example.com/image.jpg",
    category: "테스트 카테고리",
  },
  quantity: 1,
};

describe("CartItem", () => {
  const defaultProps = {
    cartData: mockCartData,
    updateCartItem: jest.fn(),
    increaseCartItem: jest.fn(),
    justifyIsChecked: jest.fn(),
    controlCheckBox: jest.fn(),
    removeCartItem: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("상품 정보가 올바르게 표시되어야 한다", () => {
    render(<CartItem {...defaultProps} />);

    expect(screen.getByText("테스트 상품")).toBeInTheDocument();

    expect(screen.getByText("10,000원")).toBeInTheDocument();

    const productImage = screen.getByRole("img", { name: "테스트 상품" });
    expect(productImage).toHaveAttribute(
      "src",
      "https://example.com/image.jpg"
    );
  });

  it("체크박스를 통해 상품을 선택할 수 있어야 한다", () => {
    defaultProps.justifyIsChecked.mockReturnValue(false);
    render(<CartItem {...defaultProps} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(defaultProps.controlCheckBox).toHaveBeenCalledWith(mockCartData.id);
  });

  it("삭제 버튼을 통해 상품을 삭제할 수 있어야 한다", () => {
    render(<CartItem {...defaultProps} />);

    const deleteButton = screen.getByRole("button", { name: "삭제" });
    fireEvent.click(deleteButton);

    expect(defaultProps.removeCartItem).toHaveBeenCalledWith(mockCartData.id);
  });

  it("수량 조절 버튼으로 상품 수량을 변경할 수 있어야 한다", () => {
    render(<CartItem {...defaultProps} />);

    const increaseButton = screen.getByRole("button", { name: "+" });
    const decreaseButton = screen.getByRole("button", { name: "-" });

    fireEvent.click(increaseButton);
    expect(defaultProps.increaseCartItem).toHaveBeenCalledWith(
      mockCartData.id,
      2
    );

    fireEvent.click(decreaseButton);
    expect(defaultProps.updateCartItem).toHaveBeenCalledWith(mockCartData.id);
  });
});
