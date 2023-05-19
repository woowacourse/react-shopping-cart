import { useRecoilState, useRecoilValue } from 'recoil';

import Checkbox from '@Components/Checkbox';
import ProductSelectItem from '@Components/ProductSelectItem';

import { ShoppingCartProduct } from '@Types/index';

import useCheckedItems from '@Hooks/useCheckedItems';

import shoppingCartState from '@Atoms/shoppingCartState';

import shoppingItemsAmountState from '@Selector/shoppingItemsAmountState';

import * as S from './style';

function ProductSelectListPart() {
  const [shoppingCart] = useRecoilState<ShoppingCartProduct[]>(shoppingCartState);
  const {
    parentCheckbox,
    getCheckedItemAmount,
    isCheckedItem,
    updateCheckStatus,
    changeAllItemToCheckedItem,
    changeAllItemToUncheckedItem,
  } = useCheckedItems();

  const shoppingItemAmount = useRecoilValue(shoppingItemsAmountState);

  const toggleChecked = () => {
    if (getCheckedItemAmount() !== shoppingItemAmount) {
      changeAllItemToCheckedItem();
      parentCheckbox.current = true;
      return;
    }

    changeAllItemToUncheckedItem();
    parentCheckbox.current = false;
  };

  return (
    <S.ProductSelectListPart>
      <S.ProductSelectListTitle>상품 목록</S.ProductSelectListTitle>
      <S.ProductSelectController>
        <Checkbox isChecked={parentCheckbox.current} changeEvent={toggleChecked} />
        <S.SelectedProductAmount>
          전체 선택({getCheckedItemAmount()}/{shoppingItemAmount})
        </S.SelectedProductAmount>
        <S.SelectedProductDeleteButton>선택 삭제</S.SelectedProductDeleteButton>
      </S.ProductSelectController>
      <S.ProductSelectList>
        {shoppingCart.map((elem) => {
          return (
            <ProductSelectItem
              product={elem.product}
              key={elem.id}
              isChecked={isCheckedItem(elem.id)}
              updateCheckStatus={updateCheckStatus(elem.id)}
            />
          );
        })}
      </S.ProductSelectList>
    </S.ProductSelectListPart>
  );
}

export default ProductSelectListPart;
