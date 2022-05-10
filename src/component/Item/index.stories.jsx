import React from 'react';

import Item from 'component/Item';

export default {
  component: Item,
  title: 'Item',
};

const Template = (args) => <Item {...args} />;
export const Defaults = Template.bind({});
Defaults.args = {
  itemImgURL:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png',
  itemName: 'PET보틀-정사각(420ml)',
  itemPrice: '43,400',
};
