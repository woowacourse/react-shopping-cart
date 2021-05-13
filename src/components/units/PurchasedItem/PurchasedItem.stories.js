import React from 'react';
import PurchasedItem from './PurchasedItem';
import defaultImageURL from '../../../assets/images/brave.png';

export default {
  title: 'units/PurchasedItem',
  component: PurchasedItem,
};

const Template = (args) => <PurchasedItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  item: {
    id: 1,
    product: {
      id: 3,
      name: '블랙핑크와 카디비',
      image: defaultImageURL,
      price: 30000000,
    },
    quantity: 1,
    checked: false,
  },
};
