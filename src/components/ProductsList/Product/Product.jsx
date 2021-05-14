import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../store/modules/cartSlice";
import { formatPrice } from "../../../utils/utils";
import CartIcon from "../../@shared/CartIcon/CartIcon";
import * as S from "./Product.styled";

import noImage from "./no_image.png";

const Product = ({ product }) => {
  const { product_id: productId, image_url: imageURL, name, price } = product;

  const cartAmount = useSelector(
    (state) => state.cart.list[productId]?.amount ?? 0
  );
  const dispatch = useDispatch();

  const [thumbnail, setThumbnail] = useState(imageURL);

  const handleThumbnailError = () => {
    setThumbnail(noImage);
  };

  const handleAddCartClick = () => {
    dispatch(addToCart({ product }));
  };

  return (
    <S.Product>
      <S.Preview>
        <S.Img src={thumbnail} alt={name} onError={handleThumbnailError} />
        <S.LinkToDetail to={`/product/${productId}`} />
        <S.ImgOverlay>
          <S.AddCartButton onClick={handleAddCartClick}>
            {cartAmount === 0 ? (
              <CartIcon type="product" />
            ) : (
              <S.Amount>{cartAmount}</S.Amount>
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
    product_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Product;
