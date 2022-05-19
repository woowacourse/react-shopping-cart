import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { render } from "../tests/test-utils";

import ProductCard from "./pages/ProductListPage/ProductCard";
import ProductDetailCard from "./pages/ProductDetailPage/ProductDetailCard";
import CartItem from "./pages/ShoppingCartPage/CartItem";

const dummyProduct = {
  id: 1,
  thumbnailUrl:
    "https://cdn-mart.baemin.com/sellergoods/bulk/20211224-151131/22548-main-01.jpg",
  name: "[든든] 방울토마토5kg (1~2번과)",
  price: 25000,
  quantity: 3,
};

describe("상품 정보 관련 컴포넌트 렌더링 테스트", () => {
  test("상품 카드 컴포넌트는 상품 이미지, 상품 이름, 가격, 장바구니 담기 버튼을 렌더해야 한다.", () => {
    // when
    render(
      <ProductCard
        product={dummyProduct} // given
        onClickAddToCartButton={() => {
          alert("This is AddToCartButton");
        }}
      />
    );

    // then
    expect(screen.getByAltText(dummyProduct.name)).toHaveAttribute(
      "src",
      dummyProduct.thumbnailUrl
    );
    expect(screen.getByText(dummyProduct.name)).toBeInTheDocument();
    expect(
      screen.getByText(`${dummyProduct.price.toLocaleString()}원`)
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute(
      "title",
      "장바구니 담기"
    );
  });

  test("상품 상세 카드 컴포넌트는 상품 이미지, 상품 이름, 가격, 장바구니 담기 버튼을 렌더해야 한다.", () => {
    // when
    render(
      <ProductDetailCard
        product={dummyProduct} // given
        onClickAddToCartButton={() => {
          alert("This is AddToCartButton");
        }}
      />
    );

    // then
    expect(screen.getByAltText(dummyProduct.name)).toHaveAttribute(
      "src",
      dummyProduct.thumbnailUrl
    );
    expect(screen.getByText(dummyProduct.name)).toBeInTheDocument();
    expect(
      screen.getByText(`${dummyProduct.price.toLocaleString()}원`)
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("장바구니 담기");
  });

  test("장바구니 아이템 컴포넌트는 체크박스, 상품 이미지, 상품 이름, 상품 수량, 수량에 따른 가격, 삭제 버튼을 렌더해야 한다.", () => {
    // when
    render(
      <CartItem
        product={dummyProduct} // given
        selected={true}
        updateQuantity={() => {
          alert("Update Quantity");
        }}
        onClickCheckBox={() => {
          alert("CheckBox Clicked");
        }}
        deleteSelf={() => {
          alert("deleteSelf");
        }}
      />
    );

    // then
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(screen.getByAltText(dummyProduct.name)).toHaveAttribute(
      "src",
      dummyProduct.thumbnailUrl
    );
    expect(screen.getByText(dummyProduct.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(dummyProduct.quantity)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${(dummyProduct.price * dummyProduct.quantity).toLocaleString()}원`
      )
    ).toBeInTheDocument();
    expect(screen.getByTitle("장바구니에서 삭제하기")).toBeInTheDocument();
  });
});
