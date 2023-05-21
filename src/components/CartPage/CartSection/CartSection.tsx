import { useRecoilValue } from 'recoil';
import { selectedItemsAmountSelector } from '../../../atoms/cart';
import CartItemController from '../CartItemController/CartItemController';
import CartItemList from '../CartItemList/CartItemList';
import * as S from './CartSection.styles';

const CartSection = () => {
  const selectedItemsAmount = useRecoilValue(selectedItemsAmountSelector);

  return (
    <S.Root>
      <S.SelectedCount>든든배송 상품 ({selectedItemsAmount}개)</S.SelectedCount>
      <CartItemList />
      <CartItemController />
    </S.Root>
  );
};

export default CartSection;
