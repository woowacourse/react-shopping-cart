import type { StoryFn } from '@storybook/react';
import ProductList from '../ProductList';
import mockProduct from '../../../../../public/assets/mockProducts.json';
import { handlers } from '../../../../mocks/handlers';

export default {
  title: 'ProductList',
  component: ProductList,
};

const Template: StoryFn<React.ComponentProps<typeof ProductList>> = (props) => (
  <ProductList {...props} />
);

export const DefaultProductList = Template.bind({});
DefaultProductList.args = {};
DefaultProductList.parameters = {
  msw: handlers,
};
