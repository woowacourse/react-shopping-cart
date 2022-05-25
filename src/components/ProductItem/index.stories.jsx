import ProductItem from '.';

export default {
  title: 'Components/ProductItem',
  component: ProductItem,
  argTypes: {
    id: { control: 'select', options: Array.from({ length: 10 }, (_, i) => i + 1) },
  },
};

const Template = args => <ProductItem {...args} />;

export const ProductItemTemplate = Template.bind({});
ProductItemTemplate.args = {
  id: 2,
};
