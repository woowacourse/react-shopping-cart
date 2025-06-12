import { useNavigate } from 'react-router-dom';
import { useCartItemsContext } from '../contexts/CartItemsContext';
import { BASE_URL, URL_LOCATION } from '../constants/url';
import { getOrderPrice } from '../utils';
import { DELIVERY_PRICE, DELIVERY_PRICE_THRESHOLD } from '../constants/config';

const useCartPage = () => {
  const { cartItems, checkedCartIds } = useCartItemsContext();
  const navigate = useNavigate();

  const orderPrice = getOrderPrice(cartItems, checkedCartIds);
  const deliveryPrice =
    orderPrice >= DELIVERY_PRICE_THRESHOLD || orderPrice === 0 ? 0 : DELIVERY_PRICE;

  const handleBottomButton = () =>
    navigate(BASE_URL + URL_LOCATION.ORDER, {
      state: {
        orderPrice,
        deliveryPrice,
      },
    });

  return {
    cartItems,
    orderPrice,
    deliveryPrice,
    handleBottomButton,
  };
};

export default useCartPage;
