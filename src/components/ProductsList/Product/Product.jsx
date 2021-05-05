import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../../../utils/utils";
import * as S from "./Product.styled";
import CartIcon from "../../@shared/CartIcon/CartIcon";

const Product = ({ product: { thumbnail, name, price } }) => (
  <S.Product>
    <S.Preview>
      <S.Img src={thumbnail} alt={name} />
      <S.ImgDetail>
        <S.AddCartButton>
          <CartIcon type="product" />
        </S.AddCartButton>
      </S.ImgDetail>
    </S.Preview>
    <S.Detail>
      <span className="product-name">{name}</span>
      <span className="product-price">{formatPrice(price)} 원</span>
    </S.Detail>
  </S.Product>
);

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
};

export default Product;
