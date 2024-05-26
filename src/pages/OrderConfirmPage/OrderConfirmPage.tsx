import { useLocation, useNavigate } from 'react-router-dom';

import Header from '../../components/Header/Header';
import { FloatingButton } from '../../components/Button';
import OrderConfirmCart from '../../components/OrderConfirmCart/OrderConfirmCart';
import { useRecoilValue } from 'recoil';
import { calculateOrderPrice } from '../../recoil/selectors/selectors';

export default function OrderConfirmPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = location.state || {};
  const { totalPrice } = useRecoilValue(calculateOrderPrice);

  return (
    <div id="orderConfirmPage">
      <Header
        imgType="arrow"
        onClick={() => {
          navigate(-1);
        }}
      />
      <OrderConfirmCart cartItems={cartItems} />
      <FloatingButton
        text="결제하기"
        isDisable={false}
        onClick={() => {
          navigate('/payment-confirm', { state: { totalPrice } });
        }}
      />
    </div>
  );
}
