import CartOrder from '.';

export default {
  title: 'Component/Cart/CartOrder',
  component: CartOrder,
};

const Template = args => <CartOrder {...args} />;

export const Default = Template.bind({});

Default.args = {
  products: [
    {
      id: 1,
      image: 'https://i.pinimg.com/474x/4a/47/d5/4a47d5956eb090ff702e3b2cb47fdf98.jpg',
      name: '사과',
      price: 2000,
      count: 1,
      checked: true,
    },
    {
      id: 2,
      image: 'https://i.pinimg.com/474x/4a/47/d5/4a47d5956eb090ff702e3b2cb47fdf98.jpg',
      name: '사과',
      price: 1300,
      count: 1,
      checked: true,
    },
    {
      id: 3,
      image: 'https://i.pinimg.com/474x/4a/47/d5/4a47d5956eb090ff702e3b2cb47fdf98.jpg',
      name: '사과',
      price: 3000,
      count: 1,
      checked: true,
    },
  ],
};
