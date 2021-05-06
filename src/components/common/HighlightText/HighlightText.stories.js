import React from 'react';
import HighlightText from '.';
import PALETTE from '../../../constants/palette';

export default {
  title: 'Common/HighlightText',
  component: HighlightText,
  argTypes: {},
};

const Template = (args) => <HighlightText {...args} />;

export const Default = Template.bind({});
Default.args = {
  highlightColor: PALETTE.BAEMINT_TRANSPARENT_001,
  children: '결제예상금액',
};
