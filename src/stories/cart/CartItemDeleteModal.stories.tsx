import { Meta, StoryObj } from '@storybook/react';

import CartItemDelete from '../../components/cart/CartItemDelete/CartItemDelete';
import Modal from '../../components/common/Modal/Modal';

const meta = {
  title: 'ShoppingCart/Cart/CartItemDeleteModal',
  component: CartItemDelete,
  args: {
    removeItem: () => {},
  },
  decorators: [
    (Story) => (
      <Modal isOpen handleClose={() => {}}>
        <Story />
      </Modal>
    ),
  ],
} satisfies Meta<typeof CartItemDelete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
