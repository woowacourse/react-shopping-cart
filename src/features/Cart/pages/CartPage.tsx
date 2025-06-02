import { useFunnel } from '../../../shared/hooks/useFunnel';
import { CartInfo } from '../components/CartInfo';
import { OrderConfirm } from '../components/OrderConfirm';
import { useCart } from '../hooks/useCart';

type STEPS = '장바구니' | '주문정보';

export const CartPage = () => {
  const { Funnel, setStep } = useFunnel<STEPS>('장바구니');
  const { cartItems, toggleCheck, toggleAllCheck, removeCartItem, updateQuantity } = useCart();

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
