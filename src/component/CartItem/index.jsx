import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import CheckBox from 'component/common/CheckBox';
import QuantityBox from 'component/common/QuantityBox';

import useSelectedItem from 'hook/useSelectedItem';
import useCartItem from 'hook/useCartItem';

import * as S from 'component/CartItem/style';

import {PATH} from 'constant';

export default function CartItem({cartInfo, initialChecked = false}) {
  const {addSelectedItem, deleteSelectedItem} = useSelectedItem();

  const {deleteCartItem, increaseQuantity, decreaseQuantity} = useCartItem();

  const {image, name, price, quantity, id} = cartInfo;

  return (
    <S.CartItemLayout>
      <CheckBox
        initialChecked={initialChecked}
        productId={Number.parseInt(id)}
        handleCheckedTrue={addSelectedItem}
        handleCheckedFalse={deleteSelectedItem}
      />
      <Link to={`${PATH.DETAIL}/${id}`}>
        <img src={image} alt="장바구니 상품 이미지" width="144px" height="144px" />
      </Link>
      <S.ItemNameParagraph>{name}</S.ItemNameParagraph>
      <S.EditQuantityBox>
        <S.StyledDeleteIcon onClick={() => deleteCartItem(id)} />
        <QuantityBox
          quantity={quantity}
          handleIncrease={() => increaseQuantity({quantity, id})}
          handleDecrease={() => decreaseQuantity({quantity, id})}
        />
        <S.PriceSpan>{price.toLocaleString()}원</S.PriceSpan>
      </S.EditQuantityBox>
    </S.CartItemLayout>
  );
}

CartItem.propTypes = {
  cartInfo: PropTypes.object,
  initialChecked: PropTypes.bool,
};
