import { CartItem } from '@appTypes/shoppingCart';
import { CheckBoxButton, DeleteButton } from '@components/common';
import { CartListDescription } from '@components/shoppingCart';
import { useCheckCartItem, useDeleteCartItem } from '@hooks/shoppingCart';

import * as Styled from './CartListItem.styled';

interface CartListItemProps {
  cartItem: CartItem;
}

const CartListItem: React.FC<CartListItemProps> = ({ cartItem }) => {
  const { onDeleteItem } = useDeleteCartItem(cartItem.id);
  const { isChecked, onCheckCartItem } = useCheckCartItem();

  return (
    <Styled.CartListContainer>
      <Styled.CartItemSelectionGroup>
        <CheckBoxButton
          checked={isChecked(cartItem.id)}
          onClick={() => onCheckCartItem(!isChecked(cartItem.id), cartItem.id)}
        />
        <DeleteButton onClick={onDeleteItem}>삭제</DeleteButton>
      </Styled.CartItemSelectionGroup>
      <Styled.CartItemDetailContainer>
        <Styled.CartItemImage src={cartItem.product.imageUrl} />
        <CartListDescription cartItem={cartItem} />
      </Styled.CartItemDetailContainer>
    </Styled.CartListContainer>
  );
};

export default CartListItem;
