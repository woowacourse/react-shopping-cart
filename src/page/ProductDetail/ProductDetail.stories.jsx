import ProductDetail from '.';

export default {
  title: 'Component/Page/ProductDetail',
  component: ProductDetail,
};

const Template = args => <ProductDetail {...args} />;

export const Default = Template.bind({});
