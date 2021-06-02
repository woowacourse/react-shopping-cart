import React from 'react';
import Checkbox from 'components/shared/Checkbox/Checkbox';
import QuantityInput from 'components/shared/QuantityInput/QuantityInput';
import noImageURL from 'assets/images/no_image.jpg';
import { ReactComponent as DeleteIcon } from 'assets/images/delete.svg';
import * as T from 'types';
import { updateQuantity } from 'modules/cartSlice';
import { useAppDispatch } from 'modules/hooks';
import CART_ITEM_QUANTITY from 'constants/cart';
import Styled from './CartItem.styles';

interface CartItemProps {
  cartItem: T.CartItem;
  onCheck: (id: number, isChecked: boolean) => void;
  onDelete: (id: T.CartItem['cartId']) => void;
}

const CartItem = (props: CartItemProps) => {
  const { cartItem, onCheck, onDelete } = props;
  const { cartId, name, price, imageUrl, quantity, checked } = cartItem;

  const dispatch = useAppDispatch();

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = event.target.valueAsNumber;
    if (newQuantity <= CART_ITEM_QUANTITY.MIN || Number.isNaN(newQuantity)) {
      dispatch(updateQuantity({ id: cartId, quantity: CART_ITEM_QUANTITY.MIN }));
      return;
    }
    if (newQuantity >= CART_ITEM_QUANTITY.MAX) {
      dispatch(updateQuantity({ id: cartId, quantity: CART_ITEM_QUANTITY.MAX }));
      return;
    }
    dispatch(updateQuantity({ id: cartId, quantity: newQuantity }));
  };

  const handleIncrement = () => {
    if (quantity >= CART_ITEM_QUANTITY.MAX) return;
    dispatch(updateQuantity({ id: cartId, quantity: quantity + 1 }));
  };

  const handleDecrement = () => {
    if (quantity <= CART_ITEM_QUANTITY.MIN) return;
    dispatch(updateQuantity({ id: cartId, quantity: quantity - 1 }));
  };

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    onCheck(cartId, isChecked);
  };

  const handleDelete = () => {
    onDelete(cartId);
  };

  const totalPrice = price * quantity;

  return (
    <Styled.Root>
      <Checkbox checked={checked} onChange={handleCheck} />
      <Styled.Image src={imageUrl || noImageURL} alt="item-image" />
      <Styled.Title>{name}</Styled.Title>
      <Styled.Option>
        <Styled.DeleteButton onClick={handleDelete}>
          <DeleteIcon />
        </Styled.DeleteButton>
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

export default CartItem;
