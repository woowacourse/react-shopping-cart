import React from 'react';

import Image from 'components/Image';

export default {
  title: 'Component/Image',
  component: Image,
  argTypes: {
    src: { controls: 'text' },
    width: { controls: 'text' },
    height: { controls: 'text' },
    alt: { controls: 'text' },
  },
};

const Template = (args) => <Image {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  src: process.env.PUBLIC_URL + '/img/fallback.png',
  width: '100px',
  height: '100px',
  alt: 'fallback 이미지',
};

export const Trashcan = Template.bind({});
Trashcan.args = {
  src: process.env.PUBLIC_URL + '/img/trashcan.png',
  width: '24px',
  height: '24px',
  alt: '휴지통 이미지',
};
