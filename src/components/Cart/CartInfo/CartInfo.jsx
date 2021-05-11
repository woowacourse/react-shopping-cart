import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import * as S from "./CartInfo.styled";

import CartItem from "./CartItem/CartItem";
import Button from "../../@shared/Button/Button";
import CheckBox from "../../@shared/CheckBox/CheckBox";

import {
  removeChecked,
  toggleAllChecked,
} from "../../../store/modules/cartSlice";
import { MESSAGE } from "../../../constants/constants";
import { useConfirm } from "../../../utils/useConfirm";

const checkAllIdentifier = (cart) => {
  const checkedSet = new Set(Object.values(cart).map(({ checked }) => checked));

  switch (checkedSet.size) {
    case 0:
      return false;

    case 1:
      return [...checkedSet].pop();

    default:
      return null;
  }
};

const CartInfo = ({ cart }) => {
  const dispatch = useDispatch();
  const confirmDelete = useConfirm(
    MESSAGE.CONFIRM.DELETE_PRODUCTS_FROM_CART,
    () => {
      dispatch(removeChecked());
    }
  );
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    const isCheckAll = checkAllIdentifier(cart);
    if (isCheckAll !== null) {
      setCheckAll(isCheckAll);
    }
  }, [cart]);

  const handleCheckBoxChange = () => {
    dispatch(toggleAllChecked({ checked: !checkAll }));
    setCheckAll(!checkAll);
  };

  const checkAllLabel = checkAll ? "선택해제" : "전체선택";

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
      <S.Title>든든배송 상품 ({Object.keys(cart).length}개)</S.Title>
      <S.List aria-label="cart-item-list">
        {Object.entries(cart).map(([id, item]) => (
          <CartItem key={id} item={item} />
        ))}
      </S.List>
    </S.CartInfo>
  );
};

CartInfo.propTypes = {
  cart: PropTypes.shape({ id: PropTypes.shape(CartItem.propTypes.item) })
    .isRequired,
};

export default CartInfo;
