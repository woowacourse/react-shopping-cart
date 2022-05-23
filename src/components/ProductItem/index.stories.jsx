import ProductItem from '.';

export default {
  title: 'Components/ProductItem',
  component: ProductItem,
};

const Template = args => <ProductItem {...args} />;

export const ImageTemplate = Template.bind({});
ImageTemplate.args = {
  id: 2,
};
