import CartItem from './CartItem';
import { Container } from './Cart.styles';
import { CartProduct } from '../../types/cart';

interface CartListProps {
  cartItems: CartProduct[];
}

function CartList({ cartItems }: CartListProps) {
  return (
    <Container>
      {cartItems.map((item) => (
        <CartItem key={item.id} cartItem={item} />
      ))}
    </Container>
  );
}

export default CartList;
