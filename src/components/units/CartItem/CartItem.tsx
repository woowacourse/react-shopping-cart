import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import Checkbox from 'components/shared/Checkbox/Checkbox';
import QuantityInput from 'components/shared/QuantityInput/QuantityInput';
import { ReactComponent as DeleteIcon } from 'assets/images/delete.svg';
import CART_ITEM_QUANTITY from 'constants/cart';
import cartItemsSlice from 'slices/cartSlice';
import { toPriceFormat } from 'utils';
import useImageFallback from 'hooks/useImageFallback';
import * as T from 'types';
import Styled from './CartItem.styles';

interface Props {
  cartItem: T.CartItem;
  onCheck: (id: number, isChecked: boolean) => void;
  onDelete: (id: T.CartId) => void;
}

const CartItem = (props: Props): ReactElement => {
  const { updateQuantity } = cartItemsSlice.actions;

  const { cartItem, onCheck, onDelete } = props;
  const { cartId, name, imageUrl, price, checked, quantity } = cartItem;

  const dispatch = useDispatch();

  const { imageUrl: currentImageUrl, onImageLoadError } = useImageFallback(imageUrl);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = event.target.valueAsNumber;

    if (newQuantity <= CART_ITEM_QUANTITY.MIN || Number.isNaN(newQuantity)) {
      dispatch(updateQuantity({ cartId, quantity: CART_ITEM_QUANTITY.MIN }));
      return;
    }

    if (newQuantity >= CART_ITEM_QUANTITY.MAX) {
      dispatch(updateQuantity({ cartId, quantity: CART_ITEM_QUANTITY.MAX }));
      return;
    }

    dispatch(updateQuantity({ cartId, quantity: newQuantity }));
  };

  const handleIncrement = () => {
    if (quantity >= CART_ITEM_QUANTITY.MAX) return;

    dispatch(updateQuantity({ cartId, quantity: quantity + 1 }));
  };

  const handleDecrement = () => {
    if (quantity <= CART_ITEM_QUANTITY.MIN) return;

    dispatch(updateQuantity({ cartId, quantity: quantity - 1 }));
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
      <Styled.Image src={currentImageUrl} alt={name} onError={onImageLoadError} />
      <Styled.Title>{name}</Styled.Title>
      <Styled.Option>
        <Styled.Delete onClick={handleDelete}>
          <DeleteIcon />
        </Styled.Delete>
        <Styled.QuantityInputWrapper>
          <QuantityInput
            value={quantity}
            min={CART_ITEM_QUANTITY.MIN}
            max={CART_ITEM_QUANTITY.MAX}
            onChangeInput={handleChangeInput}
            onIncrease={handleIncrement}
            onDecrease={handleDecrement}
          />
        </Styled.QuantityInputWrapper>
        <Styled.Price>{toPriceFormat(totalPrice)} 원</Styled.Price>
      </Styled.Option>
    </Styled.Root>
  );
};

export default CartItem;
