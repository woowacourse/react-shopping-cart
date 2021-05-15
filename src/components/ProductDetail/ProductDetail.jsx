import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productAPI } from "../../utils/api";
import { formatPrice } from "../../utils/utils";
import Button from "../@shared/Button/Button";
import * as S from "./ProductDetail.styled";

const ProductDetail = () => {
  const { productId } = useParams();

  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const getProductDetail = async (id) => {
      try {
        const productDetail = await productAPI.fetchById(id);

        setDetail(productDetail);
      } catch (error) {
        // TODO: error handling 추가
      }
    };

    getProductDetail(productId);
  }, [productId]);

  const { name, price = 0, image_url: imageURL } = detail ?? {};

  return (
    <S.ProductDetail>
      <S.ImgContainer>
        <S.Img src={imageURL} alt={name} />
        <S.Name>{name}</S.Name>
      </S.ImgContainer>
      <S.PriceContainer>
        <S.PriceLabel>금액</S.PriceLabel>
        <S.Price>{formatPrice(price)}원</S.Price>
      </S.PriceContainer>
      <Button type="primary">
        <S.ButtonContent>장바구니</S.ButtonContent>
      </Button>
    </S.ProductDetail>
  );
};

export default ProductDetail;
