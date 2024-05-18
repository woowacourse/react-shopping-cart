import { CartItem } from '@appTypes/shoppingCart';
import { Checkbox } from '@components/common';
import { CartListItem } from '@components/shoppingCart';
import { useCheckCartItem } from '@hooks/shoppingCart';
import { cartItemsSelector } from '@recoil/shoppingCart';
import { useRecoilValue } from 'recoil';

import * as Styled from './CartList.styled';

interface CartListProps {
  cartItems: CartItem[];
}

const CartList: React.FC<CartListProps> = () => {
  const { isAllChecked, onCheckAllCartItems } = useCheckCartItem();
  const cartItems = useRecoilValue(cartItemsSelector);

  return (
    <div>
      <Styled.CartListButtonGroup>
        <Checkbox checked={isAllChecked} onChange={onCheckAllCartItems} />
        <Styled.CartItemSelectionText>전체 선택</Styled.CartItemSelectionText>
      </Styled.CartListButtonGroup>
      <Styled.CartItemContainer>
        {cartItems.map((cartItem) => (
          <CartListItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </Styled.CartItemContainer>
    </div>
  );
};

export default CartList;
