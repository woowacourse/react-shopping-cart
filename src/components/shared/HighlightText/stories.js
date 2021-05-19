import React from 'react';
import HighlightText from '.';
import COLOR from '../../../constants/color';

export default {
  title: 'components/shared/HighlightText',
  component: HighlightText,
};

const Template = args => <HighlightText {...args} />;

export const Default = Template.bind({});

Default.args = {
  color: COLOR.HIGHLIGHT_MINT,
  children: <>주문 금액</>,
};
