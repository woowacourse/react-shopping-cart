import ProductItem from 'components/ProductItem';
import Layout from 'components/Layout';

export const ProductList = () => (
  <Layout>
    {Array.from({ length: 12 }).map((_, i) => (
      <ProductItem id={i} image="" name="" price="" />
    ))}
  </Layout>
);

export default ProductList;
