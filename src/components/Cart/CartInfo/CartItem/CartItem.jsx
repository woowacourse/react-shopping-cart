import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import * as S from "./CartItem.styled";

import CheckBox from "../../../@shared/CheckBox/CheckBox";
import NumberInput from "../../../@shared/NumberInput/NumberInput";
import TrashIcon from "../../../@shared/TrashIcon/TrashIcon";

import {
  toggleChecked,
  addToCart,
  removeFromCart,
} from "../../../../store/modules/cartSlice";
import { formatPrice } from "../../../../utils/utils";
import { useConfirm } from "../../../../utils/useConfirm";
import { CART } from "../../../../constants/constant";

const CartItem = ({ item }) => {
  const { id, name, thumbnail, order_id: orderId, price, checked } = item;
  const amount = orderId.length;

  const dispatch = useDispatch();
  const confirmDelete = useConfirm(
    `'${name}' 를 장바구니에서 제거하시겠습니까?`,
    () => {
      dispatch(removeFromCart({ product: item, amount: orderId.length }));
    }
  );

  const handleCheckBoxChange = () => {
    dispatch(toggleChecked({ id }));
  };

  const changeAmount = (diff) => {
    if (amount + diff < CART.MIN_AMOUNT || amount + diff > CART.MAX_AMOUNT) {
      // eslint-disable-next-line no-alert
      window.alert(
        `품목당 한번에 최소 ${CART.MIN_AMOUNT}개 이상, 최대 ${CART.MAX_AMOUNT}개 이하만 주문할 수 있습니다.`
      );
      return;
    }

    if (diff > 0) {
      dispatch(addToCart(item));
    } else {
      dispatch(removeFromCart({ product: item, amount: 1 }));
    }
  };

  return (
    <S.CartItem>
      <S.Detail>
        <CheckBox
          id={`${id}_${name}`}
          name={name}
          label={name}
          checked={checked}
          onChange={handleCheckBoxChange}
        />
        <S.Img src={thumbnail} alt={name} />
        <S.Name>{name}</S.Name>
      </S.Detail>
      <S.Control>
        <TrashIcon onClick={confirmDelete} />
        <NumberInput
          value={amount}
          changeAmount={changeAmount}
          min={CART.MIN_AMOUNT}
          max={CART.MAX_AMOUNT}
        />
        <S.Price>{formatPrice(amount * price)}원</S.Price>
      </S.Control>
    </S.CartItem>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    order_id: PropTypes.arrayOf(PropTypes.number).isRequired,
    price: PropTypes.number.isRequired,
    checked: PropTypes.bool.isRequired,
  }).isRequired,
};

export default CartItem;
