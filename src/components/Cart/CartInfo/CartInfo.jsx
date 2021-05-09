import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { toggleAllChecked } from "../../../store/modules/cartSlice";
import Button from "../../@shared/Button/Button";
import CheckBox from "../../@shared/CheckBox/CheckBox";
import CartItem from "./CartItem/CartItem";
import * as S from "./CartInfo.styled";

const CartInfo = ({ cart }) => {
  const dispatch = useDispatch();

  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    const checkedSet = new Set(
      Object.values(cart).map(({ checked }) => checked)
    );

    if (checkedSet.size === 1) {
      setCheckAll([...checkedSet].pop());
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
          <Button type="secondary">상품삭제</Button>
        </S.RemoveChecked>
      </S.Menu>
      <S.Title>든든배송 상품 ({Object.keys(cart).length}개)</S.Title>
      <div>
        {Object.entries(cart).map(([id, item]) => (
          <CartItem key={id} item={item} />
        ))}
      </div>
    </S.CartInfo>
  );
};

CartInfo.propTypes = {
  cart: PropTypes.shape({ id: PropTypes.shape(CartItem.propTypes.item) })
    .isRequired,
};

export default CartInfo;
