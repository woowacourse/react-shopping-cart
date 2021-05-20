import CloseIcon from './CloseIcon';

export default {
  title: 'ShoppingCart/CloseIcon',
  component: CloseIcon,
};

const Template = ({ ...args }) => <CloseIcon {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  scale: '1.0',
};
