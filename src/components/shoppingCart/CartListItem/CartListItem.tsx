import { CartItem } from '@appTypes/shoppingCart';
import { Checkbox, DeleteButton } from '@components/common';
import { CartListDescription } from '@components/shoppingCart';

import * as Styled from './CartListItem.styled';

interface CartListItemProps {
  cartItem: CartItem;
}

const CartListItem: React.FC<CartListItemProps> = ({ cartItem }) => {
  return (
    <Styled.CartListContainer>
      <Styled.CartItemSelectionGroup>
        <Checkbox checked />
        <DeleteButton>삭제</DeleteButton>
      </Styled.CartItemSelectionGroup>
      <Styled.CartItemDetailContainer>
        <Styled.CartItemImage src={cartItem.product.imageUrl} />
        <CartListDescription cartItem={cartItem} />
      </Styled.CartItemDetailContainer>
    </Styled.CartListContainer>
  );
};

export default CartListItem;
