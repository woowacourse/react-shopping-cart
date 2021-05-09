import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  toggleChecked,
  changeAmount,
} from "../../../../store/modules/cartSlice";
import { formatPrice } from "../../../../utils/utils";
import CheckBox from "../../../@shared/CheckBox/CheckBox";
import NumberInput from "../../../@shared/NumberInput/NumberInput";
import TrashIcon from "../../../@shared/TrashIcon/TrashIcon";
import * as S from "./CartItem.styled";

const CartItem = ({
  item: { id, name, thumbnail, amount, price, checked },
}) => {
  const dispatch = useDispatch();

  const handleCheckBoxChange = () => {
    dispatch(toggleChecked({ id }));
  };

  const handleAmountChange = (event) => {
    dispatch(changeAmount({ id, amount: event.target.valueAsNumber || 0 }));
  };

  const handleAmountBlur = (event) => {
    dispatch(changeAmount({ id, amount: event.target.valueAsNumber || 1 }));
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
        <TrashIcon />
        <NumberInput
          value={amount}
          onChange={handleAmountChange}
          onBlur={handleAmountBlur}
        />
        <span>{formatPrice(amount * price)}원</span>
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
