import React from "react";
import { PropTypes } from "prop-types";
import { useProduct } from "../../hooks/useProduct";
import * as S from "./ProductDetail.styles";
import { formatPrice } from "../../utils/util";
import Button from "../@shared/Button/Button";
import { useCart } from "../../hooks/useCart";
import { CART } from "../../constants/constant";

const ProductDetail = ({ match }) => {
  const { products, loading } = useProduct();

  const { items: cart, addCart, loading: cartLoading } = useCart();

  const product = products[match.params.id] ?? {
    name: "",
    thumbnail: "",
    price: 0,
  };
  const amount = cart[product?.id]?.amount ?? 0;

  const addToCart = () => {
    if (amount >= CART.MAX_AMOUNT) {
      // eslint-disable-next-line no-alert
      window.alert(
        `한 품목당 최대 ${CART.MAX_AMOUNT}개 이하만 장바구니에 담을 수 있습니다.`
      );
      return;
    }

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
            {cartLoading ? (
              <Button onClick={() => {}} disabled>
                장바구니에 상품 추가중입니다
              </Button>
            ) : (
              <Button onClick={addToCart}>
                장바구니에 담기(현재 {amount}개)
              </Button>
            )}
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
