import { cartState } from '../../../atoms/cart';
import { useRefreshableRecoilValue } from '../../../hooks/common/useRefreshableAtom';
import CartItem from '../CartItem/CartItem';
import * as S from './CartItemList.styles';

const CartItemList = () => {
  const cart = useRefreshableRecoilValue(cartState);

  return (
    <S.Root>
      {cart.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
    </S.Root>
  );
};

export default CartItemList;
