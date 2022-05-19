import Division from 'components/common/Division';
import useCartRequest from 'hooks/useCartRequest';
import React from 'react';
import theme from 'styles/theme';
import { CartItem, Item } from 'types/domain';

import CartItemContainer from './CartItemContainer';

interface CartListProps {
  itemList: Item[];
  cartList: CartItem[];
}

const CartList = ({ itemList, cartList }: CartListProps) => {
  const { updateCartItemQuantity, patchCartItemSelected } = useCartRequest(cartList);

  return (
    <div>
      {itemList.map((item, index) => (
        <React.Fragment key={item.id}>
          <CartItemContainer
            item={item}
            cartItem={cartList[index]}
            handleClickCheckBox={patchCartItemSelected(item.id)}
            handleQuantity={updateCartItemQuantity(item.id)}
          />
          {itemList.length !== index + 1 && (
            <Division color={theme.colors.cartDivision} height='2px' margin='0 0 26px' />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CartList;
