import { useRecoilValue } from 'recoil';
import { cartBadge } from '../../../recoil/cart';
import * as S from './CartBadge.styles';

const CartBadge = () => {
  const numberOfItem = useRecoilValue(cartBadge);

  return numberOfItem ? <S.Badge>{numberOfItem}</S.Badge> : null;
};

export default CartBadge;
