import { Meta } from '@storybook/react';
import { useModal } from 'hooks/useModal';
import Modal from '.';

const modal = {
  component: Modal,
  title: 'Common/Modal',
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof Modal>;

export default modal;

const Template = () => {
  const { onCloseModal } = useModal();
  return (
    <Modal
      isOpen={true}
      onCloseModal={onCloseModal}
      onDeleteSelectedItems={onCloseModal}
    />
  );
};

export const Default = Template.bind({});
