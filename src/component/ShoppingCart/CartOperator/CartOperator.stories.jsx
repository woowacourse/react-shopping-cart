import CartOperator from '.';

export default {
  title: 'Component/Cart/CartOperator',
  component: CartOperator,
};

const Template = args => <CartOperator {...args} />;

export const Default = Template.bind({});

Default.args = {
  products: [
    {
      image: 'https://i.pinimg.com/474x/4a/47/d5/4a47d5956eb090ff702e3b2cb47fdf98.jpg',
      name: '사과',
      price: 1300,
      count: 2,
      id: 1,
    },
    {
      image: 'https://i.pinimg.com/474x/4a/47/d5/4a47d5956eb090ff702e3b2cb47fdf98.jpg',
      name: '사과',
      price: 1300,
      count: 2,
      id: 2,
    },
    {
      image: 'https://i.pinimg.com/474x/4a/47/d5/4a47d5956eb090ff702e3b2cb47fdf98.jpg',
      name: '사과',
      price: 1300,
      count: 2,
      id: 3,
    },
  ],
};
