import { fireEvent, render, screen } from "@testing-library/react";
import { ShoppingCart } from "../src/pages/shoppingCart/shoppingCart";
import { MemoryRouter } from "react-router-dom";

describe("장바구니 페이지 테스트", () => {
  it("장바구니 삭제 버튼을 누르면 해당 제품이 삭제된다.", () => {
    render(
      <MemoryRouter>
        <ShoppingCart />
      </MemoryRouter>
    );

    const deleteButtons = screen.getAllByText("삭제");
    fireEvent.click(deleteButtons[0]);
  });
});
