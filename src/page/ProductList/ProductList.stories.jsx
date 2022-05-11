import ProductList from './ProductList';

export default {
  title: 'Component/ProductList',
  component: ProductList,
};

const Template = args => <ProductList {...args} />;

const DefaultProductList = Template.bind({});

export { DefaultProductList };
