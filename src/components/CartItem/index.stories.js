import CartItem from '.';

export default {
  title: 'Component/CartItem',
  component: CartItem,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => <CartItem {...args} />;

export const DefaultTemplate = Template.bind({});
DefaultTemplate.args = {
  id: 1,
  image: 'https://cdn-mart.baemin.com/sellergoods/list/a7dc3e2b-fe03-4479-ae91-2a681244bc54.jpg',
  name: '펩시는 제로 라임이죠',
  price: 1000,
  quantity: 150,
  isChecked: true,
};
