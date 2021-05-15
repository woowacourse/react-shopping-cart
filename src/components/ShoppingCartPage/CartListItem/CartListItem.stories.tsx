import CartListItem, { Props } from './CartListItem';

export default {
  title: 'Components/ShoppingCartPage/CartItem',
  component: CartListItem,
  argTypes: {},
};

const Template = (args: Props) => <CartListItem {...args} />;

export const Default = Template.bind({});

(Default as any).args = {
  name: '[든든] 야채바삭 김말이 700g',
  price: '18,900',
};
