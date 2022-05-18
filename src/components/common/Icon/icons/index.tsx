import Cart from './Cart';
import Tent from './Tent';

const iconName = {
  tent: Tent,
  cart: Cart,
};

export type IconNames = keyof typeof iconName;

export default iconName;
