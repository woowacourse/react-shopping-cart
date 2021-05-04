import React from 'react';
import Header from './index';

export default {
  title: 'components/shared/Header',
  component: Header,
};

const Template = args => <Header {...args} />;

export const Default = Template.bind({});

Default.args = {
  menuList: ['장바구니', '주문목록'],
};
