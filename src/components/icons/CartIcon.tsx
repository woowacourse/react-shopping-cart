import Icon from '../common/Icon';
import { IconProps } from '../../types';
import { CART_PATH } from '../../constants/svgPath';

const CartIcon = ({ svgStyle, ...props }: IconProps) => {
  return (
    <Icon
      width="30"
      height="27"
      fill="#AAA"
      path={CART_PATH}
      viewBox="0 0 51 44"
      aria-label="cart-icon-button"
      svgStyle={svgStyle}
      {...props}
    />
  );
};

export default CartIcon;
