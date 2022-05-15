import React from 'react';

import Image from 'components/Image';

export default {
  title: 'Component/Image',
  component: Image,
  argTypes: {
    size: { controls: 'text' },
    src: { controls: 'text' },
  },
};

const Template = (args) => <Image {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  src: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201704/10/8a043cc8-818b-4b85-a962-7914b83777de.jpg',
  size: '282px',
};
