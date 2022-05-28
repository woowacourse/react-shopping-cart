import React from 'react';

import PayAmount from 'components/PayAmount';

export default {
  title: 'Template/PayAmount',
  component: PayAmount,
};

const Template = (args) => <PayAmount {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: '결제예상금액',
  amount: 21700,
  buttonText: '주문하기',
};
