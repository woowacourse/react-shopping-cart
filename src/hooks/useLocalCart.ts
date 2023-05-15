import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { cartListAtom } from '../store/cart';

const useLocalCart = () => {
  const cart = useRecoilValue(cartListAtom);

  useEffect(() => {
    const handleLocalStorage = () => {
      localStorage.setItem('cart', JSON.stringify(cart));
    };

    window.addEventListener('beforeunload', handleLocalStorage);

    return () => {
      window.removeEventListener('beforeunload', handleLocalStorage);
    };
  }, [cart]);
};

export default useLocalCart;
