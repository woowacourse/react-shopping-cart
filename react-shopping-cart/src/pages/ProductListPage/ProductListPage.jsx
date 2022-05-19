import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Pagination from 'components/@shared/Pagination/Pagination';
import WithSpinner from 'components/@shared/WithSpinner/WithSpinner';

import ProductCardGroup from 'components/ProductCardGroup/ProductCardGroup';

import { fetchCartsStart } from 'redux/carts/carts.action';
import { fetchProductsStart } from 'redux/products/products.action';
import {
  selectProductsError,
  selectProductsLoading,
} from 'redux/products/products.selector';

import { ColumnFlexWrapper } from 'styles/Wrapper';

function ProductListPage() {
  const { idx } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
  }, [error]);

  // THINK: withSpinner 때문에, ProductCardGroup에서 datafetching을 못해옴
  // 아무리 생각해도, 여기서 data fetching은 하면 안됨
  useEffect(() => {
    dispatch(fetchProductsStart(idx));
    dispatch(fetchCartsStart());
  }, [idx]);

  return (
    <WithSpinner loading={loading}>
      <ColumnFlexWrapper gap="60px">
        <ProductCardGroup />
        <Pagination />
      </ColumnFlexWrapper>
    </WithSpinner>
  );
}

export default ProductListPage;
