import React from 'react';

import DetailItem from 'component/DetailItem';
import {MOCK_PRODUCT_LIST} from 'mocks/mockData';

export default {
  component: DetailItem,
  title: 'DetailItem',
  argTypes: {
    id: {table: {disable: true}},
    handleCartButtonClick: {action: 'click', table: {disable: true}},
  },
};

const Template = (args) => <DetailItem {...args} />;
export const Defaults = Template.bind({});
Defaults.args = {
  itemImgURL: MOCK_PRODUCT_LIST[0].image,
  itemName: MOCK_PRODUCT_LIST[0].name,
  itemPrice: MOCK_PRODUCT_LIST[0].price,
  isInCart: false,
};
