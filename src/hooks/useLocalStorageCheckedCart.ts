import { useRecoilState, useRecoilValue } from 'recoil';
import { checkedCartItems } from '../recoil/selectors/selectors';
import { useEffect } from 'react';
import { cartItemCheckState } from '../recoil/atoms/atoms';

export default function useLocalStorageCheckedCart({
  cartId,
}: {
  cartId: number;
}) {
  const [isCheck, setIsCheck] = useRecoilState(cartItemCheckState(cartId));

  const localStorageCheckedCart = JSON.parse(
    localStorage.getItem('checkedCart')!,
  );
  const checkedCart = useRecoilValue(checkedCartItems).map((item) => item.id);

  useEffect(() => {
    if (!localStorageCheckedCart) {
      localStorage.setItem('checkedCart', JSON.stringify(checkedCart));
    }

    if (localStorageCheckedCart && localStorageCheckedCart.includes(cartId)) {
      setIsCheck(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('checkedCart', JSON.stringify(checkedCart));
  }, [isCheck]);
}
