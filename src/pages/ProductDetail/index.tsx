import React from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import actions from "../../actions";
import { RootState } from "../../store";

import { DivFlexBetween } from "../../SharedStyled/Flex";
import { Button, CartAnimation, ProductImage } from "../../Components";
import { Loading } from "../../Components/@shared";
import { Container } from "./styles";

import { COLOR } from "../../constants/theme";
import { Product } from "../../types";
import { toNumberWithComma } from "../../utils/format";

const ProductDetail = () => {
  const {
    state: {
      product: { productId, name, price, imageUrl },
    },
  } = useLocation<{ product: Product }>();

  const {
    animation,
    loading,
    requestErrorMessage,
  } = useSelector(({ cart: { animation, loading, requestErrorMessage } }: RootState) => ({
    animation,
    loading,
    requestErrorMessage,
  }));
  const dispatch = useDispatch();

  const onClickCart = (productId: string) => {
    dispatch(actions.cart.post.request(productId));
  };

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (requestErrorMessage) {
    return (
      <Container>
        <p>requestErrorMessage</p>
      </Container>
    );
  }

  return (
    <Container>
      <div>
        <div style={{ padding: "1.875rem", borderBottom: `2px solid ${COLOR.GRAY_150}` }}>
          <ProductImage size="35.625rem" src={imageUrl} />
          <p>{name}</p>
        </div>
        <div style={{ padding: "1.875rem" }}>
          <DivFlexBetween style={{ width: "100%" }}>
            <span>금액</span>
            <span>{toNumberWithComma(price)}</span>
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
            onClickCart(productId);
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
