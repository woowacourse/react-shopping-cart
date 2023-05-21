import { useRecoilValue } from 'recoil';
import { cartState } from '../../../atoms/cart';
import CartItem from '../CartItem/CartItem';
import * as S from './CartItemList.styles';

const CartItemList = () => {
  const cart = useRecoilValue(cartState);
  return (
    <S.Root>
      {cart.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
    </S.Root>
  );
};

export default CartItemList;
