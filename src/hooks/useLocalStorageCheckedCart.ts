import { useRecoilState, useRecoilValue } from 'recoil';
import { checkedCartItems } from '../recoil/selectors';
import { useEffect } from 'react';
import { cartItemCheckState } from '../recoil/atoms';
import { RULE } from '../constants/rule';

export default function useLocalStorageCheckedCart({
  cartId,
}: {
  cartId: number;
}) {
  const [isCheck, setIsCheck] = useRecoilState(cartItemCheckState(cartId));

  const localStorageCheckedCart = JSON.parse(
    localStorage.getItem(RULE.CheckedLocalStorageName)!,
  );
  const checkedCart = useRecoilValue(checkedCartItems).map((item) => item.id);

  useEffect(() => {
    if (!localStorageCheckedCart) {
      localStorage.setItem(
        RULE.CheckedLocalStorageName,
        JSON.stringify(checkedCart),
      );
    }

    if (localStorageCheckedCart && localStorageCheckedCart.includes(cartId)) {
      setIsCheck(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      RULE.CheckedLocalStorageName,
      JSON.stringify(checkedCart),
    );
  }, [isCheck]);
}
