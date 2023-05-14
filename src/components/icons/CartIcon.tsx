import { CART_PATH } from '../../constants/svgPath';
import { IconProps } from '../../types';
import Icon from '../common/Icon';

const CartIcon = ({ css, ...props }: IconProps) => {
  return (
    <Icon
      width="30"
      height="27"
      fill="#AAA"
      path={CART_PATH}
      viewBox="0 0 51 44"
      aria-label="cart-icon-button"
      css={css}
      {...props}
    />
  );
};

export default CartIcon;
