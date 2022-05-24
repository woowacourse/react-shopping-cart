import React from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {ReactComponent as BlackCartIcon} from 'assets/blackCartIcon.svg';

import useCartItem from 'hook/useCartItem';

import * as S from 'component/Item/style';

import {PATH} from 'constant';

export default function Item({productInfo}) {
  const navigation = useNavigate();

  const cart = useSelector((state) => state.cartReducer.cart);

  const {addCartItem, deleteCartItem} = useCartItem();

  const {image, name, price, id} = productInfo;

  const isInCart = cart.some((cartItem) => cartItem.id === id);

  const handleImageClick = ({id}) => navigation(`${PATH.DETAIL}/${id}`);

  const handleIconClick = ({image, name, price, id}, isInCart) => {
    if (isInCart) {
      deleteCartItem(Number.parseInt(id));
      return;
    }

    addCartItem({
      image,
      name,
      price,
      id: Number.parseInt(id),
      quantity: 1,
    });
  };

  return (
    <S.ItemLayout>
      <S.ItemImage
        src={image}
        alt="상품 이미지"
        width="282px"
        height="282px"
        onClick={() => handleImageClick(productInfo)}
      />
      <S.InfoBox>
        <S.NamePriceBox>
          <S.ItemNameLink to={`${PATH.DETAIL}/${id}`}>{name}</S.ItemNameLink>
          <S.ItemPriceSpan>{price.toLocaleString()} 원</S.ItemPriceSpan>
        </S.NamePriceBox>
        <S.DeleteButton isInCart={isInCart} onClick={() => handleIconClick(productInfo, isInCart)}>
          <BlackCartIcon />
        </S.DeleteButton>
      </S.InfoBox>
    </S.ItemLayout>
  );
}

Item.propTypes = {
  productInfo: PropTypes.object,
};
