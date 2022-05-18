import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Pagination from 'components/@shared/Pagination/Pagination';
import PaginationButton from 'components/@shared/PaginationButton/PaginationButton';
import WithSpinner from 'components/@shared/WithSpinner/WithSpinner';

import ProductCard from 'components/ProductCard/ProductCard';

import { fetchCartsStart } from 'redux/carts/carts.action';
import { selectCurrentCarts } from 'redux/carts/carts.selector';
import { fetchProductsStart } from 'redux/products/products.action';
import {
  selectCurrentProducts,
  selectProductsError,
  selectProductsLoading,
} from 'redux/products/products.selector';

import { ColumnFlexWrapper } from 'styles/Wrapper';

import { isInCart } from 'utils/check';

function ProductListPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectProductsLoading);
  const products = useSelector(selectCurrentProducts);
  const carts = useSelector(selectCurrentCarts);
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
    // TODO: 컴포넌트 추상화 레벨 맞추기
    <WithSpinner loading={loading}>
      <ColumnFlexWrapper gap="60px">
        <Styled.GridContainer>
          {products.map(({ id, name, image, price }) => {
            return (
              <ProductCard
                key={id}
                id={id}
                name={name}
                thumbnail={image}
                price={price}
                $isincart={isInCart(id, carts)}
              />
            );
          })}
        </Styled.GridContainer>
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

const Styled = {
  GridContainer: styled.div`
    display: grid;
    width: 70%;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 22px;
    justify-content: center;
  `,
};

export default ProductListPage;
