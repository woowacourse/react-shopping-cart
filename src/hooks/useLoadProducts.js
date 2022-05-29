import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCarts, loadCarts } from 'store/carts';
import { loadProducts } from 'store/products';

export default function useLoadProducts() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadProducts());

    if (isLoggedIn) {
      dispatch(loadCarts());
    } else {
      dispatch(clearCarts());
    }
  }, [isLoggedIn]);
}
