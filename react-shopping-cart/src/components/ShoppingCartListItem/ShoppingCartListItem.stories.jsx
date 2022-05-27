import ShoppingCartListItem from './ShoppingCartListItem.component';

import { action } from '@storybook/addon-actions';

import DefaultImage from 'assets/images/baeminImage.png';

export default {
  title: 'Components/ShoppingCartListItem',
  component: ShoppingCartListItem,
};

export const DefaultShoppingCartListItem = args => <ShoppingCartListItem {...args} />;
DefaultShoppingCartListItem.args = {
  id: 0,
  thumbnail: DefaultImage,
  name: 'PET보틀-정사각(420ml)',
  price: 43400,
  quantity: 0,
};
