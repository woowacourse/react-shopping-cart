import CartProductItem from '.';

export default {
  title: 'Components/CartProductItem',
  component: CartProductItem,
  argTypes: {
    id: { control: 'select', options: Array.from({ length: 10 }, (_, i) => i + 1) },
  },
};

const Template = args => <CartProductItem {...args} />;

export const CartProductItemTemplate = Template.bind({});
CartProductItemTemplate.args = {
  id: 1,
  quantity: 10,
};
