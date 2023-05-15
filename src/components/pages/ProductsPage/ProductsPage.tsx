import { StyledProductsPage } from '@pages/ProductsPage/ProductsPage.styled';
import ProductList from '@components/pages/ProductsPage/ProductList/ProductList';

const ProductsPage = () => {
  return (
    <StyledProductsPage>
      <ProductList />
    </StyledProductsPage>
  );
};

export default ProductsPage;
