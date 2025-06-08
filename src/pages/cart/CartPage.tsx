import { Header } from '@/components/common';
import { CartContents, getCartItems } from '@/components/features/cart';
import { useJaeO } from '@/shared';
import LoadingPage from './CartLoadingPage';

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
