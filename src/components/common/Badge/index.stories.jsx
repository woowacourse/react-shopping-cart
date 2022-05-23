import React from 'react';

import Badge from 'components/common/Badge';

export default {
  component: Badge,
  title: 'Badge',
};

const Template = (args) => <Badge {...args} />;

export const Defaults = Template.bind({});
Defaults.args = {
  count: 3,
};
