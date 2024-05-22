import Header from '../components/Header/Header';
import Cart from '../components/PageSection/Cart';
import { FloatingButton } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { checkedCartItems } from '../recoil/selectors';

import { PATH } from '../constants/rule';

export default function CartPage() {
  const navigate = useNavigate();

  const cartTotalCount = useRecoilValue(checkedCartItems).length;

  return (
    <div id="cart-page">
      <Header />
      <Cart />
      <FloatingButton
        text="주문 확인"
        disabled={cartTotalCount ? false : true}
        onClick={() => {
          cartTotalCount && navigate(PATH.OrderConfirmPage);
        }}
      />
    </div>
  );
}
