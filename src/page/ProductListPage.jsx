import styled from 'styled-components';
import ProductItem from 'components/ProductItem';
import dummy from 'assets/dummy_img.png';

const StyledProductListPage = styled.main`
  width: 70%;
  background-color: white;
  margin-top: 140px;
`;

const ProductListPage = () => {
  return (
    <StyledProductListPage>
      <ProductItem src={dummy} name="PET보틀-정사각(420ml)" price="43,400"></ProductItem>
    </StyledProductListPage>
  );
};

export default ProductListPage;
