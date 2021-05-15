import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/modules/cartSlice";
import { productAPI } from "../../utils/api";
import { formatPrice } from "../../utils/utils";
import Button from "../@shared/Button/Button";
import Image from "../@shared/Image/Image";

import * as S from "./ProductDetail.styled";

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProductDetail = async (id) => {
      try {
        const productDetail = await productAPI.fetchByProductId(id);

        setProduct(productDetail);
      } catch (error) {
        // TODO: error handling 추가
      }
    };

    getProductDetail(productId);
  }, [productId]);

  const { name, price = 0, imageURL } = product;

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
