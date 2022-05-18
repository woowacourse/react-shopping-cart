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
  const navigate = useNavigate();
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

  const handleNavigatePage = (pageNum) => () => {
    navigate(`/${pageNum}`);
  };

  return (
    <WithSpinner loading={loading}>
      <ColumnFlexWrapper gap="60px">
        <ProductCardGroup products={products} />
        <Pagination>
          {/* FIXME: Array.from으로 변경 */}
          {new Array(5).fill('').map((_, pageNum) => (
            <PaginationButton
              key={pageNum}
              onClick={handleNavigatePage(pageNum + 1)}
            >
              {pageNum + 1}
            </PaginationButton>
          ))}
        </Pagination>
      </ColumnFlexWrapper>
    </WithSpinner>
  );
}

export default ProductListPage;
