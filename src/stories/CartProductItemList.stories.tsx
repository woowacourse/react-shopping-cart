import CartProductItemList from '../components/CartProductItemList';
import type { Meta, StoryObj } from '@storybook/react';
import { handlers } from '../mocks/handlers';

type Story = StoryObj<typeof CartProductItemList>;
const meta: Meta<typeof CartProductItemList> = {
  title: 'Cart/CartProductItemList',
  component: CartProductItemList,
};
export default meta;

export const Default: Story = {
  args: {},
  parameters: {
    msw: handlers,
  },
};
