import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import FlexWrapper from 'components/@shared/FlexWrapper/FlexWrapper';
import Pagination from 'components/@shared/Pagination/Pagination';
import WithSpinner from 'components/@shared/WithSpinner/WithSpinner';

import ProductCardGroup from 'components/ProductCardGroup/ProductCardGroup';

import { fetchCartsStart } from 'redux/carts/carts.action';
import { fetchProductsStart } from 'redux/products/products.action';
import {
  selectProductsError,
  selectIsProductsLoading,
} from 'redux/products/products.selector';

function ProductListPage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const idx = searchParams.get('page') ?? 1;
  const isLoading = useSelector(selectIsProductsLoading);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
  }, [error]);

  // THINK: withSpinner 때문에, ProductCardGroup에서 datafetching을 못함
  useEffect(() => {
    dispatch(fetchProductsStart(idx));
    dispatch(fetchCartsStart());
  }, [idx]);

  return (
    <WithSpinner isLoading={isLoading}>
      <FlexWrapper flexDirection="column" gap="60px">
        <ProductCardGroup />
        <Pagination />
      </FlexWrapper>
    </WithSpinner>
  );
}

export default ProductListPage;
