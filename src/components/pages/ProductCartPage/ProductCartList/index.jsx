import React from "react";
import styled from "styled-components";

import ProductCartItem from "../ProductCartItem";

const CartListCount = styled.p`
  padding: 16px 0;
  border-bottom: 4px solid ${({ theme: { color } }) => color.border};
`;

function ProductCartList({ cartList }) {
  return (
    <>
      <CartListCount>
        든든배송 상품 ({cartList?.length ?? "%ERROR%"}개)
      </CartListCount>
      {cartList?.map((cartItem) => (
        <ProductCartItem
          product={{
            id: 1,
            thumbnailUrl:
              "https://cdn-mart.baemin.com/goods/85/1537405626217m0.jpg",
            name: "PET보틀-정사각(420ml)",
            price: 43400,
          }}
          amount={10}
        />
      ))}
      <ProductCartItem
        product={{
          id: 1,
          thumbnailUrl:
            "https://cdn-mart.baemin.com/goods/85/1537405626217m0.jpg",
          name: "PET보틀-정사각(420ml)",
          price: 43400,
        }}
        amount={10}
      />
      <ProductCartItem
        product={{
          id: 1,
          thumbnailUrl:
            "https://cdn-mart.baemin.com/goods/85/1537405626217m0.jpg",
          name: "PET보틀-정사각(420ml)",
          price: 43400,
        }}
        amount={10}
      />
      <ProductCartItem
        product={{
          id: 1,
          thumbnailUrl:
            "https://cdn-mart.baemin.com/goods/85/1537405626217m0.jpg",
          name: "PET보틀-정사각(420ml)",
          price: 43400,
        }}
        amount={10}
      />
    </>
  );
}

export default ProductCartList;
