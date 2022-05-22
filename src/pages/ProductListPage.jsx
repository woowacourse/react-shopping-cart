import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductListAsync } from '../store/product/product.actions';
import styled from 'styled-components';
import Product from '../components/Product';

function ProductListPage() {
  const dispatch = useDispatch();
  const productList = useSelector(({ product }) => product.productList);

  useEffect(() => {
    dispatch(getProductListAsync());
  }, [dispatch]);

  return (
    <StyledContent>
      <StyledGridContainer>
        {productList.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </StyledGridContainer>
    </StyledContent>
  );
}

const StyledContent = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 5vh;
`;

const StyledGridContainer = styled.div`
  display: grid;
  gap: 18px;
  width: 80%;
  grid-template-columns: repeat(4, 1fr);
  margin: auto;
  overflow-y: auto;
`;

export default ProductListPage;
