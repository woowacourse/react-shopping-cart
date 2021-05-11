import React from 'react';
import { useDispatch } from 'react-redux';
import Styled from './CartItem.styles';
import { ReactComponent as DeleteIcon } from '../../../assets/images/delete.svg';
import Checkbox from '../../shared/Checkbox/Checkbox';
import QuantityInput from '../../shared/QuantityInput/QuantityInput';
import NoImageURL from '../../../assets/images/no_image.jpg';
import * as T from '../../../types';
import { updateQuantityRequest } from '../../../modules/cartItems/actions';
import CART_ITEM_QUANTITY from '../../../constants/cart';

type CartItemProps = {
  cartItem: T.CartItem;
  checked?: boolean;
};

const CartItem = (props: CartItemProps) => {
  const { cartItem, checked } = props;
  const { id, product, quantity } = cartItem;
  const { name, image, price } = product;

  const dispatch = useDispatch();

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = event.target.valueAsNumber;

    if (newQuantity <= CART_ITEM_QUANTITY.MIN || Number.isNaN(newQuantity)) {
      dispatch(updateQuantityRequest(id, CART_ITEM_QUANTITY.MIN));
      return;
    }

    if (newQuantity >= CART_ITEM_QUANTITY.MAX) {
      dispatch(updateQuantityRequest(id, CART_ITEM_QUANTITY.MAX));
      return;
    }

    dispatch(updateQuantityRequest(id, newQuantity));
  };

  const handleIncrement = () => {
    if (quantity >= CART_ITEM_QUANTITY.MAX) return;

    dispatch(updateQuantityRequest(id, quantity + 1));
  };

  const handleDecrement = () => {
    if (quantity <= CART_ITEM_QUANTITY.MIN) return;

    dispatch(updateQuantityRequest(id, quantity - 1));
  };

  const totalPrice = price * quantity;

  return (
    <Styled.Root>
      <Checkbox checked={checked} />
      <Styled.Image src={image || NoImageURL} alt="김말이" />
      <Styled.Title>{name}</Styled.Title>
      <Styled.Option>
        <Styled.Delete>
          <DeleteIcon />
        </Styled.Delete>
        <Styled.QuantityInputWrapper>
          <QuantityInput
            value={quantity}
            min={1}
            max={99}
            onChangeInput={handleChangeInput}
            onIncrease={handleIncrement}
            onDecrease={handleDecrement}
          />
        </Styled.QuantityInputWrapper>
        <Styled.Price>{totalPrice.toLocaleString('ko-KR')} 원</Styled.Price>
      </Styled.Option>
    </Styled.Root>
  );
};

CartItem.defaultProps = {
  checked: false,
};

export default CartItem;
