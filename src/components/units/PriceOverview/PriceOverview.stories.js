import React from 'react';
import PriceOverview from './PriceOverview';

export default {
  title: 'units/PriceOverView',
  component: PriceOverview,
};

const Template = (args) => <PriceOverview {...args} />;

export const Default = Template.bind({});
Default.args = {
  headerText: '결제예상금액',
};
