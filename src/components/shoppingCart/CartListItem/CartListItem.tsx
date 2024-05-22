import { CartItem } from '@appTypes/shoppingCart';
import { CartItemInfo, Checkbox, DeleteButton } from '@components/common';
import { CartListDescription } from '@components/shoppingCart';
import { useCheckCartItem, useDeleteCartItem, useFetchErrorBoundary } from '@hooks/index';

import * as Styled from './CartListItem.styled';

interface CartListItemProps {
  cartItem: CartItem;
}

const CartListItem: React.FC<CartListItemProps> = ({ cartItem }) => {
  const { onDeleteItem, fetchError } = useDeleteCartItem(cartItem.id);
  const { isChecked, onCheckCartItem } = useCheckCartItem();
  useFetchErrorBoundary(fetchError);
  return (
    <Styled.CartListContainer>
      <Styled.CartItemSelectionGroup>
        <Checkbox
          checked={isChecked(cartItem.id)}
          onChange={(event) => onCheckCartItem(event.target.checked, cartItem.id)}
        />
        <DeleteButton onClick={onDeleteItem}>삭제</DeleteButton>
      </Styled.CartItemSelectionGroup>
      <CartItemInfo.DetailContainer>
        <CartItemInfo.Img cartItem={cartItem} />
        <CartListDescription cartItem={cartItem} />
      </CartItemInfo.DetailContainer>
    </Styled.CartListContainer>
  );
};

export default CartListItem;
