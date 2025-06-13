import { useState } from 'react';
import { useFunnel } from '../../../shared/hooks/useFunnel';
import { CartInfo } from '../components/CartInfo';
import { OrderConfirm } from '../components/OrderConfirm';
import { PaymentConfirm } from '../components/PaymentConfirm';
import { Coupon } from '../../../features/Coupon/types/Coupon.types';

type STEPS = '장바구니' | '주문정보' | '결제확인';

export const CartPage = () => {
  const { Funnel, setStep } = useFunnel<STEPS>('장바구니');
  const [selectedCoupons, setSelectedCoupons] = useState<Coupon[]>([]);

  return (
    <Funnel>
      <Funnel.Step name="장바구니">
        <CartInfo onNext={() => setStep('주문정보')} />
      </Funnel.Step>

      <Funnel.Step name="주문정보">
        <OrderConfirm
          onPrev={() => setStep('장바구니')}
          onNext={() => setStep('결제확인')}
          onSelectCoupons={setSelectedCoupons}
        />
      </Funnel.Step>

      <Funnel.Step name="결제확인">
        <PaymentConfirm selectedCoupons={selectedCoupons} onPrev={() => setStep('장바구니')} />
      </Funnel.Step>
    </Funnel>
  );
};
