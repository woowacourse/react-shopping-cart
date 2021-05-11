import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../../utils/utils";
import * as S from "./Product.styled";
import CartIcon from "../../@shared/CartIcon/CartIcon";

import { addToCart } from "../../../store/modules/cartSlice";
import { CART } from "../../../constants/constants";

const Product = ({ product }) => {
  const { id, thumbnail, name, price } = product;

  const cartAmount = useSelector((state) => state.cart[id]?.amount ?? 0);
  const dispatch = useDispatch();

  const handleAddCartClick = () => {
    if (cartAmount >= CART.MAX_AMOUNT) {
      // eslint-disable-next-line no-alert
      window.alert(
        `품목당 한번에 최소 ${CART.MIN_AMOUNT}개 이상, 최대 ${CART.MAX_AMOUNT}개 이하만 주문할 수 있습니다.`
      );
      return;
    }

    dispatch(addToCart({ product }));
  };

  return (
    <S.Product>
      <S.Preview>
        <S.Img src={thumbnail} alt={name} />
        <S.ImgDetail>
          <S.Button onClick={handleAddCartClick}>
            {cartAmount === 0 ? (
              <CartIcon type="product" />
            ) : (
              <span className="product-amount">{cartAmount}</span>
            )}
          </S.Button>
        </S.ImgDetail>
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
};

export default Product;
