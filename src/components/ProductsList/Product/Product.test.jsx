import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import store from "../../../store";
import { clearCart } from "../../../store/modules/cartSlice";
import Product from "./Product";

const product = {
  id: 1,
  name: "탕용기(소)",
  price: 57000,
  thumbnail: "https://cdn-mart.baemin.com/goods/85/1537405626217m0.jpg",
};

describe("Product", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Product product={product} />
      </Provider>
    );
  });

  afterEach(() => {
    store.dispatch(clearCart());
  });

  test("카트 아이콘을 클릭하면 카트아이콘 대신 숫자 1이 표시된다", () => {
    const button = screen.getByRole("button");
    const cartIcon = screen.getByTitle("cart-icon");

    expect(cartIcon).toBeInTheDocument();

    fireEvent.click(cartIcon);

    expect(cartIcon).not.toBeInTheDocument();
    expect(button).toHaveTextContent("1");
  });

  test("숫자를 클릭하면 숫자가 1씩 증가한다", () => {
    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(button).toHaveTextContent("1");

    fireEvent.click(button);
    expect(button).toHaveTextContent("2");

    fireEvent.click(button);
    expect(button).toHaveTextContent("3");
  });
});
