import { CartItem } from '@appTypes/shoppingCart';
import { Checkbox, DeleteButton } from '@components/common';
import { CartListDescription } from '@components/shoppingCart';

import * as Styled from './CartListItem.styled';

interface CartListItemProps {
  cartItem: CartItem;
  isChecked: boolean;
  onChangeCheck: (event: React.ChangeEvent<HTMLInputElement>, id: number) => void;
}

const CartListItem: React.FC<CartListItemProps> = ({ cartItem, isChecked, onChangeCheck }) => {
  return (
    <Styled.CartListContainer>
      <Styled.CartItemSelectionGroup>
        <Checkbox checked={isChecked} onChange={(event) => onChangeCheck(event, cartItem.id)} />
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
