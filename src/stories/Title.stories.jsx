import React from 'react';

import Title from 'components/Title';

export default {
  title: 'component/Title',
  component: Title,
};

const Template = () => <Title>타이틀</Title>;
const CartTemplate = () => <Title>장바구니</Title>;

export const Primary = Template.bind({});
export const CartPrimary = CartTemplate.bind({});
