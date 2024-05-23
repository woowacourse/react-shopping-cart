import * as Styled from '../style';

import { useRecoilValue } from 'recoil';

import OrderConfirmationCartItem from './OrderConfirmationCartItem';

import { CartItemType } from '../../../type';
import { selectedCartItemsSelector } from '../../../recoil/selectors';

const OrderConfirmationCartItems = () => {
  const cartItems = useRecoilValue(selectedCartItemsSelector);

  return (
    <Styled.CartItems>
      {cartItems.map((cartItem: CartItemType) => {
        return (
          <OrderConfirmationCartItem
            key={cartItem.id}
            inputCartItem={cartItem}
          />
        );
      })}
    </Styled.CartItems>
  );
};

export default OrderConfirmationCartItems;
