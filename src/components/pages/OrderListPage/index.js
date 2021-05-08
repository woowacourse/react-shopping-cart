import * as Styled from './style.js';
import { OrderedProductItem } from './OrderedProductItem';
import { Header } from '../../commons';
import orders from '../../../mockData/order.json';

export const OrderListPage = () => {
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
                {orderItems.map(({ quantity, product }) => (
                  <OrderedProductItem key={product.id} quantity={quantity} item={product} />
                ))}
              </Styled.OrderedProductList>
            </Styled.OrderItem>
          ))}
        </Styled.OrderList>
      </Styled.Main>
    </Styled.Page>
  );
};
