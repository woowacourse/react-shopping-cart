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
          if (check && !checkedCart.includes(cartId)) {
            return [...checkedCart, cartId];
          }
          return checkedCart.filter((it) => it !== cartId);
        });
      },
    [],
  );
  const setAll = useRecoilCallback(
    ({ set }) =>
      (check: boolean) => {
        set(checkedCartState, (checkedCart) => {
          if (check) {
            return [];
          }
          return cart.map((it) => it.id);
        });
      },
    [],
  );
  return { setCheck, setAll };
};

export default useCheck;
