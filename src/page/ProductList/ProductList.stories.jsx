import ProductList from 'page/ProductList';

export default {
  title: 'Component/ProductList',
  component: ProductList,
};

const Template = args => <ProductList {...args} />;

const DefaultProductList = Template.bind({});

DefaultProductList.args = {};

export { DefaultProductList };
