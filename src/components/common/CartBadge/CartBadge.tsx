import { useRecoilValue } from 'recoil';
import { cartState } from '../../../recoil/cart';
import * as S from './CartBadge.styles';

const CartBadge = () => {
  const cartItem = useRecoilValue(cartState);

  return cartItem.length ? <S.Badge>{cartItem.length}</S.Badge> : null;
};

export default CartBadge;
