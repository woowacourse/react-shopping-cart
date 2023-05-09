import QuantityController from '@Components/QuantityController';
import styled from 'styled-components';

type ShoppingItemProps = {
  id: number;
  price: number;
  name: string;
  imageUrl: string;
};

function ShoppingItem({ id, price, name, imageUrl }: ShoppingItemProps) {
  return (
    <Container aria-label="하나의 판매 품목 정보">
      <ShoppingItemImage src={imageUrl} alt={name}></ShoppingItemImage>
      <ShoppingItemContents>
        <ShoppingItemLayout>
          <ShoppingItemName aria-label="판매 품목 이름">{name}</ShoppingItemName>
          <ShoppingItemPrice aria-label="판매 품목 가격">{price.toLocaleString()} 원</ShoppingItemPrice>
        </ShoppingItemLayout>
        <QuantityController quantity={99} />
      </ShoppingItemContents>
    </Container>
  );
}

export default ShoppingItem;

const Container = styled.div`
  width: 282px;
  display: flex;
  flex-direction: column;
`;

const ShoppingItemImage = styled.img`
  height: 282px;
  margin-bottom: 18px;
`;

const ShoppingItemContents = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  align-items: flex-start;
  column-gap: 20px;
  color: #4f4f4f;
`;

const ShoppingItemLayout = styled.div`
  margin-left: 10px;
`;

const ShoppingItemName = styled.div`
  line-height: 20px;
  word-break: break-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ShoppingItemPrice = styled.div`
  font-size: 20px;
  margin-top: 5px;
`;
