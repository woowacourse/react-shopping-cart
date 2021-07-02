import { useSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
import MESSAGE from '../constants/messages';
import { getProducts, ProductState } from '../slices/productSlice';
import { useAppDispatch, useAppSelector } from './useStore';

const useProduct = (): ProductState => {
  const products = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const { data, status, error } = products;

  const getItem = useCallback(async () => {
    const resultAction = await dispatch(getProducts());

    if (getProducts.rejected.match(resultAction)) {
      enqueueSnackbar(resultAction?.payload?.message || MESSAGE.GET_PRODUCTS_FAILURE);
    }
  }, [dispatch, enqueueSnackbar]);

  useEffect(() => {
    getItem();
  }, [getItem]);

  return { data, status, error };
};

export default useProduct;
