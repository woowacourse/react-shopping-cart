import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleChecked,
  changeQuantity,
  deleteItemByCartId,
  selectCartItemByCartId,
} from "../../store/modules/cartSlice";
import { formatPrice } from "../../utils/utils";
import CheckBox from "../@shared/CheckBox/CheckBox";
import NumberInput from "../@shared/NumberInput/NumberInput";
import TrashIcon from "../@shared/TrashIcon/TrashIcon";
import Label from "../@shared/Label/Label";
import Image from "../@shared/Image/Image";
import * as S from "./CartListItem.styled";

const CartListItem = ({ cartId }) => {
  const {
    productId,
    name,
    imageURL,
    quantity,
    price,
    checked,
  } = useSelector((state) => selectCartItemByCartId(state, cartId));

  const dispatch = useDispatch();

  const handleCheckBoxChange = () => {
    dispatch(toggleChecked({ productId, checked: !checked }));
  };

  const handleQuantityChange = (event) => {
    dispatch(
      changeQuantity({ productId, quantity: event.target.valueAsNumber || 0 })
    );
  };

  const handleQuantityBlur = (event) => {
    dispatch(
      changeQuantity({ productId, quantity: event.target.valueAsNumber || 1 })
    );
  };

  const handleItemDelete = () => {
    if (!window.confirm(`'${name}' 를 장바구니에서 제거하시겠습니까?`)) return;

    dispatch(deleteItemByCartId(cartId));
  };
  const checkBoxId = `${cartId}_${name}`;

  return (
    <S.CartListItem>
      <S.Detail>
        <Label srOnly htmlFor={checkBoxId}>
          {name}
        </Label>
        <CheckBox
          id={checkBoxId}
          name={name}
          checked={checked}
          onChange={handleCheckBoxChange}
        />
        <S.ImageContainer>
          <Image src={imageURL} alt={name} />
        </S.ImageContainer>
        <S.Name>{name}</S.Name>
      </S.Detail>
      <S.Control>
        <TrashIcon onClick={handleItemDelete} />
        <NumberInput
          value={quantity}
          onChange={handleQuantityChange}
          onBlur={handleQuantityBlur}
        />
        <S.Price>{formatPrice(quantity * price)}원</S.Price>
      </S.Control>
    </S.CartListItem>
  );
};

CartListItem.propTypes = {
  cartId: PropTypes.number.isRequired,
};

export default CartListItem;
