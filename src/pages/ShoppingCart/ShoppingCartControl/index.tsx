import { useRecoilValue } from 'recoil';

import Checkbox from '@Components/Checkbox';

import useSelectedShoppingItem from '@Hooks/useSelectedShoppingItem';
import useShoppingCart from '@Hooks/useShoppingCart';

import shoppingCartAmountState from '@Selector/shoppingCartAmountState';

import * as S from './style';

function ShoppingCartControl() {
  const { isAllSelected, selectedItemAmount, updateAllSelectedShoppingItem } = useSelectedShoppingItem();
  const { shoppingCart } = useShoppingCart();
  const shoppingCartAmount = useRecoilValue(shoppingCartAmountState);

  return (
    <S.Container>
      <Checkbox
        isChecked={isAllSelected(Number(shoppingCartAmount))}
        updateSelectedState={() => {
          updateAllSelectedShoppingItem(shoppingCart);
        }}
        size="small"
      />
      <S.SelectedSituation>
        {isAllSelected(Number(shoppingCartAmount)) ? '전체해제' : '전체선택'}({selectedItemAmount}/{shoppingCartAmount})
      </S.SelectedSituation>
      <S.DeleteButton>선택삭제</S.DeleteButton>
    </S.Container>
  );
}

export default ShoppingCartControl;
