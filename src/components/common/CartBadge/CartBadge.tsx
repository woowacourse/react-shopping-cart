import { cartItemsAmountSelector } from '../../../atoms/cart';
import useLazyRecoilValue from '../../../hooks/common/useLazyRecoilValue';
import * as S from './CartBadge.styles';

const CartBadge = () => {
  const cartItemsAmount = useLazyRecoilValue(cartItemsAmountSelector);

  return cartItemsAmount ? <S.Badge>{cartItemsAmount}</S.Badge> : null;
};

export default CartBadge;
