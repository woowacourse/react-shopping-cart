import { useNavigate } from 'react-router-dom';

import Header from '../components/Header/Header';
import { FloatingButton } from '../components/Button';
import OrderConfirmCart from '../components/OrderConfirmCart/OrderConfirmCart';

export default function OrderConfirmPage() {
  const navigate = useNavigate();

  return (
    <div id="orderConfirmPage">
      <Header
        imgType="arrow"
        onClick={() => {
          navigate(-1);
        }}
      />
      <OrderConfirmCart />

      <FloatingButton text="결제하기" isDisable={false} />
    </div>
  );
}
