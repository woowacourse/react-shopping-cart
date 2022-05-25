import styled from 'styled-components';
import Product from '../components/Product';
import useFetch from '../hooks/useFetch';
import Loading from '../components/Loading';
import { SERVER_PATH } from '../constant';

function ProductListPage() {
  const { data: productList, isLoading, isError } = useFetch(SERVER_PATH.PRODUCTS);

  if (isError) return <h1>error</h1>;
  if (isLoading) return <Loading />;

  return (
    <StyledContent>
      <StyledGridContainer>
        {productList.map((product) => (
          <Product key={product.id} productData={product} />
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
