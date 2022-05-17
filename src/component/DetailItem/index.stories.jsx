import React from 'react';

import DetailItem from 'component/DetailItem';

export default {
  component: DetailItem,
  title: 'DetailItem',
};

const Template = (args) => <DetailItem {...args} />;
export const DefaultDetailItem = Template.bind({});
DefaultDetailItem.args = {
  itemImgURL:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png',
  itemName: 'PET보틀-정사각(420ml)',
  itemPrice: 43400,
};
