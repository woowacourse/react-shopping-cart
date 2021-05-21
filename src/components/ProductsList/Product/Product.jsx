import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../../utils/utils";
import * as S from "./Product.styled";
import CartIcon from "../../@shared/CartIcon/CartIcon";

import { addToCart } from "../../../store/modules/cartSlice";

const Product = ({ product }) => {
  const { id, thumbnail, name, price } = product;

  const cartAmount = useSelector((state) => state.cart[id]?.amount ?? 0);
  const dispatch = useDispatch();

  const handleAddCartClick = () => {
    dispatch(addToCart({ product }));
  };

  return (
    <S.Product>
      <S.Preview>
        <S.Img src={thumbnail} alt={name} />
        <S.ImgDetail>
          <S.AddCartButton onClick={handleAddCartClick}>
            {cartAmount === 0 ? (
              <CartIcon type="product" />
            ) : (
              <span className="product-amount">{cartAmount}</span>
            )}
          </S.AddCartButton>
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
