import { useLayoutEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';
import { StoreState, Product } from '../../types';

const useMainPage = () => {
  const dispatch = useDispatch();
  const { isLoading, productList } = useSelector((state: StoreState) => ({
    isLoading: state.isLoading,
    productList: state.productList,
  }));

  useLayoutEffect(() => {
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

  return { isLoading, productList: sortedProductList };
};

export default useMainPage;
