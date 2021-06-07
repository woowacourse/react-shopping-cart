import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { Button, ProductImage } from "../../Components";
import actions from "../../actions";
import { RootState } from "../../store";
import { Container, ImageDesc, ImageTitle, ImageMain, Price } from "./styles";
import { COLOR } from "../../constants/theme";

const ProductDetail = ({ location }: RouteComponentProps) => {
  const products = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();

  const productId = location.search.slice(1).split("=")[1];
  const currentProduct = products[productId];

  useEffect(() => {
    const isProductsEmpty = !Object.keys(products).length;

    if (isProductsEmpty) {
      dispatch(actions.products.get.request());
    }
  }, [products]);

  return (
    <Container>
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
        onClick={() => dispatch(actions.cart.post.request(productId))}
      >
        장바구니
      </Button>
    </Container>
  );
};

export default ProductDetail;
