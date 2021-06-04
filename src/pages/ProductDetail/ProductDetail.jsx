import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectProductByProductId } from "../../store/modules/productSlice";
import { addToCart } from "../../store/modules/cartSlice";
import { formatPrice } from "../../utils/utils";
import Button from "../../components/@shared/Button/Button";
import Image from "../../components/@shared/Image/Image";

import * as S from "./ProductDetail.styled";

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    selectProductByProductId(state, Number(productId))
  );

  const { name, price = 0, imageURL } = product ?? {};

  const handleButtonClick = () => {
    dispatch(addToCart(product));
  };

  return (
    <S.ProductDetail>
      <S.ImgContainer>
        <Image alt={name} src={imageURL} />
        <S.Name>{name}</S.Name>
      </S.ImgContainer>
      <S.PriceContainer>
        <S.PriceLabel>금액</S.PriceLabel>
        <S.Price>{formatPrice(price)}원</S.Price>
      </S.PriceContainer>
      <Button type="primary" onClick={handleButtonClick}>
        <S.ButtonContent>장바구니</S.ButtonContent>
      </Button>
    </S.ProductDetail>
  );
};

export default ProductDetail;
