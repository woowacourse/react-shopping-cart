import { VFC } from 'react';
import { OrderItem } from '../../../../../types';
import { ProductName } from '../../../../OrderConfirm/OrderConfirmSection/OrderConfirmListItem/style';
import Container from '../../../../shared/Container';
import { AddCartButton, OrderListItemCard, StyledOrderItemListItem } from './styles';

interface Props {
  item: OrderItem;
  className?: string;
}

const OrderListItem: VFC<Props> = ({ item: { imgSrc, name, price, amount } }) => (
  <StyledOrderItemListItem>
    <OrderListItemCard type="horizontal" imgSrc={imgSrc}>
      <Container>
        <ProductName>{name}</ProductName>
        <p>
          {amount * price}원 / 수량 : {amount}개
        </p>
      </Container>
    </OrderListItemCard>
    <AddCartButton size="small">장바구니</AddCartButton>
  </StyledOrderItemListItem>
);

export default OrderListItem;
