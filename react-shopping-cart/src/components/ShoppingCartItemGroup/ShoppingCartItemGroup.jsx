import FlexWrapper from 'components/@shared/FlexWrapper/FlexWrapper';

import ShoppingCartItem from 'components/ShoppingCartItem/ShoppingCartItem';

//TODO: carts를 받는 게 맞을까?
function ShoppingCartItemGroup({ carts }) {
  return (
    <FlexWrapper flexDirection="column">
      {carts.map((cart) => (
        <ShoppingCartItem key={cart.id} {...cart} />
      ))}
    </FlexWrapper>
  );
}

export default ShoppingCartItemGroup;
