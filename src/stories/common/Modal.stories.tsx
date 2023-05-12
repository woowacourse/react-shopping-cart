import type { Meta, StoryObj } from '@storybook/react';

import Button from '../../components/common/Button/Button';
import Modal from '../../components/common/Modal/Modal';
import { useModal } from '../../hooks/useModal';

const meta = {
  title: 'ShoppingCart/Common/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    children: <div style={{ width: '400px', height: '200px' }}>Modal Content</div>,
  },

  render: ({ children }) => {
    const [isModalOpen, handleModalOpen, handleModalClose, handleModalClosePress] = useModal();

    return (
      <>
        <Button style={{ width: '250px' }} onClick={handleModalOpen}>
          Click
        </Button>
        {isModalOpen && (
          <Modal handleClose={handleModalClose} handleClosePress={handleModalClosePress}>
            {children}
          </Modal>
        )}
      </>
    );
  },
};
