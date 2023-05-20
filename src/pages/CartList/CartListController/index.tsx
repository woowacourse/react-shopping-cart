import { useRecoilValue } from 'recoil';

import Checkbox from '@Components/Checkbox';

import { CartItemType, UpdateCartItem } from '@Types/index';

import useSelectedShoppingItem from '@Hooks/useSelectedShoppingItem';

import shoppingCartAmountState from '@Selector/cartItemsAmountState';

import { FETCH_METHOD, FETCH_URL } from '@Constants/index';

import * as S from './style';

type ShoppingCartControlProps = {
  cartItems: CartItemType[] | null;
  updateCartItem: UpdateCartItem;
};

function CartListController({ cartItems, updateCartItem }: ShoppingCartControlProps) {
  const { itemId, isAllSelected, selectedItemAmount, updateAllSelectedShoppingItem, popSelectedShoppingItem } =
    useSelectedShoppingItem();

  const shoppingCartAmount = useRecoilValue(shoppingCartAmountState);

  const deleteManyShoppingItem = () => {
    if (!window.confirm('선택한 모든 상품을 장바구니에서 삭제하시겠습니까?')) return;

    itemId.forEach((cartId) => {
      updateCartItem(`${FETCH_URL.cartItems}/${cartId}`, FETCH_METHOD.DELETE);
      popSelectedShoppingItem(cartId);
    });
  };

  return (
    <S.Container>
      <Checkbox
        isChecked={isAllSelected(Number(shoppingCartAmount))}
        updateSelectedState={() => {
          updateAllSelectedShoppingItem(cartItems);
        }}
        size="small"
      />
      <S.SelectedSituation>
        {isAllSelected(Number(shoppingCartAmount)) ? '전체해제' : '전체선택'}({selectedItemAmount}/{shoppingCartAmount})
      </S.SelectedSituation>
      <S.DeleteButton onClick={deleteManyShoppingItem}>선택삭제</S.DeleteButton>
    </S.Container>
  );
}

export default CartListController;
