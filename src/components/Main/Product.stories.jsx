import Product from './Product';

export default {
  title: 'Product',
  component: Product,
};

function Template(args) {
  return <Product {...args} />;
}

export const MediumProductImage = Template.bind({});

MediumProductImage.args = {};
