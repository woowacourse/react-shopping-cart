import { CartItem } from '@appTypes/shoppingCart';
import { Checkbox, DeleteButton } from '@components/common';
import Item from '@components/common/Item/Item';
import { CartListItemCounter } from '@components/shoppingCart';
import { useCheckCartItem, useDeleteCartItem } from '@hooks/shoppingCart';

import * as Styled from './CartListItem.styled';

interface CartListItemProps {
  cartItem: CartItem;
}

const CartListItem: React.FC<CartListItemProps> = ({ cartItem }) => {
  const { onDeleteItem } = useDeleteCartItem(cartItem.id);
  const { isChecked, onCheckCartItem } = useCheckCartItem();

  return (
    <Item direction="column">
      <Item.ItemSelection>
        <Checkbox checked={isChecked(cartItem.id)} onChange={() => onCheckCartItem(cartItem.id)} />
        <DeleteButton onClick={onDeleteItem}>삭제</DeleteButton>
      </Item.ItemSelection>
      <Styled.CartItemContentWrapper>
        <Item.ItemImage url={cartItem.product.imageUrl} />
        <Item.ItemDescription name={cartItem.product.name} price={cartItem.product.price}>
          <CartListItemCounter cartItem={cartItem} />
        </Item.ItemDescription>
      </Styled.CartItemContentWrapper>
    </Item>
  );
};

export default CartListItem;
