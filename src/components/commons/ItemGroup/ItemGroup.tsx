import * as Styled from './ItemGroup.styles';

export interface Props {
  children: React.ReactNode;
  orderNumber: string;
}

const ItemGroup = ({ children, orderNumber }: Props) => {
  return (
    <Styled.ItemGroup>
      <Styled.Header>
        <Styled.orderNumber>주문번호 : {orderNumber}</Styled.orderNumber>
        <Styled.detailLink>상세보기 {'>'}</Styled.detailLink>
      </Styled.Header>
      <Styled.ItemContainer>{children}</Styled.ItemContainer>
    </Styled.ItemGroup>
  );
};

export default ItemGroup;
