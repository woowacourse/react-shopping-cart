import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { fetchCartItems } from './apis/cartItem';
import CartItem from './CartItem';
import { cartItemsState, cartTotalPriceState, deliveryPriceState } from './recoil/cartItems';

function App() {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const totalPrice = useRecoilValue(cartTotalPriceState);
  const deliveryPrice = useRecoilValue(deliveryPriceState);

  useEffect(() => {
    const getCartItems = async () => {
      const result = await fetchCartItems();

      setCartItems(result);
    };

    getCartItems();
  }, []);

  return (
    <>
      <div>
        <ul>
          {cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))}
        </ul>
        <div>주문 금액 : {totalPrice}</div>
        <div>배송비 : {deliveryPrice}</div>
        <div>총 결제 금액 : {totalPrice + deliveryPrice}</div>
      </div>
    </>
  );
}

export default App;
