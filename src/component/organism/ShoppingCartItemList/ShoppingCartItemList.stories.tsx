import { Meta, Story } from '@storybook/react';
import ShoppingCartList, {
  ShoppingCartItemListProps,
} from './ShoppingCartItemList';

export default {
  title: 'ShoppingCart/ShoppingCartList',
  component: ShoppingCartList,
  argTypes: { children: { control: 'text' } },
} as Meta;

const Template: Story<ShoppingCartItemListProps> = ({ ...args }) => (
  <ShoppingCartList {...args} />
);

export const Basic = Template.bind({});

Basic.args = {};
