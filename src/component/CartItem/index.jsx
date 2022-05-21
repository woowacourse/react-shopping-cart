import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import CheckBox from 'component/common/CheckBox';
import * as S from 'component/CartItem/style';
import QuantityBox from 'component/common/QuantityBox';
import {PATH} from 'constant';

export default function CartItem({
  itemImgURL,
  itemName,
  itemPrice,
  quantity = 1,
  id,
  handleDeleteIconClick = () => void 0,
  handleCheckedTrue = () => void 0,
  handleCheckedFalse = () => void 0,
  handleIncrease = () => void 0,
  handleDecrease = () => void 0,
  initialChecked = false,
}) {
  return (
    <S.CartItemLayout>
      <CheckBox
        initialChecked={initialChecked}
        productId={Number(id)}
        handleCheckedTrue={handleCheckedTrue}
        handleCheckedFalse={handleCheckedFalse}
      />
      <Link to={`${PATH.DETAIL}/${id}`}>
        <img src={itemImgURL} alt="장바구니 상품 이미지" width="144px" height="144px" />
      </Link>
      <S.ItemNameParagraph>{itemName}</S.ItemNameParagraph>
      <S.EditQuantityBox>
        <S.StyledDeleteIcon onClick={handleDeleteIconClick} />
        <QuantityBox
          quantity={quantity}
          handleIncrease={() => handleIncrease(id)}
          handleDecrease={() => handleDecrease(id)}
        />
        <S.PriceSpan>{itemPrice.toLocaleString()}원</S.PriceSpan>
      </S.EditQuantityBox>
    </S.CartItemLayout>
  );
}

CartItem.propTypes = {
  itemImgURL: PropTypes.string,
  itemName: PropTypes.string,
  itemPrice: PropTypes.number,
  quantity: PropTypes.number,
  id: PropTypes.number,
  handleDeleteIconClick: PropTypes.func,
  handleCheckedTrue: PropTypes.func,
  handleCheckedFalse: PropTypes.func,
  handleIncrease: PropTypes.func,
  handleDecrease: PropTypes.func,
  initialChecked: PropTypes.bool,
};
