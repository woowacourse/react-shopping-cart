import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { formatPrice } from "../../../utils/utils";
import * as S from "./Product.styled";
import CartIcon from "../../@shared/CartIcon/CartIcon";

import { CART } from "../../../constants/constant";

const Product = ({ product, amount, addToCart, loading }) => {
  const history = useHistory();
  const { thumbnail, name, price } = product;

  const handleProductClick = (e) => {
    if (e.target !== e.currentTarget) return;
    history.push(`/product/${product.id}`);
  };

  const handleAddCartClick = (e) => {
    e.stopPropagation();

    if (loading) return;
    if (amount >= CART.MAX_AMOUNT) {
      // eslint-disable-next-line no-alert
      window.alert(
        `한 품목당 최대 ${CART.MAX_AMOUNT}개 이하만 장바구니에 담을 수 있습니다.`
      );
      return;
    }

    addToCart(product);
  };

  return (
    <S.Product onClick={handleProductClick}>
      <S.Preview>
        <S.Thumbnail>
          <S.Img src={thumbnail} alt={name} />
        </S.Thumbnail>
        <S.Button onClick={handleAddCartClick}>
          {amount === 0 ? (
            <CartIcon type="product" />
          ) : (
            <span className="product-amount">{amount}</span>
          )}
        </S.Button>
      </S.Preview>
      <S.Detail>
        <span className="product-name">{name}</span>
        <span className="product-price">{formatPrice(price)} 원</span>
      </S.Detail>
    </S.Product>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
  amount: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Product;
