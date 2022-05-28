import React from 'react';

import Line from 'components/Line';
export default {
  title: 'Component/Line',
  component: Line,
  argTypes: {
    width: { controls: 'text' },
    height: { controls: 'text' },
    color: { controls: 'text' },
  },
};

const Template = (args) => <Line {...args} />;

export const Primary = Template.bind({});
Line.args = {
  width: '500px',
  height: '1px',
  color: 'red',
};
