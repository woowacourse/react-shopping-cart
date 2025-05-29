import { render, screen } from "@testing-library/react";
import { ShoppingCart } from "../src/pages/shoppingCart/shoppingCart";

describe("RTL Test", () => {
  it("should render", () => {
    render(<ShoppingCart />);
    expect(screen.getByText("react-shopping-cart")).toBeInTheDocument();
  });
});
