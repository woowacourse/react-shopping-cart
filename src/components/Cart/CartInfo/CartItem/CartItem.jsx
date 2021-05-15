import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  toggleChecked,
  changeQuantity,
  deleteItemByCartId,
} from "../../../../store/modules/cartSlice";
import { formatPrice } from "../../../../utils/utils";
import CheckBox from "../../../@shared/CheckBox/CheckBox";
import NumberInput from "../../../@shared/NumberInput/NumberInput";
import TrashIcon from "../../../@shared/TrashIcon/TrashIcon";
import Label from "../../../@shared/Label/Label";
import Image from "../../../@shared/Image/Image";
import * as S from "./CartItem.styled";

const CartItem = ({ item }) => {
  const { cartId, productId, name, imageURL, quantity, price, checked } = item;

  const dispatch = useDispatch();

  const handleCheckBoxChange = (event) => {
    dispatch(toggleChecked({ productId, checked: event.target.checked }));
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
    <S.CartItem>
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
        <span>{formatPrice(quantity * price)}원</span>
      </S.Control>
    </S.CartItem>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    productId: PropTypes.number.isRequired,
    cartId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    checked: PropTypes.bool.isRequired,
  }).isRequired,
};

export default CartItem;
