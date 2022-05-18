import React from 'react';

import Button from 'components/Button';
import HomeButton from 'containers/HomeButton';
import OrderListButton from 'containers/OrderListButton';
import MoveCartPageButton from 'containers/MoveCartPageButton';
import DeleteProductButton from 'containers/DeleteProductButton';
import OrderProductsButton from 'containers/OrderButton';

export default {
  title: 'containers/Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;
const HomeButtonTemplate = () => <HomeButton />;
const OrderListButtonTemplate = () => <OrderListButton />;
const MoveCartPageButtonTemplate = () => <MoveCartPageButton />;
const DeleteProductButtonTemplate = () => <DeleteProductButton />;
const OrderProductsButtonTemplate = () => <OrderProductsButton />;

export const Primary = Template.bind({});
export const HomeButtonPrimary = HomeButtonTemplate.bind({});
export const OrderListButtonPrimary = OrderListButtonTemplate.bind({});
export const MoveCartPageButtonPrimary = MoveCartPageButtonTemplate.bind({});
export const DeleteProductButtonPrimary = DeleteProductButtonTemplate.bind({});
export const OrderProductsButtonPrimary = OrderProductsButtonTemplate.bind({});

Primary.args = {
  width: '150px',
  height: '78px',
  fontSize: '30px',
  fontWeight: 900,
  border: '1px solid black',
  children: '버튼',
};
