import CartHeader from '../CartHeader/CartHeader';
import { CartStyle } from './Cart.style';

export default function Cart() {
  return (
    <CartStyle>
      <CartHeader count={2} />
    </CartStyle>
  );
}
