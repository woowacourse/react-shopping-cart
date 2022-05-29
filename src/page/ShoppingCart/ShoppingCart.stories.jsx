import ShoppingCart from '.';

export default {
  title: 'Component/Page/ShoppingCart',
  component: ShoppingCart,
};

const Template = args => <ShoppingCart {...args} />;

export const Default = Template.bind({});
