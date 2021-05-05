import React from "react";
import PropTypes from "prop-types";
import * as S from "./Product.styled";

const Product = ({ product: { thumbnail, name, price } }) => (
  <S.Product>
    <S.ProductImg src={thumbnail} alt={name} />
    <S.ProductDetail>
      <span>{name}</span>
      <span>{price} 원</span>
    </S.ProductDetail>
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
