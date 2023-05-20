import CartItemController from '../CartItemController/CartItemController';
import CartItemList from '../CartItemList/CartItemList';
import * as S from './CartSection.styles';

const CartSection = () => {
  return (
    <S.Root>
      <S.SelectedCount>든든배송 상품 (3개)</S.SelectedCount>
      <CartItemList />
      <CartItemController />
    </S.Root>
  );
};

export default CartSection;
