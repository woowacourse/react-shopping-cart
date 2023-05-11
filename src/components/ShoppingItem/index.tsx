import QuantityController from '@Components/QuantityController';
import * as S from './style';
import useShoppingBasket from '@Hooks/useShoppingBasket';
import { useRecoilValue } from 'recoil';
import quantityState from '@Selector/quantityState';

type ShoppingItemProps = {
  product?: {
    id: number;
    price: number;
    name: string;
    imageUrl: string;
  };
  isLoading: boolean;
};

function ShoppingItem({ product, isLoading }: ShoppingItemProps) {
  const { updateShoppingBasket } = useShoppingBasket();
  const quantity = product && useRecoilValue(quantityState(product.id));

  return (
    <S.Container aria-label={isLoading ? '하나의 판매 품목 정보 로딩 중' : '하나의 판매 품목 정보'}>
      <S.ShoppingItemImage src={product && product.imageUrl} alt={product && product.name}></S.ShoppingItemImage>
      <S.ShoppingItemContents>
        <S.ShoppingItemLayout>
          <S.ShoppingItemName aria-label={product && '판매 품목 이름'} isLoading={isLoading}>
            {product ? product.name : '로딩중입니다.'}
          </S.ShoppingItemName>
          <S.ShoppingItemPrice aria-label={product && '판매 품목 가격'} isLoading={isLoading}>
            {product ? `${product.price.toLocaleString()} 원` : '로딩중입니다.'}
          </S.ShoppingItemPrice>
        </S.ShoppingItemLayout>
        {product && (
          <QuantityController quantity={quantity} updateShoppingBasket={updateShoppingBasket} product={product} />
        )}
      </S.ShoppingItemContents>
    </S.Container>
  );
}

export default ShoppingItem;
