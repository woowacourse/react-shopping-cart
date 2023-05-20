import { cartBadge } from '../../../atoms/cart';
import useLazyRecoilValue from '../../../hooks/common/useLazyRecoilValue';
import * as S from './CartBadge.styles';

const CartBadge = () => {
  const badge = useLazyRecoilValue(cartBadge);

  return badge ? <S.Badge>{badge}</S.Badge> : null;
};

export default CartBadge;
