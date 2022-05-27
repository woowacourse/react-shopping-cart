import React from 'react';

import Loader from 'component/Loader';

export default {
  component: Loader,
  title: 'Loader',
};

const Template = (args) => <Loader {...args} />;

export const Defaults = Template.bind({});
