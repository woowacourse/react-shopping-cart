import CartProduct from '.';

export default {
  title: 'Component/Cart/CartProduct',
  component: CartProduct,
};

const Template = args => <CartProduct {...args} />;

export const Default = Template.bind({});

Default.args = {
  product: {
    image: 'https://i.pinimg.com/474x/4a/47/d5/4a47d5956eb090ff702e3b2cb47fdf98.jpg',
    name: '사과',
    price: 1300,
    count: 2,
  },
};
