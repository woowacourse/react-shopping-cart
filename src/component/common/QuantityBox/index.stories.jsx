import React from 'react';

import QuantityBox from 'component/common/QuantityBox';

export default {
  component: QuantityBox,
  title: 'QuantityBox',
};

const Template = (args) => <QuantityBox {...args} />;

export const Defaults = Template.bind({});
