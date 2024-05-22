import { CartItem } from '@appTypes/shoppingCart';
import { CountButton } from '@components/common';
import { useUpdateCartItemCount } from '@hooks/shoppingCart';
import useFetchErrorBoundary from '@hooks/useFetchErrorBoundary';

import CountAlertModal from '../CartListDescription/CountAlertModal';

import * as Styled from './CartItemCountButtonGroup.styled';

const CartItemCountButtonGroup = ({ cartItem }: { cartItem: CartItem }) => {
  const { quantity } = cartItem;

  const { onUpdateCartItemCount, errorMessage, fetchError } = useUpdateCartItemCount(cartItem);
  useFetchErrorBoundary(fetchError);

  return (
    <Styled.CartItemButtonGroup>
      <CountButton onClick={() => onUpdateCartItemCount('minus')} sign="minus" />
      <span>{quantity}</span>
      <CountButton onClick={() => onUpdateCartItemCount('plus')} sign="plus" />
      <CountAlertModal errorMessage={errorMessage} />
    </Styled.CartItemButtonGroup>
  );
};

export default CartItemCountButtonGroup;
