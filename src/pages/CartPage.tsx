import Header from '../components/Header/Header';
import Cart from '../components/Cart/Cart';
import { FloatingButton } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { cartQuantity } from '../recoil/atoms';
import { useRecoilValue } from 'recoil';

export default function CartPage() {
  const navigate = useNavigate();

  const cartTotalCount = useRecoilValue(cartQuantity);

  return (
    <div id="app">
      <Header />
      <Cart />
      <FloatingButton
        text="주문 확인"
        isDisable={cartTotalCount ? false : true}
        onClick={() => {
          cartTotalCount && navigate('/order-confirm');
        }}
      />
    </div>
  );
}
