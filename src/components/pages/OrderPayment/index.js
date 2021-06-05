import { useLayoutEffect } from 'react';
import PageHeader from '../../@common/PageHeader';
import PaymentSheet from '../../PaymentSheet';
import OrderItem from '../../OrderItem';
import { Main, OrderList } from './index.styles';
import useCarts from '../../../hooks/useCarts';
import useOrder from '../../../hooks/useOrder';
import { Page } from '../../@common/PageWrapper/index.styles';

const OrderPayment = () => {
  const { totalPrice, totalQuantity, makeOrder, isValidRoute } = useOrder();
  const { cartItems } = useCarts();

  useLayoutEffect(() => {
    isValidRoute();
  }, []);

  return (
    <Page>
      <PageHeader>주문/결제</PageHeader>
      <Main>
        <OrderList>
          <div>
            주문상품: 총 <b>{totalQuantity}</b>개
          </div>
          <ul>
            {cartItems.map(product => (
              <li key={product.product_id}>
                <OrderItem {...product} isOrdered={false} />
              </li>
            ))}
          </ul>
        </OrderList>
        <PaymentSheet
          title="결제금액"
          priceInfo="총 결제금액"
          price={totalPrice}
          buttonText={`${totalPrice}원 결제하기`}
          onButtonClick={makeOrder}
        />
      </Main>
    </Page>
  );
};

export default OrderPayment;
