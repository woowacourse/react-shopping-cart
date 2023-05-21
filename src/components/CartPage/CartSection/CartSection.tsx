import { selectedItemsAmountSelector } from '../../../atoms/cart';
import { useRefreshableRecoilValue } from '../../../hooks/common/useRefreshableAtom';
import CartItemController from '../CartItemController/CartItemController';
import CartItemList from '../CartItemList/CartItemList';
import * as S from './CartSection.styles';

const CartSection = () => {
  const selectedItemsAmount = useRefreshableRecoilValue(
    selectedItemsAmountSelector
  );

  return (
    <S.Root>
      <S.SelectedCount>든든배송 상품 ({selectedItemsAmount}개)</S.SelectedCount>
      <CartItemList />
      <CartItemController />
    </S.Root>
  );
};

export default CartSection;
