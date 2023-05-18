import CartProductItemList from '../components/CartProductItemList';
import handlers from '../mocks/handlers';
import type { Meta, StoryObj } from '@storybook/react';

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
