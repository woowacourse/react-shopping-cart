import FlexWrapper from 'components/@shared/FlexWrapper/FlexWrapper';

import ShoppingCartItem from 'components/ShoppingCartItem/ShoppingCartItem';

//THINK: carts 인자를 받는 게 옳을지 생각해보기
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
