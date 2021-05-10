import { useEffect, useState } from 'react';
import { thunkAddItemToCart, thunkGetCartItems } from '../states/actions/cart';
import { useAppDispatch } from '../states/store';
import { Product } from '../types';

const useFetchCartRedux = () => {
  const dispatch = useAppDispatch();
  const [updateToggle, setUpdateToggle] = useState(false);

  const doFetch = () => {
    setUpdateToggle(!updateToggle);
  };

  useEffect(() => {
    dispatch(thunkGetCartItems());
  }, [updateToggle]);

  const addItem = (item: Product) => {
    dispatch(thunkAddItemToCart(item));
  };

  return { doFetch, addItem };
};

export default useFetchCartRedux;
