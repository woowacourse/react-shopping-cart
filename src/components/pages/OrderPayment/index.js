import React from 'react';
import { useSelector } from 'react-redux';
import PageHeader from '../../PageHeader';
import PaymentSheet from '../../PaymentSheet';
import OrderItem from '../../OrderItem';
import { formatPrice, getTotalPrice, getTotalQuantity } from '../../../utils';
import { Main, OrderList, Page } from './index.styles';

const OrderPayment = () => {
  const products = Object.values(
    useSelector(({ product }) => product.pickedProducts)
  );
  const checkedProducts = products.filter(({ isChecked }) => isChecked);

  return (
    <Page>
      <PageHeader>주문/결제</PageHeader>
      <Main>
        <OrderList>
          <div>주문상품({getTotalQuantity(products)}개)</div>
          <ul>
            {checkedProducts.map(product => (
              <li key={product.id}>
                <OrderItem {...product} isOrdered={false} />
              </li>
            ))}
          </ul>
        </OrderList>
        <PaymentSheet
          title="결제금액"
          priceInfo="총 결제금액"
          price={formatPrice(getTotalPrice(products))}
          buttonText={`${formatPrice(getTotalPrice(products))}원 결제하기`}
        />
      </Main>
    </Page>
  );
};

export default OrderPayment;
