import * as Styled from './style.js';
import { Header, OrderedItem } from '../../commons';
import orders from '../../../mockData/order.json';

export const OrderListPage = () => {
  return (
    <Styled.Container>
      <Header>주문목록</Header>
      <Styled.Main>
        {orders.map(({ orderId, orderItems }) => (
          <>
            <Styled.ListLabel>
              <Styled.OrderNumber>주문번호 : {orderId}</Styled.OrderNumber>
              <Styled.ToDetailButton>상세보기 {`>`}</Styled.ToDetailButton>
            </Styled.ListLabel>
            <Styled.OrderList key={orderId}>
              {orderItems.map(({ quantity, product }) => (
                <OrderedItem key={product.id} quantity={quantity} item={product} />
              ))}
            </Styled.OrderList>
          </>
        ))}
      </Styled.Main>
    </Styled.Container>
  );
};
