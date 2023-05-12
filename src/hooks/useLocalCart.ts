import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { cartAtom } from '../recoil/cartState';

const useLocalCart = () => {
  const cart = useRecoilValue(cartAtom);

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
