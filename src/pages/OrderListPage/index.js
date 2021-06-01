import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cartAction } from '../../redux';
import { OrderedProductItem } from './OrderedProductItem';
import { Header } from '../../components';
import { request } from '../../request';
import * as S from './style.js';

export const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const response = await request.get.orderList();
      setOrders(response);
    })();
  }, []);

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
                  <OrderedProductItem
                    key={product.id}
                    product={product}
                    addProduct={(product) => dispatch(cartAction.addProduct(product))}
                  />
                ))}
              </S.OrderedProductList>
            </S.OrderItem>
          ))}
        </S.OrderList>
      </S.Main>
    </S.Page>
  );
};
