import * as Styled from './ItemGroup.styles';

export interface Props {
  children: React.ReactNode;
  orderNumber: string;
}

const ItemGroup = ({ children, orderNumber }: Props) => {
  return (
    <Styled.ItemGroup>
      <Styled.Header>
        <Styled.OrderNumber>주문번호 : {orderNumber}</Styled.OrderNumber>
        <Styled.DetailLink>상세보기 {'>'}</Styled.DetailLink>
      </Styled.Header>
      <Styled.ItemContainer>{children}</Styled.ItemContainer>
    </Styled.ItemGroup>
  );
};

export default ItemGroup;
