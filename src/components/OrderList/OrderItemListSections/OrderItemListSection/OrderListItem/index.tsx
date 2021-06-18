import { VFC } from 'react';
import { OrderedItem } from '../../../../../types';
import { ProductName } from '../../../../OrderConfirm/OrderConfirmSection/OrderConfirmListItem/style';
import Container from '../../../../shared/Container';
import { AddCartButton, OrderListItemCard, StyledOrderItemListItem } from './styles';
import { KRCurrency } from '../../../../../utils/format';
import Text from '../../../../shared/Text';

interface Props {
  item: OrderedItem;
  handleLinkToProductDetail: () => void;
  handleAddCart: () => void;
}

const OrderListItem: VFC<Props> = ({
  item: { imageUrl, name, price, quantity },
  handleAddCart,
  handleLinkToProductDetail,
}) => (
  <StyledOrderItemListItem>
    <OrderListItemCard type="horizontal" image={imageUrl} onClick={handleLinkToProductDetail}>
      <Container>
        <ProductName>{name}</ProductName>
        <Text>
          {KRCurrency(quantity * price)} / 수량 : {quantity}개
        </Text>
      </Container>
    </OrderListItemCard>
    <AddCartButton type="button" onClick={handleAddCart} size="small">
      장바구니
    </AddCartButton>
  </StyledOrderItemListItem>
);

export default OrderListItem;
