import ShoppingCartList from '.';

export default {
  component: ShoppingCartList,
  title: 'components/ShoppingCartItemList',
};

const Template = (args) => <ShoppingCartList {...args} />;

export const Default = Template.bind({});

Default.args = {};
