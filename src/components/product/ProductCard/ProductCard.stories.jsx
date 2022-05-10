import React from 'react';
import ProductCard from './ProductCard';

export default {
  component: ProductCard,
  title: 'ProductCard',
};

const Template = args => {
  return <ProductCard {...args} />;
};

export const DefaultProductCard = Template.bind({});

DefaultProductCard.args = {};
