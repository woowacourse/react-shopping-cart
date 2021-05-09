import { VFC } from 'react';
import { OrderedItem } from '../../../../../types';
import { ProductName } from '../../../../OrderConfirm/OrderConfirmSection/OrderConfirmListItem/style';
import Container from '../../../../shared/Container';
import { AddCartButton, OrderListItemCard, StyledOrderItemListItem } from './styles';

interface Props {
  item: OrderedItem;
  className?: string;
}

const OrderListItem: VFC<Props> = ({ item: { image, name, price, quantity } }) => (
  <StyledOrderItemListItem>
    <OrderListItemCard type="horizontal" image={image}>
      <Container>
        <ProductName>{name}</ProductName>
        <p>
          {quantity * price}원 / 수량 : {quantity}개
        </p>
      </Container>
    </OrderListItemCard>
    <AddCartButton size="small">장바구니</AddCartButton>
  </StyledOrderItemListItem>
);

export default OrderListItem;
