import CartItem from './CartItem';
import { Container } from './Cart.styles';
import { CartProduct } from '../../types/cart';

function CartList({ cartItems }: { cartItems: CartProduct[] }) {
  console.log(cartItems);

  return (
    <Container>
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
    </Container>
  );
}

export default CartList;
