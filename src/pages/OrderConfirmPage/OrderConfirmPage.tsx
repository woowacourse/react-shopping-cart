import { useLocation, useNavigate } from 'react-router-dom';

import Header from '../../components/Header/Header';
import { FloatingButton } from '../../components/Button';
import OrderConfirmCart from '../../components/OrderConfirmCart/OrderConfirmCart';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { calculateOrderPrice } from '../../recoil/selectors/selectors';
import { orderCartItems } from '../../api';
import { Cart } from '../../types/cart';
import { cartData, cartQuantity } from '../../recoil/atoms/atoms';

export default function OrderConfirmPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = location.state || {};
  const { totalPrice } = useRecoilValue(calculateOrderPrice);
  const setCartTotalCount = useSetRecoilState(cartQuantity);
  const setCartData = useSetRecoilState(cartData);

  const handleOrder = async () => {
    try {
      await orderCartItems(cartItems.map((item: Cart) => item.id));

      setCartData((prevCartData) =>
        prevCartData.filter((item) => !cartItems.some((orderedItem: Cart) => orderedItem.id === item.id)),
      );

      setCartTotalCount((prevCount) => prevCount - cartItems.length);
      navigate('/payment-confirm', { state: { totalPrice } });
    } catch (error) {
      console.error('Error processing order:', error);
    }
  };

  return (
    <div id="orderConfirmPage">
      <Header
        imgType="arrow"
        onClick={() => {
          navigate(-1);
        }}
      />
      <OrderConfirmCart cartItems={cartItems} />
      <FloatingButton text="결제하기" isDisable={false} onClick={handleOrder} />
    </div>
  );
}
