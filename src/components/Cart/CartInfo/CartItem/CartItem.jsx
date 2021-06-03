import React from "react";
import PropTypes from "prop-types";
import * as S from "./CartItem.styled";

import CheckBox from "../../../@shared/CheckBox/CheckBox";
import NumberInput from "../../../@shared/NumberInput/NumberInput";
import TrashIcon from "../../../@shared/TrashIcon/TrashIcon";

import { formatPrice } from "../../../../utils/util";
import { useConfirm } from "../../../../hooks/useConfirm";
import { CART } from "../../../../constants/constant";
import { useCart } from "../../../../hooks/useCart";

const CartItem = ({ item }) => {
  const { id, name, thumbnail, amount, price, checked } = item;
  const { addCart, removeCart, toggleCartChecked } = useCart();

  const confirmDelete = useConfirm(
    `'${name}' 를 장바구니에서 제거하시겠습니까?`,
    () => {
      removeCart({ product: item, amount });
    }
  );

  const handleCheckBoxChange = () => {
    toggleCartChecked({ id });
  };

  const changeAmount = (diff) => {
    if (amount + diff < CART.MIN_AMOUNT || amount + diff > CART.MAX_AMOUNT) {
      window.alert(
        `품목당 한번에 최소 ${CART.MIN_AMOUNT}개 이상, 최대 ${CART.MAX_AMOUNT}개 이하만 주문할 수 있습니다.`
      );
      return;
    }

    if (diff > 0) {
      addCart(item);
    } else {
      removeCart({ product: item, amount: 1 });
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
    amount: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    checked: PropTypes.bool.isRequired,
  }).isRequired,
};

export default CartItem;
