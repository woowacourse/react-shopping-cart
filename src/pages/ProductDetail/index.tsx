import React from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import actions from "../../actions";

import { Button, CartAnimation, ProductImage } from "../../Components";
import { DivFlexBetween } from "../../SharedStyled/Flex";
import { Container } from "./styles";

import { COLOR } from "../../constants/theme";
import { RootState } from "../../store";
import { Product } from "../../types";

const ProductDetail = () => {
  const {
    state: {
      product: { product_id, name, price, image_url },
    },
  } = useLocation<{ product: Product }>();

  const { animation } = useSelector(({ cart: { animation } }: RootState) => ({ animation }));
  const dispatch = useDispatch();

  const onClickCart = (product_id: string) => {
    dispatch(actions.cart.post.request(product_id));
  };

  return (
    <Container>
      <div>
        <div style={{ padding: "1.875rem", borderBottom: `2px solid ${COLOR.GRAY_150}` }}>
          <ProductImage size="35.625rem" src={image_url} />
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
          onClick={() => {
            onClickCart(product_id);
          }}
        >
          장바구니
        </Button>
      </div>
      {animation.isShow && <CartAnimation />}
    </Container>
  );
};

export default ProductDetail;
