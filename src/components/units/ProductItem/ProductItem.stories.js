import React from 'react';
import ProductItem from './ProductItem';
import defaultImageUrl from '../../../assets/images/default_product_item.png';
import noImageUrl from '../../../assets/images/no_image.jpg';

export default {
  title: 'units/ProductItem',
  component: ProductItem,
};

const Template = (args) => <ProductItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  imageUrl: defaultImageUrl,
  title: '맛있는 밀크티',
  price: 100000,
};

export const NoImage = Template.bind({});
NoImage.args = {
  ...Default.args,
  imageUrl: noImageUrl,
};
