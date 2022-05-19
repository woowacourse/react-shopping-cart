import ShoppingCartListItem from './ShoppingCartListItem.component';
import DefaultImage from 'assets/images/baeminImage.png';
import { action } from '@storybook/addon-actions';

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
