import React from 'react';
import Button from './Button';
import * as T from '../../../types';

export default {
  title: 'shared/Button',
  component: Button,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {
    size: {
      type: 'radio',
      options: [...Object.keys(T.ButtonSize)],
    },
  },
};

const Template = (args) => <Button {...args} />;

export const Regular = Template.bind({});
Regular.args = {
  size: T.ButtonSize.REGULAR,
  bgColor: '',
  text: '장바구니',
  textColor: '',
};

export const Large = Template.bind({});
Large.args = {
  size: T.ButtonSize.LARGE,
  bgColor: '',
  text: '100,000원 결제하기',
  textColor: '',
};
