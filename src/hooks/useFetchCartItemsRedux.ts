import { useEffect, useState } from 'react';
import { thunkGetCartItems } from '../states/actions/cart';
import { useAppDispatch } from '../states/store';

const useFetchCartItemsRedux = () => {
  const dispatch = useAppDispatch();
  const [updateToggle, setUpdateToggle] = useState(false);

  const doFetch = () => {
    setUpdateToggle(!updateToggle);
  };

  useEffect(() => {
    dispatch(thunkGetCartItems());
  }, [updateToggle]);

  return { doFetch };
};

export default useFetchCartItemsRedux;
