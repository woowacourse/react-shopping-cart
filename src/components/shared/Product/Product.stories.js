import React from 'react';
import Product from '.';

export default {
  title: 'Shared/Product',
  component: Product,
  argTypes: {},
};

const Template = (args) => <Product {...args} />;

export const Column = Template.bind({});
Column.args = {
  imageUrl: `${process.env.PUBLIC_URL}/logo512.png`,
  alt: 'default image',
  size: '10rem',
  direction: 'column',
  children: <p>리액트</p>,
};

export const Row = Template.bind({});
Row.args = {
  imageUrl: `${process.env.PUBLIC_URL}/logo512.png`,
  alt: 'default image',
  size: '10rem',
  direction: 'row',
  children: <p>리액트</p>,
};
