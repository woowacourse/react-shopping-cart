import BottomButton from '../components/BottomButton';
import { useCartItemsContext } from '../contexts/CartItemsContext';
import { usePageContext } from '../contexts/PageContext';
import getOrderPrice from '../utils/getOrderPrice';

const OrderConfirmPage = () => {
  const { cartItems, checkedCartIds } = useCartItemsContext();
  const { setPage } = usePageContext();
  const orderPrice = getOrderPrice(cartItems, checkedCartIds);
  const deliveryPrice = orderPrice >= 100000 ? 0 : 3000;
  const totalPrice = orderPrice + deliveryPrice;
  const totalQuantity = cartItems
    .filter(({ id }) => checkedCartIds.includes(id))
    .reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <div>
        <img src="" alt="goBack" onClick={() => setPage('cart')} />
      </div>
      <div data-testid="orderConfirmPage">
        <p>주문 확인</p>
        <p>
          총 {checkedCartIds.length}종류의 상품 {totalQuantity}개를 주문합니다.
        </p>
        <p>최종 결제 금액을 확인해 주세요.</p>
        <p>총 결제 금액</p>
        <p>{totalPrice.toLocaleString()}원</p>
        <BottomButton disabled title="결제하기" />
      </div>
    </>
  );
};

export default OrderConfirmPage;
