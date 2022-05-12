import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../../actions/actions';
import { StoreState } from '../../types';
import ProductCardGrid from '../../components/ProductCardGrid/ProductCardGrid';

import { Product } from '../../types';
import Spinner from '../../components/Spinner/Spinner';

function MainPage() {
  const { isLoading, productList } = useSelector((state: StoreState) => ({
    isLoading: state.isLoading,
    productList: state.productList,
  }));
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(actions.getProductList());
  }, [dispatch]);

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

  if (isLoading) return <Spinner />;

  return (
    <ProductCardGrid productList={[...availableList, ...outOfStockList]} />
  );
}

export default MainPage;
