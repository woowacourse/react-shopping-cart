import { useNavigate } from 'react-router-dom';

import Header from '../components/Header/Header';
import Order from '../components/PageSection/Order';
import { FloatingButton } from '../components/Button';

import { PATH } from '../constants/rule';
import { useRecoilValue } from 'recoil';
import { checkedCartItems } from '../recoil/selectors';
import { postOrder } from '../api';

export default function OrderConfirmPage() {
  const navigate = useNavigate();

  const order = useRecoilValue(checkedCartItems);
  const orderItemIds = order.map((item) => item.id);

  const makePayment = () => {
    postOrder(orderItemIds);
    navigate(PATH.PaymentConfirmPage);
  };

  return (
    <div id="order-confirm-page">
      <Header />
      <Order />
      <FloatingButton text="결제하기" onClick={() => makePayment()} />
    </div>
  );
}
