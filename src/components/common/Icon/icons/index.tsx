import RecycleBin from '@/components/common/Icon/icons/RecycleBin';
import Cart from './Cart';
import Tent from './Tent';

const iconName = {
  tent: Tent,
  cart: Cart,
  recycleBin: RecycleBin,
};

export type IconNames = keyof typeof iconName;

export default iconName;
