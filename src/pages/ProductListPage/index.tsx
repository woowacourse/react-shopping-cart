import ProductList from '../../components/productList';
import Template from '../../components/shared/Template';
import { PRODUCT_LIST_MOCK } from '../../mock';

const ProductListPage = () => {
  return (
    <Template>
      <ProductList products={PRODUCT_LIST_MOCK} />
    </Template>
  );
};

export default ProductListPage;
