import trashCan from '@Asset/trashCan.png';

import Checkbox from '@Components/Checkbox';
import QuantityController from '@Components/QuantityController';

import { Product } from '@Types/index';

import useCheckbox from '@Hooks/useCheckbox';
import useShoppingCart from '@Hooks/useShoppingCart';

import * as S from './style';

type ProductSelectItemProps = {
  product: Product;
};

function ProductSelectItem({ product }: ProductSelectItemProps) {
  const { imageUrl, name, price, id } = product;
  const priceText = price.toLocaleString();
  const { updateShoppingCart } = useShoppingCart();
  const { checked, setChecked } = useCheckbox();

  return (
    <S.Container aria-label="하나의 판매 품목 정보">
      <Checkbox checked={checked} setChecked={setChecked} />
      <S.ProductItemImage src={imageUrl} alt={`${name} 사진`} />
      <S.ProductItemName aria-label={'판매 품목 이름'}>{name}</S.ProductItemName>
      <S.ProductItemLayout>
        <S.DeleteItemIcon src={trashCan} alt={`목록 삭제하기`} tab-index="0" />
        <QuantityController quantity={1} changeProductQuantity={updateShoppingCart(product)} />
        <S.ProductItemPrice aria-label={'판매 품목 가격'}>{`${priceText} 원`}</S.ProductItemPrice>
      </S.ProductItemLayout>
    </S.Container>
  );
}

export default ProductSelectItem;
