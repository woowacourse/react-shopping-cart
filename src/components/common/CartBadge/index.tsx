import { useRecoilValue } from 'recoil';
import { cartItemLength } from '../../../recoil/cart';
import * as S from './CartBadge.styles';

const CartBadge = () => {
  const numberOfItem = useRecoilValue(cartItemLength);

  return numberOfItem ? <S.Badge>{numberOfItem}</S.Badge> : null;
};

export default CartBadge;
