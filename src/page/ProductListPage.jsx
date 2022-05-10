import styled from 'styled-components';
import ProductItem from 'components/ProductItem';
import dummy from 'assets/dummy_img.png';

const StyledProductListPage = styled.main`
  width: 1269px;
  background-color: white;
  margin-top: 140px;
  padding: 40px;
  overflow: scroll;
  height: 100%;

  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 47px;
`;

const ProductListPage = () => {
  return (
    <StyledProductListPage>
      <StyledProductList>
        {Array.from({ length: 30 }).map((value, index) => (
          <ProductItem src={dummy} name="PET보틀-정사각(420ml)" price="43,400" key={index} />
        ))}
      </StyledProductList>
    </StyledProductListPage>
  );
};

export default ProductListPage;
