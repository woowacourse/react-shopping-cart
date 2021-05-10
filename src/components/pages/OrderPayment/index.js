import React from 'react';
import PageHeader from '../../PageHeader';
import PaymentSheet from '../../PaymentSheet';
import { Main, OrderList, Page } from './index.styles';
import PropTypes from 'prop-types';
import OrderItem from '../../OrderItem';

const OrderPayment = ({ products }) => (
  <Page>
    <PageHeader>주문/결제</PageHeader>
    <Main>
      <OrderList>
        <div>주문상품(4건)</div>
        <ul>
          {products.map(({ id, ...product }) => (
            <li>
              <OrderItem {...product} />
            </li>
          ))}
        </ul>
      </OrderList>
      <PaymentSheet
        title="결제금액"
        priceInfo="총 결제금액"
        price={10000}
        buttonText={`${10000}원 결제하기`}
        isOrdered={false}
      />
    </Main>
  </Page>
);

OrderPayment.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      image: PropTypes.string,
      imageAlt: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    })
  ),
};

export default OrderPayment;
