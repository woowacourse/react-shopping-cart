import CartItem from './CartItem';
import { Container } from './Cart.styles';
import { CartProduct } from '../../types/cart';

interface CartListProps {
  cartItems: CartProduct[];
  setCartItems: React.Dispatch<React.SetStateAction<CartProduct[]>>;
}

function CartList({ cartItems, setCartItems }: CartListProps) {
  return (
    <Container>
      {cartItems.map((item) => (
        <CartItem key={item.id} cartItem={item} setCartItems={setCartItems} />
      ))}
    </Container>
  );
}

export default CartList;
