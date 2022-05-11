import styled from 'styled-components';
import Header from 'components/Header/Header.component';
import PageContainer from 'components/@shared/PageContainer/PageContainer.component';
import ProductListItem from 'components/ProductListItem/ProductListItem.component';
import useFetch from 'hooks/useFetch';
import mockData from 'constants/mockData';

const ProductListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 45px;
`;

function ProductList() {
  const { data, isLoading, error } = useFetch('http://localhost:3001/product');

  return (
    <>
      <Header />
      <PageContainer>
        <ProductListBox>
          {isLoading ? (
            <p>로딩중 입니다..</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            data.map(itemInfo => <ProductListItem key={itemInfo.id} {...itemInfo} />)
          )}
        </ProductListBox>
      </PageContainer>
    </>
  );
}

export default ProductList;
