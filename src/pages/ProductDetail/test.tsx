import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import ProductDetail from ".";
import { Product } from "../../types";

const product: Product = {
  product_id: "1",
  name: "강릉초당순두부인절미아이스크림",
  price: 2500,
  image_url: "www.google.co.kr",
};

describe("상품 상세 페이지 테스트", () => {
  it("상품 id에 해당하는 상품명, 상품 가격이 화면에 나타난다.", () => {
    const { container } = render(
      <MemoryRouter initialEntries={[{ state: { product } }]}>
        <ProductDetail />
      </MemoryRouter>
    );

    expect(container).toHaveTextContent(product.name);
    expect(container).toHaveTextContent(String(product.price));
  });
});
