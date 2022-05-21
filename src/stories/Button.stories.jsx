import React from 'react';

import Button from 'components/Button';
import HomeButton from 'containers/HomeButton';
import OrderListButton from 'containers/OrderListButton';
import MoveCartPageButton from 'containers/MoveCartPageButton';
import DeleteProductButton from 'containers/DeleteProductButton';
import DeleteProductIconButton from 'containers/DeleteProductIconButton';
import OrderProductsButton from 'containers/OrderProductsButton';
import ProductCountUpButton from 'containers/ProductCountUpButton';
import ProductCountDownButton from 'containers/ProductCountDownButton';
import AddCartIconButton from 'containers/AddCartIconButton';
import AddCartButton from 'containers/AddCartButton';

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
const ProductCountUpButtonTemplate = () => <ProductCountUpButton />;
const ProductCountDownButtonTemplate = () => <ProductCountDownButton />;
const DeleteProductIconButtonTemplate = () => <DeleteProductIconButton />;
const AddCartIconButtonTemplate = () => <AddCartIconButton />;
const AddCartButtonTemplate = () => <AddCartButton />;

export const Primary = Template.bind({});
export const HomeButtonPrimary = HomeButtonTemplate.bind({});
export const OrderListButtonPrimary = OrderListButtonTemplate.bind({});
export const MoveCartPageButtonPrimary = MoveCartPageButtonTemplate.bind({});
export const DeleteProductButtonPrimary = DeleteProductButtonTemplate.bind({});
export const DeleteProductIconButtonPrimary = DeleteProductIconButtonTemplate.bind({});
export const OrderProductsButtonPrimary = OrderProductsButtonTemplate.bind({});
export const ProductCountUpButtonPrimary = ProductCountUpButtonTemplate.bind({});
export const ProductCountDownButtonPrimary = ProductCountDownButtonTemplate.bind({});
export const AddCartIconButtonPrimary = AddCartIconButtonTemplate.bind({});
export const AddCartButtonPrimary = AddCartButtonTemplate.bind({});

Primary.args = {
  width: '150px',
  height: '78px',
  fontSize: '30px',
  fontWeight: 900,
  border: '1px solid black',
  children: '버튼',
};
