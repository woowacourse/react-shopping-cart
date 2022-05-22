import React from 'react';

import ContentBox from 'component/common/ContentBox';

export default {
  component: ContentBox,
  title: 'Common/ContentBox',
  argTypes: {onClickButton: {action: 'click', table: {disable: true}}},
};

const Template = (args) => <ContentBox {...args} />;

export const Defaults = Template.bind({});
