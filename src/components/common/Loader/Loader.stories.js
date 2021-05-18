import React from 'react';
import Loader from '.';
import PALETTE from '../../../constants/palette';
import Spinner from '../Icon/Spinner';

export default {
  title: 'Common/Loader',
  component: Loader,
  argTypes: {},
};

const Template = (args) => <Loader {...args} />;

export const Default = Template.bind({});
Default.args = {
  isLoading: true,
  animationType: 'spin',
  children: <Spinner width={'8rem'} color={PALETTE.BAEMINT} />,
};
