import { ButtonHTMLAttributes, FC } from 'react';
import { OrderedItem } from '../../../../../types';
import { ProductName } from '../../../../OrderConfirm/OrderConfirmSection/OrderConfirmListItem/style';
import Container from '../../../../shared/Container';
import { AddCartButton, OrderListItemCard, StyledOrderItemListItem } from './styles';
import { KRCurrency } from '../../../../../utils/format';
import Text from '../../../../shared/Text';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  item: OrderedItem;
}

const OrderListItem: FC<Props> = ({ item: { image_url, name, price, quantity }, onClick }) => (
  <StyledOrderItemListItem>
    <OrderListItemCard type="horizontal" image={image_url}>
      <Container>
        <ProductName>{name}</ProductName>
        <Text>
          {KRCurrency(quantity * price)} / 수량 : {quantity}개
        </Text>
      </Container>
    </OrderListItemCard>
    <AddCartButton type="button" onClick={onClick} size="small">
      장바구니
    </AddCartButton>
  </StyledOrderItemListItem>
);

export default OrderListItem;
