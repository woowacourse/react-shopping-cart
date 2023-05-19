import trashCan from '@Asset/trashCan.png';
import { useRecoilValue } from 'recoil';

import Checkbox from '@Components/Checkbox';
import QuantityController from '@Components/QuantityController';

import { Product } from '@Types/index';

import useShoppingCart from '@Hooks/useShoppingCart';

import quantityState from '@Selector/quantityState';

import { SHOPPING_QUANTITY } from '@Constants/index';

import * as S from './style';

type ProductSelectItemProps = {
  product: Product;
  isChecked: boolean;
  updateCheckStatus: () => void;
};

function ProductSelectItem({ product, isChecked, updateCheckStatus }: ProductSelectItemProps) {
  const { imageUrl, name, price, id } = product;

  const { updateShoppingCart } = useShoppingCart();

  const quantity = useRecoilValue(quantityState(id));
  const priceText = price.toLocaleString();

  return (
    <S.Container aria-label="하나의 판매 품목 정보">
      <Checkbox isChecked={isChecked} changeEvent={updateCheckStatus} />
      <S.ProductItemImage src={imageUrl} alt={`${name} 사진`} />
      <S.ProductItemName aria-label={'판매 품목 이름'}>{name}</S.ProductItemName>
      <S.ProductItemLayout>
        <S.DeleteItemIcon src={trashCan} alt={`목록 삭제하기`} tab-index="0" />
        <QuantityController
          quantity={quantity}
          changeProductQuantity={updateShoppingCart(product)}
          minCount={SHOPPING_QUANTITY.DEFAULT}
        />
        <S.ProductItemPrice aria-label={'판매 품목 가격'}>{`${priceText} 원`}</S.ProductItemPrice>
      </S.ProductItemLayout>
    </S.Container>
  );
}

export default ProductSelectItem;
