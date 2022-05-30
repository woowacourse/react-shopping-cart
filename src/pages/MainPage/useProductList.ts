import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';
import { StoreState, Product } from '../../types';

type SelectedState = Pick<
  StoreState['productsState'],
  'isLoading' | 'productList' | 'error'
>;

const useProductList = () => {
  const dispatch = useDispatch();
  const { isLoading, productList, error } = useSelector<
    StoreState,
    SelectedState
  >(({ productsState }) => ({
    isLoading: productsState.isLoading,
    productList: productsState.productList,
    error: productsState.error,
  }));

  useEffect(() => {
    dispatch(actions.getProductList());
  }, [dispatch]);

  const sortedProductList = useMemo(() => {
    const { availableList, outOfStockList } = productList.reduce(
      (next, product) => {
        const isAvailable = product.stock > 0;

        (isAvailable ? next.availableList : next.outOfStockList).push(product);

        return next;
      },
      {
        availableList: [] as Array<Product>,
        outOfStockList: [] as Array<Product>,
      }
    );

    return [...availableList, ...outOfStockList];
  }, [productList]);

  return { isLoading, productList: sortedProductList, error };
};

export default useProductList;
