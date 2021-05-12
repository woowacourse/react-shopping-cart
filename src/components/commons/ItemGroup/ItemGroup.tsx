import * as Styled from './ItemGroup.styles';

export interface Props {
  children: React.ReactNode;
  orderNumber: string;
  onDetailLinkClick?: () => void;
}

const ItemGroup = ({ children, orderNumber, onDetailLinkClick }: Props) => {
  return (
    <Styled.ItemGroup>
      <Styled.Header>
        <Styled.OrderNumber>주문번호 : {orderNumber}</Styled.OrderNumber>
        <Styled.DetailLinkButton onClick={onDetailLinkClick}>상세보기 {'>'}</Styled.DetailLinkButton>
      </Styled.Header>
      <Styled.ItemContainer>{children}</Styled.ItemContainer>
    </Styled.ItemGroup>
  );
};

export default ItemGroup;
