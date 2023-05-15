import { useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { cartState } from '../../recoil/cartAtoms';
import ProductList from '../../components/ProductList';


function Home() {
  const setCartList = useSetRecoilState(cartState);
  const loadCartList = useCallback(async () => {
    // fetch('/cart-items');
  }, [setCartList]);

  useEffect(() => {
    loadCartList();
  }, [loadCartList]);

  return (
    <ProductList />
  );
}

export default Home;
