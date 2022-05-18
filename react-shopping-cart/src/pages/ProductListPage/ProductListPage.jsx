import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Pagination from 'components/@shared/Pagination/Pagination';
import PaginationButton from 'components/@shared/PaginationButton/PaginationButton';
import WithSpinner from 'components/@shared/WithSpinner/WithSpinner';

import ProductCardGroup from 'components/ProductCardGroup/ProductCardGroup';

import { fetchCartsStart } from 'redux/carts/carts.action';
import { fetchProductsStart } from 'redux/products/products.action';
import {
  selectCurrentProducts,
  selectProductsError,
  selectProductsLoading,
} from 'redux/products/products.selector';

import { ColumnFlexWrapper } from 'styles/Wrapper';

function ProductListPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectProductsLoading);
  const products = useSelector(selectCurrentProducts);

  const error = useSelector(selectProductsError);

  const { idx } = useParams();

  useEffect(() => {
    dispatch(fetchProductsStart(idx));
    dispatch(fetchCartsStart());
  }, [dispatch, idx]);

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
  }, [error]);

  return (
    <WithSpinner loading={loading}>
      <ColumnFlexWrapper gap="60px">
        <ProductCardGroup products={products} />
        {/* TODO: pagenum 받아야할듯 */}
        <Pagination />
      </ColumnFlexWrapper>
    </WithSpinner>
  );
}

export default ProductListPage;
