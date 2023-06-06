import { styled } from 'styled-components';
import CartItemList from './CartItemList';
import OrderInfo from './OrderInfo';

const CartSectionContainer = styled.section`
  display: flex;
  flex-flow: row wrap;
  align-items: start;
  justify-content: space-between;
`;

const CartSection = () => {
  return (
    <CartSectionContainer>
      <CartItemList />
      <OrderInfo />
    </CartSectionContainer>
  );
};

export default CartSection;
