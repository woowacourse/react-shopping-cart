import { Meta, Story } from '@storybook/react';
import CheckoutProductList, {
  CheckoutProductListProps,
} from './CheckoutProductList';

export default {
  title: 'ShoppingCart/CheckoutProductList',
  component: CheckoutProductList,
} as Meta;

const Template: Story<CheckoutProductListProps> = ({ ...args }) => (
  <CheckoutProductList {...args} />
);

export const Basic = Template.bind({});
