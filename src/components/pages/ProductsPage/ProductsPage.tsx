import { StyledProductsPage } from '@pages/ProductsPage/ProductsPage.styled';
import ProductList from '@components/ProductList/ProductList';

const ProductsPage = () => {
  return (
    <StyledProductsPage>
      <ProductList />
    </StyledProductsPage>
  );
};

export default ProductsPage;
