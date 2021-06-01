import React from "react";
import { useHistory, useLocation } from "react-router";

import { Button, ProductImage } from "../../Components";
import { DivFlexBetween } from "../../SharedStyled/Flex";
import { Container } from "./styles";

import { COLOR } from "../../constants/theme";
import { Product } from "../../types";

const ProductDetail = () => {
  const {
    state: {
      product: { product_id, name, price, image_url },
    },
  } = useLocation<{ product: Product }>();
  const history = useHistory();

  return (
    <Container>
      <div style={{ width: "35.625rem" }}>
        <div style={{ padding: "1.875rem", borderBottom: `2px solid ${COLOR.GRAY_150}` }}>
          <ProductImage size="100%" src={image_url} />
          <p>{name}</p>
        </div>
        <div style={{ padding: "1.875rem" }}>
          <DivFlexBetween style={{ width: "100%" }}>
            <span>금액</span>
            <span>{price}</span>
          </DivFlexBetween>
        </div>
        <Button
          type="button"
          style={{
            width: "100%",
            height: "6.25rem",
            backgroundColor: COLOR.BROWN,
            fontSize: "2rem",
            fontWeight: 700,
            color: COLOR.WHITE,
          }}
        >
          장바구니
        </Button>
      </div>
    </Container>
  );
};

export default ProductDetail;
