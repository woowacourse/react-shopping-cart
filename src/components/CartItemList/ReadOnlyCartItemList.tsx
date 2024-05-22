import { CartItemType } from '../../type';
import CartItem from './CartItem';
import * as Styled from './style';

import { fetchedCartItemsSelector } from '../../recoil/fetch';
import { useRecoilValue } from 'recoil';

const ReadOnlyCartItemList = () => {
  const cartItems = useRecoilValue(fetchedCartItemsSelector);

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
