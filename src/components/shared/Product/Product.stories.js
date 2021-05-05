import React from 'react';
import Product from '.';

export default {
  title: 'Shared/Product',
  component: Product,
  argTypes: {},
};

const Template = (args) => <Product {...args} />;

export const XS = Template.bind({});
XS.args = {
  imageUrl: `${process.env.PUBLIC_URL}/logo512.png`,
  alt: 'default image',
  size: 'xs',
  direction: 'column',
  children: <p>리액트</p>,
};

export const SM = Template.bind({});
SM.args = {
  imageUrl: `${process.env.PUBLIC_URL}/logo512.png`,
  alt: 'default image',
  size: 'sm',
  direction: 'row',
  children: <p>리액트</p>,
};

export const MD = Template.bind({});
MD.args = {
  imageUrl: `${process.env.PUBLIC_URL}/logo512.png`,
  alt: 'default image',
  size: 'md',
  direction: 'row',
  children: <p>리액트</p>,
};

export const LG = Template.bind({});
LG.args = {
  imageUrl: `${process.env.PUBLIC_URL}/logo512.png`,
  alt: 'default image',
  size: 'lg',
  direction: 'column',
  children: <p>리액트</p>,
};
