import { useState, useEffect } from 'react';
import { useCartDispatch, useRequest } from '../../hooks';
import { OrderedProductItem } from './OrderedProductItem';
import { Header } from '../../components';
import * as S from './style.js';

export const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const { addProduct } = useCartDispatch();
  const { getOrderList } = useRequest();

  useEffect(() => {
    (async () => {
      const response = await getOrderList();

      setOrders(response);
    })();
  }, [getOrderList]);

  return (
    <S.Page>
      <Header>주문목록</Header>
      <S.Main>
        <S.OrderList>
          {orders.map(({ orderId, orderItems }) => (
            <S.OrderItem key={orderId}>
              <S.OrderLabel>
                <S.OrderNumber>주문번호 : {orderId}</S.OrderNumber>
                <S.ToDetailButton>상세보기 {`>`}</S.ToDetailButton>
              </S.OrderLabel>
              <S.OrderedProductList>
                {orderItems.map((product) => (
                  <OrderedProductItem key={product.id} product={product} addProduct={addProduct} />
                ))}
              </S.OrderedProductList>
            </S.OrderItem>
          ))}
        </S.OrderList>
      </S.Main>
    </S.Page>
  );
};
