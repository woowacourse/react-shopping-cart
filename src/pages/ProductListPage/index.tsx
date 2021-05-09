import ProductList from '../../components/ProductList';
import ReactShoppingCartTemplate from '../../components/shared/ReactShoppingCartTemplate';
import { PRODUCT_LIST_MOCK } from '../../mocks/mockData';

const ProductListPage = () => {
  return (
    <ReactShoppingCartTemplate>
      <ProductList products={PRODUCT_LIST_MOCK} />
    </ReactShoppingCartTemplate>
  );
};

export default ProductListPage;
