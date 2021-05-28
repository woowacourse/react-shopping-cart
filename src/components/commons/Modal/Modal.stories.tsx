import BackDrop from '../BackDrop/BackDrop';
import Modal, { Props } from './Modal';

export default {
  title: 'Components/Commons/Modal',
  component: Modal,
};

const Template = (args: Props) => <Modal {...args} />;

export const Default = Template.bind({});
(Default as any).args = {
  zIndex: 100,
};
