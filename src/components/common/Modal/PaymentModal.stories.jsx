import React from 'react';
import PaymentModal from 'components/common/Modal/PaymentModal';

export default {
  title: 'components/common/PaymentModal',
  component: PaymentModal,
};

const Template = (args) => <PaymentModal {...args} />;

export const Default = Template.bind({});

Default.args = {
  type: 'cart',
  amount: 31800,
};
