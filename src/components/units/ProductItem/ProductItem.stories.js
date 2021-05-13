import React from 'react';
import ProductItem from './ProductItem';
import defaultImageUrl from '../../../assets/images/default_product_item.png';

export default {
  title: 'units/ProductItem',
  component: ProductItem,
};

const Template = (args) => <ProductItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  product: {
    id: 123,
    image: defaultImageUrl,
    name: '맛있는 밀크티',
    price: 100000,
  },
};

export const NoImage = Template.bind({});
NoImage.args = {
  product: {
    id: 123,
    name: '맛있는 밀크티',
    price: 100000,
  },
};
