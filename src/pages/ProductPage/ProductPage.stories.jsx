import ProductPage from './ProductPage';

export default {
  title: 'Page/ProductPage',
  component: ProductPage,
};

function Template(args) {
  return <ProductPage {...args} />;
}

export const Default = Template.bind({});
