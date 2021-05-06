import React from 'react';
import PriceInfoBox from '.';

export default {
  title: 'Shared/PriceInfoBox',
  component: PriceInfoBox,
  argTypes: {},
};

const Template = (args) => <PriceInfoBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: '결제예상금액',
  priceInfo: {
    name: '결제예상금액',
    price: 21700,
  },
  submitText: '주문하기(2개)',
};
