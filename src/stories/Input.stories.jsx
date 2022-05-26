import React from 'react';

import Input from 'components/Input';
import CartProductCheckbox from 'containers/CartProductCheckbox';
import ProductCountInput from 'containers/ProductCountInput';

export default {
  title: 'containers/Input',
  component: Input,
};

const Template = () => <Input />;
const CartProductCheckboxTemplate = () => <CartProductCheckbox />;
const ProductCountInputTemplate = () => <ProductCountInput />;

export const Primary = Template.bind({});
export const CartProductCheckboxPrimary = CartProductCheckboxTemplate.bind({});
export const ProductCountInputPrimary = ProductCountInputTemplate.bind({});
