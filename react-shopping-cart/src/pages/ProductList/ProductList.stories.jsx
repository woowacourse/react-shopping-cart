import ProductList from './ProductList.page';

export default {
  title: 'Pages/ProductList',
  component: ProductList,
};

export const DefaultProductList = args => <ProductList {...args} />;
DefaultProductList.args = {};
