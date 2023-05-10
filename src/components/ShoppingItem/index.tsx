import QuantityController from '@Components/QuantityController';
import * as S from './style';
import useShoppingBasket from '@Hooks/useShoppingBasket';
import { useRecoilValue } from 'recoil';
import quantityState from '../../selector/quantityState';

type ShoppingItemProps = {
  product: {
    id: number;
    price: number;
    name: string;
    imageUrl: string;
  };
};

function ShoppingItem({ product }: ShoppingItemProps) {
  const { updateShoppingBasket } = useShoppingBasket();
  const quantity = useRecoilValue(quantityState(product.id));

  return (
    <S.Container aria-label="하나의 판매 품목 정보">
      <S.ShoppingItemImage src={product.imageUrl} alt={product.name}></S.ShoppingItemImage>
      <S.ShoppingItemContents>
        <S.ShoppingItemLayout>
          <S.ShoppingItemName aria-label="판매 품목 이름">{product.name}</S.ShoppingItemName>
          <S.ShoppingItemPrice aria-label="판매 품목 가격">{product.price.toLocaleString()} 원</S.ShoppingItemPrice>
        </S.ShoppingItemLayout>
        <QuantityController quantity={quantity} updateShoppingBasket={updateShoppingBasket} product={product} />
      </S.ShoppingItemContents>
    </S.Container>
  );
}

export default ShoppingItem;
