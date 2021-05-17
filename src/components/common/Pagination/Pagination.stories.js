import React from 'react';
import Pagination from '.';

export default {
  title: 'Common/Pagination',
  component: Pagination,
  argTypes: {},
};

const Template = (args) => <Pagination {...args} />;

export const Default = Template.bind({});
Default.args = {
  pages: 100,
  onPagePrevious: () => {},
  onPageNext: () => {},
  onPageSelected: () => {},
  isPreviousPageAvailable: false,
  isNextPageAvailable: true,
  currentPage: 1,
};
