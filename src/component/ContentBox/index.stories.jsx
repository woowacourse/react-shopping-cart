import React from 'react';

import ContentBox from 'component/ContentBox';

export default {
  component: ContentBox,
  title: 'ContentBox',
};

const Template = (args) => <ContentBox {...args} />;

export const DefaultContextBox = Template.bind({});
