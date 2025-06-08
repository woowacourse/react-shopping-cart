import { getCartItems } from '@/components/features/cart/api/getCartItems';
import CartContents from '@/components/features/cart/cartContents/CartContents';
import { useJaeO } from '@/shared';
import Header from '../../components/common/header/Header';
import LoadingContents from './components/loadingContents/LoadingContents';

function CartPage() {
  const { data: cartItems } = useJaeO({
    fetchKey: 'cartItems',
    fetchFn: getCartItems,
  });

  if (!cartItems) {
    return <LoadingContents />;
  }

  return (
    <>
      <Header title="SHOP" />
      <CartContents cartItems={cartItems} />
    </>
  );
}

export default CartPage;
