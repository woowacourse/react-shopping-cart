import type { StoryFn } from '@storybook/react';
import ProductList from '../components/trees/ProductList';
import mockProduct from '../../public/assets/mockProducts.json';

export default {
  title: 'ProductList',
  component: ProductList,
};

const Template: StoryFn<React.ComponentProps<typeof ProductList>> = (props) => (
  <ProductList {...props} />
);

export const DefaultProductList = Template.bind({});
DefaultProductList.args = {
  products: mockProduct,
};
