import * as Styled from './OrderItemGroup.styles';

export interface Props {
  children: React.ReactNode;
  orderNumber: string;
  detailLinkButtonText?: string;
  onDetailLinkClick?: () => void;
}

const OrderItemGroup = ({ children, orderNumber, onDetailLinkClick, detailLinkButtonText }: Props) => {
  return (
    <Styled.OrderItemGroup>
      <Styled.Header>
        <Styled.OrderNumber>주문번호 : {orderNumber}</Styled.OrderNumber>
        {detailLinkButtonText && (
          <Styled.DetailLinkButton onClick={onDetailLinkClick}>{detailLinkButtonText}</Styled.DetailLinkButton>
        )}
      </Styled.Header>
      <Styled.ItemContainer>{children}</Styled.ItemContainer>
    </Styled.OrderItemGroup>
  );
};

export default OrderItemGroup;
