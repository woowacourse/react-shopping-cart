import PageTemplate from '../templates/PageTemplate';
import CartListSection from '../sections/CartListSection';
import { Text } from '../common/Text/Text';

const CartListPage = () => {
  return (
    <PageTemplate>
      <Text size="large">장바구니</Text>
      <CartListSection />
    </PageTemplate>
  );
};

export default CartListPage;
