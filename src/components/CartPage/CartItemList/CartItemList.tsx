import { cartState } from '../../../atoms/cart';
import { EMPTY_CART } from '../../../constants/cart';
import { useRefreshableRecoilValue } from '../../../hooks/common/useRefreshableAtom';
import CartItem from '../CartItem/CartItem';
import * as S from './CartItemList.styles';

const CartItemList = () => {
  const cart = useRefreshableRecoilValue(cartState);

  return (
    <S.Root>
      {cart.length ? (
        cart.map((item) => <CartItem key={item.id} {...item} />)
      ) : (
        <S.EmptyMessage>{EMPTY_CART}</S.EmptyMessage>
      )}
    </S.Root>
  );
};

export default CartItemList;
