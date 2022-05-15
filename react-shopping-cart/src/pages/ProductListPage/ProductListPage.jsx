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

import { isInCart } from 'utils/check';

const GridContainer = styled.div`
  display: grid;
  width: 70%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 22px;
  justify-content: center;
`;

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

  const handleNavigatePage = (pageNum) => {
    navigate(`/${pageNum}`);
  };

  return (
    <WithSpinner loading={loading}>
      <GridContainer>
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
      </GridContainer>
      <Pagination>
        {new Array(5).fill('').map((_, i) => (
          <PaginationButton key={i} onClick={(_) => handleNavigatePage(i + 1)}>
            {i + 1}
          </PaginationButton>
        ))}
      </Pagination>
    </WithSpinner>
  );
}

export default ProductListPage;
