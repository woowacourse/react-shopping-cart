import Divider from './Divider.component';

export default {
  title: 'Shared/Divider',
  component: Divider,
};

export const Default = args => <Divider {...args} />;

Default.args = {
  height: 4,
  backgroundColor: '#444',
};
