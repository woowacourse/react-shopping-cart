import { getCartItemList } from '@/api/cart';
import { Flex } from '@/shared/components/Flex';
import { Loading } from '@/shared/components/Loading';
import { STEPS } from '@/shared/constants/setStep';
import { useFetchData } from '@/shared/hooks/useFetchData';

import { useFunnel } from '../../../shared/hooks/useFunnel';
import { CartInfo } from '../components/CartInfo';
import { EmptyCart } from '../components/EmptyCart';
import { LoadingCart } from '../components/LoadingCart';
import { OrderConfirm } from '../components/OrderConfirm';
import { useCart } from '../hooks/useCart';
import { CartDataState, CartItem } from '../types/Cart.types';

const CartPageFunnel = ({ cart }: CartDataState) => {
  const { Funnel, setStep } = useFunnel<STEPS>('장바구니');
  const { cartItems, toggleCheck, toggleAllCheck, removeCartItem, updateQuantity } = useCart({
    cart,
  });

  return (
    <>
      <Funnel>
        <Funnel.Step name="장바구니">
          <CartInfo
            cartItems={cartItems ?? []}
            onToggle={toggleCheck}
            onToggleAll={toggleAllCheck}
            onRemove={removeCartItem}
            onUpdateQuantity={updateQuantity}
            onNext={() => setStep('주문정보')}
          />
        </Funnel.Step>
        <Funnel.Step name="주문정보">
          <OrderConfirm cartItems={cartItems ?? []} onPrev={() => setStep('장바구니')} />
        </Funnel.Step>
      </Funnel>
    </>
  );
};

export const CartPage = () => {
  const cart = useFetchData<CartItem[]>({ autoFetch: getCartItemList });

  if (cart.isInitialLoading) {
    return <LoadingCart />;
  }

  if (!cart.data || cart.data.length === 0) {
    return <EmptyCart />;
  }

  return <CartPageFunnel cart={cart} />;
};
