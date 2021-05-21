import React from 'react';
import OrderItem from './OrderItem';
import defaultImageUrl from '../../../assets/images/default_product_item.png';

export default {
  title: 'units/OrderItem',
  component: OrderItem,
};

const Template = (args) => <OrderItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: '맛있는 아쌈 밀크티',
  quantity: 1,
  imageUrl: defaultImageUrl,
};
