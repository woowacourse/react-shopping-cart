import CartItem from 'components/CartItem';

export default {
  title: 'components/CartItem',
  component: CartItem,
};

const Template = (args) => <CartItem {...args} />;

export const Example = Template.bind({});

Example.args = {
  cartList: {
    id: 2,
    name: '관절에 무리없는 캣워커/캣휠 120CM 대형사이즈',
    imgUrl:
      'https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/164776373888845264.jpg?gif=1&w=1280&h=1280&c=c',
    price: '124000',
    quantity: 10,
    cartQuantity: 1,
  },
};
