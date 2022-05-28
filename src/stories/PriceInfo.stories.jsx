import React from 'react';

import PriceInfo from 'components/PriceInfo';

export default {
  title: 'Component/PriceInfo',
  component: PriceInfo,
  argTypes: {
    title: { controls: 'text' },
    subTitle: { controls: 'text' },
    price: { controls: 'number' },
  },
};

const Template = (args) => <PriceInfo {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: '결제예상금액',
  subTitle: '결제예상금액',
  price: 20000,
};
