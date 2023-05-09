import QuantityController from '@Components/QuantityController';
import * as S from './style';

type ShoppingItemProps = {
  id: number;
  price: number;
  name: string;
  imageUrl: string;
};

function ShoppingItem({ id, price, name, imageUrl }: ShoppingItemProps) {
  return (
    <S.Container aria-label="하나의 판매 품목 정보">
      <S.ShoppingItemImage src={imageUrl} alt={name}></S.ShoppingItemImage>
      <S.ShoppingItemContents>
        <S.ShoppingItemLayout>
          <S.ShoppingItemName aria-label="판매 품목 이름">{name}</S.ShoppingItemName>
          <S.ShoppingItemPrice aria-label="판매 품목 가격">{price.toLocaleString()} 원</S.ShoppingItemPrice>
        </S.ShoppingItemLayout>
        <QuantityController quantity={99} />
      </S.ShoppingItemContents>
    </S.Container>
  );
}

export default ShoppingItem;
