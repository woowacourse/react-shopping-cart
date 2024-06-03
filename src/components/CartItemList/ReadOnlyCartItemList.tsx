import { CartItemType } from '../../type';
import CartItem from './CartItem';
import * as Styled from './style';

import { useRecoilValue } from 'recoil';
import { selectedCartItemsSelector } from '../../recoil/cartItems';

const ReadOnlyCartItemList = () => {
  const cartItems = useRecoilValue(selectedCartItemsSelector);

  return (
    <Styled.ItemList>
      {cartItems.map((cartItem: CartItemType) => {
        return (
          <CartItem
            key={cartItem.id}
            id={cartItem.id}
            cartItemProduct={cartItem.product}
            readonly={true}
          />
        );
      })}
    </Styled.ItemList>
  );
};

export default ReadOnlyCartItemList;
