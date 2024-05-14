import { useRecoilValue } from 'recoil';
import { cartListState } from '../../recoil/selectors';
import CartItem from '../CartItem';

export default function CartList() {
  const items = useRecoilValue(cartListState);

  // TODO: items가 없을 때 fallback component 노출하기
  return <ul>{items && items.map((item) => <CartItem cartItem={item} />)}</ul>;
}
