import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  selectCartItemByProductId,
} from "../../store/modules/cartSlice";
import { formatPrice } from "../../utils/utils";
import PATH from "../../constants/path";
import CartIcon from "../@shared/CartIcon/CartIcon";
import Image from "../@shared/Image/Image";
import * as S from "./ProductListItem.styled";

const ProductListItem = ({ item }) => {
  const { productId, imageURL, name, price } = item;

  const dispatch = useDispatch();
  const history = useHistory();

  const cartItem = useSelector((state) =>
    selectCartItemByProductId(state, productId)
  );

  const handleAddCartClick = () => {
    dispatch(addToCart(item));
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      history.push(`${PATH.PRODUCT}/${productId}`);
    }
  };

  return (
    <S.ProductListItem>
      <S.Preview>
        <Image src={imageURL} alt={name} />
        <S.ImgOverlay onClick={handleOverlayClick}>
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
    </S.ProductListItem>
  );
};

ProductListItem.propTypes = {
  item: PropTypes.shape({
    productId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductListItem;
