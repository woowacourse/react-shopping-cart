import { CartItem } from '@appTypes/shoppingCart';
import { Checkbox } from '@components/common';
import { CartListItem } from '@components/shoppingCart';

import * as Styled from './CartList.styled';

interface CartListProps {
  cartItems: CartItem[];
}

const CartList: React.FC<CartListProps> = ({ cartItems }) => {
  return (
    <div>
      <Styled.CartListButtonGroup>
        <Checkbox checked />
        <span className="label">전체 선택</span>
      </Styled.CartListButtonGroup>
      <Styled.CartItemContainer>
        {/* cart list item */}
        {cartItems.map((cartItem) => (
          <CartListItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </Styled.CartItemContainer>
    </div>
  );
};

export default CartList;
