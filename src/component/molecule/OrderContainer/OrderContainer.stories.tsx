import { Meta, Story } from '@storybook/react';
import OrderContainer, { OrderContainerProps } from './OrderContainer';

export default {
  title: 'ShoppingCart/OrderContainer',
  component: OrderContainer,
} as Meta;

const Template: Story<OrderContainerProps> = ({ ...args }) => (
  <OrderContainer {...args} />
);

export const Basic = Template.bind({});

Basic.args = {
  orderId: '1',
  children: <></>,
};
