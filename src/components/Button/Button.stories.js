import Button from './Button';

export default {
  title: 'ShoppingCart/Button',
  component: Button,
  argTypes: { children: { control: 'text' } },
};

const Template = args => <Button {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: '장바구니',
};
