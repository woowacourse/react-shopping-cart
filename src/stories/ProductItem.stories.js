import ProductItem from '../components/ProductItem';

export default {
  title: 'Component/ProductItem',
  component: ProductItem,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => <ProductItem {...args} />;

export const Compy = Template.bind({});
Compy.args = {};
