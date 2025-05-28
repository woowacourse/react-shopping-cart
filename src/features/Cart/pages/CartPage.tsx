import { STEPS } from '@/shared/constants/setStep';
import { ShoppingContext } from '@/shared/context/shoppingContext';

import { useFunnel } from '../../../shared/hooks/useFunnel';
import { CartInfo } from '../components/CartInfo';
import { OrderConfirm } from '../components/OrderConfirm';

export const CartPage = () => {
  const { Funnel, setStep } = useFunnel<STEPS>('장바구니');

  return (
    <ShoppingContext>
      <Funnel>
        <Funnel.Step name="장바구니">
          <CartInfo onNext={() => setStep('주문정보')} />
        </Funnel.Step>
        <Funnel.Step name="주문정보">
          <OrderConfirm onPrev={() => setStep('장바구니')} />
        </Funnel.Step>
      </Funnel>
    </ShoppingContext>
  );
};
