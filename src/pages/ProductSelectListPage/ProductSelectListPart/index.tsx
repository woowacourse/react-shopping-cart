import Checkbox from '@Components/Checkbox';
import ProductSelectItem from '@Components/ProductSelectItem';

import { Product } from '@Types/index';

import useCheckbox from '@Hooks/useCheckbox';

import * as S from './style';

function ProductSelectListPart(list: Product[]) {
  const { checked, setChecked } = useCheckbox();

  return (
    <S.ProductSelectListPart>
      <S.ProductSelectListTitle>장바구니 상품</S.ProductSelectListTitle>
      <S.ProductSelectList>
        {list.map((elem, index) => {
          return <ProductSelectItem product={elem} key={index} />;
        })}
      </S.ProductSelectList>
      <S.ProductSelectListBottom>
        <Checkbox checked={checked} setChecked={setChecked} />
        <S.SelectedProductAmount>전체 선택(1/3)</S.SelectedProductAmount>
        <S.SelectedProductDeleteButton>선택 삭제</S.SelectedProductDeleteButton>
      </S.ProductSelectListBottom>
    </S.ProductSelectListPart>
  );
}

export default ProductSelectListPart;
