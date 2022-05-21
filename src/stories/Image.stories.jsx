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
  src: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201704/10/8a043cc8-818b-4b85-a962-7914b83777de.jpg',
  width: '100px',
  height: '100px',
  alt: '사나 이미지',
};

export const Trashcan = Template.bind({});
Trashcan.args = {
  src: process.env.PUBLIC_URL + '/img/trashcan.png',
  width: '24px',
  height: '24px',
  alt: '사나 이미지',
};
