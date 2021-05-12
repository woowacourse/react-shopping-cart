import * as Styled from './ItemGroup.styles';

export interface Props {
  children: React.ReactNode;
  orderNumber: string;
  detailLinkButtonText?: string;
  onDetailLinkClick?: () => void;
}

const ItemGroup = ({ children, orderNumber, onDetailLinkClick, detailLinkButtonText }: Props) => {
  return (
    <Styled.ItemGroup>
      <Styled.Header>
        <Styled.OrderNumber>주문번호 : {orderNumber}</Styled.OrderNumber>
        {detailLinkButtonText && (
          <Styled.DetailLinkButton onClick={onDetailLinkClick}>{detailLinkButtonText}</Styled.DetailLinkButton>
        )}
      </Styled.Header>
      <Styled.ItemContainer>{children}</Styled.ItemContainer>
    </Styled.ItemGroup>
  );
};

export default ItemGroup;
