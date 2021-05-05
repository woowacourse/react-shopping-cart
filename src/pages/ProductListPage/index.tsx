import ProductList from '../../components/productList';
import Template from '../../components/shared/Template';
import { INNER_TEMPLATE_WIDTH } from '../../constants/style';
import { PRODUCT_LIST_MOCK } from '../../mock';

const ProductListPage = () => {
  return (
    <Template innerWidth={INNER_TEMPLATE_WIDTH}>
      <ProductList products={PRODUCT_LIST_MOCK} />
    </Template>
  );
};

export default ProductListPage;
