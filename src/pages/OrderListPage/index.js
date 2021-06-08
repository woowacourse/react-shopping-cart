import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { cartAction } from '../../redux';
import { loadSortedData, ORDER_LIST, ORDER_ID, DESC } from '../../firebase';
import { Header } from '../../components';
import { Item } from './Item';
import * as S from './style.js';

export const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    loadSortedData({
      table: ORDER_LIST,
      handler: setOrders,
      sortField: ORDER_ID,
      sortDirection: DESC,
    });
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
                  <Item
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
