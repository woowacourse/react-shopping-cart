import TrashCanIcon from './TrashIcon';

export default {
  title: 'ShoppingCart/TrashCanIcon',
  component: TrashCanIcon,
};

const Template = ({ ...args }) => <TrashCanIcon {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  scale: '1.0',
};
