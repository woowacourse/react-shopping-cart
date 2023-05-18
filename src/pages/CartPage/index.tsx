import CartList from '../../components/CartPage/CartList';
import OrderDetail from '../../components/CartPage/OrderDetail';
import Flex from '../../components/common/Flex';

const CartPage = () => {
  return (
    <Flex justify="space-between">
      <CartList />
      <OrderDetail />
    </Flex>
  );
};

export default CartPage;
