import ProductListPage from '.';

export default {
  component: ProductListPage,
  title: 'Pages/ProductListPage',
};

const Template = (args) => <ProductListPage {...args} />;

export const Default = Template.bind({});

Default.args = {};
