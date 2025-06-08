import { getCartItems } from '@/components/features/cart/api/getCartItems';
import { useJaeO } from '@/shared';
import Header from '../../components/common/header/Header';
import LoadingPage from './CartLoadingPage';
import CartContents from '@/components/features/cart/cartContents/CartContents';

function CartPage() {
  const { data: cartItems } = useJaeO({
    fetchKey: 'cartItems',
    fetchFn: getCartItems,
  });

  if (!cartItems) {
    return <LoadingPage />;
  }

  return (
    <>
      <Header title="SHOP" />
      <CartContents cartItems={cartItems} />
    </>
  );
}

export default CartPage;
