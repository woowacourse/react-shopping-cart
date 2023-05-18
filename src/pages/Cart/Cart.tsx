import CartItemList from '../../components/CartItemList/CartItemList';
import PayingContainer from '../../components/PayingContainer/PayingContainer';
import { FlexWrapper } from './Cart.style';

function Cart() {
  return (
    <FlexWrapper>
      <CartItemList></CartItemList>
      <PayingContainer></PayingContainer>
    </FlexWrapper>
  );
}

export default Cart;
