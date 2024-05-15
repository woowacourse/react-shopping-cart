import { useRecoilValue } from 'recoil';
import { cartListState } from '../../recoil/selectors';
import CartItem from '../CartItem';
import type { CartItemType } from "../../types";

export default function CartList({ items }: { items: CartItemType[] }) {
  const [isAllSelected, setAllSelected] = useRecoilState(cartItemAllSelected);

  // TODO: items가 없을 때 fallback component 노출하기
  return <ul>{items && items.map((item) => <CartItem cartItem={item} />)}</ul>;
}
