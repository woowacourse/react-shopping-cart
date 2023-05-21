import { cartState } from '../../../atoms/cart';
import useLazyRecoilValue from '../../../hooks/common/useLazyRecoilValue';
import CartItem from '../CartItem/CartItem';
import * as S from './CartItemList.styles';

const CartItemList = () => {
  const cart = useLazyRecoilValue(cartState);

  return (
    <S.Root>
      {cart.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
    </S.Root>
  );
};

export default CartItemList;
