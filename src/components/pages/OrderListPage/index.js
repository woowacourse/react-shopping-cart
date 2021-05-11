import { useState, useEffect } from 'react';
import { loadData, ORDER_LIST } from '../../../firebase';
import { OrderedProductItem } from './OrderedProductItem';
import { Header } from '../../commons';
import * as Styled from './style.js';

export const OrderListPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadData({ table: ORDER_LIST, handler: setOrders });
  }, []);

  return (
    <Styled.Page>
      <Header>주문목록</Header>
      <Styled.Main>
        <Styled.OrderList>
          {orders.map(({ orderId, orderItems }) => (
            <Styled.OrderItem key={orderId}>
              <Styled.OrderLabel>
                <Styled.OrderNumber>주문번호 : {orderId}</Styled.OrderNumber>
                <Styled.ToDetailButton>상세보기 {`>`}</Styled.ToDetailButton>
              </Styled.OrderLabel>
              <Styled.OrderedProductList>
                {orderItems.map((product) => (
                  <OrderedProductItem key={product.id} product={product} />
                ))}
              </Styled.OrderedProductList>
            </Styled.OrderItem>
          ))}
        </Styled.OrderList>
      </Styled.Main>
    </Styled.Page>
  );
};
