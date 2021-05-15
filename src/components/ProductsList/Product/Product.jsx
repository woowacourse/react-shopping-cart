import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  selectCartItemByProductId,
} from "../../../store/modules/cartSlice";
import { formatPrice } from "../../../utils/utils";
import CartIcon from "../../@shared/CartIcon/CartIcon";
import Image from "../../@shared/Image/Image";
import * as S from "./Product.styled";

const Product = ({ product }) => {
  const { productId, imageURL, name, price } = product;

  const dispatch = useDispatch();

  const cartItem = useSelector((state) =>
    selectCartItemByProductId(state, productId)
  );

  const handleAddCartClick = () => {
    dispatch(addToCart(product));
  };

  return (
    <S.Product>
      <S.Preview>
        <Image src={imageURL} alt={name} />
        <S.LinkToDetail to={`/product/${productId}`} />
        <S.ImgOverlay>
          <S.AddCartButton onClick={handleAddCartClick}>
            {cartItem ? (
              <S.Amount>{cartItem.quantity}</S.Amount>
            ) : (
              <CartIcon type="product" />
            )}
          </S.AddCartButton>
        </S.ImgOverlay>
      </S.Preview>
      <S.Detail>
        <S.Name>{name}</S.Name>
        <S.Price>{formatPrice(price)} 원</S.Price>
      </S.Detail>
    </S.Product>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    productId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default Product;
