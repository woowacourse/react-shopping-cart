import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import CartItem from '@/CartItem';
import { cartItemsState, orderTotalPriceState, deliveryPriceState } from '@/recoil/cartItems';
import { fetchCartItems } from '@apis/cartItem';

function CartPage() {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const totalPrice = useRecoilValue(orderTotalPriceState);
  const deliveryPrice = useRecoilValue(deliveryPriceState);

  useEffect(() => {
    const getCartItems = async () => {
      const result = await fetchCartItems();

      setCartItems(result);
    };

    getCartItems();
  }, []);

  if (cartItems.length === 0) {
    return <div>장바구니에 담은 상품이 없습니다.</div>;
  }

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
        <Link to="/confirm">결제하기</Link>
      </div>
    </>
  );
}

export default CartPage;
