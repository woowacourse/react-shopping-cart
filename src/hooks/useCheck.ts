import { useRecoilCallback, useRecoilValue } from 'recoil';
import cartState from '../recoil/atoms/cartState';
import checkedCartState from '../recoil/atoms/checkedCartState';
import type { CartProduct } from '../type';

const useCheck = (cartId: CartProduct['id'] = 0) => {
  const cart = useRecoilValue(cartState);

  const setCheck = useRecoilCallback(
    ({ set }) =>
      (check: boolean) => {
        set(checkedCartState, (checkedCart) => {
          if (check) {
            return [...checkedCart, cartId];
          }
          return checkedCart.filter((it) => it !== cartId);
        });
      },
    [cartId],
  );
  const setAll = useRecoilCallback(
    ({ set }) =>
      (check: boolean) => {
        console.log(check, 'useCheck');
        set(checkedCartState, (checkedCart) => {
          if (check) {
            console.log('ㅁ', checkedCart, 'check되어서');
            return [];
          }
          console.log('f', checkedCart, 'check되어서');
          console.log(cart.map((it) => it.id));
          return cart.map((it) => it.id);
        });
      },
    [],
  );
  return { setCheck, setAll };
};

export default useCheck;
