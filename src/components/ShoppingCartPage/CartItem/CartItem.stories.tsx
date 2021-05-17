import CartItem, { Props } from './CartItem';

export default {
  title: 'Components/ShoppingCartPage/CartItem',
  component: CartItem,
  argTypes: {},
};

const Template = (args: Props) => <CartItem {...args} />;

export const Default = Template.bind({});

(Default as any).args = {
  name: '[든든] 야채바삭 김말이 700g',
  price: '18,900',
};
