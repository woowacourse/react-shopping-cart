import React from 'react';
import Thumbnail from './index';
import itemImage from '../../../assets/images/product-item01.png';

export default {
  title: 'components/shared/Thumbnail',
  component: Thumbnail,
};

const Template = args => <Thumbnail {...args} />;

export const Small = Template.bind({});
export const Medium = Template.bind({});
export const Large = Template.bind({});
export const XLarge = Template.bind({});

Small.args = {
  image: itemImage,
  alt: '임시 이미지',
  size: 'small',
};

Medium.args = {
  image: itemImage,
  alt: '임시 이미지',
  size: 'medium',
};

Large.args = {
  image: itemImage,
  alt: '임시 이미지',
  size: 'large',
};

XLarge.args = {
  image: itemImage,
  alt: '임시 이미지',
  size: 'x-large',
};
