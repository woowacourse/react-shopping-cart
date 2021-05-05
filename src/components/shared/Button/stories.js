import React from 'react';
import Button from './index';

export default {
  title: 'components/shared/Button',
  component: Button,
};

const Template = args => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
  type: 'button',
  color: 'white',
  borderColor: 'grey',
  disabled: false,
  children: (
    <span style={{ fontSize: '1.25rem' }}>
      Button<span>3</span>
    </span>
  ),
  width: '388px',
  height: '74px',
  onClick: () => {},
};
