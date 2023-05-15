import type { Meta, StoryObj } from '@storybook/react';

import Button from '../../components/common/Button/Button';
import Modal from '../../components/common/Modal/Modal';
import { useModal } from '../../hooks/useModal';

const meta = {
  title: 'ShoppingCart/Common/Modal',
  component: Modal,
  argTypes: {
    children: {
      control: { type: 'text' },
    },
  },
  args: {
    children: 'Modal Content',
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ children }) => {
    const { isModalOpen, handleModalOpen, handleModalClose } = useModal();

    return (
      <>
        <Button style={{ width: '250px' }} onClick={handleModalOpen}>
          Click
        </Button>
        {isModalOpen && (
          <Modal handleClose={handleModalClose}>
            <div style={{ width: '400px', height: '200px' }}>{children}</div>
          </Modal>
        )}
      </>
    );
  },
};
