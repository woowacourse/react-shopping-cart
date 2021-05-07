import React from 'react';
import PurchasedItem from './PurchasedItem';

export default {
  title: 'units/PurchasedItem',
  component: PurchasedItem,
};

const Template = (args) => <PurchasedItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: '타로 밀크티 문자열임 조심!',
  price: 139800,
  quantity: 1,
};
