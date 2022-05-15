import ProductListPage from 'pages/ProductListPage/ProductListPage';

export default {
  title: 'ProductListPage',
  component: ProductListPage,
};

const Template = (args) => <ProductListPage {...args} />;

export const DefaultProductListPage = Template.bind({});
DefaultProductListPage.args = {};
