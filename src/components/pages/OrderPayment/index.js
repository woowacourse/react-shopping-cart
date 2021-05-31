import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../PageHeader';
import PaymentSheet from '../../PaymentSheet';
import OrderItem from '../../OrderItem';
import { formatPrice, getTotalPrice, getTotalQuantity } from '../../../utils';
import { Main, OrderList, Page } from './index.styles';
import { ROUTE } from '../../../constants';
import { useHistory } from 'react-router';
import { postOrders } from './index.actions';

const OrderPayment = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cartItems = useSelector(state => state.product.product.cartItems);

  const orderItems = cartItems.reduce((acc, item) => {
    const { cart_id, quantity } = item;
    const order = { cart_id, quantity };
    acc.push(order);

    return acc;
  }, []);

  const page = useSelector(state => state.history.history.currentPage);
  const isValidRoute = () => {
    if (page !== '/cart') {
      alert('잘못된 접근입니다.');
      history.push('/');
      return false;
    }
  };

  const makeOrder = async () => {
    if (!window.confirm('결제하시겠습니까?')) return;
    await postOrders(orderItems, dispatch);
    routeToCompletedOrder();
  };

  const routeToCompletedOrder = () => {
    history.push(ROUTE.COMPLETED_ORDER);
  };

  useLayoutEffect(() => {
    isValidRoute();
  }, []);

  return (
    <Page>
      <PageHeader>주문/결제</PageHeader>
      <Main>
        <OrderList>
          <div>주문상품({getTotalQuantity(cartItems)}개)</div>
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
          price={formatPrice(getTotalPrice(cartItems))}
          buttonText={`${formatPrice(getTotalPrice(cartItems))}원 결제하기`}
          onButtonClick={makeOrder}
        />
      </Main>
    </Page>
  );
};

export default OrderPayment;
