import React from 'react';
import PaymentModal from 'components/common/Modal/PaymentModal';

export default {
  title: 'components/PaymentModal',
  component: PaymentModal,
};

const Template = (args) => <PaymentModal {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: '결제 예상 금액',
  description: '결제 예상 금액',
  amount: 31800,
  count: 30,
};
