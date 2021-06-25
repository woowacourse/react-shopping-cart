import ProductDetailPage from '.';

export default {
  component: ProductDetailPage,
  title: 'pages/ProductDetailPage',
};

const Template = (args) => <ProductDetailPage {...args} />;

export const Default = Template.bind({});

Default.args = {};
