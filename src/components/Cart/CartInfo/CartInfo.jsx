import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import * as S from "./CartInfo.styled";

import CartItem from "./CartItem/CartItem";
import Button from "../../@shared/Button/Button";
import CheckBox from "../../@shared/CheckBox/CheckBox";

import { toggleAllChecked } from "../../../store/modules/cartSlice";
import { MESSAGE } from "../../../constants/constant";
import { useConfirm } from "../../../utils/useConfirm";
import Empty from "../../@mixins/Empty/Empty";
import { useCart } from "../../../hooks/useCart";

const CartInfo = ({ cart }) => {
  const dispatch = useDispatch();
  const { isCheckAll, removeCheckedCart } = useCart();
  const confirmDelete = useConfirm(
    MESSAGE.CONFIRM.DELETE_PRODUCTS_FROM_CART,
    () => {
      removeCheckedCart(cart);
    }
  );

  const [checkAll, setCheckAll] = useState(true);

  const handleCheckBoxChange = () => {
    dispatch(toggleAllChecked({ checked: !checkAll }));
    setCheckAll(!checkAll);
  };

  useEffect(() => {
    if (isCheckAll !== null) {
      setCheckAll(isCheckAll);
    }
  }, [isCheckAll]);

  const checkAllLabel = checkAll ? "선택해제" : "전체선택";
  const cartLength = Object.keys(cart).length;
  return (
    <S.CartInfo>
      <S.Menu>
        <S.CheckAllLabel htmlFor="checkAll">
          <CheckBox
            id="checkAll"
            name="checkAll"
            label={checkAllLabel}
            checked={checkAll}
            onChange={handleCheckBoxChange}
          />
          {checkAllLabel}
        </S.CheckAllLabel>
        <S.RemoveChecked>
          <Button theme="secondary" onClick={confirmDelete}>
            상품삭제
          </Button>
        </S.RemoveChecked>
      </S.Menu>
      <S.Title>든든배송 상품 ({cartLength}개)</S.Title>
      {cartLength === 0 ? (
        <Empty>장바구니가 텅 비어있어요</Empty>
      ) : (
        <S.List aria-label="cart-item-list">
          {Object.entries(cart).map(([id, item]) => (
            <CartItem key={id} item={item} />
          ))}
        </S.List>
      )}
    </S.CartInfo>
  );
};

CartInfo.propTypes = {
  cart: PropTypes.shape({ id: PropTypes.shape(CartItem.propTypes.item) })
    .isRequired,
};

export default CartInfo;
