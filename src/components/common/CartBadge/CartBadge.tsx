import { useRecoilValue } from 'recoil';
import { cartBadge } from '../../../atoms/cart';
import * as S from './CartBadge.styles';

const CartBadge = () => {
  const badge = useRecoilValue(cartBadge);

  return badge ? <S.Badge>{badge}</S.Badge> : null;
};

export default CartBadge;
