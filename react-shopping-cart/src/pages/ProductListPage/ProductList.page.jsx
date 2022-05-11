import styled from 'styled-components';
import Header from 'components/Header/Header.component';
import PageContainer from 'components/@shared/PageContainer/PageContainer.component';
import ProductListItem from 'components/ProductListItem/ProductListItem.component';
import mockData from 'constants/mockData';

const ProductListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 45px;
`;

function ProductList() {
  return (
    <>
      <Header />
      <PageContainer>
        <ProductListBox>
          {mockData.map(itemInfo => (
            <ProductListItem key={itemInfo.id} {...itemInfo} />
          ))}
        </ProductListBox>
      </PageContainer>
    </>
  );
}

export default ProductList;
