import { CART_LIST_SKELETON_ITEM_LENGTH } from '../../../constants';
import CartItem from '../CartItem/CartItem';
import * as S from './CartList.styles';

const CartListSkeleton = () => {
  return (
    <S.CartListContainer>
      {Array.from({ length: CART_LIST_SKELETON_ITEM_LENGTH }, (_, index) => (
        <CartItem.Skeleton key={index} />
      ))}
    </S.CartListContainer>
  );
};

export default CartListSkeleton;
