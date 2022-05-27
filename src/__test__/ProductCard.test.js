import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import shoppingCartIconBlack from "../asset/shopping-cart-icon-black.svg";

import ProductCard from "../components/pages/ProductListPage/ProductCard";
import { theme } from "../style";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("ProductCard 컴포넌트 렌더 테스트", () => {
  test("장바구니 상품 컴포넌트는 상품 이름, 가격, 장바구니 버튼을 렌더해야 한다.", () => {
    const product = {
      id: 1,
      thumbnailUrl: "https://cdn-mart.baemin.com/goods/85/1537405626217m0.jpg",
      name: "PET보틀-정사각(420ml)",
      price: 1000,
    };
    const iconImg = shoppingCartIconBlack;

    render(
      <ThemeProvider theme={theme}>
        <ProductCard product={product} />
      </ThemeProvider>
    );

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(
      screen.getByText(`${product.price?.toLocaleString()}원`)
    ).toBeInTheDocument();

    expect(screen.getByRole("img")).toHaveAttribute("src", iconImg);
  });
});
