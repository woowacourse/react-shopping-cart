import React from 'react';
import IconButton from '.';
import { ReactComponent as TrashBin } from '../../../assets/icons/trash-bin.svg';

export default {
  title: 'components/shared/IconButton',
  component: IconButton,
};

const Template = args => <IconButton {...args} />;

export const Default = Template.bind({});

Default.args = {
  type: 'button',
  size: 'medium',
  children: <TrashBin />,
};
