import CartItem from './CartItem';
import { Container } from './Cart.styles';

function CartList() {
  return (
    <>
      <Container>
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </Container>
    </>
  );
}

export default CartList;
