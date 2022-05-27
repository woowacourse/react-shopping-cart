import React from 'react';

import QuantityBox from 'component/common/QuantityBox';

export default {
  component: QuantityBox,
  title: 'Common/QuantityBox',
  argTypes: {
    quantity: {table: {disable: true}},
    handleIncrease: {action: 'click', table: {disable: true}},
    handleDecrease: {action: 'click', table: {disable: true}},
  },
};

const Template = (args) => <QuantityBox {...args} />;

export const Defaults = Template.bind({});
