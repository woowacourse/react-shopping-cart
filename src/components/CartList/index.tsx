import { styled } from 'styled-components';
import CartItem from './CartItem';

const CartList = () => {
  return (
    <CartListWrapper>
      <CartItem name="든든 볶음밥" />
      <hr />
      <CartItem name="은근 볶음밥" />
      <hr />
      <CartItem name="히든 볶음밥" />
    </CartListWrapper>
  );
};

const CartListWrapper = styled.div`
  width: 740px;
  border-top: 4px solid #aaaaaa;
`;

export default CartList;
