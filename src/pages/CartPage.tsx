import CartList from '../components/cart/CartList';
import { CartListWrapper } from '../style/ContentLayout';

const CartPage = () => {
  return (
    <CartListWrapper>
      <CartList />
    </CartListWrapper>
  );
};

export default CartPage;
