import QuantityController from '@Components/QuantityController';
import * as S from './style';
import { Product } from '@Pages/ProductListPage/ProductList';

type ShoppingItemProps = {
  product: {
    id: number;
    price: number;
    name: string;
    imageUrl: string;
  };
  quantity: number;
  updateShoppingBasket: (product: Product, quantity: number) => void;
};

function ShoppingItem({ product, quantity, updateShoppingBasket }: ShoppingItemProps) {
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
