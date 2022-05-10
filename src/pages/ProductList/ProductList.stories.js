import ProductList from 'pages/ProductList/ProductList';

export default {
  title: 'pages/ProductList',
  component: ProductList,
};

const Template = (args) => <ProductList {...args} />;

export const Example = Template.bind({});
