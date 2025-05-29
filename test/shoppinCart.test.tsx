import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ShoppingCart } from "../src/pages/shoppingCart/shoppingCart";
import { MemoryRouter } from "react-router-dom";
import { server } from "../src/mocks/server";

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("장바구니 페이지 테스트", () => {
  it("장바구니 삭제 버튼을 누르면 해당 제품이 삭제된다.", async () => {
    render(
      <MemoryRouter>
        <ShoppingCart />
      </MemoryRouter>
    );

    await waitFor(() => {
      const prevDeleteButtons = screen.getAllByText("삭제");
      expect(prevDeleteButtons.length).toBe(3);
      fireEvent.click(prevDeleteButtons[0]);
    });

    await waitFor(() => {
      const currentDeleteButtons = screen.getAllByText("삭제");
      expect(currentDeleteButtons.length).toBe(2);
    });
  });
});
