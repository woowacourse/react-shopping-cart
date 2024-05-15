import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import CartItem from '@/CartItem';
import { fetchCartItems } from '@apis/cartItem';
import {
  cartItemsState,
  orderTotalPriceState,
  deliveryPriceState,
  isAllUnCheckedState,
  allCheckedState,
} from '@recoil/cartItems';

function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const totalPrice = useRecoilValue(orderTotalPriceState);
  const deliveryPrice = useRecoilValue(deliveryPriceState);
  const isAllUnChecked = useRecoilValue(isAllUnCheckedState);
  const [allChecked, setAllChecked] = useRecoilState(allCheckedState);

  const handleClickOrderConfirm = () => {
    if (isAllUnChecked) return;

    navigate('/confirm');
  };

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
        <label htmlFor="allChecked">전체 선택</label>
        <input
          id="allChecked"
          type="checkbox"
          checked={allChecked}
          onChange={(e) => setAllChecked(e.target.checked)}
        />
        <div>전체 체크 : {allChecked.toString()}</div>
        <ul>
          {cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))}
        </ul>
        <div>주문 금액 : {totalPrice}</div>
        <div>배송비 : {deliveryPrice}</div>
        <div>총 결제 금액 : {totalPrice + deliveryPrice}</div>
        <button onClick={handleClickOrderConfirm} disabled={isAllUnChecked}>
          주문확인
        </button>
      </div>
    </>
  );
}

export default CartPage;
