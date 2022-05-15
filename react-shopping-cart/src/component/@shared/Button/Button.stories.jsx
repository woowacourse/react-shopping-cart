import Button from 'component/Button';

export default {
  title: 'Button',
  component: Button,
};

const Template = (args) => <Button {...args}></Button>;

export const ShoppingCartButton = Template.bind({});
ShoppingCartButton.args = {
  children: '장바구니',
};
