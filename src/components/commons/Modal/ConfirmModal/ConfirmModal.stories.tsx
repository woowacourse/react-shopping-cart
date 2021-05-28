import ConfirmModal, { Props } from './ConfirmModal';

export default {
  title: 'Components/Commons/Modal/ConfirmModal',
  component: ConfirmModal,
};

const Template = (args: Props) => <ConfirmModal {...args} />;

export const Default = Template.bind({});
(Default as any).args = {};
