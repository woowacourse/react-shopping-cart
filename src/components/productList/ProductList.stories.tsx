import type { StoryFn } from '@storybook/react';

import ProductList from './ProductList';

export default {
  title: 'ProductList',
  component: ProductList,
};

const Template: StoryFn<React.ComponentProps<typeof ProductList>> = (props) => <ProductList />;

export const Controls = Template.bind({});
Controls.args = {};
