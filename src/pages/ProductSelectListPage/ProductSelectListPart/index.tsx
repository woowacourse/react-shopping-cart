import { useRecoilState, useRecoilValue } from 'recoil';

import Checkbox from '@Components/Checkbox';
import ProductSelectItem from '@Components/ProductSelectItem';

import { ShoppingCartProduct } from '@Types/index';

import useShoppingCart from '@Hooks/useShoppingCart';

import shoppingCartState from '@Atoms/shoppingCartState';

import shoppingItemsAmountState from '@Selector/shoppingItemsAmountState';

import * as S from './style';

type ProductSelectListPartProps = {
  checkController: {
    isAllItemSelect: boolean;
    checkedItemsId: number[];
    updateEachItemCheckStatus: (id: number) => () => void;
    updateAllItemCheckState: () => void;
  };
};

function ProductSelectListPart({ checkController }: ProductSelectListPartProps) {
  const [shoppingCart] = useRecoilState<ShoppingCartProduct[]>(shoppingCartState);
  const { isAllItemSelect, checkedItemsId, updateEachItemCheckStatus, updateAllItemCheckState } = checkController;

  const shoppingItemAmount = useRecoilValue(shoppingItemsAmountState);
  const { deleteShoppingItems } = useShoppingCart();

  const checkedItemAmount = checkedItemsId.length;

  const toggleChecked = () => {
    if (checkedItemAmount !== shoppingItemAmount) {
      updateAllItemCheckState();
      return;
    }

    updateAllItemCheckState();
  };

  const deleteCheckedShoppingItem = () => {
    deleteShoppingItems(checkedItemsId);
  };

  return (
    <S.ProductSelectListPart>
      <S.ProductSelectListTitle>상품 목록</S.ProductSelectListTitle>
      <S.ProductSelectController>
        <Checkbox isChecked={isAllItemSelect} changeEvent={toggleChecked} />
        <S.SelectedProductAmount>
          전체 선택({checkedItemAmount}/{shoppingItemAmount})
        </S.SelectedProductAmount>
        <S.SelectedProductDeleteButton onClick={deleteCheckedShoppingItem}>선택 삭제</S.SelectedProductDeleteButton>
      </S.ProductSelectController>
      <S.ProductSelectList>
        {shoppingCart.map((elem) => {
          const isChecked = checkedItemsId.includes(elem.id);

          return (
            <ProductSelectItem
              product={elem.product}
              key={elem.id}
              isChecked={isChecked}
              updateCheckStatus={updateEachItemCheckStatus(elem.id)}
            />
          );
        })}
      </S.ProductSelectList>
    </S.ProductSelectListPart>
  );
}

export default ProductSelectListPart;
