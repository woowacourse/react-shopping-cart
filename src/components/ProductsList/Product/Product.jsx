import React from "react";
import PropTypes from "prop-types";

import { formatPrice } from "../../../utils/utils";
import * as S from "./Product.styled";
import CartIcon from "../../@shared/CartIcon/CartIcon";

import { CART } from "../../../constants/constant";

const Product = ({ product, amount, addToCart }) => {
  const { thumbnail, name, price } = product;

  const handleAddCartClick = () => {
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
    <S.Product>
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
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
  amount: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default Product;
