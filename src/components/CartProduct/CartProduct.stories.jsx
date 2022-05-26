import CartProduct from './CartProduct';

export default {
  title: 'Components/CartProduct',
  component: CartProduct,
  parameters: {
    layout: 'centered',
  },
};

const Template = args => <CartProduct {...args} />;

const DefaultCartProduct = Template.bind({});

DefaultCartProduct.args = {
  image: 'https://i.pinimg.com/474x/4a/47/d5/4a47d5956eb090ff702e3b2cb47fdf98.jpg',
  name: '사과',
  quantity: 3,
  price: 1300,
};

export { DefaultCartProduct };
