import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from 'components/ProductCard/ProductCard';
import {
  selectCurrentProducts,
  selectProductsError,
  selectProductsLoading,
} from 'redux/products/products.selector';
import { useEffect } from 'react';
import { fetchProductsStart } from 'redux/products/products.action';
import WithSpinner from 'components/@shared/WithSpinner/WithSpinner';
import { fetchCartsStart } from 'redux/carts/carts.action';
import { selectCurrentCarts } from 'redux/carts/carts.selector';
import { isInCart } from 'util/check';
import Pagination from 'components/@shared/Pagination/Pagination';
import PaginationButton from 'components/@shared/PaginationButton/PaginationButton';
import { useNavigate, useParams } from 'react-router-dom';

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

  useEffect(() => {
    if (typeof idx === 'undefined') {
      navigate('/1');
    }
  }, [idx, navigate]);

  const handleNavigatePage = (pageIdx) => {
    navigate(`/${pageIdx}`);
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
