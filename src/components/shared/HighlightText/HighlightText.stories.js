import React from 'react';
import HighlightText from './HighlightText';

export default {
  title: 'shared/HighlightText',
  component: HighlightText,
};

const Template = (args) => <HighlightText {...args} />;

export const Price = Template.bind({});
Price.args = {
  text: '30,000원',
};

export const Text = Template.bind({});
Text.args = {
  text: '결제예상금액',
};
