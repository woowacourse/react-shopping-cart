import { CART_LIST_SKELETON_ITEM_LENGTH } from '../../../constants';
import CartItemSkeleton from '../CartItem/CartItemSkeleton';
import * as S from './CartList.styles';

const CartListSkeleton = () => {
  return (
    <S.CartListContainer>
      {Array.from({ length: CART_LIST_SKELETON_ITEM_LENGTH }, (_, index) => (
        <CartItemSkeleton key={index} />
      ))}
    </S.CartListContainer>
  );
};

export default CartListSkeleton;
