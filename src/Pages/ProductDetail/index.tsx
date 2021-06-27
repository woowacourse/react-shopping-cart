import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router-dom";

import { Button, ProductImage } from "../../Components";
import actions from "../../actions";
import { RootState } from "../../store";
import { Container, ImageDesc, ImageTitle, ImageMain, Price } from "./styles";
import { COLOR } from "../../constants/theme";

const ProductDetail = ({ location }: RouteComponentProps) => {
  const { products } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const productId = new URLSearchParams(location.search).get("productId");
  const currentProduct = productId ? products[productId] : null;

  useEffect(() => {
    if (currentProduct === undefined) {
      dispatch(actions.products.get.request());
    }
  }, [currentProduct]);

  return (
      currentProduct !== null
      ? <Container>
          <ImageMain>
            <ProductImage size="100%" src={currentProduct?.imageSrc} aria-label={`${currentProduct?.name} 이미지`} />
            <ImageTitle>{currentProduct?.name ?? ""}</ImageTitle>
          </ImageMain>
          <ImageDesc>
            <p>금액</p>
            <Price>{currentProduct?.price ?? ""}</Price>
          </ImageDesc>
          <Button
            width="100%"
            height="5rem"
            color={COLOR.WHITE}
            fontSize="2rem"
            backgroundColor={COLOR.BROWN}
            onClick={() => dispatch(actions.cart.post.request(Number(productId)))}
          >
            장바구니
          </Button>
        </Container>
      : <Redirect to="/" />
  );
};

export default ProductDetail;
