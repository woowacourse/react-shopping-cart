import ShoppingCartItem from 'components/ShoppingCartItem/ShoppingCartItem';

import { ColumnFlexWrapper } from 'styles/Wrapper';

//TODO: carts를 받는 게 맞을까?
function ShoppingCartItemGroup({ carts }) {
  return (
    <ColumnFlexWrapper>
      {carts.map((cart) => (
        <ShoppingCartItem key={cart.id} {...cart} />
      ))}
    </ColumnFlexWrapper>
  );
}

export default ShoppingCartItemGroup;
