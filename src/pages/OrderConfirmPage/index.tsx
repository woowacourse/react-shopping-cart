import { useEffect, useState } from 'react';
import OrderConfirmInnerContainer from '../../components/OrderConfirm/OrderConfirmInnerContainer';
import OrderConfirmResultSubmitCard from '../../components/OrderConfirm/OrderConfirmResultSubmitCard';
import OrderConfirmSection from '../../components/OrderConfirm/OrderConfirmSection';
import ReactShoppingCartTemplate from '../../components/shared/ReactShoppingCartTemplate';
import useFetch from '../../hooks/useFetch';
import { ORDER_LIST_MOCK } from '../../mocks/mockData';
import { requestOrderConfirmItems } from '../../service/request/orderConfirm';
import { ItemInCart } from '../../types';

const TITLE = '주문/결제';

const OrderConfirmPage = () => {
  const { data: items, isLoading, hasError } = useFetch(requestOrderConfirmItems);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!items) return;

    const calculatedPrice = items.reduce((acc, { price, quantity }) => acc + price * quantity, 0);

    setTotalPrice(calculatedPrice);
  }, [items]);

  return (
    <ReactShoppingCartTemplate title={TITLE}>
      <OrderConfirmInnerContainer>
        {isLoading ? (
          <div>로딩중</div>
        ) : (
          <OrderConfirmSection title="주문 상품" items={items as ItemInCart[]} />
        )}
        <OrderConfirmResultSubmitCard totalPrice={totalPrice} />
      </OrderConfirmInnerContainer>
    </ReactShoppingCartTemplate>
  );
};

export default OrderConfirmPage;
