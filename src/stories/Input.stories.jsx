import React from 'react';

import Input from 'components/Input';
import Checkbox from 'containers/Checkbox';
import ProductCountInput from 'containers/ProductCountInput';

export default {
  title: 'containers/Input',
  component: Input,
};

const Template = () => <Input />;
const CheckboxTemplate = () => <Checkbox />;
const ProductCountInputTemplate = () => <ProductCountInput />;

export const Primary = Template.bind({});
export const CheckboxPrimary = CheckboxTemplate.bind({});
export const ProductCountInputPrimary = ProductCountInputTemplate.bind({});
