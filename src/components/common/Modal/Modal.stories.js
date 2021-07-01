import React from 'react';

import Modal from '.';

export default {
  component: Modal,
  title: 'Common/Modal',
};

const Template = (args) => <Modal {...args}>Test</Modal>;

export const Default = Template.bind({});

export const FullType = Template.bind({});
FullType.args = {
  type: 'full',
};
