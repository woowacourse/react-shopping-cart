import React from 'react';

import CheckBox from 'component/common/CheckBox';

export default {
  component: CheckBox,
  title: 'Common/CheckBox',
  argTypes: {
    Name: {table: {disable: true}},
    productId: {table: {disable: true}},
    handleCheckedTrue: {action: 'click', table: {disable: true}},
    handleCheckedFalse: {action: 'click', table: {disable: true}},
  },
};

const Template = (args) => <CheckBox {...args} />;

export const Defaults = Template.bind({});
