import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import Button from 'component/common/Button';

import useCartItem from 'hook/useCartItem';

import * as S from 'component/DetailItem/style';

import theme from 'theme/theme';

export default function DetailItem({productInfo}) {
  const {addCartItem} = useCartItem();

  const cartItem = useSelector((state) => state.cartReducer.cart);

  const {image, name, price, id} = productInfo;

  const isInCart = cartItem.some((item) => item.id === Number.parseInt(id));

  const handleCartButtonClick = () => {
    const cartInfo = {
      image,
      name,
      price,
      id: Number.parseInt(id),
      quantity: 1,
    };

    addCartItem(cartInfo);
  };

  return (
    <S.DetailItemLayout>
      <img src={image} alt="상품 이미지" width="570px" height="570px" />
      <S.ItemNameSpan>{name}</S.ItemNameSpan>
      <S.ItemPriceBox>
        <span>금액</span>
        <S.PriceFont fontSize="32px">{price.toLocaleString()}원</S.PriceFont>
      </S.ItemPriceBox>
      <Button
        backgroundColor={theme.GRAY_BROWN}
        width="640px"
        height="100px"
        onClick={handleCartButtonClick}
        disabled={isInCart}
      >
        장바구니
      </Button>
    </S.DetailItemLayout>
  );
}

DetailItem.propTypes = {
  productInfo: PropTypes.object,
};
