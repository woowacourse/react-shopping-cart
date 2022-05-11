import React from 'react';
import Pagination from './Pagination';

export default {
  component: Pagination,
  title: 'Pagination',
};

const Template = args => {
  return <Pagination {...args} />;
};

export const DefaultPagination = Template.bind({});

DefaultPagination.args = {};
