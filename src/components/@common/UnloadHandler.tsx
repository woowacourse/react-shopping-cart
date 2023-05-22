import { useRecoilValue } from 'recoil';
import { cartListAtom } from '../../stores/cartListStore.ts';
import { useEffect } from 'react';
import { setCartListInLocalStorage, getCartListFromLocalStorage } from '../../utils/localStorageCartList.ts';

const UnloadHandler = () => {
  const cartList = useRecoilValue(cartListAtom);

  useEffect(() => {
    const localStorageCartList = getCartListFromLocalStorage();

    if (JSON.stringify(cartList) !== JSON.stringify(localStorageCartList)) {
      const handleUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault();
        if (cartList) {
          setCartListInLocalStorage(cartList);
        }
      };

      window.addEventListener('beforeunload', handleUnload);

      return () => {
        window.removeEventListener('beforeunload', handleUnload);
      };
    }
  }, [cartList]);

  return null;
};

export default UnloadHandler;
