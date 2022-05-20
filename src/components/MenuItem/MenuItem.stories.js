import MenuItem from 'components/MenuItem';

export default {
  title: 'components/MenuItem',
  component: MenuItem,
};

const Template = (args) => <MenuItem {...args} />;

export const 장바구니 = Template.bind({});

장바구니.args = {
  children: '장바구니',
  to: '/cart',
};

export const 주문목록 = Template.bind({});

주문목록.args = {
  children: '주문목록',
  to: '/order',
};
