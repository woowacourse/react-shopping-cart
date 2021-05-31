import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { useProduct } from "../../hooks/useProduct";
import * as S from "./ProductDetail.styles";
import { formatPrice } from "../../utils/utils";
import Button from "../@shared/Button/Button";
import { useCart } from "../../hooks/useCart";

const ProductDetail = ({ match }) => {
  const { products, loading } = useProduct();
  const { items: cart, addCart } = useCart();
  const product = products[match.params.id] ?? {
    name: "",
    thumbnail: "",
    price: 0,
  };

  useEffect(() => {}, [products]);

  const addToCart = () => {
    addCart(product);
  };

  return (
    <S.ProductDetail>
      {loading ? (
        "상품 정보를 불러오고 있습니다"
      ) : (
        <>
          <S.ImgWrapper>
            <S.Img alt={product.name} src={product.thumbnail} />
          </S.ImgWrapper>
          <S.Name>{product.name}</S.Name>
          <S.Price>{`${formatPrice(product.price)}원`}</S.Price>
          <S.Cart>
            <Button onClick={addToCart}>
              장바구니에 담기(현재 {cart[product.id]?.amount ?? 0}개)
            </Button>
          </S.Cart>
        </>
      )}
    </S.ProductDetail>
  );
};

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ProductDetail;
