import CartIcon from '.';

export default {
  title: 'Components/CartIcon',
  component: CartIcon,
  argTypes: {
    category: { control: false },
  },
};

const Template = args => <CartIcon {...args} />;

export const CartIconTemplate = Template.bind({});
CartIconTemplate.args = {
  category: undefined,
};

export const HeaderCartIconTemplate = Template.bind({});
HeaderCartIconTemplate.parameters = {
  backgrounds: { default: 'dark' },
};
HeaderCartIconTemplate.args = {
  category: 'header',
};
