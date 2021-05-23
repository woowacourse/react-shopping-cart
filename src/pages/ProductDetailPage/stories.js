import ProductDetailPage from '.';

export default {
  component: ProductDetailPage,
  title: 'Pages/ProductDetailPage',
};

const Template = (args) => <ProductDetailPage {...args} />;

export const Default = Template.bind({});

Default.args = {};
