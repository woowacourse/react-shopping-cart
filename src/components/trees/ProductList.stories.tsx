import type { StoryFn } from '@storybook/react';

import ProductList from './ProductList';
import mockProduct from '../../../public/assets/mockProducts.json';

export default {
  title: 'ProductList',
  component: ProductList,
};

const Template: StoryFn<React.ComponentProps<typeof ProductList>> = (props) => (
  <ProductList {...props} />
);

export const Controls = Template.bind({});
Controls.args = {
  products: mockProduct,
};
