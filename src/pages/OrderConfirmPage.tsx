import { useNavigate } from 'react-router-dom';

import Header from '../components/Header/Header';
import Order from '../components/Order/Order';
import { FloatingButton } from '../components/Button';

import { PATH } from '../constants/rule';

export default function OrderConfirmPage() {
  const navigate = useNavigate();

  return (
    <div id="order-confirm-page">
      <Header />
      <Order />
      <FloatingButton
        text="결제하기"
        onClick={() => navigate(PATH.PaymentConfirmPage)}
      />
    </div>
  );
}
