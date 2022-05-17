import React from 'react';

import Button from 'component/common/Button';

export default {
  component: Button,
  title: 'Button',
};

const Template = (args) => <Button {...args} />;

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  children: '기본 버튼',
  backgroundColor: 'cyan',
};

export const BlueButton = Template.bind({});
BlueButton.args = {
  children: '파란 버튼',
  backgroundColor: 'blue',
};

export const CustomWidthHeightButton = Template.bind({});
CustomWidthHeightButton.args = {
  children: '사이즈 조절 가능한 버튼',
  backgroundColor: 'cyan',
  width: '500px',
  height: '300px',
};
