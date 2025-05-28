import CartItem from './CartItem';
import { Container } from './Cart.styles';
import { useData } from '../../context/DataContext';
import { getCartItems } from '../../apis/cart';
import { CartProduct } from '../../types/cart';

function CartList() {
  const { data: cartItems } = useData({
    fetcher: getCartItems,
    name: 'cartItems',
  });

  return (
    <Container>
      {cartItems.content.map((item: CartProduct) => (
        <CartItem key={item.id} cartItem={item} />
      ))}
    </Container>
  );
}

export default CartList;
