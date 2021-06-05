import React from 'react';
import PageHeader from '../../PageHeader';
import PaymentSheet from '../../PaymentSheet';
import OrderItem from '../../OrderItem';
import { formatPrice, getTotalPrice, getTotalQuantity } from '../../../utils';
import { Main, OrderList, Page } from './index.styles';
import useCart from '../../../hooks/useCart';

const OrderPayment = () => {
  const { checkedProducts, pay } = useCart();

  return (
    <Page>
      <PageHeader>주문/결제</PageHeader>
      <Main>
        <OrderList>
          <div>주문상품({getTotalQuantity(checkedProducts)}개)</div>
          <ul>
            {checkedProducts.map(product => (
              <OrderItem
                key={product.product_id}
                {...product}
                isOrdered={false}
              />
            ))}
          </ul>
        </OrderList>
        <PaymentSheet
          title="결제금액"
          priceInfo="총 결제금액"
          price={formatPrice(getTotalPrice(checkedProducts))}
          buttonText={`${formatPrice(
            getTotalPrice(checkedProducts)
          )}원 결제하기`}
          onButtonClick={() => pay(checkedProducts)}
        />
      </Main>
    </Page>
  );
};

export default OrderPayment;
