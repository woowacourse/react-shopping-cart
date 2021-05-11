import ShoppingCartIcon from './ShoppingCartIcon';

export default {
  title: 'ShoppingCart/ShoppingCartIcon',
  component: ShoppingCartIcon,
};

const Template = ({ ...args }) => <ShoppingCartIcon {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  scale: '1.0',
};
