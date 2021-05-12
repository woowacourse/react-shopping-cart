import { ButtonHTMLAttributes, VFC } from 'react';
import { OrderedItem } from '../../../../../types';
import { ProductName } from '../../../../OrderConfirm/OrderConfirmSection/OrderConfirmListItem/style';
import Container from '../../../../shared/Container';
import { AddCartButton, OrderListItemCard, StyledOrderItemListItem } from './styles';
import { KRCurrency } from '../../../../../utils/format';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  item: OrderedItem;
}

const OrderListItem: VFC<Props> = ({ item: { image, name, price, quantity }, onClick }) => (
  <StyledOrderItemListItem>
    <OrderListItemCard type="horizontal" image={image}>
      <Container>
        <ProductName>{name}</ProductName>
        <p>
          {KRCurrency(quantity * price)} / 수량 : {quantity}개
        </p>
      </Container>
    </OrderListItemCard>
    <AddCartButton type="button" onClick={onClick} size="small">
      장바구니
    </AddCartButton>
  </StyledOrderItemListItem>
);

export default OrderListItem;
