import React from 'react';
import Snackbar from '.';

export default {
  title: 'Common/Snackbar',
  component: Snackbar,
  argTypes: {},
};

const Template = (args) => <Snackbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: '장바구니에 상품이 추가되었습니다.',
  setMessage: () => {},
};
