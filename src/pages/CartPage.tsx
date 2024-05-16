import Header from '../components/Header/Header';
import Cart from '../components/Cart/Cart';
import { FloatingButton } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const navigate = useNavigate();

  return (
    <div id="app">
      <Header
        imgType="logo"
        onClick={() => {
          navigate('/');
        }}
      />
      <Cart />
      <FloatingButton
        text="주문 확인"
        onClick={() => {
          navigate('/order-confirm');
        }}
      />
    </div>
  );
}
